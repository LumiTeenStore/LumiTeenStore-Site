"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FCFBFF] via-pink-50 to-purple-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-lumi-pink/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-lumi-lilac/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lumi-yellow/5 blur-3xl" />
        {/* Floating dots */}
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-lumi-pink opacity-60 animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-lumi-yellow opacity-80 animate-bounce" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-20 w-4 h-4 rounded-full bg-lumi-lilac opacity-40 animate-bounce" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-10 w-3 h-3 rounded-full bg-lumi-pink opacity-50 animate-bounce" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border border-pink-100">
              <Sparkles size={14} className="text-lumi-yellow fill-lumi-yellow" />
              <span className="text-sm font-bold text-gray-700">Nova Coleção 2025</span>
              <Sparkles size={14} className="text-lumi-yellow fill-lumi-yellow" />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Seu estilo,{" "}
                <span className="relative">
                  <span className="text-lumi-pink">sua energia</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10 Q75 2 150 10 Q225 18 298 10"
                      stroke="#FFDE00"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                Moda teen com atitude. Descubra peças que combinam com você e expressam quem você é.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-xs text-gray-500">Peças disponíveis</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">2k+</p>
                <p className="text-xs text-gray-500">Clientes felizes</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-lumi-yellow text-lumi-yellow" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">5.0</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/catalogo">
                <Button size="lg" className="group">
                  Explorar Catálogo
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/contato">
                <Button variant="outline" size="lg">
                  Falar no WhatsApp
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center">
            {/* Main card */}
            <div className="relative z-10 w-72 md:w-80">
              <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-lumi-pink/20 to-lumi-lilac/20 border-4 border-white shadow-2xl aspect-[3/4] flex items-center justify-center">
                <div className="text-center p-8 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lumi-pink to-lumi-lilac mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-3xl">L</span>
                  </div>
                  <p className="font-bold text-gray-700 text-lg">Lumi Teen Store</p>
                  <p className="text-gray-500 text-sm">Moda com personalidade</p>
                  <div className="flex justify-center gap-2">
                    {["#EF7CA1", "#B889BC", "#FFDE00"].map((c) => (
                      <div
                        key={c}
                        className="w-6 h-6 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating card 1 */}
              <div className="absolute -top-6 -right-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-lumi-yellow flex items-center justify-center">
                    <Sparkles size={14} className="text-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Novidade!</p>
                    <p className="text-xs text-gray-400">Nova coleção</p>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center">
                    <span className="text-lumi-pink text-sm">💕</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">2.4k+ fãs</p>
                    <p className="text-xs text-gray-400">nos amam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-lumi-pink/10 to-lumi-lilac/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
