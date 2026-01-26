<script setup lang="ts">
// ContactInfo.vue
// Displays contact details and Google Maps embed
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="contact-info">
    <div class="info-content">
      <h2 class="section-title">{{ t('contact.info.title') }}</h2>
      
      <div class="info-group">
        <h3>{{ t('contact.info.address_title') }}</h3>
        <p>
          3905 NW 107th Ave, Suite 106<br>
          Doral, FL 33178
        </p>
        <a 
          href="https://maps.google.com/?q=3905+NW+107th+Ave+Suite+106+Doral+FL+33178" 
          target="_blank" 
          class="map-link"
        >
          {{ t('contact.info.directions') }} &rarr;
        </a>
      </div>

      <div class="info-group">
        <h3>{{ t('contact.info.follow_title') }}</h3>
        <p>{{ t('contact.info.follow_desc') }}</p>
        <div class="social-links">
           <a href="https://www.instagram.com/themastercrepes/" target="_blank" aria-label="Instagram">Instagram</a>
           <a href="https://www.facebook.com/themastercrepes" target="_blank" aria-label="Facebook">Facebook</a>
           <a href="#" aria-label="TikTok">TikTok</a>
        </div>
      </div>
      
      <div class="info-group">
        <h3>{{ t('contact.info.hours_title') }}</h3>
        <p>{{ t('contact.info.hours_desc') }}</p>
      </div>
    </div>

    <div class="map-container">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.247844038165!2d-80.36979692357736!3d25.81177650582264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b96434440023%3A0x6a1f1b6a3b6a3b6a!2s3905%20NW%20107th%20Ave%20%23106%2C%20Doral%2C%20FL%2033178!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  // gap: 0; // Removed gap for seamless look if next to each other, or add gap if preferred
  background-color: #f9f9f9;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.info-content {
  padding: 60px 50px;

  @media (max-width: 600px) {
    padding: 40px 20px;
  }
}

.section-title {
  @include heading-font(400);
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #000;
}

.info-group {
  margin-bottom: 40px;

  h3 {
    @include interface-font(600);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #d4af37;
    margin-bottom: 15px;
  }

  p {
    @include body-font(400);
    color: #444;
    line-height: 1.6;
    margin-bottom: 10px;
  }
}

.map-link {
  display: inline-block;
  @include interface-font(600);
  font-size: 0.9rem;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
  transition: all 0.3s;

  &:hover {
    color: #d4af37;
    border-color: #d4af37;
  }
}

.social-links {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  a {
    @include interface-font(500);
    color: #666;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #000;
    }
  }
}

.map-container {
  min-height: 400px;
  background-color: #eee;

  @media (max-width: 900px) {
    height: 400px;
  }
}
</style>
