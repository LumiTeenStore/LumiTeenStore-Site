"use client";

import { useState, useCallback } from "react";
import { FilterState, ProductCategory, Size } from "@/types";
import { PRICE_RANGE } from "@/lib/constants";

const initialFilters: FilterState = {
  category: "",
  sizes: [],
  minPrice: PRICE_RANGE.min,
  maxPrice: PRICE_RANGE.max,
  search: "",
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setCategory = useCallback((category: ProductCategory | "") => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const toggleSize = useCallback((size: Size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters =
    filters.category !== "" ||
    filters.sizes.length > 0 ||
    filters.minPrice !== PRICE_RANGE.min ||
    filters.maxPrice !== PRICE_RANGE.max ||
    filters.search !== "";

  return {
    filters,
    setCategory,
    toggleSize,
    setPriceRange,
    setSearch,
    resetFilters,
    hasActiveFilters,
  };
}
