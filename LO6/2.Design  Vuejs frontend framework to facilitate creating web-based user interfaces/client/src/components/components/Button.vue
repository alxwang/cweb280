<template>
  <button :class="['btn', buttonType, buttonSize]" :disabled="isDisabled" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'primary',
    },
    buttonSize: {
      type: String,
      default: 'medium',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}
.btn.primary {
  background-color: #007bff;
  color: #fff;
}
.btn.secondary {
  background-color: #6c757d;
  color: #fff;
}
.btn.medium {
  font-size: 14px;
}
</style>
