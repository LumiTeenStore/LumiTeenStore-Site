"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FCFBFF] via-pink-50 to-purple-50">
      {/* Background blobs */}
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

          {/* Texto */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge de novidade */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border border-pink-100">
              <Sparkles size={14} className="text-lumi-yellow fill-lumi-yellow" />
              <span className="text-sm font-bold text-gray-700">Nova Coleção 2025</span>
              <Sparkles size={14} className="text-lumi-yellow fill-lumi-yellow" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Brilhe do{" "}
                <span className="relative">
                  <span className="text-lumi-pink">seu jeito</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10 Q75 2 150 10 Q225 18 298 10" stroke="#FFDE00" strokeWidth="3" strokeLinecap="round" fill="none" />
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
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button variant="outline" size="lg">
                  Falar no WhatsApp
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual com logo */}
          <div className="relative flex justify-center items-center">
            {/* Glow de fundo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-lumi-pink/20 to-lumi-lilac/20 blur-3xl" />
            </div>

            {/* Card principal com logo */}
            <div className="relative z-10 w-72 md:w-80">
              <div className="rounded-[2.5rem] overflow-hidden bg-white border-4 border-white shadow-2xl p-8 flex flex-col items-center gap-6">
                {/* Logo primary em destaque */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/primary.png"
                  alt="Lumi Teen Store"
                  className="w-full h-auto object-contain"
                />
                {/* Tagline */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
                  <span className="text-xs font-bold text-lumi-lilac uppercase tracking-widest whitespace-nowrap">
                    Brilhe do seu jeito
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
                </div>
                {/* Color chips */}
                <div className="flex gap-2">
                  {["#EF7CA1", "#B889BC", "#FFDE00", "#FCFBFF"].map((c) => (
                    <div
                      key={c}
                      className="w-6 h-6 rounded-full border-2 border-gray-100 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating card — novidade */}
              <div className="absolute -top-5 -right-8 bg-white rounded-2xl shadow-xl p-3.5 border border-gray-100 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-lumi-yellow flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 whitespace-nowrap">Novidade!</p>
                    <p className="text-xs text-gray-400">Nova coleção</p>
                  </div>
                </div>
              </div>

              {/* Floating card — fãs */}
              <div className="absolute -bottom-5 -left-8 bg-white rounded-2xl shadow-xl p-3.5 border border-gray-100 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 text-base">
                    💕
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 whitespace-nowrap">2.4k+ fãs</p>
                    <p className="text-xs text-gray-400">nos amam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
