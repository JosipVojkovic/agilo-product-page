"use client";

import { use, useEffect, useState } from "react";
import { getProductFromHandle } from "@/lib/data/products";
import { StoreProduct } from "@medusajs/types";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductInformation from "@/components/ProductInformation";
import { SelectedOptions } from "@/types/product";
import Loader from "@/components/Loader";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    material: { valueId: "", value: "" },
    color: { valueId: "", value: "" },
  });
  const [quantity, setQuantity] = useState(1);
  const { handle } = use(params);

  const handleOptionChange = (
    option: keyof SelectedOptions,
    valueId: string,
    value: string
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [option]: { valueId, value } }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductFromHandle(handle);
      setProduct(data);
    };
    fetchData();
  }, [handle]);

  return (
    <main className="flex flex-col mt-[72px] md:mt-[144px]">
      {!product ? (
        <Loader />
      ) : (
        <section className="flex flex-col gap-8 md:flex-row md:px-16">
          <ProductImageCarousel product={product} />

          <ProductInformation
            product={product}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </section>
      )}
    </main>
  );
}
