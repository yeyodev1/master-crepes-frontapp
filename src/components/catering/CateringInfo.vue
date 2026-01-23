<script setup lang="ts">
// CateringInfo.vue
// Explains the value proposition of the catering service
</script>

<template>
  <section class="catering-info">
    <div class="container">
      <div class="info-grid">
        <div class="text-content" data-aos="fade-right">
          <span class="eyebrow">UNFORGETTABLE MOMENTS</span>
          <h2 class="section-title">We Bring Paris to You</h2>
          <p class="section-text lead">
            A unique culinary experience that will delight your guests.
            Our live chef stations create an atmosphere of elegance and fun.
          </p>
          <p class="section-text">
            Whether it's a wedding, corporate gala, or an intimate private party, 
            Master Crepes offers a sophisticated menu of sweet and savory crêpes, 
            made to order with the freshest ingredients.
          </p>
          
          <div class="highlights">
             <div class="highlight-item">
               <span class="icon"><i class="fas fa-fire"></i></span>
               <h4>Live Stations</h4>
             </div>
             <div class="highlight-item">
               <span class="icon"><i class="fas fa-leaf"></i></span>
               <h4>Fresh Ingredients</h4>
             </div>
             <div class="highlight-item">
               <span class="icon"><i class="fas fa-star"></i></span>
               <h4>French Tradition</h4>
             </div>
          </div>
        </div>
        
        <div class="image-content" data-aos="fade-left">
           <div class="image-stack">
              <img src="https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home-img-4.webp" alt="Live Catering" class="img-main">
              <div class="img-accent"></div>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.catering-info {
  padding: 100px 0;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}

.eyebrow {
  @include interface-font(600);
  font-size: 0.85rem;
  color: #d4af37;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
}

.section-title {
  @include heading-font(400);
  font-size: 3rem;
  color: #000;
  margin-bottom: 30px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.section-text {
  @include body-font(400);
  color: #555;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.7;

  &.lead {
    color: #000;
    font-size: 1.25rem;
    font-weight: 500;
  }
}

.highlights {
  display: flex;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 20px;
  }
}

.highlight-item {
  text-align: center;

  .icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 10px;
  }

  h4 {
    @include interface-font(600);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.image-stack {
  position: relative;

  .img-main {
    width: 100%;
    height: auto;
    display: block;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    z-index: 2;
    position: relative;
  }

  .img-accent {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    border: 3px solid #d4af37;
    z-index: 1;
  }
}
</style>
