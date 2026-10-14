<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue';
import WelcomeSection from '@/components/home/WelcomeSection.vue';
import MenuHighlights from '@/components/home/MenuHighlights.vue';
import CateringTeaser from '@/components/home/CateringTeaser.vue';
import HomeFaq from '@/components/home/HomeFaq.vue';

// Future components will be imported here
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <WelcomeSection />
    <MenuHighlights />
    <CateringTeaser />
    <HomeFaq />
    
    <!-- Content sections will follow here -->
    <!-- Ideally: Best Sellers carousel, Instagram Feed -->
  </div>
</template>

<style lang="scss" scoped>
// Page specific styles can go here</style>
