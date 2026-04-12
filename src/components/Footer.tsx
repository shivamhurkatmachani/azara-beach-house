import Image from "next/image";
import Link from "next/link";

const FOOTER_NAV = [
  { label: "The Villa", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rates", href: "/rates" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/[0.04]">

      {/* ── Main footer body ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Image
              src="/images/Azara Final Logo-01.png"
              alt="Azara Beach House"
              width={56}
              height={56}
              className="opacity-80"
            />
            <p className="font-cormorant text-cream/80 text-xl font-light italic leading-snug max-w-[200px]">
              Where the sea<br />meets stillness.
            </p>
            <p className="font-jost text-body/50 text-[9px] tracking-widest uppercase">
              A 13,000 sq. ft. private villa experience
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <p className="section-label mb-2">Explore</p>
            {FOOTER_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-jost text-body text-sm tracking-[0.04em] hover:text-cream transition-colors duration-300 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <p className="section-label mb-2">Contact</p>

            <div className="flex flex-col gap-1">
              <p className="font-jost text-body/50 text-[10px] tracking-wider uppercase">Address</p>
              <p className="font-jost text-body text-sm leading-relaxed">
                Candolim, North Goa<br />
                Goa 403515, India
              </p>
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <p className="font-jost text-body/50 text-[10px] tracking-wider uppercase">WhatsApp</p>
              <a
                href="https://wa.me/919090407408"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-gold text-sm hover:text-cream transition-colors duration-300 flex items-center gap-2 group w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enquire on WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <p className="font-jost text-body/50 text-[10px] tracking-wider uppercase">Email</p>
              <a
                href="mailto:bookings@azarabeachhouse.com"
                className="font-jost text-body text-sm hover:text-cream transition-colors duration-300 w-fit"
              >
                bookings@azarabeachhouse.com
              </a>
            </div>
          </div>

          {/* Column 4 — Follow */}
          <div className="flex flex-col gap-4">
            <p className="section-label mb-2">Follow</p>

            <a
              href="https://www.instagram.com/azarabeachhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit"
            >
              {/* Instagram icon */}
              <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/40 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-body group-hover:text-gold transition-colors duration-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              <span className="font-jost text-body text-sm tracking-[0.04em] group-hover:text-cream transition-colors duration-300">
                @azarabeachhouse
              </span>
            </a>

            {/* Decorative gold rule */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-gold/30" />
              <p className="font-cormorant text-body/40 text-sm italic tracking-wider">
                Candolim, Goa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-jost text-body/35 text-[10px] tracking-wider">
            © 2025 Azara Beach House. All rights reserved.
          </p>
          <p className="font-jost text-body/25 text-[10px] tracking-wider">
            azarabeachhouse.com
          </p>
        </div>
      </div>
    </footer>
  );
}
