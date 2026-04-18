"use client";

import dynamic from "next/dynamic";

const AdminProductsView = dynamic(() => import("@/components/admin/AdminProductsView"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-pink-100 border-t-pink-400 animate-spin" />
    </div>
  ),
});

export default function AdminProductsPage() {
  return <AdminProductsView />;
}
