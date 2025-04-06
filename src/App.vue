<template>
  <main>
    <ProductForm :schema="formSchema" />
  </main>
</template>

<script setup>
import ProductForm from "./components/ProductForm.vue";

const formSchema = {
  productId: {
    type: "text",
    label: "Product ID",
    readonly: true,
  },
  productName: {
    type: "text",
    label: "Product Name",
    required: true,
  },
  productCategory: {
    type: "select",
    label: "Product Category",
    required: true,
    options: [
      "Electronics",
      "Clothing",
      "Food & Beverages",
      "Home & Garden",
      "Beauty & Personal Care",
      "Other",
    ],
  },
  customCategory: {
    type: "text",
    label: "Custom Category",
    required: true,
    condition: {
      field: "productCategory",
      value: "Other",
    },
  },
  subCategory: {
    type: "select",
    label: "Sub-Category",
    required: true,
    condition: {
      field: "productCategory",
      values: ["Electronics", "Clothing","Food & Beverages","Home & Garden","Beauty & Personal Care"],
    },
    dynamicOptions: {
      Electronics: ["Phones", "Laptops"],
      Clothing: ["Tops", "Bottoms", "Footwear"],
      "Food & Beverages":["Drink","Snacks"],
      "Home & Garden":["Home","Garden"],
      "Beauty & Personal Care":["Beauty","Personal Care"]
    },
  },
  productType: {
    type: "radio",
    label: "Product Type",
    required: true,
    condition: {
      field: "subCategory",
      values: ["Phones", "Laptops", "Tops", "Bottoms", "Footwear","Drink","Snacks","Home","Garden","Beauty","Personal Care"],
    },
    dynamicOptions: {
      Phones: ["Smartphone", "Feature Phone"],
      Laptops: ["Ultrabook", "Gaming Laptop"],
      Tops: ["T-Shirt", "Shirt"],
      Bottoms: ["Jeans", "Shorts"],
      Footwear: ["Sneakers", "Sandals"],
      Drink:["Coco-cola","Lime Juice"],
      Snacks:["Chips","Biscuits"],
      Home:["Fridge","AC"],
      Garden:["Flowers","Soil"],
      Beauty:["Perfume","Cream"],
      "Personal Care":["Shampoo","Powder"]
    },
  },
  brandName: {
    type: "text",
    label: "Brand Name",
    required: true,
  },
  modelNumber: {
    type: "text",
    label: "Model Number",
    condition: {
      field: "productCategory",
      value: "Electronics",
    },
    required: true,
  },
  productDescription: {
    type: "textarea",
    label: "Product Description",
    required: true,
  },
  shortDescription: {
    type: "textarea",
    label: "Short Description (max 150 characters)",
    required: true,
  },
  price: {
    type: "number",
    label: "Price",
    required: true,
    min: 0,
  },
  currency: {
    type: "select",
    label: "Currency",
    required: true,
    options: ["USD", "EUR", "INR", "GBP"],
  },
  discountType: {
    type: "radio",
    label: "Discount Type",
    options: ["No Discount", "Percentage", "Fixed Amount"],
    required: true,
  },
  discountValue: {
    type: "number",
    label: "Discount Value",
    required: true,
    condition: {
      field: "discountType",
      values: ["Percentage", "Fixed Amount"],
    },
  },
  taxCategory: {
    type: "select",
    label: "Tax Category",
    required: true,
    options: ["GST 5%", "GST 12%", "GST 18%", "GST 28%"],
  },
  stockQuantity: {
    type: "number",
    label: "Stock Quantity",
    required: true,
    min: 0,
  },
  productWeight: {
    type: "group",
    label: "Product Weight",
    required: true,
    fields: {
      weight: { type: "number", label: "Weight", min: 0 },
      unit: {
        type: "select",
        label: "Unit",
        options: ["g", "kg"],
      },
    },
  },
  productDimensions: {
    type: "group",
    label: "Product Dimensions",
    required: true,
    fields: {
      length: { type: "number", label: "Length", min: 0 },
      width: { type: "number", label: "Width", min: 0 },
      height: { type: "number", label: "Height", min: 0 },
      unit: {
        type: "select",
        label: "Unit",
        options: ["cm", "inches"],
      },
    },
  },
  availableColors: {
    type: "checkbox-group",
    label: "Available Colors",
    required: true,
    condition: {
      field: "productCategory",
      values: ["Clothing", "Electronics"],
    },
    options: ["Red", "Blue", "Black", "White", "Green", "Yellow"],
  },
  availableSizes: {
    type: "checkbox-group",
    label: "Available Sizes",
    required: true,
    condition: {
      field: "subCategory",
      values: ["Tops", "Bottoms", "Footwear"],
    },
    dynamicOptions: {
      Tops: ["XS", "S", "M", "L", "XL", "XXL"],
      Bottoms: ["28", "30", "32", "34", "36", "38", "40"],
      Footwear: ["6", "7", "8", "9", "10", "11"],
    },
  },
  material: {
    type: "text",
    label: "Material",
    required: true,
    condition: {
      field: "productCategory",
      values: ["Clothing", "Home & Garden"],
    },
  },
  productFeatures: {
    type: "dynamic-list",
    required: true,
    label: "Product Features",
  },
  shippingOptions: {
    type: "checkbox-group",
    label: "Shipping Options",
    required: true,
    condition: {
      field: "productWeight",
      values: ["under-threshold", "above-threshold"],
    },
    dynamicOptions: {
      "under-threshold": ["Standard", "Express", "Next Day", "International"],
      "above-threshold": ["Standard", "Express", "International"],
    },
  },
  returnPolicy: {
    type: "select",
    label: "Return Policy",
    required: true,
    options: [
      "7-Day Return Policy",
      "10-Day Return Policy",
      "15-Day Return Policy",
      "30-Day Return Policy",
    ],
  },
  warrantyPeriod: {
    type: "group",
    label: "Warranty Period",
    required: true,
    condition: {
      field: "productCategory",
      values: ["Electronics", "Home & Garden"],
    },
    fields: {
      weight: { type: "number", label: "Warranty", min: 0 },
      unit: {
        type: "select",
        label: "Period",
        options: ["days", "month", "Year"],
      },
    },
  },
  productImages: {
    type: "images",
    required: true,
    multipleAllowed: true,
  },
  productTags: {
    type: "tags",
    required: true,
    suggestions: ["product1", "product2", "product3", "product4"],
    label: "Tags",
  },
  seoKeywords: {
    type: "textarea",
    label: "SEO keywords",
    required: true,
  },
  publicationStatus: {
    type: "radio",
    label: "Publication Status",
    required: true,
    options: ["Draft", "Published", "Scheduled"],
  },
  publicationDate: {
    type: "date",
    label: "Publication Date",
    required: true,
    condition: {
      field: "publicationStatus",
      value: "Scheduled",
    },
  },
};
</script>

<style scoped></style>
