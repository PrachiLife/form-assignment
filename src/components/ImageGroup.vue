<template>
  <div class="image-upload-group">
    <label class="upload-label" for="image-upload">
      <div class="upload-box">
        <span>+ Upload Images</span>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          @change="handleFileChange"
          class="hidden-input"
          :required="!previews.length ? required :false"
        />
      </div>
    </label>

    <div class="preview-grid">
      <div
        v-for="(img, index) in previews"
        :key="index"
        class="preview-item"
      >
        <img :src="img.url" :alt="'Image ' + index" />
        <button @click="removeImage(index)" class="remove-btn">×</button>
      </div>
    </div>

    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const modelValue = defineModel({ type: Array, default: () => [] })

const MAX_SIZE_MB = 2

const previews = ref([])
const errorMsg = ref('')

defineProps({
    required:Boolean,
})


watch(modelValue, (newVal) => {
  if (newVal.length === 0) {
    previews.value = []
  }
})

function handleFileChange(event) {
  const files = Array.from(event.target.files)
  errorMsg.value = ''

  for (const file of files) {
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > MAX_SIZE_MB) {
      errorMsg.value = `File ${file.name} exceeds ${MAX_SIZE_MB}MB.`
      continue
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push({
        file,
        url: e.target.result
      })
      updateModel()
    }
    reader.readAsDataURL(file)
  }

  event.target.value = ''
}

function removeImage(index) {
  previews.value.splice(index, 1)
  updateModel()
}

function updateModel() {
  modelValue.value = previews.value.map(item => item.file)
}
onUnmounted(()=>{
 modelValue.value=null;
})
</script>

<style scoped>
.image-upload-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-label {
  cursor: pointer;
}

.upload-box {
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
}

.hidden-input {
  opacity: 0;
  width: 2px;
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-weight: bold;
}

.error-msg {
  color: red;
  font-size: 0.875rem;
}
</style>
