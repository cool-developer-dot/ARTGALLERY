import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://artgallery.vercel.app",
  ),
  title: "Atelier — Virtual Art Gallery",
  description:
    "A cinematic virtual museum where technology, architecture, and artistic expression converge.",
  keywords: [
    "virtual art gallery",
    "digital exhibition",
    "immersive museum",
    "contemporary art",
  ],
  openGraph: {
    title: "Atelier — Art Reimagined in Digital Space",
    description:
      "An immersive digital museum with curated exhibitions and spatial storytelling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-clip bg-bg-deep font-body text-stone-body antialiased">
        {children}
      </body>
    </html>
  );
}
