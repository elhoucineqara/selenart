/** كل صور المنتجات تحت public/images — تُعرض في المعرض وفتحة المنتج */
export const PRODUCT_IMAGES = [
  {
    id: "yellow-lux",
    src: "/images/selenite_yellow_lux.png",
    alt: "مصباح سيلينيت فخامة ذهبية",
    caption: "إصدار فخم دافئ",
  },
  {
    id: "yellow",
    src: "/images/selenite_yellow.png",
    alt: "مصباح سيلينيت بإضاءة دافئة",
    caption: "إضاءة دافئة",
  },
  {
    id: "rgb",
    src: "/images/selenite_rgb.png",
    alt: "مصباح سيلينيت بإضاءة RGB",
    caption: "ألوان RGB",
  },
  {
    id: "macro",
    src: "/images/selenite_macro.png",
    alt: "تفاصيل بلورة السيلينيت الطبيعية",
    caption: "فرادة الحجر",
  },
  {
    id: "lifestyle",
    src: "/images/selenite_lifestyle.png",
    alt: "مصباح سيلينيت في إعداد منزلي",
    caption: "نمط حياة",
  },
] as const;

export type StoreProduct = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  coverSrc: string;
  category: "lamp" | "decor" | "ritual";
  isFeatured?: boolean;
  /** صور إضافية في البطاقة (معاينة سريعة) */
  thumbSrcs: readonly string[];
};

export const PRODUCTS: StoreProduct[] = [
  {
    slug: "lampe-fidele",
    title: "مصباح السيلينيت الكلاسيكي",
    summary: "التوهج الأصيل للحجر الطبيعي بلمسة دافئة.",
    description: "مصباح منحوت من أجود أنواع السيلينيت المغربي، يضفي هدوءاً وجمالاً على أي ركن.",
    coverSrc: "/images/selenite_yellow_lux.png",
    category: "lamp",
    isFeatured: true,
    thumbSrcs: ["/images/selenite_yellow.png", "/images/selenite_rgb.png"],
  },
  {
    slug: "coeur-selenite",
    title: "وعاء القلب المقدس",
    summary: "قطعة ديكور فريدة منحوتة على شكل قلب.",
    description: "مثالي لتقديم المجوهرات أو كقطعة تأملية بجانب السرير.",
    coverSrc: "/images/WhatsApp Image 2026-04-04 at 21.11.51.jpeg",
    category: "ritual",
    thumbSrcs: ["/images/WhatsApp Image 2026-04-04 at 21.11.51.jpeg"],
  },
  {
    slug: "lampe-mosquee",
    title: "مصباح النقوش الروحية",
    summary: "إضاءة بلمسة معمارية إسلامية عريقة.",
    description: "مصباح سيلينيت منقوش يدوياً بزخارف هندسية تعكس ظلالاً ساحرة.",
    coverSrc: "/images/WhatsApp Image 2026-04-04 at 21.11.53 (1).jpeg",
    category: "lamp",
    thumbSrcs: ["/images/WhatsApp Image 2026-04-04 at 21.11.53 (1).jpeg"],
  },
  {
    slug: "tour-selenite",
    title: "برج السيلينيت الشاهق",
    summary: "جمال الحجر في شكله الخام السماوي.",
    description: "قطعة فنية تعكس قوة الطبيعة وتفاصيل البلورة في أرقى صورها.",
    coverSrc: "/images/selenite_macro.png",
    category: "decor",
    thumbSrcs: ["/images/selenite_macro.png"],
  },
  {
    slug: "lampe-ambiance",
    title: "مجموعة الأجواء العصرية",
    summary: "سحر السيلينيت في التصاميم المودرن.",
    description: "مجموعة مختارة من المصابيح التي تناسب المكاتب والغرف العصرية.",
    coverSrc: "/images/selenite_lifestyle.png",
    category: "decor",
    thumbSrcs: ["/images/selenite_lifestyle.png"],
  },
];

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
