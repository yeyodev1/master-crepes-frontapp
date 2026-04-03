const { createRequire } = require('module');
const reqPw = createRequire('/tmp/pw-scraper/node_modules/.package-lock.json');

const { addExtra } = reqPw('playwright-extra');
const StealthPlugin = reqPw('puppeteer-extra-plugin-stealth');
const { chromium: pwChromium } = reqPw('playwright');
const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const chromium = addExtra(pwChromium);
chromium.use(StealthPlugin());

const CLOUDINARY_CLOUD = 'dpjzfua3n';
const CLOUDINARY_API_KEY = '721769991461294';
const CLOUDINARY_API_SECRET = '2DWnqRsOjJOGr8Z4HoGMSpRqZjs';
const FOLDER = 'master-crepes';
const GALLERY_URL = 'https://gastronofoto.pixieset.com/mastercrepes/';

function uploadToCloudinary(imageUrl) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `folder=${FOLDER}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1')
    .update(paramsToSign + CLOUDINARY_API_SECRET)
    .digest('hex');

  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const fields = { file: imageUrl, api_key: CLOUDINARY_API_KEY, timestamp, signature, folder: FOLDER };

  let body = '';
  for (const [key, val] of Object.entries(fields)) {
    body += `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`;
  }
  body += `--${boundary}--\r\n`;

  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request({
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': buf.length },
    }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve({ error: data }); } });
    });
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}

(async () => {
  console.log('Launching stealth browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const imageUrls = new Set();
  const allRequests = [];

  page.on('request', req => {
    const url = req.url();
    allRequests.push(url);
  });

  page.on('response', async (response) => {
    const url = response.url();
    const ct = response.headers()['content-type'] || '';

    if (/\.(jpg|jpeg|png|webp)/i.test(url) && !url.includes('favicon')) {
      imageUrls.add(url);
    }

    if (ct.includes('json')) {
      try {
        const text = await response.text().catch(() => '');
        const matches = [...(text.match(/https?:\/\/[^\s"'\\]+\.(jpg|jpeg|png|webp)[^\s"'\\]*/gi) || []),
                        ...(text.match(/\/\/images\.pixieset\.com\/[^\s"'\\]+/gi) || []).map(u => 'https:' + u)];
        if (matches.length > 0) {
          console.log(`  [JSON] ${url.slice(0, 80)} → ${matches.length} images`);
          matches.forEach(u => imageUrls.add(u));
        }
      } catch {}
    }
  });

  console.log(`Navigating to ${GALLERY_URL}...`);
  await page.goto(GALLERY_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(6000);

  // Scroll multiple times to trigger lazy loading
  console.log('Scrolling to load lazy images...');
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('End');
    await page.waitForTimeout(1500);
    const loadMore = await page.$('button, [class*="load-more"], [class*="loadmore"]').catch(() => null);
    if (loadMore) {
      const text = await loadMore.innerText().catch(() => '');
      if (/load|cargar/i.test(text)) {
        console.log('  Clicking load more...');
        await loadMore.click().catch(() => {});
        await page.waitForTimeout(2000);
      }
    }
  }

  // Extract from DOM
  const domImgs = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('img[src]').forEach(img => { if (img.src) results.push(img.src); });
    document.querySelectorAll('[data-src]').forEach(el => { if (el.dataset.src) results.push(el.dataset.src); });
    document.querySelectorAll('[style*="background"]').forEach(el => {
      const m = (el.getAttribute('style') || '').match(/url\(["']?([^"')]+)["']?\)/);
      if (m) results.push(m[1]);
    });
    return results;
  });
  domImgs.filter(u => /\.(jpg|jpeg|png|webp)/i.test(u)).forEach(u => imageUrls.add(u));

  // Print requests for debugging
  console.log('\n=== Pixieset-related requests ===');
  allRequests.filter(u => u.includes('pixieset') || u.includes('images.')).forEach(u => console.log(' ', u.slice(0, 120)));

  console.log(`\nFound ${imageUrls.size} image URLs:`);
  [...imageUrls].forEach(u => console.log(' ', u));

  await browser.close();

  if (imageUrls.size === 0) {
    console.log('\nNo gallery images found — Cloudflare bot protection active.');
    fs.writeFileSync('cloudinary-images.json', JSON.stringify({ images: [], note: 'Blocked by Cloudflare' }, null, 2));
    return;
  }

  // Upgrade small sizes to large
  const finalUrls = new Set([...imageUrls].map(u =>
    u.replace(/-(thumb|small|medium|cover)\./i, '-xlarge.')
  ));

  console.log('\nUploading to Cloudinary...');
  const results = [];
  let i = 0;
  for (const url of finalUrls) {
    i++;
    process.stdout.write(`[${i}/${finalUrls.size}] ${url.slice(-70)}... `);
    try {
      const res = await uploadToCloudinary(url);
      if (res.secure_url) {
        console.log(`✓`);
        results.push({ original_url: url, cloudinary_url: res.secure_url, public_id: res.public_id, width: res.width, height: res.height });
      } else {
        console.log(`✗ ${JSON.stringify(res).slice(0, 80)}`);
      }
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  fs.writeFileSync('cloudinary-images.json', JSON.stringify({ images: results }, null, 2));
  console.log(`\nDone! ${results.length} images uploaded. See cloudinary-images.json`);
})();
