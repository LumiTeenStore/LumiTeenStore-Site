"use client";

import dynamic from "next/dynamic";
import { use } from "react";

const EditProductView = dynamic(() => import("@/components/admin/EditProductView"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-pink-100 border-t-pink-400 animate-spin" />
    </div>
  ),
});

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EditProductView id={id} />;
}
