<script setup lang="ts">
import { ref, watch } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Phone Number',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

// Local state
const phone = ref(props.modelValue);

// Sync with parent v-model
watch(() => props.modelValue, (newVal) => {
  phone.value = newVal;
});

// Update logic
const onInput = (number: string, phoneObject: any) => {
  if (phoneObject?.valid) {
    // If valid, emit the E.164 formatted number (e.g., +1234567890) recommended for CRMs
    emit('update:modelValue', phoneObject.number);
  } else {
    // If invalid or just typing, emit what is typed but maybe unformatted
    emit('update:modelValue', number);
  }
};

const inputOptions = {
  placeholder: '(555) 123-4567',
  required: props.required,
  styleClasses: 'custom-tel-input',
  name: 'telephone',
};

const dropdownOptions = {
  showDialCodeInList: true,
  showFlags: true,
  showSearchBox: true,
  tabindex: 0,
};
</script>

<template>
  <div class="phone-input-wrapper">
    <label v-if="label">{{ label }} <span v-if="required">*</span></label>
    <VueTelInput
      v-model="phone"
      mode="international"
      defaultCountry="US"
      autoFormat
      :inputOptions="inputOptions"
      :dropdownOptions="dropdownOptions"
      @input="onInput"
      class="styled-phone-input"
    />
  </div>
</template>

<style lang="scss">
@use '@/styles/index.scss' as *;

.phone-input-wrapper {
  margin-bottom: 25px;

  label {
    display: block;
    font-family: inherit; // Inherit from parent logic variables
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 8px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

// Override vue-tel-input styles to match app design
.styled-phone-input.vue-tel-input {
  border: 1px solid #ddd;
  border-radius: $border-radius-md;
  box-shadow: none;
  font-family: $font-secondary;
  transition: all 0.3s;

  &:focus-within {
    border-color: #d4af37;
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
  }

  .vti__dropdown {
    border-right: 1px solid #eee;
    padding: 10px;
    background-color: #f9f9f9;
    border-top-left-radius: $border-radius-md;
    border-bottom-left-radius: $border-radius-md;

    &:hover {
      background-color: #eee;
    }
  }

  .vti__input {
    background-color: #fff;
    font-size: 1rem;
    color: #333;
    padding: 12px 15px;
    border-radius: 0 $border-radius-md $border-radius-md 0;

    &::placeholder {
      color: #999;
    }
  }
}
</style>
