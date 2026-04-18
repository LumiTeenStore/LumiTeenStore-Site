"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/services/products";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface ProductTableProps {
  products: Product[];
  onDeleted: (id: string) => void;
}

export default function ProductTable({ products, onDeleted }: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      await deleteProduct(deletingId);
      onDeleted(deletingId);
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-4xl mb-4">📦</p>
        <p className="font-semibold">Nenhum produto cadastrado</p>
        <p className="text-sm mt-1">Adicione seu primeiro produto!</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Produto</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Categoria</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Preço</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Estoque</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                          👗
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 line-clamp-1">{product.name}</p>
                      <div className="flex gap-1 mt-0.5">
                        {product.isNew && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">novo</span>
                        )}
                        {product.isFeatured && (
                          <span className="text-xs bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full">destaque</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="capitalize text-gray-600">{product.category}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-lumi-pink">{formatPrice(product.price)}</span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={product.stock === 0 ? "text-red-500" : "text-gray-600"}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/produto/${product.id}`}
                      target="_blank"
                      className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
                      title="Ver produto"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/admin/produtos/${product.id}/editar`}
                      className="p-2 rounded-xl hover:bg-pink-50 text-lumi-pink transition-colors"
                      title="Editar"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => setDeletingId(product.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirm modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Excluir produto"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              fullWidth
              loading={deleteLoading}
              onClick={handleDelete}
            >
              Excluir
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => setDeletingId(null)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
