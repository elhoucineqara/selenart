import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
};

export default function ContactPage() {
  return (
    <div className="page-narrow reveal">
      <h1>اتصل بنا</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.85 }}>
        لأي استفسار عن المقاسات، التوصيل، أو الطلبات الخاصة، راسلنا عبر واتساب أو اتصل بنا مباشرة.
      </p>

      <ul className="site-footer__list" style={{ marginBottom: "2rem" }}>
        <li>
          <span aria-hidden>☎</span>
          <span>الهاتف: +212 6 00 00 00 00</span>
        </li>
        <li>
          <span aria-hidden>💬</span>
          <span>واتساب: نفس الرقم</span>
        </li>
        <li>
          <span aria-hidden>📍</span>
          <span>الأطلس المتوسط، المغرب</span>
        </li>
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", color: "var(--text-muted)" }}>
        <Image src="/globe.svg" width={44} height={44} alt="" />
        <span style={{ fontSize: "0.9rem" }}>التوصيل متاح لجميع أنحاء المغرب</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link href="/" className="btn-ghost" style={{ border: "1px solid var(--glass-border)", borderRadius: "999px", padding: "0.65rem 1.35rem" }}>
          الرئيسية
        </Link>
        <Link href="/boutique" className="btn-primary">
          زيارة المتجر
        </Link>
      </div>
    </div>
  );
}
