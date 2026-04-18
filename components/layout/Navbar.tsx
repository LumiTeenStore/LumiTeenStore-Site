"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo.png"
              alt="Lumi Teen Store"
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-semibold text-sm tracking-wide transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-lumi-pink after:transition-all after:duration-200",
                  pathname === link.href
                    ? "text-lumi-pink after:w-full"
                    : "text-gray-600 hover:text-lumi-pink after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="hidden md:flex items-center gap-2 bg-lumi-pink text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-pink-500 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <ShoppingBag size={16} />
              Ver Peças
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-pink-50 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X size={22} className="text-gray-700" />
              ) : (
                <Menu size={22} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {/* Mini logo no menu mobile */}
          <div className="flex justify-center mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/secondary.png"
              alt="Lumi Teen Store"
              className="h-10 w-auto object-contain opacity-80"
            />
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-3 rounded-2xl font-semibold text-sm transition-colors",
                pathname === link.href
                  ? "bg-pink-50 text-lumi-pink"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/catalogo"
            className="flex items-center justify-center gap-2 bg-lumi-pink text-white font-bold py-3 rounded-2xl mt-2 hover:bg-pink-500 transition-colors"
          >
            <ShoppingBag size={16} />
            Ver Peças
          </Link>
        </div>
      </div>
    </header>
  );
}
