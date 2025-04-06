<template>
  <FormField :label="label" :error="error">
    <div class="radio-group">
      <label
        v-for="option in options"
        :key="option"
        class="radio-option"
      >
        <input
          type="radio"
          :name="name"
          :value="option"
          v-model="modelValue"
          :required="required"
        />
        <span>{{ option }}</span>
      </label>
    </div>
  </FormField>
</template>


<script setup>
import {onUnmounted} from "vue";
import FormField from './FormField.vue'
defineProps({
  name: String,
  label: String,
  options: Array,
  required: Boolean,
  error:String,
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
  margin-bottom: 0.5rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
</style>
