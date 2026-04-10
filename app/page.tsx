import Image from "next/image";
import Link from "next/link";
import { PRIMARY_PRODUCT_SLUG, PRODUCT_IMAGES, PRODUCTS } from "@/lib/catalog";
import { formatPriceMad, minPriceForProduct } from "@/lib/pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "سيلينارت — مصابيح سيلينيت طبيعية منحوتة يدوياً في المغرب. إضاءة دافئة وفخامة هادئة لمنزلك.",
};

export default function HomePage() {
  const from = minPriceForProduct();
  const heroImg = PRODUCT_IMAGES.find((i) => i.id === "yellow") ?? PRODUCT_IMAGES[0];
  const featured = PRODUCTS[0];
  const quickBuySlug = PRIMARY_PRODUCT_SLUG;

  return (
    <>
      <section className="home-hero reveal" aria-labelledby="home-hero-title">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <span className="section-eyebrow" style={{ marginBottom: "0.65rem", display: "block", textAlign: "start" }}>
              حرف يدوية · الأطلس المتوسط
            </span>
            <h1 id="home-hero-title" className="home-hero__title">
              سحر <span className="home-hero__accent">السيلينيت</span> في منزلك
            </h1>
            <p className="home-hero__lead">
              مصابيح منحوتة من حجر طبيعي، إضاءة دافئة أو RGB، توصيل في المغرب والدفع عند الاستلام.
            </p>
            <p className="home-hero__price">يبدأ من {formatPriceMad(from)}</p>
            <div className="home-hero__actions">
              <Link href="/boutique" className="btn-primary">
                دخول المتجر
              </Link>
              <Link href={`/produit/${quickBuySlug}`} className="btn-ghost home-hero__btn-outline">
                اطلب مباشرة
              </Link>
            </div>
          </div>
          <Link href="/boutique" className="home-hero__visual" aria-label="انتقل إلى المتجر">
            <Image src={heroImg.src} alt={heroImg.alt} fill sizes="(max-width: 900px) 100vw, 44vw" style={{ objectFit: "cover" }} priority />
            <span className="home-hero__visual-badge">{heroImg.caption}</span>
          </Link>
        </div>
      </section>

      <section className="home-stats reveal" aria-label="مميزات سريعة">
        <div className="home-stats__grid">
          <div className="glass-card home-stats__item">
            <p className="home-stats__val">100٪</p>
            <p className="home-stats__label">صناعة يدوية</p>
          </div>
          <div className="glass-card home-stats__item">
            <p className="home-stats__val">سريع</p>
            <p className="home-stats__label">توصيل منزلي</p>
          </div>
          <div className="glass-card home-stats__item">
            <p className="home-stats__val">أطلس</p>
            <p className="home-stats__label">منبع الحجر</p>
          </div>
          <div className="glass-card home-stats__item">
            <p className="home-stats__val">COD</p>
            <p className="home-stats__label">الدفع عند الاستلام</p>
          </div>
        </div>
      </section>

      <section className="home-strip reveal" aria-labelledby="home-strip-title">
        <div className="home-strip__head">
          <h2 id="home-strip-title" className="home-strip__title">
            استكشف المجموعات
          </h2>
          <Link href="/boutique" className="btn-ghost" style={{ fontSize: "0.9rem" }}>
            المتجر بالكامل ←
          </Link>
        </div>
        <div className="home-strip__grid home-strip__grid--products">
          {PRODUCTS.slice(1, 5).map((p) => (
            <Link key={p.slug} href={`/produit/${p.slug}`} className="product-card reveal" style={{ textDecoration: "none" }}>
              <div className="product-card__media-container" style={{ aspectRatio: "1/1" }}>
                <Image src={p.coverSrc} alt={p.title} fill sizes="(max-width: 640px) 100vw, 300px" style={{ objectFit: "cover" }} />
              </div>
              <div className="product-card__body" style={{ padding: "1rem" }}>
                <h3 className="product-card__title" style={{ fontSize: "1rem" }}>{p.title}</h3>
                <p className="product-card__price" style={{ margin: 0 }}>{formatPriceMad(from)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-featured reveal" aria-labelledby="home-featured-title">
        <h2 id="home-featured-title" className="store-section-title" style={{ marginBottom: "1.25rem" }}>
          الإصدار الفاخر
        </h2>
        <article className="glass-card home-featured__card">
          <div className="home-featured__media">
            <Image src={featured.coverSrc} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 600px" style={{ objectFit: "cover" }} />
          </div>
          <div className="home-featured__body">
            <span className="section-eyebrow">الأكثر مبيعاً</span>
            <h3 className="home-featured__heading">{featured.title}</h3>
            <p className="home-featured__text">{featured.summary}</p>
            <p className="home-featured__price">يبدأ من {formatPriceMad(from)}</p>
            <div className="home-featured__actions">
              <Link href={`/produit/${featured.slug}`} className="btn-primary">
                اكتشف الخيارات
              </Link>
              <Link href="/boutique" className="btn-ghost home-hero__btn-outline">
                كل المنتجات
              </Link>
            </div>
          </div>
        </article>
      </section>

      <section className="home-cta-band reveal">
        <div className="home-cta-band__inner">
          <p className="home-cta-band__text">جاهزون لإضاءة ركنك المفضل؟</p>
          <Link href="/boutique" className="btn-primary">
            تسوق الآن
          </Link>
        </div>
      </section>
    </>
  );
}
