import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Master Crepes - Live French Stations & Catering in Miami',
        description: 'Elevate your event with Master Crepes. Authentic live French crêpe stations for weddings, corporate events, and parties in Miami.',
      }
    },
    {
      path: '/catering',
      name: 'catering',
      component: () => import('../views/CateringView.vue'),
      meta: {
        title: 'Catering Services - Master Crepes',
        description: 'Book our premium live crêpe stations for your next event. Sweet and savory menus available for weddings, office lunches, and more.',
      }
    },
    {
      path: '/franchises',
      name: 'franchises',
      component: () => import('../views/FranchisesView.vue'),
      meta: {
        title: 'Franchise Opportunities - Master Crepes',
        description: 'Join the Master Crepes family. A proven business model with comprehensive support and a beloved product.',
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us - Master Crepes',
        description: 'Get in touch for catering quotes, franchise information, or general inquiries. Serving Miami and South Florida.',
      }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
      meta: {
        title: 'Gallery - Master Crepes',
        description: 'Browse our gallery of authentic French crêpes and catering events in Miami.',
      }
    },
    {
      path: '/restaurante',
      name: 'restaurante',
      component: () => import('../views/RestauranteView.vue'),
      meta: {
        title: 'Restaurant - Coffee & Drinks - Master Crepes',
        description: 'Beyond crêpes: discover our specialty coffee, lattes and refreshing drinks at Master Crepes Doral.',
      }
    },
    {
      path: '/bio',
      name: 'bio',
      component: () => import('../views/BioView.vue'),
      meta: {
        title: 'Links - Master Crepes',
        description: 'Connect with Master Crepes. Order online, book catering, or view our latest menus.',
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

const SITE_ORIGIN = 'https://www.themastercrepes.com';
const DEFAULT_TITLE = 'Master Crepes - Authentic French Crêpes, Coffee & Catering in Doral, Miami';
const DEFAULT_DESC = 'French crêperie in Doral, FL. Sweet and savory crêpes, specialty coffee, signature drinks and live crêpe-station catering across Miami.';

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
};

router.beforeEach((to, _from, next) => {
  const title = (to.meta.title as string) || DEFAULT_TITLE;
  const description = (to.meta.description as string) || DEFAULT_DESC;
  const canonical = SITE_ORIGIN + to.path;

  document.title = title;

  setMeta('meta[name="title"]', 'content', title);
  setMeta('meta[name="description"]', 'content', description);
  setMeta('link[rel="canonical"]', 'href', canonical);

  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonical);

  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonical);

  next();
})

export default router
