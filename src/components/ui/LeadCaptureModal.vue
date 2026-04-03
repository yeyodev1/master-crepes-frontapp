<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useLeadModal } from '@/composables/useLeadModal';
import ghlService from '@/services/ghlService';

const { isOpen, closeModal } = useLeadModal();

const step = ref(1);
const isSubmitting = ref(false);
const showSuccess = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  responseTime: '',
});

const responseOptions = [
  { label: 'Lo antes posible', value: 'ASAP' },
  { label: 'En 1-2 días',      value: 'In 1-2 days' },
  { label: 'Esta semana',      value: 'This week' },
  { label: 'Sin urgencia',     value: 'No urgency' },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const step1Valid = computed(() =>
  form.firstName.trim().length > 0 &&
  form.lastName.trim().length > 0 &&
  emailRegex.test(form.email) &&
  form.phone.trim().length >= 7
);

const goNext = () => {
  if (step1Valid.value) step.value = 2;
};

const selectTime = async (option: { label: string; value: string }) => {
  form.responseTime = option.value;
  isSubmitting.value = true;
  try {
    await ghlService.submitCatering({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      additionalInfo: `Preferred response time: ${option.value}`,
      // Fill required fields with defaults
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
      eventNature: 'Lead Popup',
      eventStyle: '',
      deliveryInstructions: '',
      referralSource: '',
    });
  } catch (_) {
    // Silent — still show success
  } finally {
    isSubmitting.value = false;
    showSuccess.value = true;
  }
};

const handleClose = () => {
  closeModal();
  // Reset after transition
  setTimeout(() => {
    step.value = 1;
    showSuccess.value = false;
    form.firstName = '';
    form.lastName = '';
    form.email = '';
    form.phone = '';
    form.responseTime = '';
  }, 400);
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" @click.self="handleClose">
        <div class="modal-card">

          <!-- Close -->
          <button class="btn-close" @click="handleClose" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>

          <!-- SUCCESS -->
          <Transition name="fade-up" mode="out-in">
            <div v-if="showSuccess" class="success-state" key="success">
              <div class="success-icon">
                <i class="fas fa-check"></i>
              </div>
              <h2>¡Listo!</h2>
              <p>Recibimos tu información.<br>Te contactaremos pronto.</p>
              <button class="btn-next" @click="handleClose">Cerrar</button>
            </div>

            <!-- FORM STEPS -->
            <div v-else key="form">
              <!-- Progress Bar -->
              <div class="progress-bar">
                <div class="step-circle" :class="{ active: step >= 1, done: step > 1 }">1</div>
                <div class="progress-line">
                  <div class="progress-fill" :style="{ width: step > 1 ? '100%' : '0%' }"></div>
                </div>
                <div class="step-circle" :class="{ active: step >= 2 }">2</div>
              </div>

              <!-- STEP 1 -->
              <Transition name="slide" mode="out-in">
                <div v-if="step === 1" key="step1" class="step-content">
                  <p class="paso-label">PASO 1 DE 2</p>
                  <h2 class="step-title">CUÉNTANOS<br>SOBRE TI</h2>
                  <p class="step-sub">Solo nos tomará un momento</p>

                  <div class="fields-row">
                    <div class="field-wrap">
                      <input
                        v-model="form.firstName"
                        type="text"
                        placeholder="Tu nombre"
                        class="field-input"
                        @keyup.enter="goNext"
                      />
                    </div>
                    <div class="field-wrap">
                      <input
                        v-model="form.lastName"
                        type="text"
                        placeholder="Tu apellido"
                        class="field-input"
                        @keyup.enter="goNext"
                      />
                    </div>
                  </div>

                  <div class="field-wrap">
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="Correo electrónico"
                      class="field-input"
                      @keyup.enter="goNext"
                    />
                  </div>

                  <div class="field-wrap">
                    <input
                      v-model="form.phone"
                      type="tel"
                      placeholder="WhatsApp / celular (con código de país)"
                      class="field-input"
                      @keyup.enter="goNext"
                    />
                  </div>

                  <button
                    class="btn-next"
                    :disabled="!step1Valid"
                    @click="goNext"
                  >
                    SIGUIENTE <i class="fas fa-arrow-right"></i>
                  </button>
                </div>

                <!-- STEP 2 -->
                <div v-else-if="step === 2" key="step2" class="step-content">
                  <p class="paso-label">PASO 2 DE 2</p>
                  <h2 class="step-title">¿CUÁNDO<br>QUIERES<br>RECIBIR<br>RESPUESTA?</h2>

                  <div class="time-options">
                    <button
                      v-for="opt in responseOptions"
                      :key="opt.value"
                      class="time-btn"
                      :disabled="isSubmitting"
                      @click="selectTime(opt)"
                    >
                      <span v-if="isSubmitting && form.responseTime === opt.value">
                        <i class="fas fa-spinner fa-spin"></i>
                      </span>
                      <span v-else>{{ opt.label }}</span>
                    </button>
                  </div>

                  <button class="btn-back" @click="step = 1">
                    <i class="fas fa-arrow-left"></i> Volver
                  </button>
                </div>
              </Transition>
            </div>
          </Transition>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #141414;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  padding: 40px 36px 44px;
  position: relative;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 540px) {
    padding: 32px 24px 36px;
    border-radius: 12px;
  }
}

.btn-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2a2a2a;
  border: none;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #3a3a3a;
    color: #fff;
  }
}

// Progress bar
.progress-bar {
  display: flex;
  align-items: center;
  margin-bottom: 36px;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2a2a2a;
  color: #666;
  @include interface-font(700);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  &.active {
    background: #c0392b;
    color: #fff;
  }
}

.progress-line {
  flex: 1;
  height: 3px;
  background: #2a2a2a;
  margin: 0 8px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #c0392b;
  transition: width 0.4s ease;
}

// Step content
.step-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.paso-label {
  @include interface-font(700);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: #c0392b;
  text-transform: uppercase;
  margin: 0 0 14px;
}

.step-title {
  @include interface-font(900);
  font-size: clamp(2rem, 6vw, 2.8rem);
  color: #fff;
  line-height: 1.05;
  text-transform: uppercase;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}

.step-sub {
  @include body-font(400);
  color: #888;
  font-size: 0.95rem;
  margin: 0 0 28px;
}

// Fields
.fields-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.field-wrap {
  margin-bottom: 12px;
}

.field-input {
  width: 100%;
  background: #1e1e1e;
  border: 1.5px solid #2e2e2e;
  border-radius: 8px;
  padding: 14px 16px;
  color: #fff;
  @include body-font(400);
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15);
  }
}

// Next button
.btn-next {
  width: 100%;
  padding: 18px;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 8px;
  @include interface-font(800);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  transition: background 0.2s, transform 0.2s;

  &:hover:not(:disabled) {
    background: #a93226;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #3a2020;
    color: #7a4040;
    cursor: not-allowed;
    transform: none;
  }
}

// Time options (Step 2)
.time-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
}

.time-btn {
  padding: 12px 22px;
  background: transparent;
  border: 1.5px solid #3a3a3a;
  border-radius: 50px;
  color: #ddd;
  @include interface-font(500);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 130px;

  &:hover:not(:disabled) {
    border-color: #c0392b;
    color: #fff;
    background: rgba(192, 57, 43, 0.12);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-back {
  margin-top: 24px;
  background: none;
  border: none;
  color: #555;
  @include interface-font(500);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: color 0.2s;

  &:hover { color: #aaa; }
}

// Success state
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  gap: 16px;

  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #fff;
    margin-bottom: 8px;
    box-shadow: 0 10px 30px rgba(192, 57, 43, 0.4);
  }

  h2 {
    @include heading-font(400);
    font-size: 3rem;
    color: #fff;
    margin: 0;
  }

  p {
    color: #888;
    @include body-font(400);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }
}

// Transitions
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
  .modal-card {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  }
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  .modal-card {
    transform: scale(0.92) translateY(20px);
    opacity: 0;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.28s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
