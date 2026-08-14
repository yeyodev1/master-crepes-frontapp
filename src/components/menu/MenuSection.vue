<script setup lang="ts">
// MenuSection.vue
// Full 2026 menu. All copy/prices live in src/locales/*.json under `menuPage`.
import { computed, ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

interface MenuVariant { label: string; price: string }
interface MenuItem { name: string; desc?: string; price?: string; variants?: MenuVariant[] }
interface MenuSectionData { id: string; group: string; title: string; note?: string; items: MenuItem[] }
interface MenuGroup { id: string; label: string }

const { t, locale, getLocaleMessage } = useI18n();

const ORDER_URL = 'https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106';
const PDF_URL = '/menu/master-crepes-menu-2026.pdf';

const menu = computed(() => getLocaleMessage(locale.value).menuPage as unknown as {
  groups: MenuGroup[];
  notes: string[];
  sections: MenuSectionData[];
});

const activeGroup = ref('all');

const visibleSections = computed(() =>
  activeGroup.value === 'all'
    ? menu.value.sections
    : menu.value.sections.filter((s) => s.group === activeGroup.value)
);

// Structured data so search engines and LLMs can read the menu
const jsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Master Crepes Menu 2026',
  inLanguage: locale.value,
  url: 'https://www.themastercrepes.com/menu',
  hasMenuSection: menu.value.sections.map((section) => ({
    '@type': 'MenuSection',
    name: section.title,
    hasMenuItem: section.items.map((item) => ({
      '@type': 'MenuItem',
      name: item.name,
      ...(item.desc ? { description: item.desc } : {}),
      offers: (item.variants ?? [{ label: '', price: item.price ?? '' }])
        .filter((v) => v.price)
        .map((v) => ({
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: v.price.replace(/[^0-9.]/g, ''),
          ...(v.label ? { name: v.label } : {}),
        })),
    })),
  })),
}));

// Injected into <head> rather than rendered in-template: Vue strips <script> from templates
const JSON_LD_ID = 'menu-jsonld';
watchEffect(() => {
  if (typeof document === 'undefined') return;
  let el = document.getElementById(JSON_LD_ID);
  if (!el) {
    el = document.createElement('script');
    el.id = JSON_LD_ID;
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = jsonLd.value;
});

const isSticky = ref(false);
const handleScroll = () => {
  isSticky.value = window.scrollY > 320;
};
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.getElementById(JSON_LD_ID)?.remove();
});
</script>

<template>
  <div class="menu-page">
    <section class="menu-hero">
      <div class="container">
        <span class="eyebrow">{{ t('menuPage.hero.eyebrow') }}</span>
        <h1 class="title">{{ t('menuPage.hero.title') }}</h1>
        <p class="subtitle">{{ t('menuPage.hero.subtitle') }}</p>
        <div class="hero-actions">
          <a :href="ORDER_URL" target="_blank" rel="noopener" class="btn btn-primary">
            {{ t('menuPage.hero.order') }}
          </a>
          <a :href="PDF_URL" target="_blank" rel="noopener" class="btn btn-ghost">
            {{ t('menuPage.hero.download') }}
          </a>
        </div>
      </div>
    </section>

    <nav :class="['group-nav', { 'is-sticky': isSticky }]" aria-label="Menu categories">
      <div class="container group-nav-inner">
        <button
          v-for="group in menu.groups"
          :key="group.id"
          type="button"
          :class="['group-btn', { 'is-active': activeGroup === group.id }]"
          @click="activeGroup = group.id"
        >
          {{ group.label }}
        </button>
      </div>
    </nav>

    <section class="menu-body">
      <div class="container">
        <div
          v-for="section in visibleSections"
          :key="section.id"
          :id="section.id"
          class="menu-section"
        >
          <header class="section-head">
            <h2 class="section-title">{{ section.title }}</h2>
            <p v-if="section.note" class="section-note">{{ section.note }}</p>
          </header>

          <ul class="items">
            <li v-for="item in section.items" :key="item.name" class="item">
              <div class="item-head">
                <h3 class="item-name">{{ item.name }}</h3>
                <span v-if="item.price" class="item-price">{{ item.price }}</span>
              </div>
              <p v-if="item.desc" class="item-desc">{{ item.desc }}</p>
              <ul v-if="item.variants" class="variants">
                <li v-for="variant in item.variants" :key="variant.label" class="variant">
                  <span class="variant-label">{{ variant.label }}</span>
                  <span class="variant-price">{{ variant.price }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <footer class="menu-notes">
          <p v-for="note in menu.notes" :key="note">{{ note }}</p>
        </footer>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

$gold: #d4af37;

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------------- Hero ---------------- */
.menu-hero {
  padding: 160px 0 70px;
  background-color: #0f0f0f;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 130px 0 50px;
  }

  .eyebrow {
    @include interface-font(600);
    display: block;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: $gold;
    margin-bottom: 15px;
  }

  .title {
    @include heading-font(400);
    font-size: 3.5rem;
    margin-bottom: 18px;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }

  .subtitle {
    @include body-font(400);
    color: #cfcfcf;
    font-size: 1.1rem;
    max-width: 640px;
    margin: 0 auto 32px;
  }
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  @include interface-font(600);
  display: inline-block;
  padding: 14px 30px;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: $border-radius-md;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: $gold;
  color: #0f0f0f;
  border: 2px solid $gold;

  &:hover {
    background-color: transparent;
    color: $gold;
  }
}

.btn-ghost {
  background-color: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.4);

  &:hover {
    border-color: $gold;
    color: $gold;
  }
}

/* ---------------- Category nav ---------------- */
.group-nav {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  z-index: 90;

  &.is-sticky {
    position: sticky;
    top: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
}

.group-nav-inner {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-top: 14px;
  padding-bottom: 14px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.group-btn {
  @include interface-font(600);
  flex: 0 0 auto;
  padding: 10px 20px;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #555;
  background: transparent;
  border: 1px solid #e2e2e2;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: $gold;
    color: #000;
  }

  &.is-active {
    background-color: #0f0f0f;
    border-color: #0f0f0f;
    color: #fff;
  }
}

/* ---------------- Menu body ---------------- */
.menu-body {
  padding: 60px 0 90px;
  background-color: #fff;
}

.menu-section {
  margin-bottom: 60px;
  scroll-margin-top: 90px;
}

.section-head {
  border-bottom: 2px solid #0f0f0f;
  padding-bottom: 12px;
  margin-bottom: 30px;
}

.section-title {
  @include heading-font(400);
  font-size: 2.1rem;
  color: #0f0f0f;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
}

.section-note {
  @include body-font(400);
  margin-top: 8px;
  color: #777;
  font-size: 0.92rem;
  line-height: 1.6;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 50px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
}

.item-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.item-name {
  @include interface-font(600);
  font-size: 1.05rem;
  color: #0f0f0f;
}

.item-head::after {
  content: '';
  flex: 1;
  border-bottom: 1px dotted #d5d5d5;
  transform: translateY(-4px);
}

.item-price {
  @include interface-font(600);
  order: 3;
  color: $gold;
  font-size: 1.05rem;
  white-space: nowrap;
}

.item-desc {
  @include body-font(400);
  margin-top: 6px;
  color: #666;
  font-size: 0.93rem;
  line-height: 1.6;
}

.variants {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.variant {
  @include interface-font(500);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background-color: #f7f7f7;
  border-radius: 999px;
  font-size: 0.78rem;
}

.variant-label {
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.variant-price {
  color: #0f0f0f;
  font-weight: 700;
}

.menu-notes {
  border-top: 1px solid #eee;
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 30px;

  p {
    @include body-font(400);
    color: #999;
    font-size: 0.82rem;
  }
}
</style>
