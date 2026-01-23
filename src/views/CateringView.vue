<script setup lang="ts">
import CateringHero from '@/components/catering/CateringHero.vue';
import CateringInfo from '@/components/catering/CateringInfo.vue';
import CateringForm from '@/components/catering/CateringForm.vue';
</script>

<template>
  <div class="catering-view">
    <CateringHero />
    <CateringInfo />
    <CateringForm />
  </div>
</template>

<style lang="scss" scoped>
.catering-view {
  width: 100%;
}
</style>
