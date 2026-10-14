<script setup lang="ts">
// HomeFaq.vue
// Visible FAQ (local, family, catering, Spanish) + matching FAQPage structured data
import { computed, onUnmounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';

interface FaqItem { q: string; a: string }

const { t, tm, rt, locale } = useI18n();
const { lp } = useLocalePath();

const items = computed<FaqItem[]>(() =>
  (tm('home.faq.items') as unknown as { q: unknown; a: unknown }[]).map((item) => ({
    q: rt(item.q as Parameters<typeof rt>[0]),
    a: rt(item.a as Parameters<typeof rt>[0]),
  }))
);

const jsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: locale.value,
  mainEntity: items.value.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}));

// Injected into <head>: Vue strips <script> from templates
const JSON_LD_ID = 'faq-jsonld';
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
onUnmounted(() => document.getElementById(JSON_LD_ID)?.remove());
</script>

<template>
  <section class="home-faq" aria-labelledby="home-faq-title">
    <div class="container">
      <span class="eyebrow">{{ t('home.faq.eyebrow') }}</span>
      <h2 id="home-faq-title" class="section-title">{{ t('home.faq.title') }}</h2>
      <div class="separator"></div>

      <div class="faq-list">
        <details v-for="(item, i) in items" :key="i" class="faq-item" :open="i === 0">
          <summary>
            <h3 class="question">{{ item.q }}</h3>
            <i class="fas fa-plus icon" aria-hidden="true"></i>
          </summary>
          <p class="answer">{{ item.a }}</p>
        </details>
      </div>

      <RouterLink :to="lp('/catering')" class="faq-cta">{{ t('home.faq_cta') }}</RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.home-faq {
  padding: 100px 0;
  background-color: #fafafa;
}

.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.eyebrow {
  @include interface-font(600);
  font-size: 0.85rem;
  color: #d4af37;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
}

.section-title {
  @include heading-font(400);
  font-size: 3rem;
  color: #000;
  line-height: 1.1;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
}

.separator {
  width: 60px;
  height: 3px;
  background-color: #d4af37;
  margin: 0 auto 50px;
}

.faq-list {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-item {
  background: #fff;
  border: 1px solid #eee;
  border-radius: $border-radius-md;
  padding: 0 24px;
  transition: box-shadow 0.3s ease;

  &[open] {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

    .icon {
      transform: rotate(45deg);
    }
  }

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 0;

    &::-webkit-details-marker {
      display: none;
    }
  }
}

.question {
  @include interface-font(600);
  font-size: 1.05rem;
  color: #000;
  margin: 0;
}

.icon {
  color: #d4af37;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.answer {
  @include body-font(400);
  color: #555;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  padding-bottom: 22px;
}

.faq-cta {
  @include interface-font(600);
  display: inline-block;
  margin-top: 40px;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.9rem;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 5px;
  transition: color 0.3s;

  &:hover {
    color: #d4af37;
  }
}
</style>
