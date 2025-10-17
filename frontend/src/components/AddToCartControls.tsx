import { SelectedOptions } from "@/types/product";
import { Minus } from "./icons/Minus";
import { Plus } from "./icons/Plus";

type AddToCartControlsProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedOptions: SelectedOptions;
};

export default function AddToCartControls({
  quantity,
  setQuantity,
  selectedOptions,
}: AddToCartControlsProps) {
  const handleDecreaseQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const isOptionsSelected = Boolean(
    selectedOptions.material && selectedOptions.color
  );

  return (
    <div className="flex flex-col gap-4">
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
        className={`flex justify-center items-center rounded text-background bg-foreground border px-6 py-2 h-[48px] ${
          !isOptionsSelected ? "cursor-default" : "cursor-pointer"
        }`}
        disabled={!isOptionsSelected}
      >
        {isOptionsSelected ? "Add to cart" : "Select variant"}
      </button>
      <p className="flex items-center text-custom-xs text-[#808080]">
        Estimate delivery 2-3 days
      </p>
    </div>
  );
}
