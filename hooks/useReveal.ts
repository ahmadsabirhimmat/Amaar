"use client";

import { useRef } from "react";
import { fadeIn, revealOnScroll, useGSAP } from "@/lib/gsap";

type UseRevealOptions = {
  mode?: "load" | "scroll";
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

export function useReveal<T extends HTMLElement>({
  mode = "scroll",
  y,
  delay,
  duration,
  start,
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const options = { y, delay, duration, start };

      if (mode === "load") {
        fadeIn(element, options);
        return;
      }

      revealOnScroll(element, options);
    },
    { scope: ref },
  );

  return ref;
}
