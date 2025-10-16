import { StoreProduct } from "@medusajs/types";
import CustomSelect from "./ui/CustomSelect";
import { SelectedOptions } from "@/types/product";

type ProductInformationProps = {
  product: StoreProduct | null;
  selectedOptions: SelectedOptions;
  handleOptionChange: (
    option: "material" | "color",
    value: string | null
  ) => void;
};

export default function ProductInformation({
  product,
  selectedOptions,
  handleOptionChange,
}: ProductInformationProps) {
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

      <div className="flex flex-col gap-4">
        <p className="flex gap-6">
          <span>Materials</span>
          <span className="text-[#808080]">{selectedOptions.material}</span>
        </p>

        <CustomSelect
          defaultText="Choose Material"
          options={["Linen", "Cotton", "Silk"]}
          selectedValue={selectedOptions.material}
          handleOptionChange={(value) => handleOptionChange("material", value)}
        />
      </div>

      <div></div>

      <div></div>
    </div>
  );
}
