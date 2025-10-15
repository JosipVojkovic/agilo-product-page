import { getProducts } from "@/lib/data/products";
import { ChevronDown } from "./icons/ChevronDown";
import { Plus } from "./icons/Plus";
import ProductCard from "./ProductCard";

export default async function ProductsSection() {
  const { response, nextPage } = await getProducts({ pageParam: 1 });

  console.log("response", response, nextPage);

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

      <div className="grid grid-cols-2 gap-x-4 gap-y-12">
        {response.products.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              handle: p.handle,
              title: p.title,
              price: 1000,
              image: p.thumbnail || "/sofa.svg",
            }}
          />
        ))}
      </div>
    </section>
  );
}
