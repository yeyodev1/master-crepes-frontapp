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
  font-size: 0.85rem;
  margin-bottom: 10px;
  color: #444;
}

.input-display {
  width: 100%;
  padding: 14px 18px;
  background-color: #fff;
  border: 1.5px solid #e1e1e1;
  border-radius: $border-radius-md;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: #ccc;
  }

  &.is-open {
    border-color: #d4af37;
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.12);
    transform: translateY(-1px);
  }

  .icon {
    color: #999;
    font-size: 0.9rem;
    transition: color 0.3s;
  }

  &.is-open .icon {
    color: #d4af37;
  }
}

.value-text {
  @include body-font(400);
  color: #1a1a1a;
  font-size: 1rem;
}

.placeholder {
  @include body-font(400);
  color: #bbb;
  font-size: 1rem;
}

.time-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  margin-top: 5px;
  border-radius: $border-radius-md;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
}

.time-list {
  list-style: none;
  padding: 8px 0;
  margin: 0;

  li {
    padding: 12px 20px;
    cursor: pointer;
    @include body-font(400);
    font-size: 0.95rem;
    transition: all 0.2s;
    color: #1a1a1a;

    &:hover {
      background-color: #f8f9fa;
      color: #d4af37;
      padding-left: 25px;
    }

    &.selected {
      background-color: #000;
      color: #fff;
      font-weight: 600;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
