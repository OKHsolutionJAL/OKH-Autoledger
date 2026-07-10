import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OKH AutoLedger",
  description: "SaaS multi-tenant para gestao de lojas de carros no Japao."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
