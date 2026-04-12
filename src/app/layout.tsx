import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azara Beach House — Private Villa, Candolim Goa",
  description:
    "A 13,000 sq. ft. ultra-luxury private villa in Candolim, Goa. Five bedrooms, private pool, curated experiences. Where the sea meets stillness.",
  keywords: ["luxury villa goa", "private villa candolim", "azara beach house", "goa villa rental"],
  openGraph: {
    title: "Azara Beach House",
    description: "A 13,000 sq. ft. private villa experience in Candolim, Goa.",
    url: "https://azarabeachhouse.com",
    siteName: "Azara Beach House",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-charcoal text-cream antialiased">
        <PublicLayout>{children}</PublicLayout>
        <Analytics />
      </body>
    </html>
  );
}
