import { HttpTypes } from "@medusajs/types";

export const getProductOptionValue = (
  product: HttpTypes.StoreProduct | null,
  valueId: string | null
): string | null => {
  if (!product || !valueId) return null;

  const allValues = product.options?.flatMap((o) => o.values ?? []) ?? [];
  const foundValue = allValues.find((v) => v.id === valueId);
  const result = foundValue ? foundValue.value : null;

  return result;
};
