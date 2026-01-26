<script setup lang="ts">
// WhatsAppButton.vue
// Floating action button for direct WhatsApp communication
const phoneNumber = '17864782727';
const message = 'Hello! I am interested in Master Crepes.'; // Optional pre-filled message

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
</script>

<template>
  <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Chat on WhatsApp">
    <div class="tooltip">Chat with us!</div>
    <div class="icon-wrapper">
      <i class="fab fa-whatsapp"></i>
    </div>
  </a>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  // Entrance animation
  animation: slideIn 0.5s ease-out 1s both;

  &:hover {
    .tooltip {
      opacity: 1;
      transform: translateX(-10px);
      visibility: visible;
    }

    .icon-wrapper {
      transform: scale(1.1);
      box-shadow: 0 0 20px rgba(37, 211, 102, 0.6);
    }
  }
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  // Continuous pulse animation
  animation: pulse 2s infinite;

  i {
    color: #fff;
    font-size: 35px;
    // Fix for FontAwesome vertical alignment if needed
    margin-top: 1px;
    margin-left: 1px;
  }
}

.tooltip {
  position: absolute;
  right: 70px;
  background-color: #fff;
  color: #333;
  padding: 8px 15px;
  border-radius: 20px;
  font-family: sans-serif; // Or use your app font mixin
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateX(0);
  transition: all 0.3s ease;
  pointer-events: none;

  // Little triangle
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .whatsapp-float {
    bottom: 20px;
    right: 20px;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;

    i {
      font-size: 28px;
    }
  }

  // Hide tooltip on mobile to avoid clutter
  .tooltip {
    display: none;
  }
}
</style>
