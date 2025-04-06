import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductFormStore = defineStore("productForm", () => {
  const formValues = ref({
    productId: `PID-${Date.now().toString().slice(-6)}`,
    productImages: [],
  });

  return { formValues };
});
