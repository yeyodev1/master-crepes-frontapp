<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const cafeIds = [
  '389A5178','389A5179','389A5189','389A5195','389A5196','389A5197','389A5198',
  '389A5203','389A5207','389A5234','389A5236','389A5239',
  '389A5279','389A5280','389A5281','389A5286','389A5287',
  '389A5291','389A5353',
];

const bebidasIds = [
  '389A5139','389A5142','389A5145','389A5147','389A5148','389A5149',
  '389A5214',
  '389A5246','389A5247','389A5249','389A5250','389A5253','389A5259',
  '389A5260','389A5261','389A5262','389A5263','389A5264','389A5265','389A5266',
  '389A5270','389A5272','389A5273','389A5275','389A5277','389A5278',
];

const cloudUrl = (folder: string, id: string) =>
  `https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/${folder}/${id}.jpg`;

type Tab = 'cafe' | 'bebidas';
const activeTab = ref<Tab>('cafe');

const images = computed(() =>
  activeTab.value === 'cafe'
    ? cafeIds.map(id => ({ id, url: cloudUrl('cafe', id) }))
    : bebidasIds.map(id => ({ id, url: cloudUrl('bebidas', id) }))
);

const lightboxIndex = ref<number | null>(null);
const activeImage = computed(() =>
  lightboxIndex.value !== null ? images.value[lightboxIndex.value] : null
);

const openLightbox = (i: number) => {
  lightboxIndex.value = i;
  document.body.style.overflow = 'hidden';
};
const closeLightbox = () => {
  lightboxIndex.value = null;
  document.body.style.overflow = '';
};
const prev = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + images.value.length) % images.value.length;
};
const next = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
};
const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
};

const setTab = (tab: Tab) => {
  activeTab.value = tab;
  lightboxIndex.value = null;
};
</script>

<template>
  <section class="restaurante-section" @keydown="handleKey" tabindex="-1">
    <div class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="eyebrow">{{ t('restaurante.eyebrow') }}</span>
        <h1 class="hero-title">{{ t('restaurante.hero.title') }}</h1>
        <p class="hero-subtitle">{{ t('restaurante.hero.subtitle') }}</p>
      </div>
    </div>

    <div class="container">
      <div class="tabs" role="tablist">
        <button
          role="tab"
          :aria-selected="activeTab === 'cafe'"
          :class="['tab', { active: activeTab === 'cafe' }]"
          @click="setTab('cafe')"
        >
          {{ t('restaurante.tab.cafe') }}
          <span class="count">{{ cafeIds.length }}</span>
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'bebidas'"
          :class="['tab', { active: activeTab === 'bebidas' }]"
          @click="setTab('bebidas')"
        >
          {{ t('restaurante.tab.bebidas') }}
          <span class="count">{{ bebidasIds.length }}</span>
        </button>
      </div>

      <div class="section-intro">
        <h2 v-if="activeTab === 'cafe'">{{ t('restaurante.cafe.title') }}</h2>
        <h2 v-else>{{ t('restaurante.bebidas.title') }}</h2>
        <p v-if="activeTab === 'cafe'">{{ t('restaurante.cafe.subtitle') }}</p>
        <p v-else>{{ t('restaurante.bebidas.subtitle') }}</p>
      </div>

      <div class="grid">
        <button
          v-for="(img, i) in images"
          :key="img.id"
          class="grid-item"
          @click="openLightbox(i)"
        >
          <img :src="img.url" :alt="img.id" loading="lazy" />
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="activeImage"
        class="lightbox"
        @click.self="closeLightbox"
      >
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">×</button>
        <button class="lightbox-nav prev" @click="prev" aria-label="Previous">‹</button>
        <img :src="activeImage.url" :alt="activeImage.id" class="lightbox-img" />
        <button class="lightbox-nav next" @click="next" aria-label="Next">›</button>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.restaurante-section {
  outline: none;
}

.hero {
  position: relative;
  height: 50vh;
  min-height: 360px;
  background-image: url('https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/cafe/389A5197.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.7));
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  max-width: 800px;
}

.eyebrow {
  display: inline-block;
  letter-spacing: 0.25em;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #d4af37;
  margin-bottom: 12px;
}

.hero-title {
  @include heading-font(400);
  font-size: clamp(2.4rem, 5vw, 4rem);
  margin: 0 0 14px 0;
}

.hero-subtitle {
  @include body-font(300);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  letter-spacing: 0.04em;
  opacity: 0.9;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
}

.tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.tab {
  background: transparent;
  border: 1.5px solid #d4af37;
  color: #333;
  padding: 12px 28px;
  border-radius: $border-radius-md;
  font-family: $font-interface;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  .count {
    background: #d4af37;
    color: #000;
    border-radius: 999px;
    padding: 2px 9px;
    font-size: 0.7rem;
    font-weight: 700;
  }

  &:hover {
    background: rgba(212, 175, 55, 0.08);
  }

  &.active {
    background: #d4af37;
    color: #000;
    box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);

    .count {
      background: #000;
      color: #d4af37;
    }
  }
}

.section-intro {
  text-align: center;
  margin-bottom: 36px;

  h2 {
    @include heading-font(400);
    font-size: clamp(1.6rem, 2.6vw, 2.2rem);
    margin: 0 0 8px 0;
    color: #1a1a1a;
  }

  p {
    color: #666;
    max-width: 560px;
    margin: 0 auto;
    font-size: 1rem;
    line-height: 1.6;
  }
}

.grid {
  columns: 3;
  column-gap: 16px;

  @media (max-width: 900px) { columns: 2; }
  @media (max-width: 540px) { columns: 1; }
}

.grid-item {
  display: block;
  width: 100%;
  break-inside: avoid;
  margin-bottom: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
  border-radius: $border-radius-md;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px);
    img { transform: scale(1.03); }
  }
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 92vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: $border-radius-md;
}

.lightbox-close,
.lightbox-nav {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover { background: rgba(255, 255, 255, 0.22); }
}

.lightbox-close {
  top: 20px;
  right: 20px;
}

.lightbox-nav.prev { left: 20px; top: 50%; transform: translateY(-50%); }
.lightbox-nav.next { right: 20px; top: 50%; transform: translateY(-50%); }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
