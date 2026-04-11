import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import CTASection  from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Contact — Azara Beach House, Candolim Goa",
  description:
    "Inquire about booking Azara Beach House. WhatsApp, email, or send us a message. Private villa in Candolim, Goa — 5 bedrooms, 10–12 guests.",
};

export default function ContactPage() {
  return (
    <main className="bg-charcoal">
      <ContactHero />

      {/* ── Two-column layout ───────────────────────────────── */}
      <section className="px-8 md:px-14 lg:px-20 py-16 md:py-24 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-12 md:mb-16">
            <p className="section-label mb-4">Get in Touch</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-cormorant text-cream font-light tracking-luxury
                             leading-[1.06] text-4xl md:text-5xl">
                Plan Your Stay
              </h2>
              <p className="font-jost text-body/40 text-[11px] tracking-[0.03em]
                            leading-loose max-w-xs md:text-right">
                Fill in the form below or reach us directly — we prefer the personal touch.
              </p>
            </div>
            <div className="mt-5 w-10 h-px bg-gold/40" />
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-14 lg:gap-16 xl:gap-20">
            {/* Left — Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right — Info */}
            <div className="lg:pl-6 xl:pl-8 lg:border-l lg:border-white/[0.04]">
              <ContactInfo />
            </div>
          </div>

        </div>
      </section>

      <CTASection />
    </main>
  );
}
