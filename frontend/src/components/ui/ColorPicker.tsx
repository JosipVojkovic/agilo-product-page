import { ProductOption, SelectedOptions } from "@/types/product";

type ColorPickerProps = {
  selectedOptions: SelectedOptions;
  option: ProductOption | null;
  handleOptionChange: (valueId: string, value: string) => void;
};

export default function ColorPicker({
  selectedOptions,
  option,
  handleOptionChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="flex gap-6">
        <span>Color</span>
        <span className="text-[#808080]">{selectedOptions.color.value}</span>
      </p>

      <div className="flex gap-6">
        {option?.values.map((ov) => (
          <div key={ov.id} className="flex flex-col gap-2 w-[32px]">
            <div
              className="w-full h-[32px] bg-gray-500 cursor-pointer"
              onClick={() => handleOptionChange(ov.id, ov.value)}
            ></div>
            <div
              className={`${
                selectedOptions.color.value === ov.value ? "border-b" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
