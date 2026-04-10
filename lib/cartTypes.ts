import type { LampLight, LampQty, LampSize } from "./pricing";

export type CartLine = {
  id: string;
  productSlug: string;
  productTitle: string;
  image: string;
  size: LampSize;
  light: LampLight;
  qty: LampQty;
  priceMad: number;
};
