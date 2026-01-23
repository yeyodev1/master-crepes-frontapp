<script setup lang="ts">
// TheTopBar.vue
// Minimalist top bar for urgent actions (Order Now)
</script>

<template>
  <div class="top-bar">
    <div class="container">
      <p class="promo-text">Delicious Crepes & Catering Services</p>
      <a
        href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106"
        target="_blank"
        rel="noopener noreferrer"
        class="order-link"
      >
        ORDER NOW
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *; // Assuming global variables are available via index or we import what we need

.top-bar {
  background-color: #000; // Deep dark background for premium feel
  color: #fff;
  padding: 8px 0;
  font-family: $font-interface;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  z-index: 101;
  position: relative;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.promo-text {
  margin: 0;
  opacity: 0.8;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none; // Hide promo text on mobile to focus on action
  }
}

.order-link {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  padding-bottom: 2px;

  &:hover {
    color: #d4af37; // Gold color for accent/hover - placeholder, adjust to brand
    border-color: #d4af37;
  }
}
</style>
