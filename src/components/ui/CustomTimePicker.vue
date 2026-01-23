<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Select Time'
  },
  required: {
    type: Boolean,
    default: false
  },
  minTime: {
    type: String,
    default: '07:00'
  },
  maxTime: {
    type: String,
    default: '23:00'
  },
  step: {
    type: Number,
    default: 30 // minutes
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const pickerContainer = ref<HTMLElement | null>(null);

const timeOptions = computed(() => {
  const times = [];
  const minParts = props.minTime.split(':');
  const maxParts = props.maxTime.split(':');

  const minH = parseInt(minParts[0] || '0');
  const minM = parseInt(minParts[1] || '0');
  const maxH = parseInt(maxParts[0] || '0');
  const maxM = parseInt(maxParts[1] || '0');

  let currentH = minH;
  let currentM = minM;

  while (currentH < maxH || (currentH === maxH && currentM <= maxM)) {
    const hh = currentH.toString().padStart(2, '0');
    const mm = currentM.toString().padStart(2, '0');
    times.push(`${hh}:${mm}`);

    currentM += props.step;
    if (currentM >= 60) {
      currentH++;
      currentM -= 60;
    }
  }
  return times;
});

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  // Convert 24h to 12h AM/PM for nice display
  const matches = props.modelValue.split(':');
  if (matches.length < 2) return '';

  const h = matches[0] || '0';
  const m = matches[1] || '0';

  const date = new Date();
  date.setHours(parseInt(h));
  date.setMinutes(parseInt(m));
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
});

const selectTime = (time: string) => {
  emit('update:modelValue', time);
  isOpen.value = false;
};

const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const closePicker = (e: MouseEvent) => {
  if (pickerContainer.value && !pickerContainer.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closePicker);
});

onUnmounted(() => {
  document.removeEventListener('click', closePicker);
});
</script>

<template>
  <div class="custom-time-picker" ref="pickerContainer">
    <label v-if="label" class="picker-label">
      {{ label }} <span v-if="required">*</span>
    </label>
    
    <div class="input-display" @click="togglePicker" :class="{ 'is-open': isOpen }">
      <span v-if="displayValue" class="value-text">{{ displayValue }}</span>
      <span v-else class="placeholder">Select time</span>
      <span class="icon"><i class="fas fa-clock"></i></span>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="time-dropdown">
        <ul class="time-list">
          <li 
            v-for="time in timeOptions" 
            :key="time"
            @click.stop="selectTime(time)"
            :class="{ 'selected': modelValue === time }"
          >
            {{ new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.custom-time-picker {
  position: relative;
  width: 100%;
}

.picker-label {
  display: block;
  @include interface-font(600);
  font-size: 0.8rem;
  margin-bottom: 8px;
  color: #555;
  text-transform: uppercase;
}

.input-display {
  width: 100%;
  padding: 12px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: $border-radius-md;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;

  &:hover,
  &.is-open {
    border-color: #d4af37;
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }
}

.value-text {
  @include body-font(400);
  color: #000;
}

.placeholder {
  @include body-font(400);
  color: #999;
}

.icon {
  opacity: 0.5;
}

.time-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 5px;
  border-radius: 4px;
}

.time-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 15px;
    cursor: pointer;
    @include body-font(400);
    font-size: 0.95rem;
    transition: background-color 0.2s;
    border-bottom: 1px solid #f5f5f5;

    &:hover {
      background-color: #f9f9f9;
      color: #d4af37;
    }

    &.selected {
      background-color: #d4af37;
      color: #fff;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
