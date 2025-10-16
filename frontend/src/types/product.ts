import { CollectionType } from "./collection";

export type ProductOptionValue = {
  id: string;
  value: string;
};

export type ProductOption = {
  id: string;
  title: string;
  values: [ProductOptionValue];
};

export type ProductImage = {
  id: string;
  url: string;
  rank: number;
};

export type CalculatedPrice = {
  id: string;
  calculated_amount: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  sku: string | null;
  variant_rank: number;
  calculated_price: CalculatedPrice;
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  discountable: boolean;
  thumbnail: string;
  collection_id: string;
  collection: CollectionType;
  options: [ProductOption];
  images: [ProductImage];
  variants: [ProductVariant];
};

export type SelectedOptions = {
  material: string | null;
  color: string | null;
};
