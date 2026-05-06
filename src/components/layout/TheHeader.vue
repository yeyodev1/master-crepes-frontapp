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
  { name: t('nav.restaurante'), path: '/restaurante' },
  { name: t('nav.catering'), path: '/catering' },
  { name: t('nav.gallery'), path: '/gallery' },
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
        <img :src="logoMobile"  alt="Master Crepes" class="logo mobile-logo" />
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

    </div>

    <!-- Mobile Navigation Overlay (teleported to body so backdrop-filter on .header doesn't trap fixed positioning) -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="isMenuOpen" class="mobile-nav-overlay">
          <button
            type="button"
            class="mobile-nav-close"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <span class="x-icon" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
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
    </Teleport>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

/* =========================================================
   Header — mobile first, desktop nav unlocks at >=1024px
   ========================================================= */

.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  transition: padding 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);

  &.is-scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8px 14px;
  min-height: 60px;
  gap: 8px;
  box-sizing: border-box;

  @media (min-width: 480px) { padding: 10px 18px; min-height: 64px; }
  @media (min-width: 768px) { padding: 14px 24px; min-height: 76px; }
  @media (min-width: 1024px) { padding: 14px 28px; min-height: 80px; }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 102;
  flex-shrink: 1;
  min-width: 0;
}

.logo {
  display: block;
  width: auto;
  max-width: 100%;
  transition: transform 0.3s ease;

  &:hover { transform: scale(1.02); }
}

/* Mobile-first: vertical logo on phones/tablets, horizontal on desktop */
.desktop-logo {
  display: none;

  @media (min-width: 1024px) {
    display: block;
    height: 50px;
  }
}

.mobile-logo {
  display: block;
  height: 40px;

  @media (min-width: 480px) { height: 44px; }
  @media (min-width: 768px) { height: 52px; }
  @media (min-width: 1024px) { display: none; }
}

/* =========================================================
   Desktop nav — only at >=1024px to avoid wrap on tablets
   ========================================================= */

.desktop-nav {
  display: none;

  @media (min-width: 1024px) {
    display: block;
    flex: 1 1 auto;
    min-width: 0;
  }

  .nav-list {
    display: flex;
    gap: 18px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: nowrap;

    @media (min-width: 1200px) { gap: 26px; }
    @media (min-width: 1360px) { gap: 32px; }
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-family: $font-interface;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    transition: color 0.3s ease;

    @media (min-width: 1200px) { font-size: 14px; }

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

      &::after { width: 100%; }
    }
  }

  .nav-cta {
    padding: 9px 18px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: $font-interface;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: $border-radius-md;
    white-space: nowrap;
    transition: all 0.3s ease;

    @media (min-width: 1200px) { padding: 10px 22px; font-size: 13px; }

    &:hover {
      background-color: #333;
      transform: translateY(-1px);
    }
  }
}

/* =========================================================
   Mobile menu button — visible <1024px
   ========================================================= */

.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  margin: -10px;
  z-index: 102;

  @media (min-width: 1024px) {
    display: none;
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
    transition: transform 0.15s ease, background-color 0.15s ease;

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

    &::before { top: -8px; }
    &::after  { bottom: -8px; }
  }

  &[aria-expanded="true"] .hamburger-inner {
    background-color: transparent;

    &::before { transform: translateY(8px) rotate(45deg); }
    &::after  { transform: translateY(-8px) rotate(-45deg); }
  }
}

/* =========================================================
   Mobile nav overlay — full-screen, SCROLLABLE, dvh-safe
   ========================================================= */

.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 101;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.mobile-nav-close {
  position: fixed;
  top: 14px;
  right: 14px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  cursor: pointer;
  z-index: 103;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;

  @media (min-width: 480px) { top: 18px; right: 18px; }

  &:hover  { background: rgba(0, 0, 0, 0.08); }
  &:active { transform: scale(0.94); }

  .x-icon {
    position: relative;
    width: 18px;
    height: 18px;
    display: block;

    span {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 2px;
      background: #000;
      border-radius: 2px;
      margin-top: -1px;

      &:first-child { transform: rotate(45deg); }
      &:last-child  { transform: rotate(-45deg); }
    }
  }
}

.mobile-nav-content {
  box-sizing: border-box;
  min-height: 100%;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 80px 20px 28px; // space for header at top
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 18px;
}

.mobile-menu-logo {
  max-width: 80px;
  width: 100%;
  height: auto;
  margin: 0 0 8px 0;

  @media (min-height: 640px) { max-width: 96px;  margin-bottom: 16px; }
  @media (min-height: 760px) { max-width: 110px; margin-bottom: 24px; }
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (min-height: 640px) { gap: 16px; }
  @media (min-height: 760px) { gap: 20px; }

  > li { width: 100%; display: flex; justify-content: center; }

  .mobile-nav-link {
    font-family: $font-principal;
    font-size: 22px;
    line-height: 1.15;
    color: #000;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s;

    @media (min-height: 640px) { font-size: 26px; }
    @media (min-height: 760px) { font-size: 30px; }

    &:hover  { color: #666; }
    &.router-link-active { color: #d4af37; }
  }

  .mobile-nav-cta {
    display: inline-block;
    margin-top: 4px;
    padding: 11px 28px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: $font-interface;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 13px;
    border-radius: $border-radius-md;

    @media (min-height: 640px) {
      margin-top: 10px;
      padding: 13px 32px;
      font-size: 14px;
    }
    @media (min-height: 760px) {
      margin-top: 16px;
      padding: 15px 40px;
      font-size: 15px;
    }
  }

  .mobile-lang-switch { margin-top: 4px; }
}

/* =========================================================
   Transitions
   ========================================================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
