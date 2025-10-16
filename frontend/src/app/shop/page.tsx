import CollectionsSection from "@/components/CollectionsSection";
import ProductsSection from "@/components/ProductsSection";

export default function ShopPage() {
  return (
    <main className="flex flex-col gap-[104px] mt-[104px]">
      <CollectionsSection />

      <ProductsSection />
    </main>
  );
}
