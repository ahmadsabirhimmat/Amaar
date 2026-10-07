"use client";

import { gsap } from "@/lib/gsap/register";

export const motion = {
  ease: {
    out: "power3.out",
    inOut: "power2.inOut",
  },
  duration: {
    fast: 0.7,
    base: 1.15,
    slow: 1.45,
  },
  distance: {
    sm: 16,
    md: 32,
  },
} as const;

type MotionOptions = {
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function fadeIn(target: Element, options: MotionOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { autoAlpha: 1, y: 0 });
    return null;
  }

  const {
    y = motion.distance.md,
    delay = 0,
    duration = motion.duration.base,
  } = options;

  return gsap.from(target, {
    y,
    autoAlpha: 0,
    duration,
    delay,
    ease: motion.ease.out,
  });
}

export function revealOnScroll(target: Element, options: MotionOptions = {}) {
  if (prefersReducedMotion()) {
    gsap.set(target, { autoAlpha: 1, y: 0 });
    return null;
  }

  const {
    y = motion.distance.md,
    delay = 0,
    duration = motion.duration.base,
    start = "top 86%",
  } = options;

  return gsap.from(target, {
    y,
    autoAlpha: 0,
    duration,
    delay,
    ease: motion.ease.out,
    scrollTrigger: {
      trigger: target,
      start,
      once: true,
    },
  });
}
