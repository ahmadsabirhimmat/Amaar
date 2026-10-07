"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  mode?: "load" | "scroll";
  delay?: number;
};

export function Reveal({
  children,
  className,
  mode = "load",
  delay = 0,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ mode, delay });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
