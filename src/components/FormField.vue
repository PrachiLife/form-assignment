<template>
  <div class="form-field">
    <label v-if="label" :for="label" class="field-label">{{ label }}</label>
    <slot />
    <div v-if="error" class="field-error">{{ error }}</div>
  </div>
</template>

<script setup>
import FormField from "./FormField.vue";
defineProps({
  label: String,
  error: String,
});
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}
.field-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #374151;
}
.field-error {
  color: #dc2626;
  font-size: 0.85rem;
}
</style>
