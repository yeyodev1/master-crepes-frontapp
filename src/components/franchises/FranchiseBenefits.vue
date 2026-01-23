<script setup lang="ts">
// FranchiseBenefits.vue
// Details the "Why" and "What" of franchising with Master Crepes
</script>

<template>
  <section class="franchise-benefits">
    
    <!-- Section 1: Why Master Crepes -->
    <div class="benefit-block">
      <div class="container">
        <div class="grid-layout">
          <div class="text-col" data-aos="fade-right">
            <span class="eyebrow">A PROVEN MODEL</span>
            <h2 class="section-title">Why Master Crepes?</h2>
            <p class="section-text">
              A proven model for success. At Master Crepes, we offer more than just delicious crepes: 
              we provide the opportunity to be part of a growing and solid brand.
            </p>
            <p class="section-text">
              With a proven system, continuous support, and an irresistible product, 
              we help you achieve your business goals while delighting your customers.
            </p>
          </div>
          <div class="image-col">
            <div class="image-grid">
              <img src="https://www.themastercrepes.com/wp-content/uploads/2024/10/The-master-crepes-fracnchises-img-1.webp" alt="Franchise Detail" class="grid-item item-1">
              <img src="https://www.themastercrepes.com/wp-content/uploads/2024/10/The-master-crepes-fracnchises-img-2.webp" alt="Franchise Detail" class="grid-item item-2">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Everything you need -->
    <div class="benefit-block alt-bg">
      <div class="container">
        <div class="grid-layout reverse-desktop">
          <div class="image-col">
            <div class="image-grid single-focus">
               <img src="https://www.themastercrepes.com/wp-content/uploads/2024/10/The-master-crepes-fracnchises-img-3.webp" alt="Franchise Support" class="grid-item main-focus">
            </div>
          </div>
          <div class="text-col" data-aos="fade-left">
            <span class="eyebrow">FULL SUPPORT</span>
            <h2 class="section-title">Everything you need to succeed</h2>
            <p class="section-text">
              As a Master Crepes franchisee, you'll receive a comprehensive package including 
              initial training, operational support, marketing strategies, and access to reliable suppliers.
            </p>
            <p class="section-text">
              Our team is with you every step of the way to ensure your franchise thrives.
            </p>
            
            <ul class="benefit-list">
              <li>Detailed Operations Manual</li>
              <li>Site Selection Assistance</li>
              <li>Marketing & Social Media Support</li>
              <li>Ongoing Training</li>
            </ul>
             <div class="action-wrapper">
                <a href="#franchise-form" class="cta-link">Start Your Journey &darr;</a>
             </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.franchise-benefits {
  background-color: #fff;
}

.benefit-block {
  padding: 100px 0;

  &.alt-bg {
    background-color: #f9f9f9;
  }
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

    &.reverse-desktop {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}

.text-col {
  padding: 20px;
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
}

.benefit-list {
  list-style: none;
  padding: 0;
  margin: 30px 0;

  li {
    @include interface-font(500);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    color: #333;

    &::before {
      content: '✓';
      color: #d4af37;
      margin-right: 12px;
      font-weight: bold;
    }
  }
}

.action-wrapper {
  margin-top: 30px;
}

.cta-link {
  @include interface-font(600);
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 4px;
  transition: all 0.3s;

  &:hover {
    background-color: #d4af37;
    color: #fff;
    border-bottom-color: transparent;
    padding: 4px 8px;
  }
}

// Image Styles
.image-col {
  position: relative;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 50px);
  gap: 15px;

  &.single-focus {
    display: block;

    .main-focus {
      width: 100%;
      height: auto;
      border-radius: 2px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  }
}

.grid-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.item-1 {
  grid-column: 1 / 9;
  grid-row: 1 / 8;
  z-index: 1;
}

.item-2 {
  grid-column: 6 / 13;
  grid-row: 5 / 12;
  z-index: 2;
  border: 5px solid #fff;
}
</style>
