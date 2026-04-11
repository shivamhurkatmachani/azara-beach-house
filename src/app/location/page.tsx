import type { Metadata } from "next";
import LocationHero     from "@/components/location/LocationHero";
import MapSection       from "@/components/location/MapSection";
import NearbyHighlights from "@/components/location/NearbyHighlights";
import GettingThere     from "@/components/location/GettingThere";
import CTASection       from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Location — Azara Beach House, Candolim Goa",
  description:
    "Azara Beach House is moments from Candolim Beach in North Goa. 300m to the beach, 25 km from Manohar Airport. Private airport transfers and car rental available.",
};

export default function LocationPage() {
  return (
    <main className="bg-charcoal">
      <LocationHero />
      <MapSection />
      <NearbyHighlights />
      <GettingThere />
      <CTASection />
    </main>
  );
}
