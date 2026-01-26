<script setup lang="ts">
// FranchiseHero.vue
// High impact visual introduction for the Franchises page
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="franchise-hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content" data-aos="fade-up">
      <h1 class="hero-title">{{ t('franchises.hero.title') }}</h1>
      <div class="separator"></div>
      <p class="hero-subtitle">{{ t('franchises.hero.subtitle') }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.franchise-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // Using scraped banner image
  background-image: url('https://www.themastercrepes.com/wp-content/uploads/2024/10/The-master-crepes-fracnchises-banner-scaled.webp');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Dark overlay for text contrast
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 0 20px;
}

.hero-title {
  @include heading-font(400);
  font-size: 4rem;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.separator {
  width: 80px;
  height: 4px;
  background-color: #d4af37; // Gold
  margin: 0 auto 20px;
}

.hero-subtitle {
  @include body-font(300);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  opacity: 0.9;
}
</style>
