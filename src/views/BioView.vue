<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- Types ---
interface BioLink {
  id: string;
  label: string;
  url: string;
  icon?: string; // FontAwesome class
  isExternal: boolean;
  highlight?: boolean; // For primary actions
}

// --- Data ---
const links = ref<BioLink[]>([
  {
    id: 'website',
    label: 'Visit Website',
    url: '/',
    icon: 'fa-solid fa-globe',
    isExternal: false,
    highlight: true,
  },
  {
    id: 'catering',
    label: 'Catering Services',
    url: '/catering',
    icon: 'fa-solid fa-utensils',
    isExternal: false,
  },
  {
    id: 'franchises',
    label: 'Franchise Opportunities',
    url: '/franchises',
    icon: 'fa-solid fa-store',
    isExternal: false,
  },
  {
    id: 'menu-foodtruck',
    label: 'Foodtruck Menu (PDF)',
    url: 'https://www.themastercrepes.com/wp-content/uploads/2025/12/Menu-foodtruck-24in-x-36in-Digital.pdf',
    icon: 'fa-solid fa-truck-fast',
    isExternal: true,
  },
  {
    id: 'order-online',
    label: 'Order Online',
    url: 'https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106',
    icon: 'fa-solid fa-cart-shopping',
    isExternal: true,
    highlight: true,
  },
  {
    id: 'whatsapp',
    label: 'Chat on WhatsApp',
    url: 'https://wa.me/17864782727',
    icon: 'fa-brands fa-whatsapp',
    isExternal: true,
  },
]);

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/mastercrepesoficial/', icon: 'fa-brands fa-instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/mastercrepes1/', icon: 'fa-brands fa-facebook-f' },
  { name: 'X', url: 'https://twitter.com/MasterCrepes1', icon: 'fa-brands fa-x-twitter' },
];

// --- Animation State ---
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// --- Methods ---
const getTarget = (isExternal: boolean) => isExternal ? '_blank' : '_self';
</script>

<template>
  <div class="bio-container">
    <div class="bio-content">
      <!-- Header / Logo -->
      <header class="bio-header" :class="{ 'fade-in': isVisible }">
        <div class="logo-wrapper">
          <img src="@/assets/logo/logo-vertical.png" alt="Master Crepes Logo" class="logo" />
        </div>
        <p class="tagline">Authentic French Crêpes in Miami</p>
      </header>

      <!-- Links List -->
      <main class="links-list">
        <component
          v-for="(link, index) in links"
          :key="link.id"
          :is="link.isExternal ? 'a' : 'router-link'"
          :href="link.isExternal ? link.url : undefined"
          :to="!link.isExternal ? link.url : undefined"
          :target="getTarget(link.isExternal)"
          class="bio-link-card"
          :class="{
            'highlight': link.highlight,
            'slide-up': isVisible
          }"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <i v-if="link.icon" :class="['link-icon', link.icon]"></i>
          <span class="link-text">{{ link.label }}</span>
          <i v-if="link.isExternal" class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
        </component>
      </main>

      <!-- Footer / Socials -->
      <footer class="bio-footer" :class="{ 'fade-in': isVisible }">
        <div class="social-icons">
          <a 
            v-for="social in socialLinks" 
            :key="social.name" 
            :href="social.url" 
            target="_blank" 
            class="social-link"
            :aria-label="social.name"
          >
             <i :class="['social-icon-i', social.icon]"></i>
          </a>
        </div>
        <p class="copyright">© {{ new Date().getFullYear() }} Master Crepes</p>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Start with mobile-first approach

.bio-container {
  min-height: 100vh;
  width: 100%;
  background-color: $white; // Fallback
  background: linear-gradient(135deg, $gray-50 0%, $white 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif; // Assuming font is globally available
  padding: $spacing-lg $spacing-md;
  box-sizing: border-box;
}

.bio-content {
  width: 100%;
  max-width: 480px; // Standard "mobile app" feel constraint
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  align-items: center;
}

.bio-header {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .logo-wrapper {
    width: 120px;
    height: 120px;
    margin: 0 auto $spacing-sm;
    border-radius: 50%;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 80%;
      height: auto;
      object-fit: contain;
    }
  }

  .tagline {
    font-size: 1rem;
    color: $brand-navy;
    font-weight: 500;
    margin: 0;
    letter-spacing: 0.5px;
  }
}

.links-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.bio-link-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $spacing-md $spacing-lg;
  background: $white;
  color: $brand-navy;
  text-decoration: none;
  border-radius: $border-radius-pill; // Pill shape is better for these links
  border: 1px solid $border-light;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  opacity: 0; // Start hidden for animation
  animation-fill-mode: forwards; // Keep end state

  // Animation class applied by Vue
  &.slide-up {
    animation: slideUpFade 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    border-color: $brand-orange;
  }

  &:active {
    transform: scale(0.98);
  }

  &.highlight {
    background: $brand-orange;
    color: $white;
    border-color: $brand-orange;
    box-shadow: 0 4px 12px rgba($brand-orange, 0.3);

    &:hover {
      background: $brand-orange-light;
      border-color: $brand-orange-light;
    }
  }

  .external-icon {
    position: absolute;
    right: $spacing-lg;
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .link-icon {
    margin-right: $spacing-md;
    font-size: 1.2rem;
    width: 24px; // Fixed width for alignment
    text-align: center;
  }
}

.bio-footer {
  margin-top: $spacing-lg;
  text-align: center;
  opacity: 0;
  transition: opacity 1s ease 0.5s; // Delay footer

  &.fade-in {
    opacity: 1;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-sm;

    .social-link {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $white;
      color: $brand-navy;
      border-radius: 50%;
      text-decoration: none;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s, color 0.2s;

      .social-icon-i {
        font-size: 1.4rem;
      }

      &:hover {
        transform: scale(1.1);
        color: $brand-orange;
      }
    }
  }

  .copyright {
    font-size: 0.8rem;
    color: $gray-500;
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
