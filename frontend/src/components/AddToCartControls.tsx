"use-client";

import { SelectedOptions } from "@/types/product";
import { Minus } from "./icons/Minus";
import { Plus } from "./icons/Plus";
import { HttpTypes } from "@medusajs/types";
import { addToCart } from "@/lib/data/cart";
import { useCart } from "@/lib/context/CartContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

type AddToCartControlsProps = {
  variant: HttpTypes.StoreProductVariant | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedOptions: SelectedOptions;
};

export default function AddToCartControls({
  variant,
  quantity,
  setQuantity,
  selectedOptions,
}: AddToCartControlsProps) {
  const cart = useCart();
  const router = useRouter();

  const handleDecreaseQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!variant?.id) return;

    await addToCart({ variantId: variant.id, quantity });
    await cart.refreshCartQuantity();
    router.push(ROUTES.SHOP);
  };

  const isOptionsSelected = Boolean(
    selectedOptions.material?.value && selectedOptions.color?.value
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex justify-center items-center gap-4 rounded border border-[#D1D1D1] px-6 py-2">
          <Minus
            className={`w-[24px] h-[24px] cursor-pointer ${
              quantity <= 1 ? "text-[#D1D1D1]" : ""
            }`}
            onClick={handleDecreaseQuantity}
          />
          <span className="text-[20px]">{quantity}</span>
          <Plus
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleIncreaseQuantity}
          />
        </div>

        <button
          className={`flex justify-center items-center rounded text-background bg-foreground border px-6 py-2 h-[48px] md:w-full ${
            !isOptionsSelected ? "cursor-default" : "cursor-pointer"
          }`}
          disabled={!isOptionsSelected}
          onClick={handleAddToCart}
        >
          {isOptionsSelected ? "Add to cart" : "Select variant"}
        </button>
      </div>

      <p className="flex items-center text-[12px] text-[#808080] md:text-[16px]">
        Estimate delivery 2-3 days
      </p>
    </div>
  );
}
