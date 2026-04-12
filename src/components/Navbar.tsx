"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const NAV_LINKS = [
  { label: "The Villa", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Contact", href: "/contact" },
];

const BOOK_HREF = "/book";

/* ── Variants (target values only — transitions on elements) ── */
const menuContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const menuItemVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 16 },
};

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Fixed Top Bar ─────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "px-8 md:px-14 lg:px-20",
          "h-[76px] flex items-center justify-between",
          "transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-charcoal/95 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <Link href="/" onClick={close} className="relative z-10 shrink-0">
          <Image
            src="/images/Azara Final Logo-01.png"
            alt="Azara Beach House"
            width={48}
            height={48}
            priority
            className="opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6 relative z-10">
          {/* Book Now — desktop only */}
          <Link href={BOOK_HREF} className="hidden lg:inline-block book-btn">
            Book Now
          </Link>

          {/* Hamburger — mobile/tablet */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-end gap-[6px] w-11 h-11 shrink-0 -mr-1"
          >
            <motion.span
              className="block h-px bg-cream origin-center"
              animate={menuOpen
                ? { width: 28, rotate: 45, y: 8.5 }
                : { width: 28, rotate: 0,  y: 0 }
              }
              transition={{ duration: 0.32, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-px bg-cream"
              animate={menuOpen
                ? { width: 0,  opacity: 0 }
                : { width: 20, opacity: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-cream origin-center"
              animate={menuOpen
                ? { width: 28, rotate: -45, y: -8.5 }
                : { width: 28, rotate: 0,   y: 0 }
              }
              transition={{ duration: 0.32, ease: "easeInOut" }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Overlay ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-charcoal flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Subtle radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(184,151,106,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Nav links — vertically centered */}
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
                    className="mobile-nav-link"
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Book Now CTA */}
              <motion.div
                variants={menuItemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-5"
              >
                <Link href={BOOK_HREF} className="book-btn" onClick={close}>
                  Book Now
                </Link>
              </motion.div>
            </motion.nav>

            {/* Bottom: social + tagline */}
            <motion.div
              className="pb-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <div className="h-px w-10 bg-gold/30 mb-1" />
              <a
                href="https://www.instagram.com/azarabeachhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-body text-[10px] tracking-widest uppercase hover:text-gold transition-colors duration-300"
              >
                @azarabeachhouse
              </a>
              <p className="font-jost text-body/40 text-[10px] tracking-wider uppercase">
                Candolim, Goa
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
