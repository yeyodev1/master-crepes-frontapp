<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import ghlService from '@/services/ghlService';
import PhoneInput from '@/components/ui/PhoneInput.vue';

// FranchiseForm.vue
// Lead capture form for potential franchisees
const { t } = useI18n();

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

  try {
    await ghlService.submitFranchise(formData);
    console.log('Form submitted:', formData);
    showSuccess.value = true;
  } catch (error) {
    console.error('Submission failed', error);
    alert('Submission failed. Your application could not be sent. Please try again.');
  } finally {
    isSubmitting.value = false;
  }

  // Reset form after delay
  /*
  setTimeout(() => {
    formData.fullName = '';
    formData.phone = '';
    formData.email = '';
    formData.message = '';
    showSuccess.value = false;
  }, 5000);
  */
};
</script>

<template>
  <section id="franchise-form" class="franchise-form-section">
    <div class="container">
      <div class="form-wrapper" data-aos="fade-up">
        <div class="form-header">
          <span class="eyebrow">{{ t('franchises.form.eyebrow') }}</span>
          <h2 class="title">{{ t('franchises.form.title') }}</h2>
          <p class="subtitle">{{ t('franchises.form.subtitle') }}</p>
        </div>

        <form @submit.prevent="submitForm" class="contact-form" v-if="!showSuccess">
          <div class="form-group">
            <label for="fullName">{{ t('franchises.form.full_name') }}</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="formData.fullName" 
              required
              :placeholder="t('franchises.form.full_name_placeholder')"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <PhoneInput 
                v-model="formData.phone" 
                :required="true"
              />
            </div>
            
            <div class="form-group">
              <label for="email">{{ t('common.email') }}</label>
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
             <label for="message">{{ t('franchises.form.message') }}</label>
             <textarea 
               id="message" 
               v-model="formData.message"
               :placeholder="t('franchises.form.message_placeholder')"
               rows="3"
             ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? t('franchises.form.submitting') : t('franchises.form.submit') }}
          </button>
        </form>
        
        <div v-else class="success-message">
           <div class="check-icon"><i class="fas fa-check"></i></div>
           <h3>{{ t('franchises.form.success_title') }}</h3>
           <p>{{ t('franchises.form.success_msg') }}</p>
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
    border-radius: $border-radius-md;
    color: #fff;
    @include body-font(400);
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #d4af37;
      background-color: #2a2a2a;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
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
  border-radius: $border-radius-md;
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
