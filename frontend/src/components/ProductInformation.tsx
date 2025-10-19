import { HttpTypes, StoreProduct } from "@medusajs/types";
import CustomSelect from "./ui/CustomSelect";
import { SelectedOptions } from "@/types/product";
import ColorPicker from "./ui/ColorPicker";
import AddToCartControls from "./AddToCartControls";
import { getProductPrice } from "@/lib/util/get-product-prices";
import { getProductOption } from "@/lib/util/get-product-option";
import { getVariantByOptionValueIds } from "@/lib/util/get-product-variant";

type ProductInformationProps = {
  product: StoreProduct | null;
  selectedOptions: SelectedOptions;
  handleOptionChange: (
    option: "material" | "color",
    valueId: string,
    value: string
  ) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export default function ProductInformation({
  product,
  selectedOptions,
  handleOptionChange,
  quantity,
  setQuantity,
}: ProductInformationProps) {
  const customSelectOption = getProductOption(product, "material");
  const colorOption = getProductOption(product, "color");

  const variant: HttpTypes.StoreProductVariant | null =
    getVariantByOptionValueIds(product, [
      selectedOptions.material.valueId,
      selectedOptions.color.valueId,
    ]);
  const prices = product
    ? getProductPrice({ product, variantId: variant?.id })
    : null;
  const shownPrice = prices?.variantPrice
    ? prices.variantPrice.calculated_price_number
    : prices?.cheapestPrice?.calculated_price_number;

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[#808080]">{product?.collection?.title}</p>
          <h3 className="text-custom-md font-semibold">{product?.title}</h3>
          <p className="text-custom-md">
            {prices?.variantPrice ? `€${shownPrice}` : `From €${shownPrice}`}
          </p>
        </div>

        <p className="text-[#808080] text-custom-xs">{product?.description}</p>
      </div>

      <CustomSelect
        defaultText="Choose Material"
        option={customSelectOption}
        selectedValue={selectedOptions.material.value}
        handleOptionChange={(valueId, value) =>
          handleOptionChange("material", valueId, value)
        }
      />

      <ColorPicker
        selectedOptions={selectedOptions}
        option={colorOption}
        handleOptionChange={(valueId, value) =>
          handleOptionChange("color", valueId, value)
        }
      />

      <AddToCartControls
        variant={variant}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}
