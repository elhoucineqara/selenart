"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRIMARY_PRODUCT_HREF } from "@/lib/catalog";

const MAIN_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/boutique", label: "المتجر" },
  { href: "/galerie", label: "المعرض" },
  { href: "/contact", label: "اتصل بنا" },
] as const;

function pathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const linkClass = (href: string) =>
    `site-nav__link ${pathActive(pathname, href) ? "site-nav__link--active" : ""}`;

  return (
    <header>
      <nav className="site-nav" data-scrolled={scrolled ? "true" : "false"} aria-label="التنقل الرئيسي">
        <div className="site-nav__inner">
          <Link href="/" className="site-nav__brand" onClick={closeMobile}>
            {!logoFailed ? (
              <Image
                src="/images/logo.png"
                alt="سيلينارت"
                width={140}
                height={40}
                style={{ objectFit: "contain", height: "auto", width: "clamp(100px, 26vw, 150px)" }}
                priority
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="logo" style={{ flexDirection: "row", alignItems: "baseline", gap: "0.35rem" }}>
                SELEN<span className="accent">ART</span>
              </span>
            )}
          </Link>

          <div className="site-nav__center" aria-label="روابط الموقع">
            {MAIN_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </div>

          <div className="site-nav__end">
            <div className="site-nav__actions">
              <Link href="/panier" className={`site-nav__link site-nav__cart-link ${pathname === "/panier" ? "site-nav__link--active" : ""}`}>
                السلة
                {count > 0 ? <span className="site-nav__badge">{count > 9 ? "9+" : count}</span> : null}
              </Link>
              <Link href={PRIMARY_PRODUCT_HREF} className="btn-primary site-nav__cta">
                شراء مصباح
              </Link>
            </div>
            <button
              type="button"
              className="site-nav__toggle"
              aria-expanded={mobileOpen}
              aria-controls="site-nav-menu"
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="site-nav__backdrop" data-open={mobileOpen ? "true" : "false"} aria-hidden onClick={closeMobile} />

        <div id="site-nav-menu" className="site-nav__mobile-panel" data-open={mobileOpen ? "true" : "false"}>
          {MAIN_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)} onClick={closeMobile}>
              {label}
            </Link>
          ))}
          <Link href="/panier" className={linkClass("/panier")} onClick={closeMobile}>
            السلة
            {count > 0 ? <span className="site-nav__badge">{count > 9 ? "9+" : count}</span> : null}
          </Link>
          <div className="site-nav__mobile-cta">
            <Link href={PRIMARY_PRODUCT_HREF} className="btn-primary site-nav__cta" style={{ width: "100%", justifyContent: "center" }} onClick={closeMobile}>
              شراء مصباح
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
