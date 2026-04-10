import Image from "next/image";
import Link from "next/link";
import { PRIMARY_PRODUCT_HREF, PRODUCT_IMAGES, PRODUCTS } from "@/lib/catalog";
import { formatPriceMad, minPriceForProduct } from "@/lib/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المتجر",
  description: "تسوق مصابيح السيلينيت الطبيعية — أسعار واضحة وطلب عبر واتساب أو السلة.",
};

export default function BoutiquePage() {
  const from = minPriceForProduct();
  const heroImage = PRODUCT_IMAGES.find((i) => i.id === "lifestyle") ?? PRODUCT_IMAGES[0];

  return (
    <>
      <section className="store-hero store-hero--split reveal" aria-labelledby="store-heading">
        <div className="store-hero__copy">
          <span className="section-eyebrow" style={{ marginBottom: "0.6rem" }}>
            Selenart store
          </span>
          <h1 id="store-heading">المتجر</h1>
          <p>
            مصابيح سيلينيت طبيعية، منحوتة يدوياً في المغرب. اختر الحجم والإضاءة والكمية في صفحة المنتج — الأسعار من جدول واحد
            واضح.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "1.05rem", color: "var(--accent)", fontWeight: 700 }}>
            يبدأ من {formatPriceMad(from)}
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href={PRIMARY_PRODUCT_HREF} className="btn-primary">
              اطلب الآن
            </Link>
            <Link href="/galerie" className="btn-ghost" style={{ border: "1px solid var(--glass-border)", borderRadius: "999px", padding: "0.65rem 1.35rem" }}>
              المعرض
            </Link>
          </div>
        </div>
        <div className="store-hero__visual">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 840px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </section>

      <h2 className="store-section-title">مجموعتنا الكاملة</h2>
      <div className="store-grid">
        {PRODUCTS.map((p) => (
          <article key={p.slug} className="product-card reveal">
            <div className="product-card__media-container">
              {p.isFeatured && <span className="product-card__badge">مميز</span>}
              <Link href={`/produit/${p.slug}`} className="product-card__media" aria-label={`عرض ${p.title}`}>
                <Image src={p.coverSrc} alt={p.title} fill sizes="(max-width: 640px) 100vw, 360px" style={{ objectFit: "cover" }} />
              </Link>
            </div>
            <div className="product-card__body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "0.5rem" }}>
                <h3 className="product-card__title">{p.title}</h3>
                <span style={{ fontSize: "0.65rem", color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.3rem" }}>
                  {p.category === "lamp" ? "مصباح" : p.category === "decor" ? "ديكور" : "طقوس"}
                </span>
              </div>
              <p className="product-card__summary">{p.summary}</p>
              <div className="product-card__thumbs" aria-hidden>
                {p.thumbSrcs.map((src, idx) => (
                  <div key={idx} className="product-card__thumb">
                    <Image src={src} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <p className="product-card__price">من {formatPriceMad(from)}</p>
              <Link href={`/produit/${p.slug}`} className="btn-primary" style={{ marginTop: "0.35rem", textAlign: "center", width: "100%" }}>
                التفاصيل والطلب
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
