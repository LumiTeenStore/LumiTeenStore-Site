import Link from "next/link";
import { ProductCategory } from "@/types";

const CATEGORIES: {
  value: ProductCategory;
  label: string;
  emoji: string;
  color: string;
  textColor: string;
}[] = [
  { value: "vestidos", label: "Vestidos", emoji: "👗", color: "bg-pink-50 border-pink-200 hover:bg-lumi-pink", textColor: "group-hover:text-white" },
  { value: "camisetas", label: "Camisetas", emoji: "👕", color: "bg-yellow-50 border-yellow-200 hover:bg-lumi-yellow", textColor: "group-hover:text-gray-900" },
  { value: "calcas", label: "Calças", emoji: "👖", color: "bg-purple-50 border-purple-200 hover:bg-lumi-lilac", textColor: "group-hover:text-white" },
  { value: "shorts", label: "Shorts", emoji: "🩳", color: "bg-pink-50 border-pink-200 hover:bg-lumi-pink", textColor: "group-hover:text-white" },
  { value: "saias", label: "Saias", emoji: "🩷", color: "bg-purple-50 border-purple-200 hover:bg-lumi-lilac", textColor: "group-hover:text-white" },
  { value: "conjuntos", label: "Conjuntos", emoji: "✨", color: "bg-yellow-50 border-yellow-200 hover:bg-lumi-yellow", textColor: "group-hover:text-gray-900" },
  { value: "blusas", label: "Blusas", emoji: "🧶", color: "bg-pink-50 border-pink-200 hover:bg-lumi-pink", textColor: "group-hover:text-white" },
  { value: "acessorios", label: "Acessórios", emoji: "💍", color: "bg-purple-50 border-purple-200 hover:bg-lumi-lilac", textColor: "group-hover:text-white" },
];

export default function CategorySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-lumi-pink font-bold text-sm uppercase tracking-widest">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Categorias
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Encontre o look perfeito navegando pelas nossas categorias
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/catalogo?categoria=${cat.value}`}
              className={`group flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cat.color}`}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {cat.emoji}
              </span>
              <span className={`font-bold text-gray-700 text-sm ${cat.textColor} transition-colors`}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
