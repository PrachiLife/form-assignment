import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputField from "@/components/InputText.vue";

describe("InputField.vue", () => {
  const props = {
    id: "1",
    name: "productName",
    label: "Product Name",
    readonly: false,
    placeholder: "",
    required: true,
    error: "",
  };

  it("renders with correct label and value", () => {
    const wrapper = mount(InputField, {
      props: {
        ...props,
        modelValue: "Test Product",
      },
    });

    const label = wrapper.find("label");
    expect(label.text()).toBe("Product Name");

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Test Product");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(InputField, {
      props: {
        ...props,
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("New Value");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["New Value"]);
  });

  it("respects readonly and required attributes", () => {
    const wrapper = mount(InputField, {
      props: {
        ...{ ...props, readonly: true, required: true },
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("readonly")).toBeDefined();
    expect(input.attributes("required")).toBeDefined();
  });
});
