import type { Metadata } from "next";
import { Manrope, Libre_Baskerville, Lexend } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UI/UX Design Agency for AI-Native Experiences - reloadux",
    template: "%s | reloadux",
  },
  description:
    "We help B2B and SaaS companies design products that are intelligent, usable, and built for adoption.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://reloadux.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "reloadux",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${libreBaskerville.variable} ${lexend.variable}`}
    >
      <body>
        <Header logoUrl={siteSettings.logoUrl} />
        <main>{children}</main>
        <Footer
          email={siteSettings.email}
          phone={siteSettings.phone}
          address={siteSettings.address}
          copyright={siteSettings.footerCopyright}
          socialLinks={siteSettings.socialLinks}
          logoUrl={siteSettings.logoFooterUrl || siteSettings.logoUrl}
        />
      </body>
    </html>
  );
}
