"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminGuard from "./AdminGuard";
import ProductForm from "./ProductForm";
import { useProduct } from "@/hooks/useProducts";
import Loader from "@/components/ui/Loader";

interface EditProductViewProps {
  id: string;
}

export default function EditProductView({ id }: EditProductViewProps) {
  const { product, loading } = useProduct(id);

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/admin/produtos"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#EF7CA1] mb-6 transition-colors"
            >
              <ChevronLeft size={16} />
              Voltar
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar produto</h1>
            {loading ? (
              <Loader />
            ) : product ? (
              <ProductForm product={product} isEditing />
            ) : (
              <p className="text-gray-500">Produto não encontrado.</p>
            )}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
