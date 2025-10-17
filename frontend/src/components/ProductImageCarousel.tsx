"use client";

import { StoreProduct } from "@medusajs/types";
import { useState } from "react";

export default function ProductImageCarousel({
  product,
}: {
  product: StoreProduct | null;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="w-full h-[490px] overflow-hidden relative">
      <img
        src={product?.images?.[currentImageIndex].url}
        alt={product?.title}
        className="w-full h-full object-cover object-center"
      />

      <div className="flex gap-3 absolute bottom-3 left-[50%] translate-x-[-50%] ">
        {product?.images?.map((i, index) => (
          <button
            key={i.id}
            className={`px-1 cursor-pointer ${
              index === currentImageIndex ? "border-b" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
