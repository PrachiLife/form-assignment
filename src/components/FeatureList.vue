<template>
  <FormField :label="label" :error="error">
    <div class="feature-list">
      <div v-for="(feature, i) in features" :key="i" class="feature-item">
        <input v-model="modelValue[i]" class="feature-input" :required="required"/>
        <button @click="remove(i)" type="button" class="remove-btn">✕</button>
      </div>
      <button @click="add" type="button" class="add-btn">+ Add Feature</button>
    </div>
  </FormField>
</template>

<script setup>
import {computed,onUnmounted} from "vue";
import FormField from "./FormField.vue";
defineProps({
  label: String,
  modelValue: Array,
  required: Boolean,
  error: String,
});

const modelValue = defineModel({ default: () => [] });

const features = computed(() => modelValue.value);

function add() {
   modelValue.value.push("");
}
function remove(index) {
  modelValue.value.splice(index, 1);
}
onUnmounted(()=>{
 modelValue.value=null;
})
</script>

<style scoped>
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-input {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.feature-input:focus {
  outline: none;
  border-color: #2563eb;
}

.remove-btn {
  color: #dc2626;
  font-size: 1.25rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
}

.add-btn {
  margin-top: 0.5rem;
  color: #2563eb;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>

