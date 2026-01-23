<script setup lang="ts">
import FranchiseHero from '@/components/franchises/FranchiseHero.vue';
import FranchiseBenefits from '@/components/franchises/FranchiseBenefits.vue';
import FranchiseForm from '@/components/franchises/FranchiseForm.vue';
</script>

<template>
  <div class="franchises-view">
    <FranchiseHero />
    <FranchiseBenefits />
    <FranchiseForm />
  </div>
</template>

<style lang="scss" scoped>
// View specific styles
.franchises-view {
  width: 100%;
}
</style>
