import { relatedProductData } from "@/lib/data/products";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

async function fetchProductById(id: string) {
  const hdrs = headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000";
  const proto = hdrs.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = `${proto}://${host}`;

  const res = await fetch(`${base}/api/products/${id}`, {
    cache: "no-store",
    // Ensure it always runs on server without revalidation caching
    next: { revalidate: 0 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.success || !json?.data) return null;
  return json.data as any;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const id = params.slug?.[0];
  if (!id) {
    notFound();
  }

  const backendProduct = await fetchProductById(id);

  if (!backendProduct) {
    notFound();
  }

  // Map backend product to the shape expected by UI components
  const productData: any = {
    id: backendProduct._id ?? id,
    title: backendProduct.title,
    srcUrl: backendProduct.srcUrl,
    gallery: backendProduct.gallery ?? [],
    price: backendProduct.price,
    discount: backendProduct.discount ?? { amount: 0, percentage: 0 },
    rating: backendProduct.rating ?? 0,
    category: backendProduct.category,
    colors: backendProduct.colors ?? [],
    sizes: backendProduct.sizes ?? [],
    brand: backendProduct.brand,
    dressStyle: backendProduct.dressStyle,
    description: backendProduct.description,
    inStock: backendProduct.inStock ?? true,
    featured: backendProduct.featured ?? false,
  };

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
