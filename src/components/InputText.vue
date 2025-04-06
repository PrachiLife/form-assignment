<template>
  <FormField :label="label" :error="error" :data-test="name">
    <input
      :id="id"
      :name="name"
      type="text"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="modelValue"
      class="form-input"
      :required="required"
    />
  </FormField>
</template>

<script setup>
import {onUnmounted} from "vue";
import FormField from "./FormField.vue";

defineProps({
  id: String,
  name: String,
  label: String,
  readonly: Boolean,
  placeholder: String,
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

.form-input {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  background-color: #fff;
}
</style>
