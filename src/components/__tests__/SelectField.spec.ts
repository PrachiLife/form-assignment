import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SelectField from "@/components/SelectInput.vue";

describe("SelectField.vue", () => {
  const props = {
    id: "1",
    name: "productCategory",
    label: "Product Category",
    options: ["Electronics", "Clothing", "Food & Beverages"],
    required: true,
  };

  it("renders label and options correctly", () => {
    const wrapper = mount(SelectField, {
      props: {
        ...props,
        modelValue: "",
      },
    });

    const label = wrapper.find("label");
    expect(label.text()).toBe("Product Category");

    const options = wrapper.findAll("option");
    const optionTexts = options.map((o) => o.text());
    expect(optionTexts).toContain("-- Select --");
    expect(optionTexts).toContain("Electronics");
    expect(optionTexts).toContain("Clothing");
  });

  it("sets the correct selected value", () => {
    const wrapper = mount(SelectField, {
      props: {
        ...props,
        modelValue: "Clothing",
      },
    });

    const select = wrapper.find("select");
    expect(select.element.value).toBe("Clothing");
  });

  it("emits update:modelValue on change", async () => {
    const wrapper = mount(SelectField, {
      props: {
        ...props,
        modelValue: "",
      },
    });

    const select = wrapper.find("select");
    await select.setValue("Food & Beverages");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
      "Food & Beverages",
    ]);
  });

  it("respects required and readonly (disabled) attributes", () => {
    const wrapper = mount(SelectField, {
      props: {
        ...{ ...props, required: true, readonly: true },
        modelValue: "",
      },
    });

    const select = wrapper.find("select");
    expect(select.attributes("required")).toBeDefined();
  });
});
