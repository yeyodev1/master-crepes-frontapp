<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import ghlService from '@/services/ghlService';

// ContactForm.vue
// General inquiry form

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Contact form submitted:', formData);
  showSuccess.value = true;
  isSubmitting.value = false;

  // Reset logic
  setTimeout(() => {
    formData.firstName = '';
    formData.lastName = '';
    formData.email = '';
    formData.phone = '';
    formData.message = '';
    showSuccess.value = false;
  }, 5000);
};

const isFormValid = computed(() => {
  return formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';
});
</script>

<template>
  <section class="contact-form-section">
    <div class="container">
      <div class="content-wrapper" data-aos="fade-up">
        <div class="header-text">
          <span class="eyebrow">GET IN TOUCH</span>
          <h2 class="title">Got a question? Let's talk!</h2>
          <p class="subtitle">
            Whether you have questions about our menu, franchises, or just want to share feedback, we're here for you.
          </p>
        </div>

        <form @submit.prevent="submitForm" class="inquiry-form" v-if="!showSuccess">
           <div class="form-row">
             <div class="form-group">
               <label for="firstName">First Name</label>
               <input 
                 type="text" 
                 id="firstName" 
                 v-model="formData.firstName" 
                 required
               >
             </div>
             <div class="form-group">
               <label for="lastName">Last Name</label>
               <input 
                 type="text" 
                 id="lastName" 
                 v-model="formData.lastName" 
                 required
               >
             </div>
           </div>
           
           <div class="form-row">
             <div class="form-group">
               <label for="email">Email Address</label>
               <input 
                 type="email" 
                 id="email" 
                 v-model="formData.email" 
                 required
               >
             </div>
             <div class="form-group">
               <label for="phone">Phone Number</label>
               <input 
                 type="tel" 
                 id="phone" 
                 v-model="formData.phone" 
               >
             </div>
           </div>
           
           <div class="form-group">
             <label for="message">How can we help?</label>
             <textarea 
               id="message" 
               v-model="formData.message" 
               required
               rows="5"
             ></textarea>
           </div>
           
           <button type="submit" class="submit-btn" :disabled="isSubmitting || !isFormValid">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
           </button>
        </form>

        <div v-else class="success-message">
            <div class="icon"><i class="fas fa-check-circle"></i></div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. We'll get back to you shortly.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.contact-form-section {
  padding: 100px 0;
  background-color: #fff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-text {
  text-align: center;
  margin-bottom: 50px;

  .eyebrow {
    @include interface-font(600);
    color: #d4af37;
    letter-spacing: 0.2em;
    font-size: 0.8rem;
    display: block;
    margin-bottom: 15px;
  }

  .title {
    @include heading-font(400);
    font-size: 3rem;
    color: #000;
    margin-bottom: 20px;
  }

  .subtitle {
    @include body-font(400);
    color: #666;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
}



.form-group {
  margin-bottom: 25px;

  label {
    display: block;
    @include interface-font(600);
    font-size: 0.85rem;
    margin-bottom: 8px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input,
  textarea {
    width: 100%;
    padding: 15px;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: $border-radius-md;
    @include body-font(400);
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #d4af37;
      background-color: #fff;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
      transform: translateY(-1px);
    }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.submit-btn {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: $border-radius-md;
  padding: 18px 40px;
  @include interface-font(600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #d4af37;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
}

.success-message {
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 4px;

  .icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  h3 {
    @include heading-font(400);
    margin-bottom: 10px;
  }

  p {
    @include body-font(400);
    color: #666;
  }
}
</style>
