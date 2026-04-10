"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";
import { formatPriceMad, LIGHT_LABELS, SIZE_LABELS } from "@/lib/pricing";
import { openWhatsAppWithText, orderMessageCart } from "@/lib/whatsapp";

export default function PanierView() {
  const { lines, totalMad, removeLine, clearCart } = useCart();

  const checkout = () => {
    if (lines.length === 0) return;
    openWhatsAppWithText(orderMessageCart(lines, totalMad));
  };

  return (
    <div className="page-narrow reveal" style={{ maxWidth: 880 }}>
      <h1>سلة التسوق</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        راجع التكوين ثم أرسل الطلب عبر واتساب. الدفع عند الاستلام.
      </p>

      {lines.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "2.5rem" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>السلة فارغة</p>
          <Link href="/boutique" className="btn-primary">
            تصفح المتجر
          </Link>
        </div>
      ) : (
        <>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {lines.map((line) => (
              <li key={line.id} className="glass-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1rem", alignItems: "center", padding: "1rem 1.15rem" }}>
                <div style={{ position: "relative", width: 72, height: 72, borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <Image src={line.image} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{line.productTitle}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {SIZE_LABELS[line.size]} · {LIGHT_LABELS[line.light]} · الكمية {line.qty}
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--accent)", fontWeight: 700, marginTop: "0.35rem" }}>{formatPriceMad(line.priceMad)}</p>
                </div>
                <button type="button" className="btn-ghost" onClick={() => removeLine(line.id)} style={{ padding: "0.5rem", fontSize: "0.85rem", color: "#f87171" }}>
                  حذف
                </button>
              </li>
            ))}
          </ul>

          <div className="summary-card" style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800 }}>الإجمالي</p>
              <p style={{ fontSize: "1.5rem", color: "var(--accent)", fontWeight: 800 }}>{formatPriceMad(totalMad)}</p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <button type="button" className="btn-whatsapp" onClick={checkout}>
              إرسال السلة عبر واتساب
            </button>
            <button type="button" className="btn-ghost" onClick={clearCart} style={{ border: "1px solid var(--glass-border)", borderRadius: "999px", padding: "0.65rem 1.25rem" }}>
              تفريغ السلة
            </button>
            <Link href="/boutique" className="btn-primary">
              متابعة التسوق
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
