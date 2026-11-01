"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { company, formatLocation } from "@/data/company";
import { contactAction } from "@/data/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const media = mediaRef.current;
      if (!root || !media) return;

      const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
      const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
      const meta = root.querySelector<HTMLElement>("[data-hero-meta]");
      const cta = root.querySelector<HTMLElement>("[data-hero-cta]");
      const indicator = root.querySelector<HTMLElement>("[data-hero-scroll]");
      const scrollLine = root.querySelector<HTMLElement>("[data-scroll-line]");
      const kicker = root.querySelector<HTMLElement>("[data-hero-kicker]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(media, { scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(
          [kicker, ...lines, copy, meta, cta, indicator].filter(
            (node): node is HTMLElement => node instanceof HTMLElement,
          ),
          { autoAlpha: 1, y: 0, yPercent: 0 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = revealWords(lines, { duration: 1.25, stagger: 0.07, delay: 0.22 });
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline.fromTo(
          media,
          { scale: 1.08, clipPath: "inset(10% 0% 14% 0%)" },
          { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, ease: "power2.out" },
          0,
        );
        timeline.from(kicker, { y: 12, autoAlpha: 0, duration: 0.8, force3D: false }, 0.15);
        timeline.from(copy, { y: 16, autoAlpha: 0, duration: 0.9, force3D: false }, 0.7);
        timeline.from(meta, { y: 14, autoAlpha: 0, duration: 0.85, force3D: false }, 0.86);
        timeline.from(cta, { y: 12, autoAlpha: 0, duration: 0.8, force3D: false }, 1);
        timeline.from(indicator, { autoAlpha: 0, duration: 0.8 }, 1.15);

        if (scrollLine) {
          gsap.to(scrollLine, {
            scaleY: 0.45,
            transformOrigin: "top center",
            duration: 1.8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.3,
          });
        }

        return () => split.revert();
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(media, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-svh items-end overflow-hidden bg-foreground text-background"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div ref={mediaRef} className="absolute inset-[-6%] origin-center">
          <Image
            src="/images/hero.jpg"
            alt="A Time Towers residence at dusk, with timber cladding, tall windows, and a lit living room beside a lawn and a large tree."
            fill
            preload
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,17,16,0.55)_0%,rgba(18,17,16,0.08)_34%,rgba(18,17,16,0.18)_62%,rgba(18,17,16,0.78)_100%)]"
        />
      </div>

      <div className="relative z-10 w-full px-6 pt-24 pb-5 md:px-12 md:pt-32 md:pb-12">
        <p data-hero-kicker className="flex items-center gap-3 text-[0.68rem] tracking-[0.32em] text-background/80 uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {company.category}
        </p>

        <h1 className="mt-6 flex flex-nowrap items-baseline gap-x-[0.18em] font-serif text-[clamp(2.15rem,7.4vw,6.6rem)] leading-none tracking-[-0.045em]">
          <span className="overflow-hidden">
            <span data-hero-line className="block pb-[0.08em]">
              Time
            </span>
          </span>
          <span className="overflow-hidden">
            <span data-hero-line className="block pb-[0.1em] italic">
              Towers.
            </span>
          </span>
        </h1>

        <p data-hero-copy className="mt-6 max-w-md text-base leading-relaxed text-background/85 md:text-lg">
          {company.summary}
        </p>

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <dl data-hero-meta className="flex flex-wrap gap-x-10 gap-y-4 border border-background/15 bg-foreground/30 px-5 py-4 backdrop-blur-md">
            <div>
              <dt className="text-[0.65rem] tracking-[0.24em] text-background/60 uppercase">Office</dt>
              <dd className="mt-2 text-sm">{formatLocation("short")}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.24em] text-background/60 uppercase">Listed as</dt>
              <dd className="mt-2 text-sm">Residence</dd>
            </div>
          </dl>

          <a
            data-hero-cta
            href={contactAction.href}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-background px-5 py-3 text-[0.68rem] tracking-[0.18em] text-foreground uppercase transition-colors duration-500 hover:bg-accent hover:text-background focus-visible:outline-background"
          >
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.25} />
          </a>
        </div>

        <a
          data-hero-scroll
          href="#work"
          className="mt-6 inline-flex items-center gap-3 text-[0.65rem] tracking-[0.28em] text-background/80 uppercase focus-visible:outline-background md:mt-10"
        >
          <span data-scroll-line aria-hidden="true" className="block h-10 w-px origin-top bg-background/80" />
          Scroll
        </a>
      </div>
    </section>
  );
}
