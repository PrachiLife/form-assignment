<template>
  <FormField :label="label" :error="error">
    <textarea
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxlength"
      v-model="modelValue"
      class="form-textarea"
      rows="4"
      :required="required"
    />
    <div v-if="maxlength" class="char-counter">
      {{ modelValue.length }} / {{ maxlength }}
    </div>
  </FormField>
</template>


<script setup>
import {onUnmounted} from "vue";
import FormField from "./FormField.vue";
defineProps({
  id: String,
  name: String,
  label: String,
  placeholder: String,
  maxlength: Number,
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

.form-textarea {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
  background-color: #fff;
}

.char-counter {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
  margin-top: 0.25rem;
}
</style>

