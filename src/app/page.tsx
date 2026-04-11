import HeroSection       from "@/components/HeroSection";
import USPStrip          from "@/components/USPStrip";
import IntroSection      from "@/components/IntroSection";
import ExperienceSection from "@/components/ExperienceSection";
import RoomsPreviewSection from "@/components/RoomsPreviewSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection        from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-charcoal">
      <HeroSection />
      <USPStrip />
      <IntroSection />
      <ExperienceSection />
      <RoomsPreviewSection />
      <TestimonialsSection />
      <CTASection />

      {/* Anchor targets for navigation */}
      <div id="amenities" className="h-px" />
      <div id="gallery"   className="h-px" />
      <div id="location"  className="h-px" />
      <div id="contact"   className="h-px" />
    </main>
  );
}
