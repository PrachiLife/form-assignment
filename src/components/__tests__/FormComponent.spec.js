import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ProductForm from "../ProductForm.vue";
import { useProductFormStore } from "@/stores/productFormStore";

const schema = {
  productCategory: {
    type: "select",
    label: "Product Category",
    options: ["Electronics", "Clothing"],
  },
  subCategory: {
    type: "select",
    label: "Sub-Category",
    condition: {
      field: "productCategory",
      values: ["Clothing", "Electronics"],
    },
    dynamicOptions: {
      Electronics: ["Phones", "Laptops"],
      Clothing: ["Tops", "Bottoms"],
    },
  },
};

describe("ProductForm.vue", () => {
  it("renders subCategory when productCategory is Clothing and loads correct options", async () => {
    const wrapper = mount(ProductForm, {
      props: { schema },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const categorySelect = wrapper.find('[data-test="Product Category"]');

    await categorySelect.setValue("Clothing");

    await wrapper.vm.$nextTick();

    const subCategorySelect = wrapper.find('[data-test="Sub-Category"]');
    expect(subCategorySelect.exists()).toBe(true);

    const options = subCategorySelect.findAll("option");
    const optionTexts = options.map((opt) => opt.text());
    expect(optionTexts).toEqual(expect.arrayContaining(["Tops", "Bottoms"]));
  });
});
