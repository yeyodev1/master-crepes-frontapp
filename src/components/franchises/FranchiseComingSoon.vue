<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import FranchiseForm from './FranchiseForm.vue';

// FranchiseComingSoon.vue
// Informs users that the franchise program is a future plan
const { t } = useI18n();
</script>

<template>
  <div class="coming-soon-wrapper">
    <!-- Vision Section -->
    <section class="vision-section">
      <div class="container">
        <div class="content-box" data-aos="fade-up">
          <span class="badge">{{ t('franchises.coming_soon.badge') }}</span>
          <h2 class="title">{{ t('franchises.coming_soon.title') }}</h2>
          <p class="subtitle">{{ t('franchises.coming_soon.subtitle') }}</p>
          
          <div class="vision-grid">
            <div class="vision-item">
              <div class="icon-wrapper">
                <i class="fas fa-gem"></i>
              </div>
              <h3>{{ t('franchises.coming_soon.vision_title') }}</h3>
              <p>{{ t('franchises.coming_soon.vision_desc') }}</p>
            </div>
            
            <div class="vision-item">
              <div class="icon-wrapper">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>{{ t('franchises.coming_soon.support_title') }}</h3>
              <p>{{ t('franchises.coming_soon.support_p1') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Waiting List Form -->
    <FranchiseForm 
      :title="t('franchises.coming_soon.waiting_list_title')" 
      :subtitle="t('franchises.coming_soon.waiting_list_subtitle')"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.coming-soon-wrapper {
  background-color: #fff;
}

.vision-section {
  padding: 100px 0;
  text-align: center;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-box {
  max-width: 800px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  background-color: #d4af37;
  color: #000;
  @include interface-font(700);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 50px;
  margin-bottom: 30px;
}

.title {
  @include heading-font(400);
  font-size: 3.5rem;
  color: #000;
  margin-bottom: 25px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.subtitle {
  @include body-font(400);
  font-size: 1.25rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 50px;
}

.vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  text-align: left;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.vision-item {
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: $border-radius-md;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background-color: #000;
    color: #d4af37;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 12px;
    margin-bottom: 25px;
  }

  h3 {
    @include heading-font(400);
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #000;
  }

  p {
    @include body-font(400);
    color: #666;
    line-height: 1.6;
    font-size: 1rem;
  }
}
</style>
