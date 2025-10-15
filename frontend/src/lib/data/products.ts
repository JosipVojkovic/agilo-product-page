"use server";

import { HttpTypes } from "@medusajs/types";
import { sdk } from "../config";
import { getRegions } from "./regions";

export const getProducts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}> => {
  const limit = queryParams?.limit || 8;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  const regions = await getRegions();

  const { products, count } = await sdk.client.fetch<{
    products: HttpTypes.StoreProduct[];
    count: number;
  }>(`/store/products`, {
    method: "GET",
    query: {
      limit,
      offset,
      region_id: regions?.[0]?.id,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
      ...queryParams,
    },
    cache: "reload",
  });

  const nextPage = count > offset + limit ? pageParam + 1 : null;

  return {
    response: {
      products,
      count,
    },
    nextPage,
    queryParams,
  };
};
