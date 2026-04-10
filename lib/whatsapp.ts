import { WHATSAPP_E164 } from "./config";
import { LIGHT_LABELS, SIZE_LABELS, formatPriceMad, type LampLight, type LampQty, type LampSize } from "./pricing";
import type { CartLine } from "@/lib/cartTypes";

export function openWhatsAppWithText(text: string) {
  const encoded = encodeURIComponent(text);
  if (typeof window !== "undefined") {
    window.open(`https://wa.me/${WHATSAPP_E164}?text=${encoded}`, "_blank", "noopener,noreferrer");
  }
}

export function orderMessageLamp(params: {
  productTitle: string;
  size: LampSize;
  light: LampLight;
  qty: LampQty;
  priceMad: number;
}) {
  const { productTitle, size, light, qty, priceMad } = params;
  return `طلب جديد — ${productTitle}
- الحجم: ${SIZE_LABELS[size]}
- الإضاءة: ${LIGHT_LABELS[light]}
- الكمية: ${qty}
- الإجمالي: ${formatPriceMad(priceMad)}
- الدفع: عند الاستلام`;
}

export function orderMessageCart(lines: CartLine[], totalMad: number) {
  const body = lines
    .map(
      (l, i) =>
        `${i + 1}) ${l.productTitle}
   — ${SIZE_LABELS[l.size]} / ${LIGHT_LABELS[l.light]} ×${l.qty} → ${formatPriceMad(l.priceMad)}`
    )
    .join("\n");
  return `طلب سلة — سيلينارت
${body}

الإجمالي: ${formatPriceMad(totalMad)}
الدفع: عند الاستلام`;
}
