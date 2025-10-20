"use client";

import { StoreProduct } from "@medusajs/types";
import { useState } from "react";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";

export default function ProductImageCarousel({
  product,
}: {
  product: StoreProduct | null;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (!product?.images?.length) return null;

  const total = product.images.length;

  const handleNext = () => {
    if (currentImageIndex < total - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const getTranslateX = () => {
    if (total === 1) return "0";

    if (window.innerWidth < 768) {
      return `-${currentImageIndex * 100}%`;
    }

    if (currentImageIndex === 0) return "-2rem";
    if (currentImageIndex === total - 1)
      return `calc(-${(total - 1) * 80}% - ${(total - 1) * 2}rem + 20%)`;
    return `calc(-${currentImageIndex * 80}% - ${
      currentImageIndex * 2
    }rem + 10%)`;
  };

  return (
    <div className="relative w-full h-[490px] overflow-hidden md:w-1/2 md:h-auto">
      <div className="relative w-full h-full sm:h-[612px] overflow-hidden flex items-center">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${getTranslateX()})`,
          }}
        >
          {product.images.map((i, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-[80%] md:mx-4 h-full overflow-hidden"
            >
              <img
                src={i.url}
                alt={product.title}
                className="w-full h-[490px] sm:h-[612px] object-cover object-center"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-foreground p-2 z-10 ${
            currentImageIndex <= 0
              ? "bg-transparent cursor-default"
              : "bg-foreground text-background cursor-pointer"
          }`}
          disabled={currentImageIndex <= 0}
        >
          <ArrowLeft />
        </button>

        <button
          onClick={handleNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-foreground p-2 z-10 ${
            currentImageIndex >= total - 1
              ? "bg-transparent cursor-default"
              : "bg-foreground text-background cursor-pointer"
          }`}
          disabled={currentImageIndex >= total - 1}
        >
          <ArrowRight />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-3 mt-4 md:relative">
        {product.images.map((i, index) => (
          <button
            key={i.id}
            className={`px-1 cursor-pointer ${
              index === currentImageIndex ? "border-b-2 border-black" : ""
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
