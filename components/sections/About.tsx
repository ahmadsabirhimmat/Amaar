"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practice, statistics } from "@/data/practice";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.querySelector<HTMLElement>("[data-about-heading]");
        const split = heading
          ? revealWords(heading, {
              duration: 1.25,
              stagger: 0.05,
              scrollTrigger: { trigger: heading, start: "top 80%", once: true },
            })
          : null;
        const figure = root.querySelector("[data-about-figure]");

        gsap.from("[data-about-reveal]", {
          y: 28,
          autoAlpha: 0,
          duration: motion.duration.base,
          stagger: 0.1,
          ease: motion.ease.out,
          force3D: false,
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        });

        if (figure) {
          gsap.from(figure, {
            clipPath: "inset(12% 0% 12% 0%)",
            duration: 1.35,
            ease: motion.ease.out,
            scrollTrigger: {
              trigger: figure,
              start: "top 80%",
              once: true,
            },
          });
        }

        const stats = root.querySelector<HTMLElement>("[data-stats]");
        if (!stats) return () => split?.revert();

        gsap.from("[data-stat-block]", {
          y: 20,
          autoAlpha: 0,
          duration: motion.duration.fast,
          stagger: 0.08,
          ease: motion.ease.out,
          scrollTrigger: {
            trigger: stats,
            start: "top 82%",
            once: true,
          },
        });

        return () => split?.revert();
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="practice"
      aria-label="About"
      className="bg-background px-6 py-24 text-foreground md:px-12 md:py-36"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div>
            <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">
              {practice.kicker}
            </p>
            <h2
              data-about-heading
              className="mt-6 font-serif text-[clamp(3.1rem,6.2vw,5.6rem)] leading-[0.9] tracking-[-0.04em]"
            >
              {practice.heading}
            </h2>
          </div>
          <div data-about-reveal className="mt-12 max-w-md lg:mt-20">
            <p className="text-lg leading-relaxed">{practice.introduction}</p>
            <p className="mt-6 leading-relaxed text-muted">{practice.philosophy}</p>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:text-accent focus-visible:outline-foreground"
            >
              About us
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.25} />
            </Link>
          </div>
        </div>

        <figure
          data-about-reveal
          data-about-figure
          className="relative mt-14 aspect-[4/5] overflow-hidden shadow-[0_30px_70px_-40px_rgba(18,17,16,0.55)] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-1"
        >
          <Image
            src={practice.image.src}
            alt={practice.image.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            quality={75}
            loading="lazy"
            className="object-cover"
            style={{ objectPosition: practice.image.position }}
          />
        </figure>
      </div>

      <dl
        data-stats
        className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 md:mt-24 md:grid-cols-4 md:pt-10"
      >
        {statistics.map((stat) => (
          <div key={stat.label} data-stat-block className="border-l border-accent/70 pl-4">
            <dt className="text-[0.68rem] tracking-[0.22em] text-muted uppercase">{stat.label}</dt>
            <dd className="mt-3 font-serif text-[clamp(1.45rem,2.2vw,2rem)] leading-none tracking-[-0.03em]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
