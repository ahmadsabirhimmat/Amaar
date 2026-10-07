"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { services, type Service } from "@/data/services";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

export function Services() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeId, setActiveId] = useState<Service["id"]>(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = revealWords(heading, {
        duration: 1.2,
        stagger: 0.05,
        scrollTrigger: { trigger: heading, start: "top 84%", once: true },
      });

      return () => split.revert();
    },
    { scope: headingRef },
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        "[data-service-image]",
        { autoAlpha: 0, scale: 1.04, clipPath: "inset(8% 0% 8% 0%)" },
        { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-service-copy]",
        { autoAlpha: 0, y: 12, force3D: false },
        { autoAlpha: 1, y: 0, force3D: false, duration: 0.55, ease: "power2.out", delay: 0.06 },
      );
    },
    { dependencies: [active.id], revertOnUpdate: true },
  );

  function selectService(id: Service["id"]) {
    setActiveId(id);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const backward = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !backward) return;

    event.preventDefault();
    const next = (index + (forward ? 1 : -1) + services.length) % services.length;
    const service = services[next];
    selectService(service.id);
    document.getElementById(`service-${service.id}`)?.focus();
  }

  return (
    <section
      id="services"
      aria-label="Services"
      className="scroll-mt-24 bg-background px-6 py-24 text-foreground md:px-12 md:py-36"
    >
      <div className="max-w-3xl">
        <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Services</p>
        <h2
          ref={headingRef}
          className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.04em]"
        >
          What the practice carries.
        </h2>
      </div>

      <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <figure data-service-image className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/5]">
            <Image
              key={active.image.src}
              src={active.image.src}
              alt={active.image.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              quality={75}
              loading="lazy"
              className="object-cover"
              style={{
                objectPosition:
                  "position" in active.image && active.image.position
                    ? active.image.position
                    : "center center",
              }}
            />
          </figure>
          <p data-service-copy aria-live="polite" className="mt-6 max-w-md text-lg leading-relaxed">
            {active.description}
          </p>
        </div>

        <ol className="mt-12 border-b border-border lg:col-span-7 lg:row-start-1 lg:mt-0">
          {services.map((service, index) => {
            const selected = service.id === active.id;

            return (
              <li key={service.id}>
                <button
                  id={`service-${service.id}`}
                  type="button"
                  aria-pressed={selected}
                  className="flex w-full items-baseline gap-5 border-t border-border py-5 text-left focus-visible:outline-foreground md:gap-8 md:py-6"
                  onMouseEnter={() => selectService(service.id)}
                  onFocus={() => selectService(service.id)}
                  onClick={() => selectService(service.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span
                    className={`w-8 shrink-0 text-[0.68rem] tracking-[0.18em] ${
                      selected ? "text-accent" : "text-muted"
                    }`}
                  >
                    {service.index}
                  </span>
                  <span
                    className={`font-serif text-[clamp(1.7rem,3vw,2.7rem)] leading-none tracking-[-0.03em] ${
                      selected ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {service.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
