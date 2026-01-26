<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import CustomDatePicker from '@/components/ui/CustomDatePicker.vue';
import CustomTimePicker from '@/components/ui/CustomTimePicker.vue';
import ghlService from '@/services/ghlService';
import PhoneInput from '@/components/ui/PhoneInput.vue';

// CateringForm.vue
// Detailed lead capture form for GoHighLevel integration

// Form State matching GHL requirements
const formData = reactive({
  // Contact Info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  newsletter: false,

  // Event Logistics
  eventDate: '',
  startTime: '',
  endTime: '',
  guestCount: '',

  // Address
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',

  // Details
  eventNature: '', // e.g., Birthday, Wedding
  eventStyle: '', // Dropdown
  deliveryInstructions: '',
  additionalInfo: '',
  referralSource: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const eventStyles = [
  'Full-Service Catering',
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
  isSubmitting.value = true;

  console.log('Sending to GHL...');

  try {
    await ghlService.submitCatering(formData);
    showSuccess.value = true;
  } catch (error) {
    console.error('Submission failed', error);
    alert('There was an error submitting your request. Please try again or call us directly.');
  } finally {
    isSubmitting.value = false;
  }

  // Reset optional
  /*
  setTimeout(() => {
    showSuccess.value = false;
  }, 8000);
  */
};

const isFormValid = computed(() => {
  return formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.guestCount !== '' &&
    formData.eventNature.trim() !== '';
});
</script>

<template>
  <section id="catering-quote" class="catering-form-section">
    <div class="container">
      <div class="form-card" data-aos="fade-up">
        <div class="form-header">
          <span class="eyebrow">GET A QUOTE</span>
          <h2 class="title">Plan Your Event</h2>
          <p class="subtitle">
            Tell us about your special occasion. Fill out the details below and we'll create a custom proposal for you.
          </p>
        </div>

        <form @submit.prevent="submitForm" v-if="!showSuccess" class="detailed-form">
          
          <!-- Section 1: Contact Information -->
          <fieldset>
            <legend>Contact Information</legend>
            <div class="form-grid">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" v-model="formData.firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" v-model="formData.lastName" required>
              </div>
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <PhoneInput 
                  v-model="formData.phone" 
                  :required="true"
                />
              </div>
              <div class="form-group full-width">
                <label for="company">Company (Optional)</label>
                <input type="text" id="company" v-model="formData.company">
              </div>
            </div>
          </fieldset>
          
          <!-- Section 2: Event Details -->
          <fieldset>
            <legend>Event Logistics</legend>
            <div class="form-grid">
              <div class="form-group">
                <CustomDatePicker
                  label="Event Date"
                  v-model="formData.eventDate"
                  :required="true"
                />
              </div>
              <div class="form-group">
                <label for="guestCount">Number of Guests *</label>
                <input type="number" id="guestCount" v-model="formData.guestCount" required min="10">
              </div>
              <div class="form-group">
                <CustomTimePicker
                  label="Start Time"
                  v-model="formData.startTime"
                />
              </div>
              <div class="form-group">
                <CustomTimePicker
                  label="End Time"
                  v-model="formData.endTime"
                />
              </div>
              <div class="form-group">
                <label for="eventNature">Nature of Event *</label>
                <input type="text" id="eventNature" v-model="formData.eventNature" placeholder="e.g. Birthday, Office Lunch" required>
              </div>
              <div class="form-group">
                <label for="eventStyle">Event Style</label>
                <div class="select-wrapper">
                  <select id="eventStyle" v-model="formData.eventStyle">
                    <option value="" disabled>Select Style</option>
                    <option v-for="style in eventStyles" :key="style" :value="style">{{ style }}</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          <!-- Section 3: Location -->
          <fieldset>
            <legend>Event Location</legend>
            <div class="form-grid">
              <div class="form-group full-width">
                <label for="streetAddress">Street Address</label>
                <input type="text" id="streetAddress" v-model="formData.streetAddress" placeholder="Venue Address">
              </div>
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" v-model="formData.city">
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code</label>
                <input type="text" id="zipCode" v-model="formData.zipCode">
              </div>
            </div>
            <div class="form-group full-width mt-20">
                <label for="instructions">Delivery/Arrival Instructions</label>
                <textarea id="instructions" v-model="formData.deliveryInstructions" rows="2" placeholder="Gate codes, parking info, etc."></textarea>
              </div>
          </fieldset>

           <!-- Section 4: Additional Info -->
          <fieldset>
            <legend>Final Details</legend>
             <div class="form-group full-width">
                <label for="additionalInfo">Additional Information / Menu Requests</label>
                <textarea id="additionalInfo" v-model="formData.additionalInfo" rows="4"></textarea>
              </div>
              <div class="form-group">
                <label for="referral">How did you hear about us?</label>
                <div class="select-wrapper">
                  <select id="referral" v-model="formData.referralSource">
                    <option value="" disabled>Select Source</option>
                    <option v-for="source in referralSources" :key="source" :value="source">{{ source }}</option>
                  </select>
                </div>
              </div>
          </fieldset>

          <!-- Submit -->
          <div class="form-actions">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.newsletter">
              Subscribe to newsletter for updates and offers
            </label>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting || !isFormValid">
              {{ isSubmitting ? 'Submitting Request...' : 'Request Quote' }}
            </button>
          </div>

        </form>

        <div v-else class="success-screen">
          <div class="check-circle"><i class="fas fa-check"></i></div>
          <h3>Request Received!</h3>
          <p>Thank you for inquiring about Master Crepes Catering.</p>
          <p>We receive your details and will send you a personalized proposal within 24 hours.</p>
          <button @click="showSuccess = false" class="reset-btn">Send Another Request</button>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.catering-form-section {
  padding: 100px 0;
  background-color: #f4f4f4;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-card {
  background-color: #fff;
  padding: 60px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border-top: 5px solid #d4af37;

  @media (max-width: 768px) {
    padding: 30px;
  }
}

.form-header {
  text-align: center;
  margin-bottom: 50px;

  .eyebrow {
    @include interface-font(600);
    color: #d4af37;
    letter-spacing: 0.2em;
    font-size: 0.8rem;
    display: block;
    margin-bottom: 10px;
  }

  .title {
    @include heading-font(400);
    font-size: 2.5rem;
    color: #000;
    margin-bottom: 15px;
  }

  .subtitle {
    @include body-font(400);
    color: #666;
    max-width: 500px;
    margin: 0 auto;
  }
}

fieldset {
  border: none;
  padding: 0;
  margin: 0 0 40px 0;

  legend {
    @include interface-font(600);
    font-size: 1.1rem;
    color: #000;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 25px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 0; // Grid handles gap

  &.full-width {
    grid-column: 1 / -1;
  }

  &.mt-20 {
    margin-top: 20px;
  }

  label {
    display: block;
    @include interface-font(600);
    font-size: 0.8rem;
    margin-bottom: 8px;
    color: #555;
    text-transform: uppercase;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: $border-radius-md;
    @include body-font(400);
    font-size: 1rem;
    color: #333;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #d4af37;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
      transform: translateY(-1px);
    }
  }

  textarea {
    resize: vertical;
  }
}

.select-wrapper {
  position: relative;

  &::after {
    content: "\f0d7";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-size: 0.7rem;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
  }

  select {
    appearance: none;
    cursor: pointer;
  }
}

.form-actions {
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;

  input {
    width: auto;
  }
}

.submit-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 18px 50px;
  @include interface-font(600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 250px;

  &:hover:not(:disabled) {
    background-color: #d4af37;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
}

.success-screen {
  text-align: center;
  padding: 60px 20px;

  .check-circle {
    width: 80px;
    height: 80px;
    background-color: #d4af37;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin: 0 auto 30px;
  }

  h3 {
    @include heading-font(400);
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 10px;
  }

  .reset-btn {
    margin-top: 30px;
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    cursor: pointer;
    padding-bottom: 2px;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #d4af37;
      border-color: #d4af37;
    }
  }
}
</style>
