import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteUrl, site } from "@/content/site";
import "./globals.css";

const display = localFont({ src: "../fonts/display.woff2", variable: "--font-display", display: "swap", weight: "200 800", preload: true });
const body = localFont({ src: "../fonts/body.woff2", variable: "--font-body", display: "swap", weight: "200 800", preload: true });
const origin = getSiteUrl();

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: "/" } } : {}),
  robots: { index: Boolean(origin), follow: Boolean(origin) },
  openGraph: {
    title: site.title, description: site.description, siteName: site.name, locale: "pt_BR", type: "website",
    ...(origin ? { url: origin, images: [{ url: `${origin}/media/opengraph.jpg`, width: 1200, height: 630, alt: "BTF Group — educação prática em comunicação" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, ...(origin ? { images: [`${origin}/media/opengraph.jpg`] } : {}) },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
