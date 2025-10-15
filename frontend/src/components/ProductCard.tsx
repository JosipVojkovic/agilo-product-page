export default function ProductCard({
  product,
}: {
  product: { handle: string; title: string; price: number; image: string };
}) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      <img src={product.image} alt={product.title} className="w-full h-auto" />

      <div className="flex flex-col gap-1 text-custom-xs">
        <p>{product.title}</p>
        <p className="font-semibold">{product.price}$</p>
      </div>
    </div>
  );
}
