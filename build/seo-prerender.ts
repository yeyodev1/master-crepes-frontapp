// Build step: writes dist/<route>/index.html with that route's <title>, description,
// canonical, hreflang, Open Graph and <html lang>, so crawlers and link previews get
// the right metadata without running JS. Also generates sitemap.xml with hreflang.
// Netlify serves these static files before the SPA fallback in _redirects.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { PAGES, absoluteUrl, localizedPath, type Lang, type PageSeo } from '../src/seo'

const ROBOTS_DEFAULT = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeXml = escapeAttr

const replaceAttr = (html: string, tagPattern: string, attr: 'content' | 'href', value: string) => {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`[seo-prerender] tag not found in index.html: ${tagPattern}`)
  return html.replace(re, (_m, start: string, end: string) => `${start}${escapeAttr(value)}${end}`)
}

const renderHead = (template: string, page: PageSeo, lang: Lang) => {
  const path = localizedPath(page.path, lang)
  const title = page.title[lang]
  const description = page.description[lang]
  const canonical = absoluteUrl(path)
  const esHref = absoluteUrl(page.enOnly ? page.path : localizedPath(page.path, 'es'))

  let html = template
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(title)}</title>`)
  html = replaceAttr(html, 'meta name="title"', 'content', title)
  html = replaceAttr(html, 'meta name="description"', 'content', description)
  html = replaceAttr(html, 'meta name="robots"', 'content', page.noindex ? 'noindex, nofollow' : ROBOTS_DEFAULT)
  html = replaceAttr(html, 'link rel="canonical"', 'href', canonical)
  html = replaceAttr(html, 'link rel="alternate" hreflang="en"', 'href', absoluteUrl(page.path))
  html = replaceAttr(html, 'link rel="alternate" hreflang="es"', 'href', esHref)
  html = replaceAttr(html, 'link rel="alternate" hreflang="x-default"', 'href', absoluteUrl(page.path))
  html = replaceAttr(html, 'meta property="og:url"', 'content', canonical)
  html = replaceAttr(html, 'meta property="og:title"', 'content', title)
  html = replaceAttr(html, 'meta property="og:description"', 'content', description)
  html = replaceAttr(html, 'meta property="og:locale"', 'content', lang === 'es' ? 'es_US' : 'en_US')
  html = replaceAttr(html, 'meta property="og:locale:alternate"', 'content', lang === 'es' ? 'en_US' : 'es_US')
  html = replaceAttr(html, 'meta name="twitter:url"', 'content', canonical)
  html = replaceAttr(html, 'meta name="twitter:title"', 'content', title)
  html = replaceAttr(html, 'meta name="twitter:description"', 'content', description)
  return html
}

const renderSitemap = (lastmod: string) => {
  const urls = PAGES.filter((p) => !p.noindex).flatMap((page) => {
    const alternates = [
      `    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(page.path)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="es" href="${absoluteUrl(localizedPath(page.path, 'es'))}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(page.path)}"/>`,
    ].join('\n')
    const images = (page.images ?? [])
      .map((img) => `    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>\n    </image:image>`)
      .join('\n')
    return (['en', 'es'] as Lang[]).map((lang) => [
      '  <url>',
      `    <loc>${absoluteUrl(localizedPath(page.path, lang))}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${page.changefreq ?? 'monthly'}</changefreq>`,
      `    <priority>${(page.priority ?? 0.5).toFixed(1)}</priority>`,
      alternates,
      images,
      '  </url>',
    ].filter(Boolean).join('\n'))
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export const seoPrerender = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'seo-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = join(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')

      for (const page of PAGES) {
        const langs: Lang[] = page.enOnly ? ['en'] : ['en', 'es']
        for (const lang of langs) {
          const path = localizedPath(page.path, lang)
          const file = path === '/' ? join(outDir, 'index.html') : join(outDir, path, 'index.html')
          mkdirSync(dirname(file), { recursive: true })
          writeFileSync(file, renderHead(template, page, lang))
        }
      }

      writeFileSync(join(outDir, 'sitemap.xml'), renderSitemap(new Date().toISOString().slice(0, 10)))
    },
  }
}
