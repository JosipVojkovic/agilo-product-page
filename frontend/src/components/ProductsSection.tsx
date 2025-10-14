import { ChevronDown } from "./icons/ChevronDown";
import { Plus } from "./icons/Plus";

export default function ProductsSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-custom-md">Shop List</h2>

      <div className="flex justify-between gap-3">
        <button className="w-[84px] h-[33px] flex justify-center items-center gap-1 px-3 py-2 border border-[#D1D1D1] rounded-sm cursor-pointer text-custom-xs">
          Filter <Plus className="w-4 h-4 text-[#808080]" />
        </button>
        <button className="w-[84px] h-[33px] flex justify-center items-center gap-1 px-3 py-2 border border-[#D1D1D1] rounded-sm cursor-pointer text-custom-xs">
          Sort <ChevronDown className="w-4 h-4 text-[#808080]" />
        </button>
      </div>
    </section>
  );
}
