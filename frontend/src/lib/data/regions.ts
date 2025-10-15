import { sdk } from "../config";
import { HttpTypes } from "@medusajs/types";
import medusaError from "../util/medusa-error";

export const getRegions = async () => {
  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};
