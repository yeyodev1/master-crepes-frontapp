#!/usr/bin/env python3
"""
Scrape Pixieset gallery and upload all images to Cloudinary.
"""

import urllib.request
import urllib.parse
import re
import json
import hashlib
import time
import os
import tempfile

# --- Config ---
PIXIESET_URL = 'https://gastronofoto.pixieset.com/mastercrepes/'
CLOUDINARY_CLOUD = 'dpjzfua3n'
CLOUDINARY_API_KEY = '721769991461294'
CLOUDINARY_API_SECRET = '2DWnqRsOjJOGr8Z4HoGMSpRqZjs'
CLOUDINARY_FOLDER = 'master-crepes'
CLOUDINARY_UPLOAD_URL = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD}/image/upload'
OUTPUT_FILE = '/Users/diegoreyes/projects/work/personal/master-crepes-frontapp/cloudinary-images.json'

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}


def fetch_page(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode('utf-8')


def extract_image_urls(html):
    """Try multiple strategies to extract image URLs from Pixieset."""
    image_urls = set()

    # Strategy 1: Look for direct image URLs in the HTML
    patterns = [
        r'https?://[^"\'>\s]+\.(?:jpg|jpeg|png|webp)(?:\?[^"\'>\s]*)?',
        r'"url"\s*:\s*"(https?://[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"',
        r"'url'\s*:\s*'(https?://[^']+\.(?:jpg|jpeg|png|webp)[^']*)'",
    ]
    for pattern in patterns:
        found = re.findall(pattern, html, re.IGNORECASE)
        for u in found:
            if isinstance(u, str) and ('cdn' in u or 'pixieset' in u or 'cloudfront' in u or 'amazonaws' in u):
                # Clean up escaped unicode
                u = u.replace('\\u002F', '/').replace('\\/', '/')
                image_urls.add(u)

    # Strategy 2: Look for JSON data embedded in scripts
    # Pixieset often uses window.* variables
    json_patterns = [
        r'window\.__INITIAL_STATE__\s*=\s*(\{.+?\});\s*</script>',
        r'window\.PX_DATA\s*=\s*(\{.+?\});\s*</script>',
        r'var\s+photos\s*=\s*(\[.+?\]);\s*</script>',
        r'photos\s*:\s*(\[.+?\])',
        r'"photos"\s*:\s*(\[.+?\])',
        r'"images"\s*:\s*(\[.+?\])',
    ]
    for pattern in json_patterns:
        matches = re.findall(pattern, html, re.DOTALL | re.IGNORECASE)
        for match in matches:
            try:
                data = json.loads(match)
                # Recursively find URLs
                find_urls_in_json(data, image_urls)
            except:
                pass

    # Strategy 3: Look for Pixieset's specific data structure
    # They often have a collection key
    script_blocks = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
    for block in script_blocks:
        if 'photo' in block.lower() or 'image' in block.lower() or 'gallery' in block.lower():
            # Try to extract JSON objects
            json_obj_matches = re.findall(r'\{[^{}]*"(?:url|src|photo|image|file)"[^{}]*\}', block)
            for m in json_obj_matches:
                try:
                    obj = json.loads(m)
                    find_urls_in_json(obj, image_urls)
                except:
                    pass
            # Also look for URLs directly
            urls_in_block = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"\'<>]*)?', block, re.IGNORECASE)
            for u in urls_in_block:
                image_urls.add(u)

    return list(image_urls)


def find_urls_in_json(data, url_set):
    """Recursively search JSON data for image URLs."""
    if isinstance(data, dict):
        for k, v in data.items():
            if isinstance(v, str) and re.search(r'\.(jpg|jpeg|png|webp)', v, re.IGNORECASE):
                if v.startswith('http'):
                    url_set.add(v)
            else:
                find_urls_in_json(v, url_set)
    elif isinstance(data, list):
        for item in data:
            find_urls_in_json(item, url_set)


def try_pixieset_api(base_url):
    """Try to access Pixieset's internal API for photo data."""
    image_urls = []

    # Extract collection slug from URL
    # URL format: https://photographer.pixieset.com/collection-slug/
    parts = base_url.rstrip('/').split('/')
    slug = parts[-1]
    photographer = parts[2].split('.')[0]

    print(f"Photographer: {photographer}, Slug: {slug}")

    # Try various API endpoints Pixieset uses
    api_endpoints = [
        f'https://gastronofoto.pixieset.com/client/photos?cuk={slug}&page=1&perpage=500',
        f'https://gastronofoto.pixieset.com/api/v1/collections/{slug}/photos',
        f'https://gastronofoto.pixieset.com/{slug}/photos.json',
        f'https://gastronofoto.pixieset.com/client/photos?cuk=mastercrepes&page=1&perpage=500&uck=',
    ]

    for endpoint in api_endpoints:
        try:
            print(f"Trying API: {endpoint}")
            req = urllib.request.Request(endpoint, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read().decode('utf-8')
                print(f"  Response length: {len(content)}")
                print(f"  Preview: {content[:300]}")
                try:
                    data = json.loads(content)
                    urls = []
                    find_urls_in_json(data, set())
                    print(f"  Found JSON data")
                except:
                    pass
                # Search for image URLs regardless
                found = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"\'<>]*)?', content, re.IGNORECASE)
                image_urls.extend(found)
                print(f"  Found {len(found)} URLs")
        except Exception as e:
            print(f"  Error: {e}")

    return image_urls


def generate_signature(params_dict):
    """Generate Cloudinary signed upload signature."""
    # Sort params and build string
    sorted_params = sorted(params_dict.items())
    param_str = '&'.join(f'{k}={v}' for k, v in sorted_params)
    param_str += CLOUDINARY_API_SECRET
    sig = hashlib.sha1(param_str.encode('utf-8')).hexdigest()
    return sig


def upload_to_cloudinary(image_url, filename):
    """Upload an image URL to Cloudinary via signed upload."""
    import urllib.request
    import urllib.parse

    timestamp = int(time.time())

    params = {
        'folder': CLOUDINARY_FOLDER,
        'timestamp': str(timestamp),
    }

    signature = generate_signature(params)

    # Build multipart form data
    boundary = '----FormBoundary' + hashlib.md5(str(time.time()).encode()).hexdigest()

    fields = {
        'file': image_url,  # Upload by URL
        'api_key': CLOUDINARY_API_KEY,
        'timestamp': str(timestamp),
        'signature': signature,
        'folder': CLOUDINARY_FOLDER,
    }

    # Build multipart body
    body_parts = []
    for key, value in fields.items():
        body_parts.append(f'--{boundary}'.encode())
        body_parts.append(f'Content-Disposition: form-data; name="{key}"'.encode())
        body_parts.append(b'')
        body_parts.append(value.encode())
    body_parts.append(f'--{boundary}--'.encode())

    body = b'\r\n'.join(body_parts)

    headers = {
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'Content-Length': str(len(body)),
    }

    req = urllib.request.Request(CLOUDINARY_UPLOAD_URL, data=body, headers=headers, method='POST')

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            return result
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"  HTTP Error {e.code}: {error_body}")
        return None
    except Exception as e:
        print(f"  Upload error: {e}")
        return None


def main():
    print("=" * 60)
    print("Step 1: Fetching Pixieset gallery page...")
    print("=" * 60)

    html = fetch_page(PIXIESET_URL)
    print(f"Fetched {len(html)} bytes of HTML")

    # Save HTML for inspection
    with open('/tmp/pixieset_page.html', 'w') as f:
        f.write(html)
    print("Saved HTML to /tmp/pixieset_page.html")

    print("\nStep 2: Extracting image URLs from HTML...")
    image_urls = extract_image_urls(html)
    print(f"Found {len(image_urls)} image URLs from HTML parsing")
    for u in image_urls[:10]:
        print(f"  {u}")

    print("\nStep 3: Trying Pixieset API endpoints...")
    api_urls = try_pixieset_api(PIXIESET_URL)
    print(f"Found {len(api_urls)} URLs from API endpoints")

    # Combine and deduplicate
    all_urls = list(set(image_urls + api_urls))

    # Filter to keep only likely photo URLs (not thumbnails/icons)
    # Pixieset uses CDN URLs - filter out tiny thumbnails
    photo_urls = []
    for u in all_urls:
        # Skip common non-photo URLs
        if any(x in u.lower() for x in ['icon', 'logo', 'avatar', 'sprite', 'favicon', 'placeholder']):
            continue
        photo_urls.append(u)

    print(f"\nTotal photo URLs after filtering: {len(photo_urls)}")
    for u in photo_urls:
        print(f"  {u}")

    if not photo_urls:
        print("\nNo images found. Let's inspect the HTML for clues...")
        # Print relevant sections of HTML
        lines = html.split('\n')
        for i, line in enumerate(lines):
            if any(x in line.lower() for x in ['photo', 'image', 'gallery', 'cdn', 'cloudfront']):
                print(f"Line {i}: {line[:200]}")
        return

    print("\n" + "=" * 60)
    print(f"Step 4: Uploading {len(photo_urls)} images to Cloudinary...")
    print("=" * 60)

    results = []
    for i, url in enumerate(photo_urls):
        filename = url.split('/')[-1].split('?')[0]
        print(f"\n[{i+1}/{len(photo_urls)}] Uploading: {filename}")
        print(f"  URL: {url}")

        result = upload_to_cloudinary(url, filename)
        if result and 'secure_url' in result:
            cloudinary_url = result['secure_url']
            print(f"  Success: {cloudinary_url}")
            results.append({
                'original_filename': result.get('original_filename', filename),
                'cloudinary_url': cloudinary_url,
                'public_id': result.get('public_id', ''),
            })
        else:
            print(f"  Failed to upload")

        # Small delay to avoid rate limiting
        time.sleep(0.5)

    print("\n" + "=" * 60)
    print(f"Step 5: Writing results to {OUTPUT_FILE}")
    print("=" * 60)

    output = {'images': results}
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, indent=2)

    print(f"Done! Uploaded {len(results)}/{len(photo_urls)} images successfully.")
    print(f"Results written to: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
