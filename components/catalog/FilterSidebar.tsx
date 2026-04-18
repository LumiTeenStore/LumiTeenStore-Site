"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { FilterState, ProductCategory, Size } from "@/types";
import { CATEGORIES, SIZES, PRICE_RANGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FilterSidebarProps {
  filters: FilterState;
  onCategoryChange: (cat: ProductCategory | "") => void;
  onSizeToggle: (size: Size) => void;
  onPriceChange: (min: number, max: number) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  filters,
  onCategoryChange,
  onSizeToggle,
  onPriceChange,
  onReset,
  hasActiveFilters,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen !== undefined && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "bg-white rounded-3xl p-6 border border-gray-100 shadow-sm",
          isOpen !== undefined && [
            "fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto rounded-none lg:relative lg:rounded-3xl lg:z-auto lg:w-auto lg:overflow-visible transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          ]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-lumi-pink" />
            <h3 className="font-bold text-gray-900">Filtros</h3>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="text-xs text-lumi-pink font-semibold hover:underline"
              >
                Limpar
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Category */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Categoria</h4>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    filters.category === cat.value
                      ? "bg-lumi-pink text-white"
                      : "text-gray-600 hover:bg-pink-50"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">Tamanho</h4>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={cn(
                    "w-12 h-10 rounded-xl text-sm font-bold border-2 transition-all duration-200",
                    filters.sizes.includes(size)
                      ? "border-lumi-pink bg-lumi-pink text-white"
                      : "border-gray-200 text-gray-600 hover:border-lumi-pink hover:text-lumi-pink"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-3">
              Preço: R$ {filters.minPrice} – R$ {filters.maxPrice}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12">Mín</span>
                <input
                  type="range"
                  min={PRICE_RANGE.min}
                  max={PRICE_RANGE.max}
                  step={10}
                  value={filters.minPrice}
                  onChange={(e) =>
                    onPriceChange(Number(e.target.value), filters.maxPrice)
                  }
                  className="flex-1 accent-lumi-pink"
                />
                <span className="text-xs text-gray-600 w-12 text-right">
                  R${filters.minPrice}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12">Máx</span>
                <input
                  type="range"
                  min={PRICE_RANGE.min}
                  max={PRICE_RANGE.max}
                  step={10}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onPriceChange(filters.minPrice, Number(e.target.value))
                  }
                  className="flex-1 accent-lumi-pink"
                />
                <span className="text-xs text-gray-600 w-12 text-right">
                  R${filters.maxPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile apply button */}
          {onClose && (
            <Button
              fullWidth
              onClick={onClose}
              className="lg:hidden"
            >
              Ver resultados
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
