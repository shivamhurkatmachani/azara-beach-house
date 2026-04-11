import type { Metadata } from "next";
import AboutHero      from "@/components/about/AboutHero";
import BornFromVision from "@/components/about/BornFromVision";
import SwedishRoots   from "@/components/about/SwedishRoots";
import LuxuryNature   from "@/components/about/LuxuryNature";
import CTASection     from "@/components/CTASection";

export const metadata: Metadata = {
  title: "The Story of Azara — About Azara Beach House",
  description:
    "Discover the story behind Azara Beach House — a Swedish-inspired architectural gem in Candolim, Goa. 13,000 sq. ft. of curated luxury, 300 metres from the Arabian Sea.",
};

export default function AboutPage() {
  return (
    <main className="bg-charcoal">
      <AboutHero />
      <BornFromVision />
      <SwedishRoots />
      <LuxuryNature />
      <CTASection />
    </main>
  );
}
