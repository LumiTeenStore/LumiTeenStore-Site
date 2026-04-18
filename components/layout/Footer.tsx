import Link from "next/link";
import { MessageCircle, Mail, Heart } from "lucide-react";
import { STORE_INFO } from "@/lib/constants";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}`;
  const instagramUrl = `https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumi-pink to-lumi-lilac flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <p className="font-bold text-xl text-white">Lumi</p>
                <p className="text-xs text-lumi-pink font-semibold tracking-widest uppercase">
                  Teen Store
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Moda teen com atitude. Peças incríveis para você arrasar no seu estilo único.
            </p>
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-lumi-pink transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-lumi-lilac transition-colors"
                aria-label="E-mail"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">
              Navegação
            </h3>
            <nav className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/catalogo?categoria=novidades", label: "Novidades" },
                { href: "/catalogo?categoria=mais-vendidos", label: "Mais Vendidos" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-lumi-pink transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-green-400 shrink-0" />
                WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm"
              >
                <InstagramIcon size={16} />
                {STORE_INFO.instagram}
              </a>
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-lumi-lilac transition-colors text-sm"
              >
                <Mail size={16} className="text-lumi-lilac shrink-0" />
                {STORE_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lumi Teen Store. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Feito com <Heart size={12} className="text-lumi-pink fill-lumi-pink" /> para meninas incríveis
          </p>
        </div>
      </div>
    </footer>
  );
}
