<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// GiveawayHero.vue
// Hero banner for the "Win a Year of Free Crepes" landing page
const { t } = useI18n();

const heroImage = 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/crepes/389A5288.jpg';

const scrollToForm = () => {
  document.getElementById('giveaway-form')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <section class="giveaway-hero" :style="{ backgroundImage: `url(${heroImage})` }">
    <div class="overlay"></div>
    <div class="content">
      <span class="eyebrow">{{ t('giveaway.hero.eyebrow') }}</span>
      <h1 class="title">{{ t('giveaway.hero.title') }}</h1>
      <p class="subtitle">{{ t('giveaway.hero.subtitle') }}</p>
      <button class="cta" @click="scrollToForm">{{ t('giveaway.hero.cta') }}</button>
      <ul class="steps">
        <li><span>1</span>{{ t('giveaway.hero.step_1') }}</li>
        <li><span>2</span>{{ t('giveaway.hero.step_2') }}</li>
        <li><span>3</span>{{ t('giveaway.hero.step_3') }}</li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.giveaway-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 120px 20px 80px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85));
}

.content {
  position: relative;
  z-index: 1;
  max-width: 780px;
  color: #fff;
}

.eyebrow {
  @include interface-font(600);
  color: #d4af37;
  letter-spacing: 0.25em;
  font-size: 0.8rem;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
}

.title {
  @include heading-font(400);
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
}

.subtitle {
  @include body-font(400);
  font-size: 1.15rem;
  color: #ddd;
  margin-bottom: 35px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.cta {
  padding: 18px 45px;
  background-color: #d4af37;
  color: #000;
  border: none;
  border-radius: $border-radius-md;
  @include interface-font(600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
  }
}

.steps {
  list-style: none;
  padding: 0;
  margin: 55px 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 18px;
    text-align: left;
  }

  li {
    @include body-font(400);
    font-size: 0.95rem;
    color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    span {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 50%;
      border: 1px solid #d4af37;
      color: #d4af37;
      @include interface-font(600);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
