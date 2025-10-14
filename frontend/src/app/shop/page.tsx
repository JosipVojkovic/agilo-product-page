import CollectionsSection from "@/components/CollectionsSection";
import ProductsSection from "@/components/ProductsSection";

export default function ShopPage() {
  return (
    <main className="flex flex-col gap-[104px] px-4">
      <CollectionsSection />

      <ProductsSection />
    </main>
  );
}
