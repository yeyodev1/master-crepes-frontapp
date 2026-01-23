<script setup lang="ts">
import ContactHero from '@/components/contact/ContactHero.vue';
import ContactInfo from '@/components/contact/ContactInfo.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
</script>

<template>
  <div class="contact-view">
    <ContactHero />
    <ContactInfo />
    <ContactForm />
  </div>
</template>

<style lang="scss" scoped>
.contact-view {
  width: 100%;
}
</style>
