import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lumi Teen Store – Brilhe do seu jeito",
    template: "%s | Lumi Teen Store",
  },
  description:
    "Lumi Teen Store: brilhe do seu jeito! Roupas teens incríveis com estilo, personalidade e energia. Descubra nossa coleção exclusiva.",
  keywords: ["moda teen", "roupas adolescente", "lumi teen store", "vestuário juvenil", "brilhe do seu jeito"],
  icons: {
    icon: "/favicon.png",
    apple: "/logos/primary.png",
  },
  openGraph: {
    title: "Lumi Teen Store – Brilhe do seu jeito",
    description: "Roupas teens incríveis com estilo, personalidade e energia.",
    images: ["/logos/primary.png"],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
