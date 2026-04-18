"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronLeft, ZoomIn } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";
import { STORE_INFO, WHATSAPP_LINK, WHATSAPP_MESSAGE } from "@/lib/constants";
import { Size, Color } from "@/types";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";

interface ProductViewProps {
  id: string;
}

export default function ProductView({ id }: ProductViewProps) {
  const { product, loading, error } = useProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Produto não encontrado</h2>
        <p className="text-gray-500 mb-6">Este produto pode ter sido removido.</p>
        <Link href="/catalogo">
          <Button>Ver catálogo</Button>
        </Link>
      </div>
    );
  }

  const whatsappMessage = WHATSAPP_MESSAGE(
    `${product.name}${selectedSize ? ` – Tam: ${selectedSize}` : ""}${selectedColor ? ` – Cor: ${selectedColor.name}` : ""}`
  );
  const whatsappUrl = WHATSAPP_LINK(STORE_INFO.whatsapp, whatsappMessage);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-lumi-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lumi-pink transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Voltar ao catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 group cursor-zoom-in flex items-center justify-center"
              onClick={() => setZoomOpen(true)}
            >
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <span className="text-8xl opacity-30">👗</span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 rounded-full p-3">
                  <ZoomIn size={20} className="text-gray-700" />
                </div>
              </div>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge label="Novo" variant="new" />}
                {product.isBestSeller && <Badge label="Top" variant="bestseller" />}
                {hasDiscount && <Badge label={`-${discountPercent}%`} variant="sale" />}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-lumi-pink scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-lumi-lilac font-bold text-sm uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-lumi-pink">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {product.colors.length > 0 && (
              <div>
                <p className="font-bold text-gray-800 text-sm mb-3">
                  Cor:{" "}
                  <span className="font-semibold text-lumi-pink">
                    {selectedColor?.name || "Selecione"}
                  </span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                        selectedColor?.name === color.name
                          ? "border-gray-900 scale-110"
                          : "border-white shadow-md"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div>
                <p className="font-bold text-gray-800 text-sm mb-3">
                  Tamanho:{" "}
                  <span className="font-semibold text-lumi-pink">
                    {selectedSize || "Selecione"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 rounded-2xl text-sm font-bold border-2 transition-all ${
                        selectedSize === size
                          ? "border-lumi-pink bg-lumi-pink text-white shadow-md scale-105"
                          : "border-gray-200 text-gray-700 hover:border-lumi-pink hover:text-lumi-pink"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-pink-50 text-lumi-pink px-3 py-1 rounded-full border border-pink-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 space-y-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" fullWidth className="gap-3">
                  <MessageCircle size={20} />
                  Pedir pelo WhatsApp
                </Button>
              </a>
              <p className="text-center text-xs text-gray-400">
                Você será redirecionado para o WhatsApp para finalizar seu pedido
              </p>
            </div>

            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-orange-500 text-sm font-semibold animate-pulse">
                ⚡ Últimas {product.stock} unidades!
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={zoomOpen} onClose={() => setZoomOpen(false)} size="xl">
        {product.images[selectedImage] && (
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
