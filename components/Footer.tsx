"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PRIMARY_PRODUCT_HREF } from "@/lib/catalog";

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Link href="/" style={{ display: "inline-block", marginBottom: "1.25rem" }}>
            {!logoFailed ? (
              <Image
                src="/images/logo.png"
                alt="سيلينارت"
                width={160}
                height={48}
                style={{ objectFit: "contain", height: "auto", maxWidth: 180 }}
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="logo" style={{ flexDirection: "row", alignItems: "baseline", gap: "0.35rem" }}>
                SELEN<span className="accent">ART</span>
              </span>
            )}
          </Link>
          <p className="site-footer__text">
            نصمّم وننحت أجود أنواع السيلينيت لنقدّم قطعاً فنية تضفي هدوءاً وفخامة على منزلكم. صناعة مغربية من الأطلس المتوسط.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
            <Link href="/boutique" style={{ color: "var(--accent)", fontWeight: 600 }}>
              المتجر
            </Link>
            {" · "}
            <Link href="/galerie" style={{ color: "var(--accent)", fontWeight: 600 }}>
              المعرض
            </Link>
            {" · "}
            <Link href={PRIMARY_PRODUCT_HREF} style={{ color: "var(--accent)", fontWeight: 600 }}>
              المنتج
            </Link>
          </p>
        </div>

        <div>
          <h2 className="site-footer__heading">تواصل</h2>
          <ul className="site-footer__list">
            <li>
              <span aria-hidden>☎</span>
              <span>الهاتف: +212 6 00 00 00 00</span>
            </li>
            <li>
              <span aria-hidden>💬</span>
              <span>واتساب — رد سريع</span>
            </li>
            <li>
              <span aria-hidden>📍</span>
              <span>الأطلس المتوسط، المغرب</span>
            </li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/contact" className="btn-ghost" style={{ padding: 0 }}>
              صفحة الاتصال
            </Link>
          </p>
        </div>

        <div>
          <h2 className="site-footer__heading">خدماتنا</h2>
          <div className="site-footer__benefits">
            <div className="glass-card site-footer__benefit">الدفع عند الاستلام</div>
            <div className="glass-card site-footer__benefit">توصيل داخل المغرب</div>
            <div className="glass-card site-footer__benefit">جودة مضمونة</div>
            <div className="glass-card site-footer__benefit">صناعة يدوية</div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} سيلينارت — المغرب. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
