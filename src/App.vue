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
      <RouterView v-slot="{ Component }">
        <Transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
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

// Page Transition Effects
// "Scroll from bottom to top" feel
.page-slide-enter-active,
.page-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateY(20px); // Starts slightly below
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px); // Exits slightly above to continue the flow
}
</style>