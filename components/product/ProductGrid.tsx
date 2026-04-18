import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  loading = false,
  emptyMessage = "Nenhum produto encontrado.",
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <p className="text-gray-500 font-semibold text-lg">{emptyMessage}</p>
        <p className="text-gray-400 text-sm mt-2">
          Tente ajustar os filtros ou volte mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
