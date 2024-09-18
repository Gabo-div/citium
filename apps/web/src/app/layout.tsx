import type { Metadata } from "next";
import "./globals.css";

import { Roboto_Serif } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const title = "Citium";
  const description = "Agencia especializada en desarrollo y diseño web";
  const url = "https://www.citium.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${robotoSerif.className} ${plusJakartaSans.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
