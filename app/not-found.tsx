import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-narrow reveal" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>الصفحة غير موجودة</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>تعذّر العثور على هذا العنوان.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        <Link href="/" className="btn-primary">
          الصفحة الرئيسية
        </Link>
        <Link href="/boutique" className="btn-ghost" style={{ border: "1px solid var(--glass-border)", borderRadius: "999px", padding: "0.65rem 1.35rem" }}>
          المتجر
        </Link>
      </div>
    </div>
  );
}
