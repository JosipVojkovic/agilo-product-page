import { StoreProduct } from "@medusajs/types";
import CustomSelect from "./ui/CustomSelect";
import { SelectedOptions } from "@/types/product";
import { CustomSelectOption } from "@/types/ui";
import ColorPicker from "./ui/ColorPicker";
import { Minus } from "./icons/Minus";
import { Plus } from "./icons/Plus";
import AddToCartControls from "./AddToCartControls";

type ProductInformationProps = {
  product: StoreProduct | null;
  selectedOptions: SelectedOptions;
  handleOptionChange: (
    option: "material" | "color",
    value: string | null
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
  const customSelectOption: CustomSelectOption | null = product?.options?.[1]
    ? {
        id: product.options[1].id,
        title: product.options[1].title,
        values:
          product.options[1].values?.map((v) => ({
            id: v.id,
            value: v.value,
          })) ?? [],
      }
    : null;

  const colorOption =
    product?.options?.[0].values?.map((v) => ({
      id: v.id,
      value: v.value,
    })) ?? [];

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[#808080]">{product?.collection?.title}</p>
          <h3 className="text-custom-md font-semibold">{product?.title}</h3>
          <p className="text-custom-md">€12000</p>
        </div>

        <p className="text-[#808080] text-custom-xs">{product?.description}</p>
      </div>

      <CustomSelect
        defaultText="Choose Material"
        option={customSelectOption}
        selectedValue={selectedOptions.material}
        handleOptionChange={(value) => handleOptionChange("material", value)}
      />

      <ColorPicker
        selectedOptions={selectedOptions}
        optionValues={colorOption}
        handleOptionChange={(value) => handleOptionChange("color", value)}
      />

      <AddToCartControls
        quantity={quantity}
        setQuantity={setQuantity}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}
