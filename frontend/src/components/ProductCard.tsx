export default function ProductCard({
  product,
}: {
  product: { name: string; price: number; image: string };
}) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      <img src={product.image} alt={product.name} className="w-full h-auto" />

      <div className="flex flex-col gap-1 text-custom-xs">
        <p>{product.name}</p>
        <p className="font-semibold">{product.price}$</p>
      </div>
    </div>
  );
}
