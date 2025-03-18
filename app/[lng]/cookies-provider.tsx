"use client";
import { CookiesProvider as Provider } from "react-cookie";
import type { ReactNode } from "react";

export default function CookiesProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
