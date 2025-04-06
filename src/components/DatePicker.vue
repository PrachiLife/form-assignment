<template>
  <div class="date-picker">
    <input
      type="date"
      v-model="modelValue"
      :min="today"
      :max="max"
      :placeholder="placeholder"
      class="date-input"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const modelValue = defineModel({ type: String })

const props = defineProps({
  max: String,
  placeholder: {
    type: String,
    default: 'Select date',
  },
})

const today = computed(() => {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})

onUnmounted(()=>{
 modelValue.value=null;
})
</script>

<style scoped>
.date-picker {
  display: inline-block;
  width: 100%;
}

.date-input {
  width: 100%;
  padding: 0.5rem 0rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
</style>
