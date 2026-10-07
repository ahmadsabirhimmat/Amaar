"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

        stats.querySelectorAll<HTMLElement>("[data-stat]").forEach((element, index) => {
          const value = Number(element.dataset.value ?? 0);
          const suffix = element.dataset.suffix ?? "";
          const counter = { value: 0 };

          element.textContent = `0${suffix}`;

          gsap.to(counter, {
            value,
            duration: 1.8,
            delay: index * 0.1,
            ease: "power2.out",
            snap: { value: 1 },
            scrollTrigger: {
              trigger: stats,
              start: "top 82%",
              once: true,
            },
            onUpdate: () => {
              element.textContent = `${counter.value}${suffix}`;
            },
          });
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
              className="mt-10 inline-block text-[0.68rem] tracking-[0.22em] uppercase hover:text-accent focus-visible:outline-foreground"
            >
              About us
            </Link>
          </div>
        </div>

        <figure
          data-about-reveal
          data-about-figure
          className="relative mt-14 aspect-[4/5] overflow-hidden lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-32"
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
        className="mt-24 grid grid-cols-2 gap-x-8 gap-y-16 border-t border-border pt-12 md:mt-36 md:gap-x-12 md:pt-16 lg:grid-cols-4"
      >
        {statistics.map((stat) => (
          <div key={stat.label} data-stat-block className="flex flex-col-reverse">
            <dt className="mt-4 max-w-[11rem] text-[0.68rem] tracking-[0.22em] text-muted uppercase">
              {stat.label}
            </dt>
            <dd className="font-serif text-[clamp(3.4rem,7vw,5.5rem)] leading-none tracking-[-0.045em]">
              <span data-stat data-value={stat.value} data-suffix={stat.suffix}>
                {stat.value}
                {stat.suffix}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
