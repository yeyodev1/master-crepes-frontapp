<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CustomDatePicker from '@/components/ui/CustomDatePicker.vue';
import CustomTimePicker from '@/components/ui/CustomTimePicker.vue';
import PhoneInput from '@/components/ui/PhoneInput.vue';
import ghlService from '@/services/ghlService';

/**
 * CateringForm.vue
 * Premium lead capture form for GoHighLevel integration.
 * Designed with ScaleFront Architect principles: Mobile First, Elegant SCSS, and Robust Logic.
 */

const { t } = useI18n();

// Form State with strict types
interface CateringFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  newsletter: boolean;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number | '';
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  eventNature: string;
  eventStyle: string;
  deliveryInstructions: string;
  additionalInfo: string;
  referralSource: string;
}

const formData = reactive<CateringFormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  newsletter: false,
  eventDate: '',
  startTime: '',
  endTime: '',
  guestCount: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  eventNature: '',
  eventStyle: '',
  deliveryInstructions: '',
  additionalInfo: '',
  referralSource: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const formError = ref<string | null>(null);

const eventStyles = [
  'Full-Service Catering',
  'Drop-off & Set-up',
  'Corporate Lunch Box',
  'Private Chef Experience'
];

const referralSources = [
  'Instagram',
  'Facebook',
  'TikTok',
  'Google Search',
  'Friend/Family',
  'Event',
  'Other'
];

const submitForm = async () => {
  if (!isFormValid.value) return;

  isSubmitting.value = true;
  formError.value = null;

  try {
    // Ensure data is clean for submission
    const submissionData = { ...formData };
    await ghlService.submitCatering(submissionData);
    showSuccess.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error('Submission failed', error);
    formError.value = t('common.error_message') || 'There was an error submitting your request. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    formData.firstName.trim().length > 1 &&
    formData.lastName.trim().length > 1 &&
    emailRegex.test(formData.email) &&
    formData.phone.length >= 7 &&
    formData.guestCount !== '' && Number(formData.guestCount) >= 5 &&
    formData.eventNature.trim() !== '' &&
    formData.eventDate !== ''
  );
});
</script>

<template>
  <section id="catering-quote" class="catering-form-section">
    <div class="container">
      <div class="form-wrapper" data-aos="fade-up">
        
        <!-- Header -->
        <header class="form-header">
          <span class="eyebrow">{{ t('catering.form.eyebrow') }}</span>
          <h2 class="title">{{ t('catering.form.title') }}</h2>
          <div class="divider"></div>
          <p class="subtitle">
            {{ t('catering.form.subtitle') }}
          </p>
        </header>

        <!-- Form Success State -->
        <transition name="scale" mode="out-in">
          <div v-if="showSuccess" class="success-screen">
            <div class="success-icon-wrapper">
              <div class="check-circle"><i class="fas fa-check"></i></div>
              <div class="confetti-effect"></div>
            </div>
            <h3>{{ t('catering.form.success_title') }}</h3>
            <p>{{ t('catering.form.success_msg1') }}</p>
            <p>{{ t('catering.form.success_msg2') }}</p>
            <button @click="showSuccess = false" class="btn-outline mt-30">{{ t('catering.form.reset') }}</button>
          </div>

          <!-- Main Form -->
          <form v-else @submit.prevent="submitForm" class="premium-form">
            
            <div v-if="formError" class="form-alert error">
              <i class="fas fa-exclamation-circle"></i> {{ formError }}
            </div>

            <!-- Section 1: Personal Details -->
            <fieldset class="form-section">
              <div class="section-title">
                <span class="step-num">01</span>
                <legend>{{ t('catering.form.legend_contact') }}</legend>
              </div>
              
              <div class="fields-grid">
                <div class="form-group">
                  <label for="firstName">{{ t('common.first_name') }} <span class="required">*</span></label>
                  <input type="text" id="firstName" v-model="formData.firstName" :placeholder="t('common.first_name')" required>
                </div>
                
                <div class="form-group">
                  <label for="lastName">{{ t('common.last_name') }} <span class="required">*</span></label>
                  <input type="text" id="lastName" v-model="formData.lastName" :placeholder="t('common.last_name')" required>
                </div>
                
                <div class="form-group">
                  <label for="email">{{ t('common.email') }} <span class="required">*</span></label>
                  <input type="email" id="email" v-model="formData.email" placeholder="email@example.com" required>
                </div>
                
                <div class="form-group">
                  <PhoneInput 
                    v-model="formData.phone" 
                    :required="true"
                    :label="t('common.phone')"
                  />
                </div>

                <div class="form-group full-width">
                  <label for="company">{{ t('catering.form.company') }}</label>
                  <input type="text" id="company" v-model="formData.company" :placeholder="t('catering.form.company_placeholder') || 'Company Name (Optional)'">
                </div>
              </div>
            </fieldset>
            
            <!-- Section 2: Event Details -->
            <fieldset class="form-section">
              <div class="section-title">
                <span class="step-num">02</span>
                <legend>{{ t('catering.form.legend_event') }}</legend>
              </div>

              <div class="fields-grid">
                <div class="form-group">
                  <CustomDatePicker
                    :label="t('catering.form.event_date')"
                    v-model="formData.eventDate"
                    :required="true"
                  />
                </div>
                
                <div class="form-group">
                  <label for="guestCount">{{ t('catering.form.guest_count') }} <span class="required">*</span></label>
                  <input 
                    type="number" 
                    id="guestCount" 
                    v-model.number="formData.guestCount" 
                    required 
                    min="5" 
                    placeholder="Min. 5 guests"
                  >
                </div>
                
                <div class="form-group">
                  <CustomTimePicker
                    :label="t('catering.form.start_time')"
                    v-model="formData.startTime"
                    :required="true"
                  />
                </div>
                
                <div class="form-group">
                  <CustomTimePicker
                    :label="t('catering.form.end_time')"
                    v-model="formData.endTime"
                  />
                </div>
                
                <div class="form-group">
                  <label for="eventNature">{{ t('catering.form.nature') }} <span class="required">*</span></label>
                  <input type="text" id="eventNature" v-model="formData.eventNature" :placeholder="t('catering.form.nature_placeholder')" required>
                </div>
                
                <div class="form-group">
                  <label for="eventStyle">{{ t('catering.form.style') }}</label>
                  <div class="select-box">
                    <select id="eventStyle" v-model="formData.eventStyle">
                      <option value="" disabled>{{ t('catering.form.style_select') }}</option>
                      <option v-for="style in eventStyles" :key="style" :value="style">{{ style }}</option>
                    </select>
                    <i class="fas fa-chevron-down select-icon"></i>
                  </div>
                </div>
              </div>
            </fieldset>

            <!-- Section 3: Location -->
            <fieldset class="form-section">
              <div class="section-title">
                <span class="step-num">03</span>
                <legend>{{ t('catering.form.legend_location') }}</legend>
              </div>

              <div class="fields-grid">
                <div class="form-group full-width">
                  <label for="streetAddress">{{ t('catering.form.street') }}</label>
                  <input type="text" id="streetAddress" v-model="formData.streetAddress" :placeholder="t('catering.form.street_placeholder')">
                </div>
                
                <div class="form-group">
                  <label for="city">{{ t('catering.form.city') }}</label>
                  <input type="text" id="city" v-model="formData.city" placeholder="City">
                </div>
                
                <div class="form-group">
                  <label for="zipCode">{{ t('catering.form.zip') }}</label>
                  <input type="text" id="zipCode" v-model="formData.zipCode" placeholder="ZIP Code">
                </div>

                <div class="form-group full-width">
                  <label for="instructions">{{ t('catering.form.delivery') }}</label>
                  <textarea id="instructions" v-model="formData.deliveryInstructions" rows="2" :placeholder="t('catering.form.delivery_placeholder')"></textarea>
                </div>
              </div>
            </fieldset>

             <!-- Section 4: Additional Information -->
            <fieldset class="form-section">
              <div class="section-title">
                <span class="step-num">04</span>
                <legend>{{ t('catering.form.legend_details') }}</legend>
              </div>

              <div class="fields-grid">
                <div class="form-group full-width">
                  <label for="additionalInfo">{{ t('catering.form.additional') }}</label>
                  <textarea id="additionalInfo" v-model="formData.additionalInfo" rows="3" :placeholder="t('catering.form.additional_placeholder') || 'Any special dietary requirements or requests?'"></textarea>
                </div>

                <div class="form-group">
                  <label for="referral">{{ t('catering.form.referral') }}</label>
                  <div class="select-box">
                    <select id="referral" v-model="formData.referralSource">
                      <option value="" disabled>{{ t('catering.form.referral_select') }}</option>
                      <option v-for="source in referralSources" :key="source" :value="source">{{ source }}</option>
                    </select>
                    <i class="fas fa-chevron-down select-icon"></i>
                  </div>
                </div>
              </div>
            </fieldset>

            <!-- Final Actions -->
            <footer class="form-footer">
              <label class="premium-checkbox">
                <input type="checkbox" v-model="formData.newsletter">
                <span class="checkmark"></span>
                <span class="label-text">{{ t('catering.form.newsletter') }}</span>
              </label>
              
              <button 
                type="submit" 
                class="btn-primary-premium" 
                :disabled="isSubmitting || !isFormValid"
              >
                <span v-if="!isSubmitting">
                  {{ t('catering.form.submit') }} <i class="fas fa-paper-plane ml-10"></i>
                </span>
                <span v-else class="loader-container">
                  <span class="mini-loader"></span> {{ t('catering.form.submitting') }}
                </span>
              </button>
              
              <p class="form-disclaimer">
                {{ t('catering.form.disclaimer') || 'By submitting, you agree to our privacy policy and terms of service.' }}
              </p>
            </footer>

          </form>
        </transition>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.catering-form-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: $border-radius-xl;
  padding: 80px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    padding: 40px 24px;
    border-radius: $border-radius-lg;
  }
}

.form-header {
  text-align: center;
  margin-bottom: 60px;

  .eyebrow {
    @include interface-font(700);
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 0.85rem;
    display: block;
    margin-bottom: 16px;
  }

  .title {
    @include heading-font(400);
    font-size: 3rem;
    color: #1a1a1a;
    margin-bottom: 20px;
    line-height: 1.1;

    @media (max-width: 600px) {
      font-size: 2.2rem;
    }
  }

  .divider {
    width: 60px;
    height: 3px;
    background-color: #d4af37;
    margin: 0 auto 30px;
  }

  .subtitle {
    @include body-font(400);
    font-size: 1.1rem;
    color: #555;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.form-section {
  border: none;
  padding: 0;
  margin: 0 0 50px 0;

  .section-title {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;

    .step-num {
      @include interface-font(700);
      font-size: 0.9rem;
      color: #fff;
      background-color: #000;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    legend {
      @include interface-font(600);
      font-size: 1.25rem;
      color: #000;
      text-transform: none;
      letter-spacing: -0.01em;
      margin: 0;
    }
  }
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.form-group {
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    @include interface-font(600);
    font-size: 0.85rem;
    margin-bottom: 10px;
    color: #444;
    transition: color 0.3s;

    .required {
      color: #d43737;
    }
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 14px 18px;
    background: #fff;
    border: 1.5px solid #e1e1e1;
    border-radius: $border-radius-md;
    @include body-font(400);
    font-size: 1rem;
    color: #1a1a1a;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
      color: #bbb;
    }

    &:focus {
      outline: none;
      border-color: #d4af37;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.12);
      transform: translateY(-1px);
    }

    &:hover:not(:focus) {
      border-color: #ccc;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
}

.select-box {
  position: relative;

  select {
    appearance: none;
    cursor: pointer;
    padding-right: 45px;
  }

  .select-icon {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
    font-size: 0.8rem;
  }
}

.form-footer {
  margin-top: 40px;
  padding-top: 50px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.premium-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;

  input {
    display: none;
  }

  .checkmark {
    width: 22px;
    height: 22px;
    border: 2px solid #ddd;
    border-radius: 6px;
    position: relative;
    transition: all 0.2s;
    background: white;

    &::after {
      content: '\f00c';
      font-family: 'Font Awesome 6 Free';
      font-weight: 900;
      font-size: 11px;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }

  input:checked~.checkmark {
    background-color: #d4af37;
    border-color: #d4af37;

    &::after {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .label-text {
    @include body-font(400);
    font-size: 0.95rem;
    color: #666;
  }

  &:hover .checkmark {
    border-color: #d4af37;
  }
}

.btn-primary-premium {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 22px 64px;
  @include interface-font(700);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 1.05rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #d4af37;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 35px rgba(212, 175, 55, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .ml-10 {
    margin-left: 10px;
  }
}

.form-disclaimer {
  max-width: 400px;
  text-align: center;
  font-size: 0.75rem;
  color: #999;
  line-height: 1.5;
}

.form-alert {
  padding: 18px 24px;
  border-radius: $border-radius-md;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 500;

  &.error {
    background-color: #fff5f5;
    color: #d43737;
    border: 1px solid #ffd8d8;
  }

  i {
    font-size: 1.2rem;
  }
}

/* Success Screen */
.success-screen {
  text-align: center;
  padding: 40px 0;

  .success-icon-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 40px;
  }

  .check-circle {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
    position: relative;
    z-index: 2;
  }

  h3 {
    @include heading-font(400);
    font-size: 3.5rem;
    margin-bottom: 24px;
    color: #1a1a1a;

    @media (max-width: 600px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .btn-outline {
    background: transparent;
    border: 2px solid #000;
    padding: 16px 40px;
    border-radius: 50px;
    @include interface-font(700);
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}

.mt-30 {
  margin-top: 30px;
}

/* Loader Styles */
.loader-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
}
</style>
