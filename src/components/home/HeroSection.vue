<script setup lang="ts">
// HeroSection.vue
// High impact visual introduction using the brand's main imagery
</script>

<template>
  <section class="hero-section">
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>
    
    <div class="hero-content">
      <h1 class="hero-title animate-fade-up">
        <span class="d-block">The Art of</span>
        <span class="d-block text-gold">French Crepes</span>
      </h1>
      <p class="hero-subtitle animate-fade-up delay-1">
        Miami's Premier Crêpe Catering & Franchise Experience
      </p>
      
      <div class="hero-actions animate-fade-up delay-2">
        <a href="/catering" class="btn btn-primary">Book Catering</a>
        <a href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106" target="_blank" class="btn btn-outline">Order Online</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.hero-section {
  position: relative;
  height: 90vh; // Almost full height but showing a peek of next section
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // Using the scraped high-quality background image
  background-image: url('https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home.webp');
  background-size: cover;
  background-position: center;
  // Subtle zoom animation for life
  animation: zoomSlow 20s infinite alternate;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // Sophisticated gradient overlay: dark at bottom/center for text readability
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%),
    radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  max-width: 900px;
}

.hero-title {
  @include heading-font(400); // Abril Fatface
  font-size: clamp(3rem, 8vw, 6.5rem); // Responsive typography
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  .d-block {
    display: block;
  }

  .text-gold {
    color: #d4af37; // Gold accent for premium feel
    font-style: italic; // Utilizing the italic variant if available or simulated
  }
}

.hero-subtitle {
  @include body-font(300); // Montserrat Light
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 40px;
  letter-spacing: 0.05em;
  opacity: 0.9;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}

.btn {
  display: inline-block;
  padding: 16px 36px;
  font-family: $font-interface;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 180px;
  cursor: pointer;

  border-radius: $border-radius-md;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &-primary {
    background-color: #d4af37;
    color: #000; // Contrast on gold
    border: 2px solid #d4af37;

    &:hover {
      background-color: transparent;
      color: #d4af37;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }
  }

  &-outline {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;

    &:hover {
      background-color: #fff;
      color: #000;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
    }
  }
}

// Simple Entry Animations
.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.3s;
}

.delay-2 {
  animation-delay: 0.6s;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomSlow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}
</style>
