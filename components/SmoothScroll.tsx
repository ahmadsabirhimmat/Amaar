"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  ReactLenis,
  type LenisRef,
} from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let bound = lenisRef.current?.lenis;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    const tick = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      if (bound !== lenis) {
        bound?.off("scroll", onScroll);
        lenis.on("scroll", onScroll);
        bound = lenis;
      }

      lenis.raf(time * 1000);
    };

    if (bound) bound.on("scroll", onScroll);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ ignoreMobileResize: true });

    let refreshFrame = 0;
    let resizeTimer = 0;

    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 200);
    };

    const onLoad = () => refresh();

    refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      bound?.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
