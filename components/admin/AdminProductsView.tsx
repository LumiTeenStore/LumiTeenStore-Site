"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminGuard from "./AdminGuard";
import ProductTable from "./ProductTable";
import Button from "@/components/ui/Button";
import { getProducts } from "@/services/products";
import { Product } from "@/types";

export default function AdminProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleted = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
                <p className="text-gray-500 mt-1">{products.length} produtos cadastrados</p>
              </div>
              <Link href="/admin/produtos/novo">
                <Button>
                  <Plus size={16} />
                  Novo produto
                </Button>
              </Link>
            </div>

            <div className="relative mb-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full max-w-sm pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-[#EF7CA1]"
              />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2">
              {loading ? (
                <div className="p-12 text-center text-gray-400">Carregando...</div>
              ) : (
                <ProductTable products={filtered} onDeleted={handleDeleted} />
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
