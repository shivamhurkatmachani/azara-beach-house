import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTASection  from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Gallery — Azara Beach House, Candolim Goa",
  description:
    "A visual journey through Azara Beach House — infinity pools, luxury bedrooms, alfresco dining, and 13,000 sq. ft. of tropical grounds in Candolim, Goa.",
};

export default function GalleryPage() {
  return (
    <main className="bg-charcoal">
      <GalleryHero />
      <GalleryGrid />
      <CTASection />
    </main>
  );
}
