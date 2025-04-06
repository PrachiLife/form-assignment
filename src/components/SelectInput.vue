<template>
  <FormField :label="label" :error="error" :data-test="name">
    <select
      :id="id"
      :name="name"
      v-model="modelValue"
      class="form-select"
      :required="required"
      :data-test="label"
    >
      <option disabled value="">-- Select --</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </FormField>
</template>

<script setup>
import { onUnmounted } from "vue";
import FormField from "./FormField.vue";
defineProps({
  id: String,
  name: String,
  label: String,
  options: Array,
  required: Boolean,
  error: String,
});

const modelValue = defineModel({ default: "" });

onUnmounted(()=>{
  modelValue.value=null;
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.form-select {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  background-color: white;
  transition: border-color 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #2563eb;
}
</style>
