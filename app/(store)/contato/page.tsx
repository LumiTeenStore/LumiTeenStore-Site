import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a Lumi Teen Store pelo WhatsApp ou redes sociais.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site e gostaria de mais informações 😊")}`;
  const instagramUrl = `https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`;

  return (
    <div className="min-h-screen bg-lumi-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-lumi-pink/10 to-lumi-lilac/10 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-lumi-pink font-bold text-sm uppercase tracking-widest">
            Fale conosco
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Contato
          </h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-lg">
            Estamos aqui para te ajudar! Entre em contato através de qualquer um dos canais abaixo.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* WhatsApp CTA */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-400 to-green-600 p-8 md:p-12 text-white text-center mb-12 shadow-xl">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-3xl font-bold">Chamar no WhatsApp</h2>
            <p className="text-white/90 text-lg max-w-sm mx-auto">
              Atendimento rápido e personalizado. Responderemos em breve!
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-green-600 font-bold text-lg px-10 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <MessageCircle size={22} />
              Iniciar conversa
            </a>
          </div>
        </div>

        {/* Other channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-lumi-pink hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <InstagramIcon size={24} />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">Instagram</p>
              <p className="text-gray-500 text-sm mt-1">{STORE_INFO.instagram}</p>
            </div>
          </a>

          <a
            href={`mailto:${STORE_INFO.email}`}
            className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-lumi-lilac hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-lumi-lilac flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Mail size={24} className="text-white" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">E-mail</p>
              <p className="text-gray-500 text-sm mt-1">{STORE_INFO.email}</p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border-2 border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-lumi-yellow flex items-center justify-center shadow-md">
              <Clock size={24} className="text-gray-800" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800 text-lg">Horário</p>
              <p className="text-gray-500 text-sm mt-1">Seg–Sex: 9h–18h</p>
              <p className="text-gray-500 text-sm">Sáb: 9h–13h</p>
            </div>
          </div>
        </div>

        {/* FAQ teaser */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Tem alguma dúvida sobre tamanhos, entrega ou trocas?{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lumi-pink font-bold hover:underline"
            >
              Fale conosco no WhatsApp
            </a>{" "}
            e a gente te ajuda!
          </p>
        </div>
      </div>
    </div>
  );
}
