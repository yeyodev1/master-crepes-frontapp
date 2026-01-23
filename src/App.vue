<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheTopBar from '@/components/layout/TheTopBar.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
</script>

<template>
  <div class="app-layout">
    <TheTopBar />
    <TheHeader />
    
    <main>
      <RouterView />
    </main>
    
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
// App-wide layout styles can go here if needed
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>