"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useFilters } from "@/hooks/useFilters";
import { filterProducts } from "@/services/products";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import SearchBar from "@/components/catalog/SearchBar";
import Button from "@/components/ui/Button";
import { ProductCategory } from "@/types";

export default function CatalogView() {
  const { products, loading } = useProducts();
  const {
    filters,
    setCategory,
    toggleSize,
    setPriceRange,
    setSearch,
    resetFilters,
    hasActiveFilters,
  } = useFilters();

  const [filterOpen, setFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("categoria") as ProductCategory | null;
    if (cat) setCategory(cat);
  }, [searchParams, setCategory]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  return (
    <div className="min-h-screen bg-lumi-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-lumi-pink/10 to-lumi-lilac/10 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Catálogo
          </h1>
          <p className="text-gray-500">
            {loading ? "Carregando..." : `${filtered.length} peças encontradas`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile search + filter bar */}
        <div className="flex gap-3 mb-6 lg:hidden">
          <SearchBar
            value={filters.search}
            onChange={setSearch}
            className="flex-1"
          />
          <Button
            variant={hasActiveFilters ? "primary" : "outline"}
            onClick={() => setFilterOpen(true)}
            className="shrink-0"
            size="md"
          >
            <SlidersHorizontal size={16} />
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-lumi-yellow rounded-full" />
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="mb-4">
                <SearchBar value={filters.search} onChange={setSearch} />
              </div>
              <FilterSidebar
                filters={filters}
                onCategoryChange={setCategory}
                onSizeToggle={toggleSize}
                onPriceChange={setPriceRange}
                onReset={resetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>

          {/* Mobile filter drawer */}
          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onCategoryChange={setCategory}
              onSizeToggle={toggleSize}
              onPriceChange={setPriceRange}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
            />
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filtered}
              loading={loading}
              emptyMessage="Nenhum produto encontrado com esses filtros."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
