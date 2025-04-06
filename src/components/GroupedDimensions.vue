<template>
  <FormField :label="label" :error="error">
    <div class="form-grid">
      <div v-for="(field, key) in fields" :key="key" class="form-field">
        <label class="field-label">{{ field.label }}</label>

        <input
          v-if="field.type === 'number'"
          type="number"
          v-model.number="modelValue[key]"
          class="input-control"
          :required="required"
          :min="field.min"
        />

        <select
          v-else-if="field.type === 'select'"
          v-model="modelValue[key]"
          class="input-control"
          :required="required"
        >
          <option v-for="opt in field.options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>
    </div>
  </FormField>
</template>


<script setup>
import {onUnmounted} from "vue";
import FormField from "./FormField.vue";
defineProps({
  label: String,
  fields: Object,
  modelValue: Object,
  required: Boolean,
  error:String,
  min:Number,
});

const modelValue = defineModel({ default: "" });
onUnmounted(()=>{
  modelValue.value=null;
})
</script>

<style scoped>

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.input-control {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.input-control:focus {
  outline: none;
  border-color: #2563eb;
}
</style>

