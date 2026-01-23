<script setup lang="ts">
// CateringTeaser.vue
// Highlights the catering service, a core business pillar
</script>

<template>
  <section class="catering-teaser">
    <div class="content-wrapper">
      <div class="text-content" data-aos="fade-up">
        <span class="eyebrow">PREMIUM SERVICES</span>
        <h2 class="title">Bring Paris to Your Event</h2>
        <p class="description">
          Elevate your weddings, corporate events, and private parties with our live crêpe stations. 
          We provide a sophisticated culinary show that your guests will never forget.
        </p>
        
        <ul class="features-list">
          <li>
            <span class="check">✓</span> Live Chef Stations
          </li>
          <li>
            <span class="check">✓</span> Sweet & Savory Menus
          </li>
          <li>
            <span class="check">✓</span> Customized Setup
          </li>
        </ul>

        <a href="/catering" class="cta-button">
          Get a Quote
        </a>
      </div>
    </div>
    
    <div class="image-bg"></div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.catering-teaser {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #f9f9f9; // Fallback

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 50%;
  padding: 80px;
  background-color: #fff;
  min-height: 600px;
  display: flex;
  align-items: center;

  // Create a diagonal cut or interesting shape overlap
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);

  @media (max-width: 1200px) {
    padding: 60px 40px;
    width: 60%;
  }

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
    clip-path: none;
    padding: 60px 20px;
    text-align: center;
  }
}

.text-content {
  max-width: 500px;

  @media (max-width: 900px) {
    margin: 0 auto;
  }
}

.eyebrow {
  @include interface-font(600);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: #888;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
}

.title {
  @include heading-font(400); // Abril
  font-size: 3rem;
  margin-bottom: 25px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.description {
  @include body-font(400);
  color: #555;
  margin-bottom: 35px;
  font-size: 1.1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;

  li {
    @include body-font(500);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    color: #333;

    @media (max-width: 900px) {
      justify-content: center;
    }
  }

  .check {
    color: #d4af37; // Gold
    font-weight: bold;
    margin-right: 15px;
    font-size: 1.2rem;
  }
}

.cta-button {
  display: inline-block;
  padding: 15px 40px;
  background-color: #000;
  color: #fff;
  @include interface-font(600);
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d4af37;
  }
}

.image-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%; // Overlap slightly with content
  height: 100%;
  background-image: url('https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home-img-4.webp');
  background-size: cover;
  background-position: center;
  z-index: 1;

  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    height: 400px;
  }
}
</style>
