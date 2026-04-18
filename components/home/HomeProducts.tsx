"use client";

import { useNewProducts, useFeaturedProducts, useBestSellers } from "@/hooks/useProducts";
import FeaturedSection from "./FeaturedSection";

export default function HomeProducts() {
  const { products: newProducts, loading: loadingNew } = useNewProducts();
  const { products: featuredProducts, loading: loadingFeatured } = useFeaturedProducts();
  const { products: bestSellers, loading: loadingBest } = useBestSellers();

  return (
    <>
      <div className="bg-gray-50">
        <FeaturedSection
          title="Novidades"
          subtitle="Acabou de chegar"
          products={newProducts}
          loading={loadingNew}
          href="/catalogo?novo=true"
          accent="pink"
        />
      </div>

      <FeaturedSection
        title="Mais Vendidos"
        subtitle="Favoritas das clientes"
        products={bestSellers}
        loading={loadingBest}
        href="/catalogo?bestseller=true"
        accent="lilac"
      />

      <div className="bg-gray-50">
        <FeaturedSection
          title="Destaques"
          subtitle="Selecionados para você"
          products={featuredProducts}
          loading={loadingFeatured}
          href="/catalogo?destaque=true"
          accent="yellow"
        />
      </div>
    </>
  );
}
