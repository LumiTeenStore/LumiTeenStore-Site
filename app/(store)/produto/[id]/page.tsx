"use client";

import dynamic from "next/dynamic";
import { use } from "react";

const ProductView = dynamic(() => import("@/components/product/ProductView"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-pink-100 border-t-pink-400 animate-spin" />
    </div>
  ),
});

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <ProductView id={resolvedParams.id} />;
}
