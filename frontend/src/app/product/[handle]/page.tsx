import { getProductFromHandle } from "@/lib/data/products";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductFromHandle(handle);

  return <main>{product?.title}</main>;
}
