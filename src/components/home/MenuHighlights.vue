<script setup lang="ts">
// MenuHighlights.vue
// Showcases the two main product pillars: Sweet & Savory
</script>

<template>
  <section class="menu-highlights">
    <div class="container">
      <div class="section-header text-center">
        <span class="eyebrow">OUR SPECIALTIES</span>
        <h2 class="title">The Perfect Balance</h2>
        <p class="subtitle">Whether you crave the sweetness of fresh fruits or the savory richness of gourmet cheese, we have a crêpe for you.</p>
      </div>

      <div class="cards-grid">
        <!-- Sweet Card -->
        <div class="menu-card sweet-card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-content">
            <h3 class="card-title">Sweet Crêpes</h3>
            <p class="card-desc">
              Indulge in our classic combinations featuring fresh strawberries, 
              bananas, Nutella, and our homemade whipped cream.
            </p>
            <ul class="highlight-list">
              <li>Classic Nutella</li>
              <li>Dulce de Leche</li>
              <li>Fresh Berries</li>
            </ul>
            <a href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106" target="_blank" class="card-link">Order Sweet</a>
          </div>
        </div>

        <!-- Savory Card -->
        <div class="menu-card savory-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-content">
            <h3 class="card-title">Savory Crêpes</h3>
            <p class="card-desc">
              Experience a full meal wrapped in a delicate buckwheat batter. 
              Featuring prosciutto, brie, smoked salmon, and fresh herbs.
            </p>
            <ul class="highlight-list">
              <li>Ham & Swiss</li>
              <li>Chicken Florentine</li>
              <li>Caprese</li>
            </ul>
            <a href="https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106" target="_blank" class="card-link">Order Savory</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Background element using the unused asset -->
    <div class="floated-bg">
      <img src="https://www.themastercrepes.com/wp-content/uploads/2024/10/Master-crepes-home-img-3-scaled.webp" alt="Fresh Ingredients">
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.menu-highlights {
  padding: 100px 0;
  background-color: #fff;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;

  .eyebrow {
    @include interface-font(600);
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    color: #d4af37;
    text-transform: uppercase;
    display: block;
    margin-bottom: 15px;
  }

  .title {
    @include heading-font(400);
    font-size: 3rem;
    margin-bottom: 20px;
    color: #000;
  }

  .subtitle {
    @include body-font(400);
    color: #666;
    font-size: 1.1rem;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.menu-card {
  background-color: #fcfcfc;
  padding: 50px;
  padding: 50px;
  border: 1px solid #eee;
  border-radius: $border-radius-md;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    border-color: #d4af37;

    .card-title {
      color: #d4af37;
    }
  }
}

.card-title {
  @include heading-font(400);
  font-size: 2.2rem;
  margin-bottom: 20px;
  transition: color 0.3s;
}

.card-desc {
  @include body-font(400);
  color: #555;
  margin-bottom: 25px;
  line-height: 1.7;
}

.highlight-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
  border-top: 1px solid #eee;
  padding-top: 20px;

  li {
    @include interface-font(500);
    color: #333;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '•';
      color: #d4af37;
      margin-right: 10px;
      font-size: 1.2rem;
    }
  }
}

.card-link {
  display: inline-block;
  @include interface-font(600);
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
  font-size: 0.9rem;
  letter-spacing: 0.1em;

  &:hover {
    color: #d4af37;
    border-color: #d4af37;
  }
}

// Background Decoration
.floated-bg {
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 600px;
  z-index: 1;
  opacity: 0.03; // Very subtle texture
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
