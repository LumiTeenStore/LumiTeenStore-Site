"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { Product } from "@/types";

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  loading?: boolean;
  href?: string;
  accent?: "pink" | "yellow" | "lilac";
}

export default function FeaturedSection({
  title,
  subtitle,
  products,
  loading = false,
  href = "/catalogo",
  accent = "pink",
}: FeaturedSectionProps) {
  const accentColors = {
    pink: "text-lumi-pink",
    yellow: "text-lumi-yellow",
    lilac: "text-lumi-lilac",
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span
              className={`font-bold text-sm uppercase tracking-widest ${accentColors[accent]}`}
            >
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className={`hidden sm:flex items-center gap-2 font-bold text-sm ${accentColors[accent]} hover:gap-3 transition-all duration-200`}
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>

        <ProductGrid
          products={products.slice(0, 8)}
          loading={loading}
        />

        {/* Mobile CTA */}
        <div className="sm:hidden flex justify-center mt-8">
          <Link
            href={href}
            className={`flex items-center gap-2 font-bold ${accentColors[accent]}`}
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
