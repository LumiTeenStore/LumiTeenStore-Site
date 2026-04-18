"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/services/auth";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/secondary.png"
            alt="Lumi Teen Store"
            className="h-12 w-auto object-contain"
          />
        </Link>
        <span className="mt-2 inline-block text-xs font-bold text-lumi-lilac bg-purple-50 px-2 py-0.5 rounded-full">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
              pathname.startsWith(href)
                ? "bg-lumi-pink text-white shadow-md"
                : "text-gray-600 hover:bg-pink-50 hover:text-lumi-pink"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Store size={18} />
          Ver loja
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
