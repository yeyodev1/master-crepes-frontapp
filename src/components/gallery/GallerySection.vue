<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const images = [
  { id: 'mptkhqdndpean4zqgr5u', alt: 'Master Crepes' },
  { id: 'ptr3b2rjbcmsqlyddugb', alt: 'Master Crepes Chef' },
  { id: 'ca7urdlgsvpkgihrpz8c', alt: 'Master Crepes' },
  { id: 'h9hwzdzuykxqkpv5bjsg', alt: 'Master Crepes' },
  { id: 'hwgjvosurnqw5vojbymd', alt: 'Master Crepes Dubai Crepe' },
  { id: 'igb7sjxkks0j1wc4mpqh', alt: 'Master Crepes Savory' },
  { id: 'j6zm9eoo7u83ulmaxoay', alt: 'Master Crepes' },
  { id: 'mqu9ryomaxlrdaoav1lv', alt: 'Master Crepes' },
  { id: 'rc3l678iqyltpcxmc7jk', alt: 'Master Crepes Cone' },
  { id: 'orgwueu4nkgvfynbes1x', alt: 'Master Crepes Cone' },
  { id: 'lwgubwpfdefdq6jkrwyo', alt: 'Master Crepes Cone' },
  { id: 'qt5byb1l8jjbuo3xduqw', alt: 'Master Crepes Cone' },
  { id: 'tb3icvc0a5fkkuqodf6u', alt: 'Master Crepes' },
  { id: 'uzissx5jq5o98lghdvxn', alt: 'Master Crepes' },
  { id: 'xmltr5uqtazbh4rkb841', alt: 'Master Crepes' },
  { id: 'xcta6t5jz1sgn5vibrwv', alt: 'Master Crepes Chef' },
  { id: 'vkyouxdrxgfzcqsiroiv', alt: 'Master Crepes' },
  { id: 'brietjvbc5fjag6jhspt', alt: 'Master Crepes' },
  { id: 'gyaklmzoysyc3s2n4bgm', alt: 'Master Crepes Catering' },
  { id: 'yir8fptysnwpvibysetj', alt: 'Master Crepes Chef' },
  { id: 'g1tnrigefm5xqowcobbm', alt: 'Master Crepes Gelato' },
  { id: 'iwxqxedkussjaugfjznf', alt: 'Master Crepes Gelato' },
  { id: 'mipgntgt8cispclcup0x', alt: 'Master Crepes Gelato' },
];

const cloudUrl = (id: string) =>
  `https://res.cloudinary.com/dpjzfua3n/image/upload/master-crepes/${id}.jpg`;

const lightboxIndex = ref<number | null>(null);

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
  lightboxIndex.value = (lightboxIndex.value - 1 + images.length) % images.length;
};

const next = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % images.length;
};

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
};
</script>

<template>
  <section class="gallery-section" @keydown="handleKey" tabindex="-1">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="eyebrow">{{ t('gallery.eyebrow') }}</span>
        <h1 class="title">{{ t('gallery.title') }}</h1>
        <p class="subtitle">{{ t('gallery.subtitle') }}</p>
      </div>

      <div class="grid">
        <div
          v-for="(img, i) in images"
          :key="img.id"
          class="grid-item"
          data-aos="fade-up"
          :data-aos-delay="(i % 4) * 80"
          @click="openLightbox(i)"
        >
          <img :src="cloudUrl(img.id)" :alt="img.alt" loading="lazy" />
          <div class="overlay">
            <i class="fas fa-expand"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <button class="lb-arrow lb-prev" @click="prev" aria-label="Previous">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="lb-img-wrap">
          <img
            :src="cloudUrl(images[lightboxIndex].id)"
            :alt="images[lightboxIndex].alt"
          />
        </div>
        <button class="lb-arrow lb-next" @click="next" aria-label="Next">
          <i class="fas fa-chevron-right"></i>
        </button>
        <p class="lb-counter">{{ lightboxIndex + 1 }} / {{ images.length }}</p>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.gallery-section {
  padding: 100px 0;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;

  .eyebrow {
    @include interface-font(600);
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: #d4af37;
    text-transform: uppercase;
    display: block;
    margin-bottom: 15px;
  }

  .title {
    @include heading-font(400);
    font-size: 3.5rem;
    color: #000;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .subtitle {
    @include body-font(400);
    color: #666;
    font-size: 1.1rem;
    max-width: 560px;
    margin: 0 auto;
  }
}

.grid {
  columns: 3;
  column-gap: 16px;

  @media (max-width: 900px) {
    columns: 2;
  }
  @media (max-width: 540px) {
    columns: 1;
  }
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  break-inside: avoid;
  margin-bottom: 16px;

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.4s ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    i {
      color: #fff;
      font-size: 1.6rem;
    }
  }

  &:hover {
    img {
      transform: scale(1.06);
    }
    .overlay {
      opacity: 1;
    }
  }
}

// Lightbox
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-img-wrap {
  max-width: 90vw;
  max-height: 85vh;

  img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
  }
}

.lb-close {
  position: fixed;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  z-index: 1000;
  padding: 8px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
}

.lb-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1.2rem;
  padding: 14px 18px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  z-index: 1000;

  &:hover { background: rgba(255, 255, 255, 0.2); }

  &.lb-prev { left: 20px; }
  &.lb-next { right: 20px; }
}

.lb-counter {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  @include interface-font(400);
}
</style>
