import { createRouter, createWebHistory, type RouteComponent, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import i18n from '@/i18n'
import { PAGES, absoluteUrl, basePath, localizedPath, type Lang } from '@/seo'

const components: Record<string, RouteComponent | (() => Promise<RouteComponent>)> = {
  home: HomeView,
  menu: () => import('../views/MenuView.vue'),
  catering: () => import('../views/CateringView.vue'),
  'embed-catering': () => import('../views/EmbedCateringView.vue'),
  franchises: () => import('../views/FranchisesView.vue'),
  contact: () => import('../views/ContactView.vue'),
  gallery: () => import('../views/GalleryView.vue'),
  restaurante: () => import('../views/RestauranteView.vue'),
  giveaway: () => import('../views/GiveawayView.vue'),
  bio: () => import('../views/BioView.vue'),
}

// Every page exists in English (/menu) and Spanish (/es/menu) so each language
// has its own indexable URL, linked with hreflang.
const routes: RouteRecordRaw[] = PAGES.flatMap((page) => {
  const langs: Lang[] = page.enOnly ? ['en'] : ['en', 'es']
  return langs.map((lang) => ({
    path: localizedPath(page.path, lang),
    name: lang === 'en' ? page.name : `${page.name}-es`,
    component: components[page.name]!,
    ...(page.name === 'giveaway' && lang === 'en' ? { alias: ['/sorteo'] } : {}),
    meta: {
      lang,
      embed: page.name === 'embed-catering',
      noindex: page.noindex,
      title: page.title[lang],
      description: page.description[lang],
      hasAlternate: !page.enOnly,
    },
  }))
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

const ROBOTS_DEFAULT = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
};

router.beforeEach((to, _from, next) => {
  const lang = (to.meta.lang as Lang) || 'en';
  const fallback = PAGES[0]!;
  const title = (to.meta.title as string) || fallback.title[lang];
  const description = (to.meta.description as string) || fallback.description[lang];
  const canonical = absoluteUrl(to.path);
  const base = basePath(to.path);

  // The URL decides the language, so /es/* always renders Spanish
  i18n.global.locale.value = lang;
  document.documentElement.lang = lang;

  document.title = title;

  setMeta('meta[name="title"]', 'content', title);
  setMeta('meta[name="description"]', 'content', description);
  setMeta('link[rel="canonical"]', 'href', canonical);
  setMeta('meta[name="robots"]', 'content', to.meta.noindex ? 'noindex, nofollow' : ROBOTS_DEFAULT);

  setMeta('link[rel="alternate"][hreflang="en"]', 'href', absoluteUrl(base));
  setMeta('link[rel="alternate"][hreflang="es"]', 'href', absoluteUrl(to.meta.hasAlternate ? localizedPath(base, 'es') : base));
  setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', absoluteUrl(base));

  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonical);
  setMeta('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_US' : 'en_US');
  setMeta('meta[property="og:locale:alternate"]', 'content', lang === 'es' ? 'en_US' : 'es_US');

  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonical);

  next();
})

export default router
