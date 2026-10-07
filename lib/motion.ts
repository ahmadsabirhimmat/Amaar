"use client";

import { gsap, SplitText, type ScrollTrigger } from "@/lib/gsap/register";

type RevealWordsOptions = {
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: ScrollTrigger.Vars;
};

export function revealWords(target: gsap.DOMTarget, options: RevealWordsOptions = {}) {
  const split = SplitText.create(target, {
    type: "words",
    mask: "words",
    autoSplit: false,
    aria: "auto",
  });

  gsap.set(split.words, { force3D: false });

  gsap.from(split.words, {
    yPercent: 110,
    force3D: false,
    duration: options.duration ?? 1.2,
    stagger: options.stagger ?? 0.055,
    delay: options.delay ?? 0,
    ease: "power3.out",
    scrollTrigger: options.scrollTrigger,
  });

  return split;
}
