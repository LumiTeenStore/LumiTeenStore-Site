import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lumi Teen Store – Moda com atitude",
    template: "%s | Lumi Teen Store",
  },
  description:
    "Lumi Teen Store: roupas teens incríveis com estilo, personalidade e energia. Descubra nossa coleção exclusiva.",
  keywords: ["moda teen", "roupas adolescente", "lumi teen store", "vestuário juvenil"],
  openGraph: {
    title: "Lumi Teen Store – Moda com atitude",
    description: "Roupas teens incríveis com estilo, personalidade e energia.",
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
