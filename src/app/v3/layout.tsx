"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Footer from "@/components/Footer";

const NAV_LINKS = [
  { label: "The Villa",  href: "/about"     },
  { label: "Rooms",      href: "/rooms"      },
  { label: "Amenities",  href: "/amenities"  },
  { label: "Gallery",    href: "/gallery"    },
  { label: "Location",   href: "/location"   },
  { label: "Contact",    href: "/contact"    },
];

const menuContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const menuItemVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: 16 },
};

function NavbarLight() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "px-8 md:px-14 lg:px-20",
          "h-[76px] flex items-center justify-between",
          "transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-[#FAF8F5]/97 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
            : "bg-[#FAF8F5]/90 border-b border-black/[0.04]",
        ].join(" ")}
      >
        {/* Logo — darkened with CSS filter for light bg */}
        <Link href="/" onClick={close} className="relative z-10 shrink-0">
          <Image
            src="/images/Azara Final Logo-01.png"
            alt="Azara Beach House"
            width={48}
            height={48}
            priority
            style={{ filter: "brightness(0)" }}
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-jost text-[#1A1A1A]/70 text-[13px] tracking-wider uppercase
                         whitespace-nowrap transition-colors duration-300 hover:text-[#1A1A1A]
                         after:content-[''] after:absolute after:bottom-[-3px] after:left-0
                         after:w-full after:h-px after:bg-[#B8976A]
                         after:scale-x-0 after:origin-right after:transition-transform after:duration-300
                         hover:after:scale-x-100 hover:after:origin-left"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — Book Now + hamburger */}
        <div className="flex items-center gap-6 relative z-10">
          <Link
            href="/book"
            className="hidden lg:inline-block px-7 py-[10px] font-jost text-[11px] tracking-widest
                       uppercase border border-[#B8976A] text-[#1A1A1A] bg-[#B8976A]/10
                       hover:bg-[#B8976A] hover:text-[#FAF8F5]
                       transition-all duration-300 shadow-[0_0_12px_rgba(184,151,106,0.15)]
                       hover:shadow-[0_0_20px_rgba(184,151,106,0.35)]"
          >
            Book Now
          </Link>

          {/* Hamburger — dark bars for light bg */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-end gap-[6px] w-8 h-8 shrink-0"
          >
            <motion.span
              className="block h-px bg-[#1A1A1A] origin-center"
              animate={menuOpen ? { width: 28, rotate: 45, y: 8.5 } : { width: 28, rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-px bg-[#1A1A1A]"
              animate={menuOpen ? { width: 0, opacity: 0 } : { width: 20, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-[#1A1A1A] origin-center"
              animate={menuOpen ? { width: 28, rotate: -45, y: -8.5 } : { width: 28, rotate: 0, y: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay — light theme */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu-light"
            className="fixed inset-0 z-40 bg-[#FAF8F5] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(184,151,106,0.07) 0%, transparent 70%)",
              }}
            />

            <motion.nav
              className="flex-1 flex flex-col items-center justify-center gap-7"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={menuItemVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="font-cormorant text-[#1A1A1A] font-light text-4xl
                               tracking-[0.06em] italic hover:text-[#B8976A]
                               transition-colors duration-300 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={menuItemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-5"
              >
                <Link
                  href="/book"
                  onClick={close}
                  className="px-9 py-3 border border-[#B8976A] bg-[#B8976A]/10 text-[#1A1A1A]
                             font-jost text-[11px] tracking-widest uppercase
                             hover:bg-[#B8976A] hover:text-[#FAF8F5] transition-all duration-300"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.nav>

            <motion.div
              className="pb-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <div className="h-px w-10 bg-[#B8976A]/40 mb-1" />
              <a
                href="https://www.instagram.com/azarabeachhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-[#4A4A4A] text-[10px] tracking-widest uppercase
                           hover:text-[#B8976A] transition-colors duration-300"
              >
                @azarabeachhouse
              </a>
              <p className="font-jost text-[#4A4A4A]/50 text-[9px] tracking-wider uppercase">
                Candolim, Goa
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarLight />
      {children}
      <Footer />
    </>
  );
}
