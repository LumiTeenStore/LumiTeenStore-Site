import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

export default function PromoBanner() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site e gostaria de saber mais sobre as peças 😊")}`;

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-lumi-pink via-pink-400 to-lumi-lilac p-8 md:p-12 text-white text-center">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10 space-y-4">
            <div className="inline-block bg-lumi-yellow text-gray-900 font-bold text-sm px-4 py-1.5 rounded-full">
              💬 Atendimento personalizado
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Tem dúvidas? Fala com a gente!
            </h2>
            <p className="text-white/90 max-w-md mx-auto text-lg">
              Nossa equipe está pronta para te ajudar a encontrar o look perfeito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-lumi-pink font-bold px-8 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <MessageCircle size={18} className="fill-green-500 text-green-500" />
                Chamar no WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                Ver Catálogo
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
