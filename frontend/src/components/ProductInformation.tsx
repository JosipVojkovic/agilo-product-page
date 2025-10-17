import { StoreProduct } from "@medusajs/types";
import CustomSelect from "./ui/CustomSelect";
import { SelectedOptions } from "@/types/product";
import ColorPicker from "./ui/ColorPicker";
import AddToCartControls from "./AddToCartControls";
import { getProductPrice } from "@/lib/util/get-product-prices";
import { getProductOptionValue } from "@/lib/util/get-product-option-value";
import { getProductOption } from "@/lib/util/get-product-option";

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
  const customSelectOption = getProductOption(product, 1);
  const colorOption = getProductOption(product, 0);

  const price = product ? getProductPrice({ product }) : null;

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[#808080]">{product?.collection?.title}</p>
          <h3 className="text-custom-md font-semibold">{product?.title}</h3>
          <p className="text-custom-md">
            €{price?.cheapestPrice?.calculated_price_number}
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
        quantity={quantity}
        setQuantity={setQuantity}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}
