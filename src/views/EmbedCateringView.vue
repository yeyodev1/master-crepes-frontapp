<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import CateringForm from '@/components/catering/CateringForm.vue';

// Lets the host page resize the iframe to fit the form
let observer: ResizeObserver | null = null;

const postHeight = () => {
  window.parent?.postMessage(
    { type: 'mastercrepes:embed-height', height: document.documentElement.scrollHeight },
    '*'
  );
};

onMounted(() => {
  observer = new ResizeObserver(postHeight);
  observer.observe(document.body);
  postHeight();
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div class="embed-catering">
    <CateringForm />
  </div>
</template>

<style lang="scss" scoped>
.embed-catering {
  width: 100%;

  :deep(.catering-form-section) {
    padding: 24px 0;
  }
}
</style>
