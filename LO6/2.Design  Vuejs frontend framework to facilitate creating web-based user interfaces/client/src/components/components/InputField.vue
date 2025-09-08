<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <input :id="id" :type="type" v-model="value" :placeholder="placeholder" />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text',
    },
    value: String,
    placeholder: String,
    error: String,
  },
};
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
}
.error {
  color: red;
  font-size: 12px;
}
</style>
