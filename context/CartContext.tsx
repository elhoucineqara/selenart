"use client";

import React, { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { CartLine } from "@/lib/cartTypes";

export type { CartLine } from "@/lib/cartTypes";

const STORAGE_KEY = "selenart-cart-v1";

/** Référence stable — obligatoire pour useSyncExternalStore (évite boucles infinies) */
const EMPTY_SNAPSHOT: CartLine[] = [];

let listeners: Array<() => void> = [];

let snapshot: CartLine[] = EMPTY_SNAPSHOT;
let hydratedFromLS = false;

function emit() {
  listeners.forEach((l) => l());
}

function syncSnapshotFromRaw(raw: string | null) {
  if (!raw) {
    snapshot = EMPTY_SNAPSHOT;
    return;
  }
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    snapshot = Array.isArray(parsed) && parsed.length > 0 ? parsed : EMPTY_SNAPSHOT;
  } catch {
    snapshot = EMPTY_SNAPSHOT;
  }
}

function hydrateOnceFromLocalStorage() {
  if (hydratedFromLS || typeof window === "undefined") return;
  hydratedFromLS = true;
  syncSnapshotFromRaw(localStorage.getItem(STORAGE_KEY));
}

function onStorageEvent(e: StorageEvent) {
  if (e.key !== STORAGE_KEY) return;
  syncSnapshotFromRaw(e.newValue);
  emit();
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  if (typeof window !== "undefined" && listeners.length === 1) {
    window.addEventListener("storage", onStorageEvent);
  }
  return () => {
    listeners = listeners.filter((l) => l !== cb);
    if (typeof window !== "undefined" && listeners.length === 0) {
      window.removeEventListener("storage", onStorageEvent);
    }
  };
}

function getServerSnapshot(): CartLine[] {
  return EMPTY_SNAPSHOT;
}

function getSnapshot(): CartLine[] {
  hydrateOnceFromLocalStorage();
  return snapshot;
}

function publish(next: CartLine[]) {
  if (typeof window === "undefined") return;
  hydratedFromLS = true;
  if (next.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    snapshot = EMPTY_SNAPSHOT;
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    snapshot = next;
  }
  emit();
}

function addLine(line: Omit<CartLine, "id">) {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  hydrateOnceFromLocalStorage();
  const base = snapshot === EMPTY_SNAPSHOT ? [] : snapshot.slice();
  publish([...base, { ...line, id }]);
}

function removeLine(id: string) {
  hydrateOnceFromLocalStorage();
  const base = snapshot === EMPTY_SNAPSHOT ? [] : snapshot.slice();
  publish(base.filter((l) => l.id !== id));
}

function clearCart() {
  publish([]);
}

type CartContextValue = {
  lines: CartLine[];
  totalMad: number;
  count: number;
  addLine: (line: Omit<CartLine, "id">) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<CartContextValue>(() => {
    const totalMad = lines.reduce((s, l) => s + l.priceMad, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      totalMad,
      count,
      addLine,
      removeLine,
      clearCart,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
