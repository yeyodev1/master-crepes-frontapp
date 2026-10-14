<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type Category = 'all' | 'crepes' | 'cafe' | 'bebidas';

const crepesIds = [
  '389A5157','389A5159','389A5166','389A5168','389A5177',
  '389A5288','389A5289','389A5292','389A5293','389A5295','389A5296',
  '389A5303','389A5305','389A5310','389A5314','389A5315',
  '389A5319','389A5321','389A5322','389A5329','389A5334',
  '389A5337','389A5338','389A5340','389A5343','389A5344','389A5347',
  '389A5348','389A5350','389A5366','389A5369','389A5370',
];

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

const allImages = [
  ...crepesIds.map(id => ({ id, category: 'crepes' as const, url: cloudUrl('crepes', id) })),
  ...cafeIds.map(id => ({ id, category: 'cafe' as const, url: cloudUrl('cafe', id) })),
  ...bebidasIds.map(id => ({ id, category: 'bebidas' as const, url: cloudUrl('bebidas', id) })),
];

const activeCategory = ref<Category>('all');

const images = computed(() =>
  activeCategory.value === 'all'
    ? allImages
    : allImages.filter(i => i.category === activeCategory.value)
);

const counts: Record<Category, number> = {
  all: allImages.length,
  crepes: crepesIds.length,
  cafe: cafeIds.length,
  bebidas: bebidasIds.length,
};

const lightboxIndex = ref<number | null>(null);
const activeImage = computed(() =>
  lightboxIndex.value !== null ? images.value[lightboxIndex.value] : null
);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
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

const setCategory = (c: Category) => {
  activeCategory.value = c;
  lightboxIndex.value = null;
};

const tabs: { key: Category; labelKey: string }[] = [
  { key: 'all',     labelKey: 'gallery.filter.all' },
  { key: 'crepes',  labelKey: 'gallery.filter.crepes' },
  { key: 'cafe',    labelKey: 'gallery.filter.cafe' },
  { key: 'bebidas', labelKey: 'gallery.filter.bebidas' },
];

const galleryJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Master Crepes Gallery',
  description: 'Photo gallery of Master Crepes — French crêpes, specialty coffee, and signature drinks at our Doral, Miami location.',
  url: 'https://www.themastercrepes.com/gallery',
  image: allImages.slice(0, 24).map(img => ({
    '@type': 'ImageObject',
    contentUrl: img.url,
    thumbnail: img.url,
    caption:
      img.category === 'crepes'
        ? 'Master Crepes – French crêpe creation'
        : img.category === 'cafe'
          ? 'Master Crepes – specialty coffee and latte art'
          : 'Master Crepes – signature drink and lemonade',
    creditText: 'Master Crepes',
    creator: { '@type': 'Organization', name: 'Master Crepes' },
    copyrightNotice: '© Master Crepes',
  })),
}));
</script>

<template>
  <section class="gallery-section" @keydown="handleKey" tabindex="-1">
    <component
      :is="'script'"
      type="application/ld+json"
      v-html="JSON.stringify(galleryJsonLd)"
    />

    <div class="container">
      <div class="section-header">
        <span class="eyebrow">{{ t('gallery.eyebrow') }}</span>
        <h1 class="title">{{ t('gallery.title') }}</h1>
        <p class="subtitle">{{ t('gallery.subtitle') }}</p>
      </div>

      <div class="filter-bar" role="tablist" :aria-label="t('gallery.filter.aria_label')">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          role="tab"
          :aria-selected="activeCategory === tab.key"
          :class="['filter-chip', { active: activeCategory === tab.key }]"
          @click="setCategory(tab.key)"
        >
          {{ t(tab.labelKey) }}
          <span class="count">{{ counts[tab.key] }}</span>
        </button>
      </div>

      <div class="grid">
        <button
          v-for="(img, i) in images"
          :key="img.category + '-' + img.id"
          class="grid-item"
          :aria-label="t(`alt.${img.category}`)"
          @click="openLightbox(i)"
        >
          <img :src="img.url" :alt="t(`alt.${img.category}`)" loading="lazy" />
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
        <img :src="activeImage.url" :alt="t(`alt.${activeImage.category}`)" class="lightbox-img" />
        <button class="lightbox-nav next" @click="next" aria-label="Next">›</button>
      </div>
    </Transition>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.gallery-section {
  padding: 80px 0 100px;
  background: #fafafa;
  outline: none;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 36px;

  .eyebrow {
    display: inline-block;
    letter-spacing: 0.25em;
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 12px;
  }

  .title {
    @include heading-font(400);
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    margin: 0 0 14px 0;
    color: #1a1a1a;
  }

  .subtitle {
    color: #666;
    font-size: 1.1rem;
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 36px;
}

.filter-chip {
  background: #fff;
  border: 1.5px solid #e2e2e2;
  color: #333;
  padding: 10px 22px;
  border-radius: 999px;
  font-family: $font-interface;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.78rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;

  .count {
    background: #f1f1f1;
    color: #555;
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 0.7rem;
    font-weight: 700;
  }

  &:hover {
    border-color: #d4af37;
    color: #1a1a1a;
  }

  &.active {
    background: #d4af37;
    border-color: #d4af37;
    color: #000;
    box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);

    .count {
      background: #000;
      color: #d4af37;
    }
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
