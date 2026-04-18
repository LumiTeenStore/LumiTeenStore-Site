"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const mainImage = product.images[0];
  const hoverImage = product.images[1];
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <Link href={`/produto/${product.id}`} className="group block">
      <div className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          {mainImage && !imgError ? (
            <>
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImgError(true)}
              />
              {hoverImage && (
                <Image
                  src={hoverImage}
                  alt={`${product.name} - alternativa`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <span className="text-5xl opacity-40">👗</span>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge label="Novo" variant="new" />}
            {product.isBestSeller && <Badge label="Top" variant="bestseller" />}
            {hasDiscount && <Badge label="Oferta" variant="sale" />}
          </div>

          {/* Like button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
            aria-label="Favoritar"
          >
            <Heart
              size={16}
              className={liked ? "fill-lumi-pink text-lumi-pink" : "text-gray-400"}
            />
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2 shadow-lg">
              <ShoppingBag size={14} className="text-lumi-pink" />
              <span className="text-sm font-bold text-gray-800">Ver produto</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-lumi-lilac font-semibold uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-bold text-gray-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-lumi-pink transition-colors">
            {product.name}
          </h3>

          {/* Sizes preview */}
          {product.sizes.length > 0 && (
            <div className="flex gap-1 mb-3 flex-wrap">
              {product.sizes.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="text-xs border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded-md"
                >
                  {s}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lumi-pink text-base">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
