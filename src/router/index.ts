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

router.beforeEach((to, from, next) => {
  // Update Title
  const defaultTitle = 'Master Crepes';
  document.title = (to.meta.title as string) || defaultTitle;

  // Update Meta Description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', (to.meta.description as string) || 'Authentic French Crepes in Miami');
  }

  next();
})

export default router
