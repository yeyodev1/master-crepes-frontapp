<script setup lang="ts">
import FranchiseHero from '@/components/franchises/FranchiseHero.vue';
import FranchiseComingSoon from '@/components/franchises/FranchiseComingSoon.vue';
</script>

<template>
  <div class="franchises-view">
    <FranchiseHero />
    <FranchiseComingSoon />
  </div>
</template>

<style lang="scss" scoped>
// View specific styles
.franchises-view {
  width: 100%;
}
</style>
