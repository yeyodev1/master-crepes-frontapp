<script setup lang="ts">
// TheFooter.vue
// Professional footer with site map and contact info
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-col brand-col">
          <h3 class="footer-logo-text">Master Crepes</h3>
          <p class="brand-desc">
            Authentic French expertise available for catering and franchises. 
            Taste the difference of true craftsmanship.
          </p>
          <div class="social-links">
            <a href="https://www.instagram.com/mastercrepesdoral/" target="_blank" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/mastercrepes1/?locale=es_LA" target="_blank" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer-col nav-col">
          <h4>Explore</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/catering">Catering</RouterLink></li>
            <li><RouterLink to="/franchises">Franchises</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-col services-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Wedding Catering</a></li>
            <li><a href="#">Corporate Events</a></li>
            <li><a href="#">Private Parties</a></li>
            <li><a href="#">Order Online</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col contact-col">
          <h4>Contact Us</h4>
          <address>
            <p>Miami, Florida</p>
            <p><a href="tel:+13050000000">(305) 555-0123</a></p>
            <p><a href="mailto:info@themastercrepes.com">info@themastercrepes.com</a></p>
          </address>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Master Crepes. All rights reserved.</p>
        <p class="designer-credit">
          Developed by <a href="https://yeyo.dev/" target="_blank" rel="noopener">YeyoDev</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.site-footer {
  background-color: #111; // Almost black
  color: #fff;
  padding: 80px 0 30px;
  font-family: $font-interface;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.footer-logo-text {
  font-family: $font-principal; // Abril Fatface
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #fff;
}

.brand-desc {
  color: #999;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
    transition: all 0.3s;

    &:hover {
      background-color: #d4af37;
      border-color: #d4af37;
      color: #000;
    }
  }
}

h4 {
  font-family: $font-interface;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.9rem;
  margin-bottom: 25px;
  color: #d4af37; // Gold accent
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;

    a {
      color: #aaa;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #fff;
      }
    }
  }
}

address {
  font-style: normal;
  color: #aaa;

  p {
    margin-bottom: 12px;
  }

  a {
    color: #aaa;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.85rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .designer-credit {
    font-size: 0.8rem;

    a {
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s;

      &:hover {
        color: #d4af37;
      }
    }
  }
}
</style>
