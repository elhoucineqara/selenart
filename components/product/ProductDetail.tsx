"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { PRODUCT_IMAGES, type StoreProduct } from "@/lib/catalog";
import { getPrice, LIGHT_LABELS, SIZE_LABELS, type LampLight, type LampQty, type LampSize } from "@/lib/pricing";
import { openWhatsAppWithText, orderMessageLamp } from "@/lib/whatsapp";

export default function ProductDetail({ product }: { product: StoreProduct }) {
  const { addLine } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [size, setSize] = useState<LampSize>("compact");
  const [light, setLight] = useState<LampLight>("yellow");
  const [qty, setQty] = useState<LampQty>(1);

  const active = PRODUCT_IMAGES[activeIdx];
  const previewSrc = active?.src ?? product.coverSrc;

  const setThumb = (idx: number) => {
    setActiveIdx(idx);
    const id = PRODUCT_IMAGES[idx]?.id;
    if (id === "rgb") setLight("rgb");
    else if (id === "yellow") setLight("yellow");
  };

  const setLightMode = (l: LampLight) => {
    setLight(l);
    if (l === "rgb") {
      const j = PRODUCT_IMAGES.findIndex((i) => i.id === "rgb");
      if (j >= 0) setActiveIdx(j);
    } else {
      const j = PRODUCT_IMAGES.findIndex((i) => i.id === "yellow");
      if (j >= 0) setActiveIdx(j);
    }
  };

  const currentPrice = getPrice(size, light, qty);

  const sendWhatsApp = () => {
    openWhatsAppWithText(
      orderMessageLamp({
        productTitle: product.title,
        size,
        light,
        qty,
        priceMad: currentPrice,
      })
    );
  };

  const handleAddToCart = () => {
    addLine({
      productSlug: product.slug,
      productTitle: product.title,
      image: previewSrc,
      size,
      light,
      qty,
      priceMad: currentPrice,
    });
  };

  return (
    <section className="reveal" style={{ paddingTop: "clamp(1.5rem, 4vw, 2.5rem)" }}>
      <nav style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        <Link href="/boutique" style={{ color: "var(--accent)" }}>
          المتجر
        </Link>
        <span aria-hidden> / </span>
        <span>{product.title}</span>
      </nav>

      <header style={{ marginBottom: "2rem", maxWidth: "40rem" }}>
        <span className="section-eyebrow" style={{ textAlign: "start", display: "block" }}>
          منتج حرفي
        </span>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)", marginBottom: "0.75rem" }}>{product.title}</h1>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{product.description}</p>
      </header>

      <div className="product-layout">
        <div className="glass-card product-sticky" style={{ padding: "1.25rem" }}>
          <div
            className="product-detail__gallery-main"
            style={{
              boxShadow: light === "yellow" ? "var(--glow-yellow)" : "var(--glow-rgb)",
            }}
          >
            <Image src={previewSrc} alt={active?.alt ?? product.title} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} priority />
          </div>
          <div className="product-detail__thumbs" role="tablist" aria-label="صور المنتج">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                className="product-detail__thumb"
                data-active={idx === activeIdx ? "true" : "false"}
                onClick={() => setThumb(idx)}
                aria-label={img.caption}
                aria-pressed={idx === activeIdx}
              >
                <Image src={img.src} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
          <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-subtle)" }}>
            {active?.caption ? `عرض: ${active.caption}` : null}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontFamily: "var(--font-heading)" }}>نوع الإضاءة</h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                className="swatch-btn"
                data-active={light === "yellow" ? "true" : "false"}
                onClick={() => setLightMode("yellow")}
                aria-pressed={light === "yellow"}
              >
                <span
                  style={{
                    display: "block",
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #f5e6a8, #c9a227)",
                    margin: "0 auto 0.4rem",
                    border: "2px solid rgba(255,255,255,0.35)",
                    boxShadow: "0 4px 16px rgba(201, 162, 39, 0.35)",
                  }}
                />
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>أصفر دافئ</span>
              </button>
              <button
                type="button"
                className="swatch-btn"
                data-active={light === "rgb" ? "true" : "false"}
                onClick={() => setLightMode("rgb")}
                aria-pressed={light === "rgb"}
              >
                <span
                  style={{
                    display: "block",
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e53935, #7c5cbf, #43a047)",
                    margin: "0 auto 0.4rem",
                    border: "2px solid rgba(255,255,255,0.35)",
                    boxShadow: "0 4px 16px rgba(124, 92, 191, 0.25)",
                  }}
                />
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>RGB</span>
              </button>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontFamily: "var(--font-heading)" }}>الحجم</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <button
                type="button"
                className="choice-card"
                data-selected={size === "compact" ? "true" : "false"}
                onClick={() => setSize("compact")}
                aria-pressed={size === "compact"}
              >
                <p style={{ fontSize: "1.05rem", fontWeight: 800, fontFamily: "var(--font-main)" }}>مدمج</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-subtle)", marginTop: "0.25rem" }}>٢٧ سم</p>
              </button>
              <button
                type="button"
                className="choice-card"
                data-selected={size === "grande" ? "true" : "false"}
                onClick={() => setSize("grande")}
                aria-pressed={size === "grande"}
              >
                <p style={{ fontSize: "1.05rem", fontWeight: 800, fontFamily: "var(--font-main)" }}>كبير</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-subtle)", marginTop: "0.25rem" }}>٤٠ سم</p>
              </button>
            </div>
            <p style={{ marginTop: "0.65rem", fontSize: "0.78rem", color: "var(--text-subtle)" }}>{SIZE_LABELS[size]}</p>
          </div>

          <div>
            <h2 style={{ marginBottom: "0.5rem", fontSize: "1.2rem", fontFamily: "var(--font-heading)" }}>الكمية</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>خصم عند طلب أكثر من مصباح واحد</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  className="choice-card"
                  data-selected={qty === n ? "true" : "false"}
                  onClick={() => setQty(n)}
                  aria-pressed={qty === n}
                  style={{ position: "relative", padding: "1rem 0.75rem" }}
                >
                  {n > 1 && (
                    <span
                      className="pricing-badge"
                      style={{
                        position: "absolute",
                        top: "-0.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      توفير
                    </span>
                  )}
                  <p style={{ fontSize: "1.35rem", fontWeight: 900, fontFamily: "var(--font-main)" }}>{n}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>{n > 1 ? "مصابيح" : "مصباح"}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="summary-card">
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>الإجمالي المقدَّر</p>
              <p style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--accent)", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                {currentPrice}{" "}
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-muted)" }}>درهم</span>
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-subtle)", marginTop: "0.35rem" }}>
                {LIGHT_LABELS[light]} · {SIZE_LABELS[size]} · ×{qty}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button type="button" className="btn-whatsapp" onClick={sendWhatsApp} style={{ width: "100%", justifyContent: "center" }}>
                طلب عبر واتساب
              </button>
              <button type="button" className="btn-primary" onClick={handleAddToCart} style={{ width: "100%", justifyContent: "center" }}>
                إضافة إلى السلة
              </button>
              <Link href="/panier" className="btn-ghost" style={{ justifyContent: "center", width: "100%" }}>
                عرض السلة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
