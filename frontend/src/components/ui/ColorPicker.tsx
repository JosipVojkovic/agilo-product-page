import { SelectedOptions } from "@/types/product";

type ColorPickerProps = {
  selectedOptions: SelectedOptions;
  optionValues: { id: string; value: string }[];
  handleOptionChange: (value: string | null) => void;
};

export default function ColorPicker({
  selectedOptions,
  optionValues,
  handleOptionChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="flex gap-6">
        <span>Color</span>
        <span className="text-[#808080]">{selectedOptions.color}</span>
      </p>

      <div className="flex gap-6">
        {optionValues.map((ov) => (
          <div key={ov.id} className="flex flex-col gap-2 w-[32px]">
            <div
              className="w-full h-[32px] bg-gray-500 cursor-pointer"
              onClick={() => handleOptionChange(ov.value)}
            ></div>
            <div
              className={`${
                selectedOptions.color === ov.value ? "border-b" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
