import Image from "next/image";
import Link from "next/link";
import { PRODUCT_IMAGES, PRODUCTS } from "@/lib/catalog";
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
            <Link href="/produit/lampe-selenite" className="btn-primary">
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

      <h2 className="store-section-title">المنتجات</h2>
      <div className="store-grid">
        {PRODUCTS.map((p) => (
          <article key={p.slug} className="product-card reveal">
            <Link href={`/produit/${p.slug}`} className="product-card__media">
              <Image src={p.coverSrc} alt={p.title} fill sizes="(max-width: 640px) 100vw, 360px" style={{ objectFit: "cover" }} />
            </Link>
            <div className="product-card__body">
              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__summary">{p.summary}</p>
              <div className="product-card__thumbs" aria-hidden>
                {p.thumbSrcs.map((src) => (
                  <div key={src} className="product-card__thumb">
                    <Image src={src} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <p className="product-card__price">من {formatPriceMad(from)}</p>
              <Link href={`/produit/${p.slug}`} className="btn-primary" style={{ marginTop: "0.35rem", textAlign: "center" }}>
                التفاصيل والشراء
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
