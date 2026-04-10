import { CURRENCY_AR } from "./config";

export type LampSize = "compact" | "grande";
export type LampLight = "yellow" | "rgb";
export type LampQty = 1 | 2 | 3;

/**
 * مصفوفة الأسعار بالدرهم: الفهرس 0 غير مستخدم، 1–3 = الكمية
 * يمكنك تعديل الأرقام هنا فقط لتغيير كل المتجر
 */
export const PRICE_MATRIX: Record<
  LampSize,
  Record<LampLight, [unused: number, q1: number, q2: number, q3: number]>
> = {
  compact: {
    yellow: [0, 300, 550, 750],
    rgb: [0, 350, 650, 800],
  },
  grande: {
    yellow: [0, 450, 800, 1100],
    rgb: [0, 500, 850, 1150],
  },
} as const;

export const SIZE_LABELS: Record<LampSize, string> = {
  compact: "الحجم المدمج (10×10×27 سم)",
  grande: "الحجم الكبير (10×10×40 سم)",
};

export const LIGHT_LABELS: Record<LampLight, string> = {
  yellow: "إضاءة دافئة (أصفر)",
  rgb: "إضاءة ملونة RGB",
};

export function getPrice(size: LampSize, light: LampLight, qty: LampQty): number {
  return PRICE_MATRIX[size][light][qty];
}

export function formatPriceMad(amount: number): string {
  return `${amount} ${CURRENCY_AR}`;
}

export function minPriceForProduct(): number {
  const values: number[] = [];
  (["compact", "grande"] as const).forEach((s) => {
    (["yellow", "rgb"] as const).forEach((l) => {
      values.push(PRICE_MATRIX[s][l][1]);
    });
  });
  return Math.min(...values);
}
