<script setup lang="ts">
import { ref, reactive } from 'vue';

// FranchiseForm.vue
// Lead capture form for potential franchisees

const formData = reactive({
  fullName: '',
  phone: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log('Form submitted:', formData);
  showSuccess.value = true;
  isSubmitting.value = false;

  // Reset form after delay
  setTimeout(() => {
    formData.fullName = '';
    formData.phone = '';
    formData.email = '';
    formData.message = '';
    showSuccess.value = false;
  }, 5000);
};
</script>

<template>
  <section id="franchise-form" class="franchise-form-section">
    <div class="container">
      <div class="form-wrapper" data-aos="fade-up">
        <div class="form-header">
          <span class="eyebrow">TAKE THE NEXT STEP</span>
          <h2 class="title">Join the Family</h2>
          <p class="subtitle">Fill out the form below and our team will contact you shortly.</p>
        </div>

        <form @submit.prevent="submitForm" class="contact-form" v-if="!showSuccess">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="formData.fullName" 
              required
              placeholder="John Doe"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone" 
                required
                placeholder="(555) 123-4567"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                placeholder="john@example.com"
              >
            </div>
          </div>
          
          <div class="form-group">
             <label for="message">Message (Optional)</label>
             <textarea 
               id="message" 
               v-model="formData.message"
               placeholder="Tell us about your interest..."
               rows="3"
             ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Application' }}
          </button>
        </form>
        
        <div v-else class="success-message">
           <div class="check-icon"><i class="fas fa-check"></i></div>
           <h3>Thank You!</h3>
           <p>Your application has been received. We will be in touch soon.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.franchise-form-section {
  padding: 100px 0;
  background-color: #111; // Dark section for contrast
  color: #fff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 50px;

  .eyebrow {
    @include interface-font(600);
    color: #d4af37;
    letter-spacing: 0.2em;
    font-size: 0.8rem;
    margin-bottom: 15px;
    display: block;
  }

  .title {
    @include heading-font(400);
    font-size: 3rem;
    color: #fff;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .subtitle {
    @include body-font(400);
    color: #aaa;
  }
}

.contact-form {
  background-color: #1a1a1a;
  padding: 50px;
  border: 1px solid #333;

  @media (max-width: 768px) {
    padding: 30px;
  }
}

.form-group {
  margin-bottom: 25px;

  label {
    display: block;
    @include interface-font(500);
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #ddd;
  }

  input,
  textarea {
    width: 100%;
    padding: 15px;
    background-color: #222;
    border: 1px solid #333;
    color: #fff;
    @include body-font(400);
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #d4af37;
      background-color: #2a2a2a;
    }

    &::placeholder {
      color: #555;
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
  width: 100%;
  padding: 18px;
  background-color: #d4af37;
  color: #000;
  border: none;
  @include interface-font(600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #fff;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.success-message {
  text-align: center;
  padding: 60px;
  background-color: #1a1a1a;
  border: 1px solid #d4af37;

  .check-icon {
    font-size: 3rem;
    color: #d4af37;
    margin-bottom: 20px;
  }

  h3 {
    @include heading-font(400);
    font-size: 2rem;
    margin-bottom: 10px;
    color: #fff;
  }

  p {
    @include body-font(400);
    color: #aaa;
  }
}
</style>
