import { ROUTES } from "@/lib/constants/routes";
import Link from "next/dist/client/link";

export default function ProductCard({
  product,
}: {
  product: { handle: string; title: string; price: number; image: string };
}) {
  return (
    <Link href={ROUTES.PRODUCT(product.handle)}>
      <div className="flex flex-col gap-4 cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[163px] object-cover sm:h-[286px]"
        />

        <div className="flex flex-col gap-1 text-custom-xs">
          <p>{product.title}</p>
          <p className="font-semibold">{product.price}$</p>
        </div>
      </div>
    </Link>
  );
}
