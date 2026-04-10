"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_E164 } from "@/lib/config";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        تخطي إلى المحتوى
      </a>
      <Navbar />
      <main id="main-content" className="site-main shop-main-padding">
        {children}
      </main>
      <Footer />
      <a
        href={`https://wa.me/${WHATSAPP_E164}`}
        className="sticky-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="التواصل عبر واتساب"
      >
        <svg width="30" height="30" fill="white" viewBox="0 0 24 24" aria-hidden>
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.166 2.234-.58c1.012.55 2.037.897 3.103.897 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.767-5.775-5.767zm3.344 8.205c-.131.363-.788.662-1.042.713-.243.051-.458.083-1.32-.275-.862-.358-1.503-1.225-1.93-1.782-.041-.054-.078-.09-.11-.12-1.041-1.228-1.636-2.607-1.636-4.104 0-1.246.619-1.916.845-2.146.225-.23.601-.328.847-.328.246 0 .47.001.677.01.218.009.431-.013.621.439.19.452.646 1.57.701 1.685.055.114.093.248.016.402-.077.154-.117.248-.232.381-.115.132-.243.297-.348.399-.107.106-.219.221-.093.439.126.218.56 0 .92.361.359.362.775.727 1.185 1.006.41.279.794.464 1.233.642.439.178.694.148.956-.154.262-.303.832-1.046.832-1.046.09-.154.22-.194.349-.154.13.04.823.389.823.389.13.061.216.089.313.25.097.161.097.935-.034 1.299z" />
        </svg>
      </a>
    </>
  );
}
