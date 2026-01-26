<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { locale } = useI18n();

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  },
});

const toggleLanguage = () => {
  currentLocale.value = currentLocale.value === 'en' ? 'es' : 'en';
};
</script>

<template>
  <button 
    class="language-switcher" 
    @click="toggleLanguage"
    aria-label="Toggle Language"
  >
    <div class="track">
      <div class="slider" :class="{ 'is-es': currentLocale === 'es' }"></div>
      <span class="label en" :class="{ 'active': currentLocale === 'en' }">EN</span>
      <span class="label es" :class="{ 'active': currentLocale === 'es' }">ES</span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.language-switcher {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
  -webkit-tap-highlight-color: transparent;

  &:hover .track {
    border-color: #000;
  }
}

.track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 64px;
  height: 32px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 2px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 26px;
  background-color: #000;
  border-radius: 50%;
  /* visual fix for pill shape if needed, actually rounded rect matches better */
  border-radius: 16px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;

  &.is-es {
    transform: translateX(30px);
  }
}

.label {
  position: relative;
  z-index: 2;
  font-family: $font-interface;
  font-size: 11px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  color: #999;
  transition: color 0.3s ease;
  user-select: none;
  pointer-events: none; // Let clicks pass to button

  &.active {
    color: #fff;
  }
}
</style>
