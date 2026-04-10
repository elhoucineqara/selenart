import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  title: {
    default: "سيلينارت | مصابيح سيلينيت طبيعية",
    template: "%s | سيلينارت",
  },
  description:
    "متجر مصابيح كريستال سيلينيت المنحوتة يدوياً في الأطلس المتوسط. أسعار واضحة، توصيل في المغرب، الدفع عند الاستلام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} ${playfair.variable} ${notoArabic.variable}`}>
        <CartProvider>
          <ClientShell>{children}</ClientShell>
        </CartProvider>
      </body>
    </html>
  );
}
