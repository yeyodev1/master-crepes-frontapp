<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Select Date'
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const pickerContainer = ref<HTMLElement | null>(null);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const formattedValue = computed(() => {
  if (!props.modelValue) return '';
  const date = new Date(props.modelValue + 'T00:00:00'); // Fix TZ issues
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const calendarDays = computed(() => {
  const days = [];
  // Empty slots for previous month
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null);
  }
  // Days of current month
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i);
  }
  return days;
});

const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const closePicker = (e: MouseEvent) => {
  if (pickerContainer.value && !pickerContainer.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const isPastDate = (day: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(currentYear.value, currentMonth.value, day);
  return checkDate < today;
};

const selectDate = (day: number) => {
  if (isPastDate(day)) return;

  const month = (currentMonth.value + 1).toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  const dateStr = `${currentYear.value}-${month}-${dayStr}`;

  emit('update:modelValue', dateStr);
  isOpen.value = false;
};

const isSelected = (day: number) => {
  if (!props.modelValue) return false;
  const [y, m, d] = props.modelValue.split('-').map(Number);
  return y === currentYear.value && m === (currentMonth.value + 1) && d === day;
};

const isToday = (day: number) => {
  const today = new Date();
  return today.getFullYear() === currentYear.value &&
    today.getMonth() === currentMonth.value &&
    today.getDate() === day;
};

onMounted(() => {
  document.addEventListener('click', closePicker);
  // Init calendar to selected date if exists
  if (props.modelValue) {
    const parts = props.modelValue.split('-');
    if (parts.length >= 2) {
      currentYear.value = parseInt(parts[0] || '0');
      currentMonth.value = parseInt(parts[1] || '0') - 1;
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', closePicker);
});
</script>

<template>
  <div class="custom-date-picker" ref="pickerContainer">
    <label v-if="label" class="picker-label">
      {{ label }} <span v-if="required">*</span>
    </label>
    
    <div class="input-display" @click="togglePicker" :class="{ 'is-open': isOpen }">
      <span v-if="formattedValue" class="value-text">{{ formattedValue }}</span>
      <span v-else class="placeholder">Select a date</span>
      <span class="icon"><i class="fas fa-calendar-alt"></i></span>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="calendar-dropdown">
        <div class="calendar-header">
          <button @click.stop="prevMonth" type="button" class="nav-btn">&lt;</button>
          <span class="current-month">{{ months[currentMonth] }} {{ currentYear }}</span>
          <button @click.stop="nextMonth" type="button" class="nav-btn">&gt;</button>
        </div>

        <div class="weekdays">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <div class="days-grid">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="day-cell"
            :class="{
              'empty': !day,
              'selected': day && isSelected(day),
              'today': day && isToday(day),
              'disabled': day && isPastDate(day)
            }"
            @click.stop="day && selectDate(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/index.scss' as *;

.custom-date-picker {
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

.calendar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px; // Fixed width for consistent calendar
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 100;
  margin-top: 5px;
  padding: 15px;
  border-radius: 4px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  .current-month {
    @include interface-font(600);
    color: #000;
  }

  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0 10px;
    color: #666;

    &:hover {
      color: #d4af37;
    }
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 10px;

  span {
    @include interface-font(600);
    font-size: 0.75rem;
    color: #999;
  }
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day-cell {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include body-font(400);
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: $border-radius-md;
  transition: all 0.2s;

  &.empty {
    cursor: default;
    pointer-events: none;
  }

  &:not(.empty):hover {
    background-color: #f5f5f5;
  }

  &.today {
    color: #d4af37;
    font-weight: bold;
  }

  &.selected {
    background-color: #d4af37;
    color: #fff;

    &:hover {
      background-color: color.adjust(#d4af37, $lightness: -5%);
    }
  }

  &.disabled {
    color: #ccc;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
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
