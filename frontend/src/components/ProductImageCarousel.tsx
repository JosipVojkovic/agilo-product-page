import { StoreProduct } from "@medusajs/types";

export default function ProductImageCarousel({
  product,
}: {
  product: StoreProduct | null;
}) {
  return (
    <div className="w-full h-[490px] overflow-hidden relative">
      <img
        src={product?.images?.[0].url}
        alt={product?.title}
        className="w-full h-full object-cover object-center"
      />

      <div className="flex gap-3 absolute bottom-3 left-[50%] translate-x-[-50%] ">
        <p className="px-1 border-b">1</p>
        <p>2</p>
      </div>
    </div>
  );
}
