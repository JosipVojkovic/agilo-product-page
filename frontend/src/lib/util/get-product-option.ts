import { ProductOption } from "@/types/product";
import { HttpTypes } from "@medusajs/types";

export const getProductOption = (
  product: HttpTypes.StoreProduct | null,
  optionIndex: number
): ProductOption | null => {
  if (!product || !product.options || !product.options[optionIndex]) {
    return null;
  }

  const option = product.options[optionIndex];

  return {
    id: option.id,
    title: option.title,
    values:
      option.values?.map((v) => ({
        id: v.id,
        value: v.value,
      })) ?? [],
  };
};
