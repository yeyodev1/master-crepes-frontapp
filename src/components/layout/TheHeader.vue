<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import logoDesktop from '@/assets/logo/logo-horizontal.png';
import logoMobile from '@/assets/logo/logo-vertical.png';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';

const { t } = useI18n();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navItems = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.catering'), path: '/catering' },
  { name: t('nav.franchises'), path: '/franchises' },
  { name: t('nav.contact'), path: '/contact' },
]);
</script>

<template>
  <header :class="['header', { 'is-scrolled': isScrolled }]">
    <div class="container">
      <!-- Logo -->
      <RouterLink to="/" class="logo-wrapper" @click="closeMenu">
        <img :src="logoDesktop" alt="Master Crepes" class="logo desktop-logo" />
        <img :src="logoDesktop" alt="Master Crepes" class="logo mobile-logo" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink :to="item.path" class="nav-link">{{ item.name }}</RouterLink>
          </li>
          <li>
            <a 
              href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106" 
              target="_blank" 
              class="nav-cta"
            >
              {{ t('nav.order_now') }}
            </a>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu" 
        :aria-expanded="isMenuOpen" 
        aria-label="Toggle menu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <!-- Mobile Navigation Overlay -->
      <transition name="fade">
        <div v-if="isMenuOpen" class="mobile-nav-overlay">
          <div class="mobile-nav-content">
            <img :src="logoMobile" alt="Master Crepes" class="mobile-menu-logo" />
            <ul class="mobile-nav-list">
              <li v-for="item in navItems" :key="item.path">
                <RouterLink :to="item.path" class="mobile-nav-link" @click="toggleMenu">
                  {{ item.name }}
                </RouterLink>
              </li>
              <li>
                <a 
                  href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106" 
                  target="_blank" 
                  class="mobile-nav-cta"
                >
                  {{ t('nav.order_now') }}
                </a>
              </li>
              <li class="mobile-lang-switch">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);

  &.is-scrolled {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  height: 80px; // Fixed height for consistency
}

.logo-wrapper {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 102; // Above mobile menu
}

.logo {
  height: 50px;
  width: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.mobile-logo {
  display: none;

  @media (max-width: 768px) {
    display: block;
    height: 40px;
  }
}

.desktop-logo {
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
}

/* Desktop Navigation */
.desktop-nav {
  @media (max-width: 768px) {
    display: none;
  }

  .nav-list {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  .nav-link {
    text-decoration: none;
    color: #333; // Dark grey for elegance
    font-family: $font-interface;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    transition: color 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -4px;
      left: 0;
      background-color: #000;
      transition: width 0.3s ease;
    }

    &:hover,
    &.router-link-active {
      color: #000;

      &::after {
        width: 100%;
      }
    }
  }

  .nav-cta {
    padding: 10px 24px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: $font-interface;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: $border-radius-md;
    transition: all 0.3s ease;

    &:hover {
      background-color: #333;
      transform: translateY(-1px);
    }
  }
}

/* Mobile Menu Button */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 102;

  @media (max-width: 768px) {
    display: block;
  }

  .hamburger-box {
    width: 24px;
    height: 24px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -1px;
    width: 24px;
    height: 2px;
    background-color: #000;
    position: absolute;
    transition: transform 0.15s ease;

    &::before,
    &::after {
      content: "";
      display: block;
      width: 24px;
      height: 2px;
      background-color: #000;
      position: absolute;
      transition: transform 0.15s ease;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }
  }

  &[aria-expanded="true"] .hamburger-inner {
    background-color: transparent;

    &::before {
      transform: translateY(8px) rotate(45deg);
    }

    &::after {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mobile-nav-content {
  text-align: center;
  padding: 20px;
}

.mobile-menu-logo {
  max-width: 120px;
  margin-bottom: 40px;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;

  .mobile-nav-link {
    font-family: $font-principal; // Use the fancy font for mobile menu items for impact
    font-size: 32px;
    color: #000;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s;

    &:hover {
      color: #666;
    }
  }

  .mobile-nav-cta {
    display: inline-block;
    margin-top: 20px;
    padding: 15px 40px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: $font-interface;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 16px;
    border-radius: $border-radius-md;
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
