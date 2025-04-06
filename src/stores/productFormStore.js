import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductFormStore = defineStore("productForm", () => {
  const formValues = ref({
    productImages: [],
  });

  return { formValues };
});
