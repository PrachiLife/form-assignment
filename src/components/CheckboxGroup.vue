<template>
  <FormField :label="label" :error="error">
    <div class="checkbox-group">
      <label
        v-for="option in options"
        :key="option"
        class="checkbox-option"
      >
        <input type="checkbox" :value="option" v-model="modelValue"/>
        <span>{{ option }}</span>
      </label>
    </div>
  </FormField>
</template>

<script setup>
import {onUnmounted} from "vue";
import FormField from './FormField.vue'
defineProps({
  label: String,
  options: Array,
  modelValue: Array,
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
  margin-bottom: 0.25rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
</style>

