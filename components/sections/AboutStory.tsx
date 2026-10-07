"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/data/about";
import { company, formatLocation } from "@/data/company";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

export function AboutStory() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const heading = root.querySelector<HTMLElement>("[data-about-page-heading]");
      const split = heading
        ? revealWords(heading, {
            duration: 1.25,
            stagger: 0.06,
          })
        : null;

      gsap.from("[data-about-page-reveal]", {
        y: 24,
        autoAlpha: 0,
        duration: motion.duration.base,
        stagger: 0.08,
        delay: 0.15,
        ease: motion.ease.out,
        force3D: false,
      });

      const figure = root.querySelector("[data-about-page-figure]");
      if (figure) {
        gsap.from(figure, {
          clipPath: "inset(10% 0% 12% 0%)",
          duration: 1.4,
          ease: motion.ease.out,
          delay: 0.1,
        });
      }

      return () => split?.revert();
    },
    { scope: rootRef },
  );

  return (
    <article
      ref={rootRef}
      className="bg-background px-6 pt-32 pb-24 text-foreground md:px-12 md:pt-40 md:pb-36"
    >
      <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">{aboutPage.kicker}</p>
      <h1
        data-about-page-heading
        className="mt-6 max-w-[8ch] font-serif text-[clamp(4rem,10vw,7.5rem)] leading-[0.86] tracking-[-0.045em]"
      >
        {aboutPage.heading}
      </h1>

      <div className="mt-14 md:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-16">
        <figure className="lg:col-span-5">
          <div data-about-page-figure className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={aboutPage.founder.src}
              alt={aboutPage.founder.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              quality={75}
              loading="eager"
              className="object-cover object-[center_22%]"
            />
          </div>
          <figcaption data-about-page-reveal className="mt-6">
            <p className="font-serif text-[clamp(2rem,3vw,2.8rem)] leading-none tracking-[-0.03em]">
              {aboutPage.founder.name}
            </p>
            <p className="mt-3 text-[0.68rem] tracking-[0.22em] text-muted uppercase">
              {aboutPage.founder.role}
            </p>
          </figcaption>
        </figure>

        <div className="mt-12 max-w-2xl lg:col-span-6 lg:col-start-7 lg:mt-2">
          {aboutPage.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              data-about-page-reveal
              className="mt-8 text-base leading-relaxed first:mt-0 md:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <aside data-about-page-reveal className="mt-16">
          <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Visit</p>
          <dl className="mt-8 grid gap-6">
            {aboutPage.hours.map((row) => (
              <div key={row.days} className="border-t border-border pt-4">
                <dt className="text-sm">{row.days}</dt>
                <dd className="mt-1 text-sm text-muted">{row.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-3 text-sm">
            <p>{formatLocation()}</p>
            <a className="hover:text-accent focus-visible:outline-foreground" href={company.contact.mobileHref}>
              {company.contact.mobile}
            </a>
            <a className="hover:text-accent focus-visible:outline-foreground" href={company.contact.emailHref}>
              {company.contact.email}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 text-[0.68rem] tracking-[0.22em] uppercase">
            <Link href="/#work" className="hover:text-accent focus-visible:outline-foreground">
              Selected work
            </Link>
            <Link href="/#contact" className="hover:text-accent focus-visible:outline-foreground">
              Contact
            </Link>
          </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
