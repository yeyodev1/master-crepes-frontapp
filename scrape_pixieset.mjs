import { chromium } from '/private/tmp/pw-scraper/node_modules/playwright-extra/index.js';
import StealthPlugin from '/private/tmp/pw-scraper/node_modules/puppeteer-extra-plugin-stealth/index.cjs';
chromium.use(StealthPlugin());
import https from 'https';
import http from 'http';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const CLOUDINARY_CLOUD = 'dpjzfua3n';
const CLOUDINARY_API_KEY = '721769991461294';
const CLOUDINARY_API_SECRET = '2DWnqRsOjJOGr8Z4HoGMSpRqZjs';
const FOLDER = 'master-crepes';
const GALLERY_URL = 'https://gastronofoto.pixieset.com/mastercrepes/';

async function uploadToCloudinary(imageUrl, filename) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `folder=${FOLDER}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1')
    .update(paramsToSign + CLOUDINARY_API_SECRET)
    .digest('hex');

  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const fields = {
    file: imageUrl,
    api_key: CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder: FOLDER,
  };

  let body = '';
  for (const [key, val] of Object.entries(fields)) {
    body += `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`;
  }
  body += `--${boundary}--\r\n`;

  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': buf.length,
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve({ error: data }); }
      });
    });
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const imageUrls = new Set();

  // Intercept ALL network requests
  const allRequests = [];
  page.on('request', (req) => {
    const url = req.url();
    if (!url.includes('google') && !url.includes('facebook') && !url.includes('analytics')) {
      allRequests.push(url);
    }
  });

  page.on('response', async (response) => {
    const url = response.url();
    const ct = response.headers()['content-type'] || '';

    // Capture image URLs
    if (/\.(jpg|jpeg|png|webp)/i.test(url)) {
      imageUrls.add(url);
    }

    // Capture JSON API responses
    if (ct.includes('json')) {
      try {
        const text = await response.text().catch(() => '');
        if (text.length > 50) {
          const matches = text.match(/https?:\/\/[^\s"']+\.(jpg|jpeg|png|webp)[^\s"']*/gi) || [];
          // also check for protocol-relative URLs
          const relMatches = text.match(/\/\/[^\s"']+\.(jpg|jpeg|png|webp)[^\s"']*/gi) || [];
          matches.forEach(u => imageUrls.add(u));
          relMatches.forEach(u => imageUrls.add('https:' + u));
          if (matches.length > 0 || relMatches.length > 0) {
            console.log(`  JSON API hit: ${url} → ${matches.length + relMatches.length} images`);
          }
        }
      } catch {}
    }
  });

  console.log(`Navigating to ${GALLERY_URL}...`);
  await page.goto(GALLERY_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000); // Let JS initialize

  // Scroll to load all images (lazy loading)
  console.log('Scrolling to load all images...');
  let prevHeight = 0;
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const height = await page.evaluate(() => document.body.scrollHeight);
    if (height === prevHeight) break;
    prevHeight = height;

    // Click "Load More" button if present
    const loadMore = await page.$('button:has-text("Cargar"), button:has-text("Load"), .load-more');
    if (loadMore) {
      await loadMore.click().catch(() => {});
      await page.waitForTimeout(2000);
    }
  }

  // Extract image URLs from the DOM
  const domImages = await page.evaluate(() => {
    const imgs = [];
    document.querySelectorAll('img').forEach(img => {
      if (img.src && img.src.includes('pixieset')) imgs.push(img.src);
      if (img.dataset.src && img.dataset.src.includes('pixieset')) imgs.push(img.dataset.src);
    });
    // Also look for background images
    document.querySelectorAll('[style]').forEach(el => {
      const m = el.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (m && m[1].includes('pixieset')) imgs.push(m[1]);
    });
    return imgs;
  });
  domImages.forEach(u => imageUrls.add(u));

  // Try to get full-size URLs by replacing size suffixes
  const fullSizeUrls = new Set();
  for (const url of imageUrls) {
    // Convert thumbnail/preview URLs to full size
    const fullUrl = url
      .replace(/-\d+x\d+\./, '.')
      .replace(/-thumb\./, '.')
      .replace(/-small\./, '.')
      .replace(/-medium\./, '.')
      .replace(/-cover\./, '-xlarge.');
    fullSizeUrls.add(fullUrl);
    fullSizeUrls.add(url); // also keep original
  }

  // Print all network requests for debugging
  console.log('\n=== ALL NETWORK REQUESTS ===');
  allRequests.filter(u => u.includes('pixieset') || u.includes('images.')).forEach(u => console.log(' ', u));

  console.log(`\nFound ${imageUrls.size} unique image URLs`);
  [...imageUrls].forEach(u => console.log(' ', u));

  await browser.close();

  if (imageUrls.size === 0) {
    console.log('No images found!');
    fs.writeFileSync('cloudinary-images.json', JSON.stringify({ images: [], error: 'No images found in gallery' }, null, 2));
    process.exit(1);
  }

  // Upload to Cloudinary
  console.log('\nUploading to Cloudinary...');
  const results = [];
  let i = 0;
  for (const url of fullSizeUrls) {
    i++;
    console.log(`[${i}/${fullSizeUrls.size}] Uploading: ${url.slice(-60)}`);
    try {
      const res = await uploadToCloudinary(url, `mastercrepes-${i}`);
      if (res.secure_url) {
        console.log(`  ✓ ${res.secure_url}`);
        results.push({
          original_url: url,
          cloudinary_url: res.secure_url,
          public_id: res.public_id,
          width: res.width,
          height: res.height,
        });
      } else {
        console.log(`  ✗ Error: ${JSON.stringify(res).slice(0, 100)}`);
      }
    } catch (e) {
      console.log(`  ✗ Exception: ${e.message}`);
    }
  }

  const output = { images: results };
  fs.writeFileSync('cloudinary-images.json', JSON.stringify(output, null, 2));
  console.log(`\nDone! ${results.length} images uploaded.`);
  console.log('Results saved to cloudinary-images.json');
})();
