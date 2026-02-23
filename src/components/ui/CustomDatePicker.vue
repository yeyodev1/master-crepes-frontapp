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
@use '@/styles/index.scss' as *;

.custom-date-picker {
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

.calendar-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 320px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  padding: 24px;
  border-radius: $border-radius-lg;
  transform-origin: top left;

  @media (max-width: 400px) {
    width: 280px;
    padding: 15px;
  }
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .current-month {
    @include interface-font(700);
    color: #1a1a1a;
    font-size: 1.1rem;
  }

  .nav-btn {
    background: #f8f9fa;
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #1a1a1a;
    transition: all 0.2s;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 12px;

  span {
    @include interface-font(700);
    font-size: 0.7rem;
    color: #bbb;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include body-font(500);
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;

  &.empty {
    cursor: default;
    pointer-events: none;
  }

  &:not(.empty):not(.disabled):hover {
    background-color: #f8f9fa;
    color: #d4af37;
  }

  &.today:not(.selected) {
    color: #d4af37;
    background-color: rgba(212, 175, 55, 0.05);
  }

  &.selected {
    background-color: #000;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &:hover {
      background-color: #333;
    }
  }

  &.disabled {
    color: #eee;
    cursor: not-allowed;
    text-decoration: line-through;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
