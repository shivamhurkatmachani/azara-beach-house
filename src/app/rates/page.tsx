import type { Metadata } from "next";
import RatesHero      from "@/components/rates/RatesHero";
import PricingTable   from "@/components/rates/PricingTable";
import PoliciesSection from "@/components/rates/PoliciesSection";
import CTASection     from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Rates & Policies — Azara Beach House, Candolim Goa",
  description:
    "Transparent pricing for Azara Beach House. Seasonal nightly rates, cancellation policy, security deposit, and full list of inclusions for your luxury Goa villa stay.",
};

export default function RatesPage() {
  return (
    <main className="bg-charcoal">
      <RatesHero />
      <PricingTable />
      <PoliciesSection />
      <CTASection />
    </main>
  );
}
