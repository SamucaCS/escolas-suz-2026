import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

// Nunito é a alternativa gratuita mais próxima da fonte arredondada do Duolingo.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portal de Escolas · Atribuição 2026",
    template: "%s · Portal de Escolas 2026",
  },
  description:
    "Consulte as escolas estaduais de Suzano e Ferraz de Vasconcelos: níveis de ensino, turnos, endereço e contatos.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
