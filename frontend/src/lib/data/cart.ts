import { HttpTypes, StoreCartResponse } from "@medusajs/types";
import { getRegions } from "./regions";
import { sdk } from "../config";

export const createCart = async () => {
  if (typeof window === "undefined") {
    throw new Error("createCart can only be called on client-side");
  }

  const regions = await getRegions();

  const cartResp = await sdk.store.cart.create({ region_id: regions?.[0].id });
  const cart = cartResp.cart;

  localStorage.setItem("cart_id", cart.id);

  return cart;
};

export const getCart = async () => {
  if (typeof window === "undefined") {
    throw new Error("addToCart can only be called on client-side");
  }

  const cartId = localStorage.getItem("cart_id");
  if (!cartId) return null;

  try {
    const cartResp = await sdk.client.fetch<HttpTypes.StoreCartResponse>(
      `/store/carts/${cartId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return cartResp.cart;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return null;
  }
};

export const addToCart = async ({
  variantId,
  quantity,
}: {
  variantId: string | undefined | null;
  quantity: number;
}) => {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  let cart = await getCart();

  if (!cart) {
    cart = await createCart();
  }

  if (!cart) {
    throw new Error("Cart could not be created or retrieved");
  }

  try {
    const addToCartResp = await sdk.store.cart.createLineItem(cart.id, {
      variant_id: variantId,
      quantity,
    });

    return addToCartResp.cart;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const getCartQuantity = async () => {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const cart = await getCart();

    if (!cart || !cart.items) {
      return 0;
    }

    const totalQuantity = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return totalQuantity;
  } catch (error) {
    console.error("Failed to get cart quantity:", error);
    return 0;
  }
};
