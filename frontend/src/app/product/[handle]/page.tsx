"use client";

import { use, useEffect, useState } from "react";
import { getProductFromHandle } from "@/lib/data/products";
import { StoreProduct } from "@medusajs/types";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductInformation from "@/components/ProductInformation";
import { SelectedOptions } from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    material: null,
    color: null,
  });
  const [quantity, setQuantity] = useState(1);
  const { handle } = use(params);

  const handleOptionChange = (
    option: keyof SelectedOptions,
    value: string | null
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [option]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductFromHandle(handle);
      setProduct(data);
    };
    fetchData();
  }, [handle]);

  return (
    <main className="flex flex-col mt-[72px]">
      <section className="flex flex-col gap-8">
        <ProductImageCarousel product={product} />

        <ProductInformation
          product={product}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </section>
    </main>
  );
}
