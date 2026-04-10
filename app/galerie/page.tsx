import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معرض الصور",
};

export default function GaleriePage() {
  return (
    <>
      <div className="store-hero reveal">
        <span className="section-eyebrow" style={{ display: "block", marginBottom: "0.5rem" }}>
          Galerie
        </span>
        <h1>معرض الصور</h1>
        <p>كل لقطات المنتج: الإضاءة الدافئة، RGB، تفاصيل البلورة، والديكور المنزلي.</p>
      </div>
      <div className="gallery-page-grid">
        {PRODUCT_IMAGES.map((img) => (
          <figure key={img.id} className="gallery-page-card reveal">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 300px" style={{ objectFit: "cover" }} />
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
