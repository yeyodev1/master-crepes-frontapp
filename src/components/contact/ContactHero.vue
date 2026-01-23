<script setup lang="ts">
// ContactHero.vue
// Visual header for the contact page
</script>

<template>
  <section class="contact-hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content" data-aos="fade-up">
      <h1 class="hero-title">Contact Us</h1>
      <div class="separator"></div>
      <p class="hero-subtitle">We'd love to hear from you</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.contact-hero {
  position: relative;
  height: 50vh;
  min-height: 350px;
  max-height: 500px;
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
  background-image: url('https://www.themastercrepes.com/wp-content/uploads/2024/11/the-master-crepes-banner-contac-scaled.webp');
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
  background-color: rgba(0, 0, 0, 0.5); // Dark overlay
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
  font-size: 3.5rem;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
}

.separator {
  width: 60px;
  height: 3px;
  background-color: #d4af37;
  margin: 0 auto 20px;
}

.hero-subtitle {
  @include body-font(300);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  opacity: 0.9;
}
</style>
