<template>
  <form @submit.prevent="submitForm" class="form-container">
    <component
      v-for="(field, key) in visibleFields"
      :key="key"
      :is="getComponent(field.type)"
      :id="key"
      :name="key"
      :label="field.label"
      :readonly="field.readonly"
      :options="field.options"
      :placeholder="field.placeholder"
      v-model="formValues[key]"
      :required="field.required"
      :error="errors[key]"
      :min="field.min"
      :max="field.max"
      :fields="field.fields"
      :suggestions="field.suggestions"
    />

    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import InputText from "./InputText.vue";
import SelectInput from "./SelectInput.vue";
import RadioInput from "./RadioInput.vue";
import TextareaInput from "./TextareaInput.vue";
import NumberInput from "./NumberInput.vue";
import CheckboxGroup from "./CheckboxGroup.vue";
import GroupedDimensions from "./GroupedDimensions.vue";
import FeatureList from "./FeatureList.vue";
import ImageGroup from "./ImageGroup.vue";
import TagGroup from "./TagGroup.vue";
import DatePicker from "./DatePicker.vue";
import { useProductFormStore } from "../stores/productFormStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  schema: Object,
});

const store = useProductFormStore();
const { formValues } = storeToRefs(store);


const errors = ref({});

const initFunction=()=>{
  Object.entries(props.schema).forEach(([key, field]) => {
    if (!formValues.value[key]) {
      if (field.type === "group") {
        formValues.value[key] = {};
        Object.keys(field.fields).forEach((sub) => {
          formValues.value[key][sub] = "";
        });
      } else if (
        field.type === "checkbox-group" ||
        field.type === "dynamic-list" ||
        field.type === "images" ||
        field.type === "tags"
      ) {
        formValues.value[key] = [];
      } else {
        formValues.value[key] = "";
      }
    }
  });
  console.log('init function')
}

initFunction()


watch(
  () => formValues.value.publicationStatus,
  (newVal) => {
    if (newVal != "Scheduled") {
      formValues.value.publicationDate = "";
    }
  }
);

function getComponent(type) {
  switch (type) {
    case "text":
      return InputText;
    case "select":
      return SelectInput;
    case "radio":
      return RadioInput;
    case "textarea":
      return TextareaInput;
    case "number":
      return NumberInput;
    case "checkbox-group":
      return CheckboxGroup;
    case "group":
      return GroupedDimensions;
    case "dynamic-list":
      return FeatureList;
    case "images":
      return ImageGroup;
    case "tags":
      return TagGroup;
    case "date":
      return DatePicker;
    default:
      return null;
  }
}

// Conditional field rendering
const visibleFields = computed(() => {
  const result = {};

  Object.entries(props.schema).forEach(([key, field]) => {
    const condition = field.condition;

    // Check if field should be visible
    let isVisible = true;
    if (condition) {
      const currentValue = formValues.value[condition.field];

      if (condition.field === "productWeight") {
        const weightInGrams =
          currentValue.unit === "kg"
            ? currentValue.weight * 1000
            : currentValue.weight;

        const thresholdLabel =
          weightInGrams < 5000 ? "under-threshold" : "above-threshold";

        isVisible = condition.values.includes(thresholdLabel);

        // Set dynamic options
        if (field.dynamicOptions) {
          field.options = field.dynamicOptions[thresholdLabel] || [];
        }
      } else {
        if ("value" in condition) {
          isVisible = currentValue === condition.value;
        } else if ("values" in condition) {
          isVisible = condition.values.includes(currentValue);
        }
      }
    }

    if (isVisible) {
      if (
        field.dynamicOptions &&
        formValues.value[field.condition?.field] &&
        field.condition?.field != "productWeight"
      ) {
        const selected = formValues.value[field.condition.field];
        field.options = field.dynamicOptions[selected] || [];
      }

      if (key === "discountValue") {
        const discountType = formValues.value.discountType;
        if (discountType === "Percentage") {
          field.min = 0;
          field.max = 100;
        } else if (discountType === "Fixed Amount") {
          field.min = 0;
          delete field.max;
        } else {
          delete field.min;
          delete field.max;
        }
      }

      result[key] = field;
    }
  });
  return result;
});

function submitForm() {
  errors.value = {};

  if (formValues.value?.shortDescription?.length > 150) {
    errors.value.shortDescription = "Must be 150 characters or less";
  }
  if (
    formValues.value.price == null ||
    formValues.value.price < 0 ||
    !Number.isInteger(formValues.value.price)
  ) {
    errors.value.price = "Price must be a non-negative integer";
  }
  if (
    !formValues.value?.availableColors?.length &&
    (formValues.value.productCategory == "Electronics" ||
      formValues.value.productCategory == "Clothing")
  ) {
    errors.value.availableColors = "Please select at least one color";
  }
  if (
    !formValues.value?.availableSizes?.length &&
    formValues.value.productCategory == "Clothing"
  ) {
    errors.value.availableSizes = "Please select at least one size";
  }
  if (!formValues.value?.productTags?.length) {
    errors.value.productTags = "Please select at least one Tags ";
  }
  if(!formValues.value?.shippingOptions?.length){
    errors.value.shippingOptions="Please select at least one shipping options"
  }
  if (Object.keys(errors.value).length === 0) {
    console.log(
      "Submitted:",
      formValues.value
    );
    initFunction();
  }
}
</script>

<style scoped>
.form-container {
  max-width: 640px;
  margin: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.submit-btn {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #2563eb;
  width: 100%;
  color: white;
  border-radius: 0.375rem;
  border: 0px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}
</style>
