import { ProductOption } from "@/types/product";
import { HttpTypes } from "@medusajs/types";

export const getProductOption = (
  product: HttpTypes.StoreProduct | null,
  optionTitle: string
): ProductOption | null => {
  if (!product || !product.options || !product.options.length) {
    return null;
  }

  const option = product.options.find(
    (o) => o.title.toLowerCase() === optionTitle.toLowerCase()
  );

  if (!option) {
    return null;
  }

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
