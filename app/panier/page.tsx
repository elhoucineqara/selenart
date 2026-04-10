import PanierView from "@/components/panier/PanierView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "السلة",
};

export default function PanierPage() {
  return <PanierView />;
}
