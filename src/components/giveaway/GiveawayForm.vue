<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import ghlService from '@/services/ghlService';
import PhoneInput from '@/components/ui/PhoneInput.vue';

// GiveawayForm.vue
// Lead capture form for the "Win a Year of Free Crepes" giveaway
const { t } = useI18n();

const formData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  instagram: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const normalizeInstagram = (value: string) => {
  const handle = value
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
    .replace(/^@/, '')
    .replace(/\/+$/, '');
  return handle ? `@${handle}` : '';
};

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    formData.instagram = normalizeInstagram(formData.instagram);
    await ghlService.submitGiveaway(formData);
    showSuccess.value = true;
  } catch (error) {
    console.error('Submission failed', error);
    alert(t('giveaway.form.error'));
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="giveaway-form" class="giveaway-form-section">
    <div class="container">
      <div class="form-wrapper">
        <div class="form-header">
          <span class="eyebrow">{{ t('giveaway.form.eyebrow') }}</span>
          <h2 class="title">{{ t('giveaway.form.title') }}</h2>
          <p class="subtitle">{{ t('giveaway.form.subtitle') }}</p>
        </div>

        <form @submit.prevent="submitForm" class="giveaway-form" v-if="!showSuccess">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">{{ t('common.first_name') }}</label>
              <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                required
                :placeholder="t('giveaway.form.first_name_placeholder')"
              >
            </div>

            <div class="form-group">
              <label for="lastName">{{ t('common.last_name') }}</label>
              <input
                type="text"
                id="lastName"
                v-model="formData.lastName"
                required
                :placeholder="t('giveaway.form.last_name_placeholder')"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <PhoneInput
                v-model="formData.phone"
                :label="t('giveaway.form.phone')"
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
            <label for="instagram">{{ t('giveaway.form.instagram') }}</label>
            <div class="instagram-input">
              <span class="prefix">@</span>
              <input
                type="text"
                id="instagram"
                v-model="formData.instagram"
                required
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                :placeholder="t('giveaway.form.instagram_placeholder')"
              >
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? t('giveaway.form.submitting') : t('giveaway.form.submit') }}
          </button>

          <p class="disclaimer">{{ t('giveaway.form.disclaimer') }}</p>
        </form>

        <div v-else class="success-message">
          <div class="check-icon"><i class="fas fa-check"></i></div>
          <h3>{{ t('giveaway.form.success_title') }}</h3>
          <p>{{ t('giveaway.form.success_msg') }}</p>
          <a
            href="https://www.instagram.com/mastercrepesdoral/"
            target="_blank"
            rel="noopener"
            class="ig-btn"
          >
            <i class="fab fa-instagram"></i> {{ t('giveaway.form.success_cta') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.giveaway-form-section {
  padding: 80px 0 100px;
  background-color: #111;
  color: #fff;
}

.giveaway-form-section :where(input, button, .giveaway-form, .success-message) {
  box-sizing: border-box;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;

  .eyebrow {
    @include interface-font(600);
    color: #d4af37;
    letter-spacing: 0.2em;
    font-size: 0.8rem;
    margin-bottom: 15px;
    display: block;
    text-transform: uppercase;
  }

  .title {
    @include heading-font(400);
    font-size: 2.8rem;
    color: #fff;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 2.1rem;
    }
  }

  .subtitle {
    @include body-font(400);
    color: #aaa;
  }
}

.giveaway-form {
  background-color: #1a1a1a;
  padding: 50px;
  border: 1px solid #333;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 25px;
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

  input {
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

/* PhoneInput dark-theme overrides (its styles are global, light by default) */
.form-group :deep(.phone-input-wrapper) {
  margin-bottom: 0;

  label {
    @include interface-font(500);
    font-size: 0.9rem;
    text-transform: none;
    letter-spacing: normal;
    color: #ddd;
    margin-bottom: 10px;
  }
}

.form-group :deep(.styled-phone-input.vue-tel-input) {
  min-height: 51px;
  background-color: #222;
  border: 1px solid #333;
  border-radius: $border-radius-md;
  overflow: hidden;

  &:focus-within {
    border-color: #d4af37;
    background-color: #2a2a2a;
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
  }

  .vti__dropdown {
    background-color: #2a2a2a;
    border-right: 1px solid #333;
    padding: 0 12px;
    border-radius: 0;

    &:hover,
    &.open {
      background-color: #333;
    }
  }

  .vti__dropdown-arrow {
    color: #d4af37;
  }

  .vti__dropdown-list {
    background-color: #1a1a1a;
    border: 1px solid #333;
    color: #ddd;
    z-index: 5;
    width: 320px;
    max-width: 80vw;
  }

  .vti__dropdown-item {
    color: #ddd;
    padding: 10px 12px;

    &.highlighted,
    &:hover {
      background-color: #2a2a2a;
      color: #fff;
    }

    strong {
      color: #fff;
    }

    span {
      color: #888;
    }
  }

  .vti__search_box {
    background-color: #222;
    border: 1px solid #333;
    color: #fff;
    width: 100%;
    padding: 10px;
    margin: 8px;
    width: calc(100% - 16px);
  }

  .vti__input {
    background-color: transparent;
    color: #fff;
    padding: 15px;
    font-size: 1rem;
    border-radius: 0;

    &::placeholder {
      color: #555;
    }
  }
}

.instagram-input {
  position: relative;

  .prefix {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #d4af37;
    @include interface-font(600);
    pointer-events: none;
  }

  input {
    padding-left: 36px;
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

.disclaimer {
  @include body-font(400);
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
}

.success-message {
  text-align: center;
  padding: 60px 30px;
  background-color: #1a1a1a;
  border: 1px solid #d4af37;
  border-radius: 4px;

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
    margin-bottom: 25px;
  }

  .ig-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    background-color: #d4af37;
    color: #000;
    text-decoration: none;
    border-radius: $border-radius-md;
    @include interface-font(600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.85rem;
    transition: all 0.3s;

    &:hover {
      background-color: #fff;
      transform: translateY(-2px);
    }
  }
}
</style>
