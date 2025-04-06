<template>
  <FormField :label="label" :error="error">
    <div class="tag-wrapper">
      <div class="tag-list">
        <span v-for="(tag, index) in modelValue" :key="index" class="tag">
          {{ tag }}
          <button @click="removeTag(index)" class="remove-btn">×</button>
        </span>

        <input
          v-model="input"
          @keydown.enter.prevent="addTag"
          @keydown.tab.prevent="addTag"
          @keydown.backspace="removeLastIfEmpty"
          @input="updateSuggestions"
          placeholder="Type to add tags..."
          class="tag-input"
        />
      </div>

      <ul v-if="filteredSuggestions.length && input" class="suggestions">
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </FormField>
</template>

<script setup>
import { ref, computed,onUnmounted } from "vue";
import FormField from "./FormField.vue";

const modelValue = defineModel({ type: Array, default: () => [] });
const props = defineProps({
  suggestions: {
    type: Array,
    default: () => [],
  },
  label:String,
  error:String,
});

const input = ref("");
const filteredSuggestions = ref([]);

function addTag() {
  const tag = input.value.trim();
  if (tag && !modelValue.value.includes(tag)) {
    modelValue.value.push(tag);
  }
  input.value = "";
  filteredSuggestions.value = [];
}

function removeTag(index) {
  modelValue.value.splice(index, 1);
}

function removeLastIfEmpty(e) {
  if (input.value === "" && modelValue.value.length > 0) {
    modelValue.value.pop();
  }
}

function updateSuggestions() {
  const search = input.value.toLowerCase();
  filteredSuggestions.value = props.suggestions.filter(
    (s) => s.toLowerCase().includes(search) && !modelValue.value.includes(s)
  );
}

function selectSuggestion(suggestion) {
  if (!modelValue.value.includes(suggestion)) {
    modelValue.value.push(suggestion);
  }
  input.value = "";
  filteredSuggestions.value = [];
}
onUnmounted(()=>{
 modelValue.value=null;
})
</script>

<style scoped>
.tag-wrapper {
  position: relative;
  width: 100%;
  max-width: 640px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
}

.tag {
  background-color: #eef;
  color: #333;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-btn {
  background: transparent;
  border: none;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  padding: 4px;
}

.suggestions {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>
