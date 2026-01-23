<script setup lang="ts">
// WelcomeSection.vue
// Introduction to the brand philosophy with side-by-side layout
</script>

<template>
  <section class="welcome-section">
    <div class="container">
      <div class="grid-layout">
        <div class="content-col" data-aos="fade-right">
          <span class="eyebrow">SINCE 2016</span>
          <h2 class="section-title">Welcome to <br>Master Crepes</h2>
          <div class="separator"></div>
          <p class="section-text">
            We are more than just a crêperie; we are an experience. Born from a passion 
            for authentic French culinary traditions, we bring the art of crêpe-making 
            directly to your event.
          </p>
          <p class="section-text">
            Using only the finest ingredients and time-honored techniques, every crêpe 
            is a masterpiece of flavor and texture, folded to perfection.
          </p>
          <a href="/about" class="text-link">Our Story &rarr;</a>
        </div>
        
        <div class="image-col">
          <div class="image-wrapper main-img">
            <img 
              src="https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home-img.webp" 
              alt="Making Crepes" 
              loading="lazy"
            >
          </div>
          <div class="image-wrapper secondary-img">
            <img 
              src="https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home-img2.webp" 
              alt="Plated Crepe Presentation" 
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.welcome-section {
  padding: 100px 0;
  background-color: #fff;
  overflow: hidden; // For floating elements
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}

.content-col {
  padding-right: 20px;

  @media (max-width: 900px) {
    text-align: center;
    padding-right: 0;
  }
}

.eyebrow {
  @include interface-font(600);
  font-size: 0.85rem;
  color: #d4af37; // Gold
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
}

.section-title {
  @include heading-font(400); // Abril Fatface
  font-size: 3.5rem;
  color: #000;
  line-height: 1.1;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
}

.separator {
  width: 60px;
  height: 3px;
  background-color: #d4af37;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
}

.section-text {
  @include body-font(400); // Montserrat
  color: #555;
  margin-bottom: 20px;
  font-size: 1.05rem;
  max-width: 480px;

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
}

.text-link {
  @include interface-font(600);
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.9rem;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 5px;
  transition: all 0.3s;

  &:hover {
    color: #d4af37;
    border-color: #000;
  }
}

// Image Composition
.image-col {
  position: relative;
  height: 600px;

  @media (max-width: 900px) {
    height: 500px;
  }
}

.image-wrapper {
  position: absolute;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.main-img {
  width: 70%;
  height: 80%;
  top: 0;
  right: 0;
  z-index: 1;
  border-radius: $border-radius-md;
}

.secondary-img {
  width: 50%;
  height: 45%;
  bottom: 0;
  left: 0;
  z-index: 2;
  border: 8px solid #fff; // Thick white border to separate from underlying image
  border-radius: $border-radius-md;
}
</style>
