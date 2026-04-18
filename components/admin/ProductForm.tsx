"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Link as LinkIcon } from "lucide-react";
import { Product, ProductCategory, Size, Color } from "@/types";
import { createProduct, updateProduct } from "@/services/products";
import { CATEGORIES, SIZES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

const INITIAL_STATE = {
  name: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  description: "",
  category: "camisetas" as ProductCategory,
  sizes: [] as Size[],
  colors: [] as Color[],
  tags: [] as string[],
  images: [] as string[],
  isNew: false,
  isFeatured: false,
  isBestSeller: false,
  stock: 0,
};

export default function ProductForm({ product, isEditing }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          description: product.description,
          category: product.category,
          sizes: product.sizes,
          colors: product.colors,
          tags: product.tags,
          images: product.images,
          isNew: product.isNew || false,
          isFeatured: product.isFeatured || false,
          isBestSeller: product.isBestSeller || false,
          stock: product.stock,
        }
      : INITIAL_STATE
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [colorInput, setColorInput] = useState({ name: "", hex: "#EF7CA1" });
  const [imageUrlInput, setImageUrlInput] = useState("");

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleSize = (size: Size) =>
    set(
      "sizes",
      form.sizes.includes(size)
        ? form.sizes.filter((s) => s !== size)
        : [...form.sizes, size]
    );

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      set("tags", [...form.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addColor = () => {
    if (colorInput.name.trim()) {
      set("colors", [...form.colors, colorInput]);
      setColorInput({ name: "", hex: "#EF7CA1" });
    }
  };

  const addImageUrl = () => {
    const url = imageUrlInput.trim();
    if (url && !form.images.includes(url)) {
      set("images", [...form.images, url]);
      setImageUrlInput("");
    }
  };

  const removeColor = (index: number) =>
    set(
      "colors",
      form.colors.filter((_, i) => i !== index)
    );

  const removeTag = (tag: string) =>
    set(
      "tags",
      form.tags.filter((t) => t !== tag)
    );

  const removeImage = (index: number) =>
    set(
      "images",
      form.images.filter((_, i) => i !== index)
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing && product) {
        await updateProduct(product.id, form);
      } else {
        await createProduct(form);
      }
      router.push("/admin/produtos");
    } catch (err) {
      setError("Erro ao salvar produto. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
        <h3 className="font-bold text-gray-900 text-lg">Informações básicas</h3>

        <Input
          label="Nome do produto"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Ex: Vestido Floral Rosa"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Preço (R$)"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
            required
          />
          <Input
            label="Preço original (opcional)"
            type="number"
            step="0.01"
            min="0"
            value={form.originalPrice ?? ""}
            onChange={(e) =>
              set(
                "originalPrice",
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Descrição
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            placeholder="Descreva o produto..."
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#EF7CA1] focus:ring-2 focus:ring-pink-100 transition-all resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Categoria
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as ProductCategory)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:border-[#EF7CA1] focus:ring-2 focus:ring-pink-100 transition-all"
            >
              {CATEGORIES.filter((c) => c.value !== "").map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Estoque"
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => set("stock", parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Tamanhos</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-12 h-10 rounded-xl text-sm font-bold border-2 transition-all ${
                form.sizes.includes(size)
                  ? "border-[#EF7CA1] bg-[#EF7CA1] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#EF7CA1]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Cores</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={colorInput.name}
            onChange={(e) => setColorInput((p) => ({ ...p, name: e.target.value }))}
            placeholder="Nome da cor"
            className="flex-1 rounded-2xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#EF7CA1]"
          />
          <input
            type="color"
            value={colorInput.hex}
            onChange={(e) => setColorInput((p) => ({ ...p, hex: e.target.value }))}
            className="w-12 h-10 rounded-xl border-2 border-gray-200 cursor-pointer"
          />
          <Button type="button" size="sm" onClick={addColor}>
            <Plus size={14} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.colors.map((color, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-200"
            >
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-sm text-gray-700">{color.name}</span>
              <button
                type="button"
                onClick={() => removeColor(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Tags</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Ex: floral, verão..."
            className="flex-1 rounded-2xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#EF7CA1]"
          />
          <Button type="button" size="sm" onClick={addTag}>
            <Plus size={14} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-pink-50 text-[#EF7CA1] text-sm px-3 py-1 rounded-full border border-pink-200"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Images via URL */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-1">Imagens</h3>
        <p className="text-sm text-gray-500 mb-4">
          Cole a URL da imagem (ex: link do Google Drive, Imgur, etc.)
        </p>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <LinkIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="url"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addImageUrl())
              }
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#EF7CA1]"
            />
          </div>
          <Button type="button" size="sm" onClick={addImageUrl}>
            <Plus size={14} />
            Adicionar
          </Button>
        </div>

        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {form.images.map((img, i) => (
              <div
                key={i}
                className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 group"
              >
                <img
                  src={img}
                  alt={`Imagem ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='40' y='45' text-anchor='middle' font-size='24'%3E❌%3C/text%3E%3C/svg%3E";
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-[#EF7CA1]/80 text-white text-[9px] font-bold text-center py-0.5">
                    Principal
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-3">
          💡 Dica: use o Google Drive (com link público) ou serviços como Imgur para hospedar imagens.
        </p>
      </div>

      {/* Flags */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Destaques</h3>
        <div className="flex flex-wrap gap-6">
          {[
            { field: "isNew", label: "Novidade" },
            { field: "isFeatured", label: "Destaque" },
            { field: "isBestSeller", label: "Mais vendido" },
          ].map(({ field, label }) => (
            <label key={field} className="flex items-center gap-2.5 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={form[field as keyof typeof form] as boolean}
                  onChange={(e) => set(field, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[#EF7CA1] transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" loading={loading} size="lg">
          {isEditing ? "Atualizar produto" : "Cadastrar produto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin/produtos")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
