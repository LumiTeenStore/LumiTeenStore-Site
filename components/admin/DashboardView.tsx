"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, Star, Sparkles } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminGuard from "./AdminGuard";
import { getProducts } from "@/services/products";
import { Product } from "@/types";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function DashboardView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: products.length,
    featured: products.filter((p) => p.isFeatured).length,
    new: products.filter((p) => p.isNew).length,
    bestSeller: products.filter((p) => p.isBestSeller).length,
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Visão geral da loja</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {[
                { label: "Total de produtos", value: stats.total, icon: Package, color: "bg-pink-50", iconColor: "text-lumi-pink" },
                { label: "Em destaque", value: stats.featured, icon: Star, color: "bg-yellow-50", iconColor: "text-yellow-500" },
                { label: "Novidades", value: stats.new, icon: Sparkles, color: "bg-purple-50", iconColor: "text-purple-500" },
                { label: "Mais vendidos", value: stats.bestSeller, icon: TrendingUp, color: "bg-green-50", iconColor: "text-green-500" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon size={22} className={stat.iconColor} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{loading ? "–" : stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg">Produtos recentes</h2>
                <Link href="/admin/produtos" className="text-sm text-lumi-pink font-semibold hover:underline">
                  Ver todos
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {loading ? (
                  <div className="p-8 text-center text-gray-400">Carregando...</div>
                ) : products.slice(0, 5).length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <p>Nenhum produto cadastrado ainda.</p>
                    <Link href="/admin/produtos/novo" className="text-lumi-pink font-semibold hover:underline text-sm mt-2 inline-block">
                      Adicionar primeiro produto →
                    </Link>
                  </div>
                ) : (
                  products.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl overflow-hidden">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : "👗"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{p.category}</p>
                        </div>
                      </div>
                      <span className="font-bold text-lumi-pink text-sm">{formatPrice(p.price)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
