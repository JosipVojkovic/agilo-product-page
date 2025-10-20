import { HttpTypes } from "@medusajs/types";

export const getVariantByOptionValueIds = (
  product: HttpTypes.StoreProduct | null,
  selectedValuesIds: (string | undefined | null)[]
): HttpTypes.StoreProductVariant | null => {
  if (!product || !product?.variants?.length) return null;

  const validIds = selectedValuesIds.filter((id): id is string => !!id);

  if (validIds.length !== selectedValuesIds.length) return null;

  return (
    product.variants.find((variant) => {
      if (!variant.options?.length) return false;

      const variantOptionIds = variant.options.map((o) => o.id);

      if (variantOptionIds.length !== validIds.length) return false;

      return (
        validIds.every((id) => variantOptionIds.includes(id)) &&
        variantOptionIds.every((id) => validIds.includes(id))
      );
    }) ?? null
  );
};
