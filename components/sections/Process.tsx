"use client";

import { useRef } from "react";
import { processSteps } from "@/data/services";
import { gsap, ScrollTrigger, motion, useGSAP } from "@/lib/gsap";

export function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      const setStep = (scope: ParentNode, index: number) => {
        const steps = scope.querySelectorAll<HTMLElement>("[data-process-step]");
        const title = scope.querySelector<HTMLElement>("[data-process-title]");
        const text = scope.querySelector<HTMLElement>("[data-process-text]");
        const step = processSteps[index];
        if (!step) return;

        steps.forEach((item, itemIndex) => {
          item.classList.toggle("is-active", itemIndex === index);
        });

        if (title) title.textContent = `${step.index} — ${step.name}`;
        if (text) text.textContent = step.description;
      };

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = root.querySelector<HTMLElement>("[data-process-pin]");
        const stage = root.querySelector<HTMLElement>("[data-process-stage]");
        const line = root.querySelector<HTMLElement>("[data-process-line]");
        const board = root.querySelector<HTMLElement>("[data-process-board]");
        if (!pin || !stage || !line || !board) return;

        let current = 0;
        setStep(board, 0);

        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.6}`,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            gsap.set(line, { scaleX: self.progress });
            const index = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            if (index === current) return;
            current = index;
            setStep(board, index);
          },
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const list = root.querySelector<HTMLElement>("[data-process-list]");
        const line = root.querySelector<HTMLElement>("[data-process-line-vertical]");
        if (!list || !line) return;

        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          },
        );

        list.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
          gsap.from(step, {
            autoAlpha: 0,
            y: 24,
            duration: motion.duration.fast,
            ease: motion.ease.out,
            scrollTrigger: {
              trigger: step,
              start: "top 86%",
              once: true,
            },
          });
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="process"
      aria-label="Construction process"
      className="bg-background text-foreground"
    >
      <div className="process-vertical">
        <div className="px-6 py-24 md:px-12">
          <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Process</p>
          <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.04em]">
            From the first visit to the keys.
          </h2>
          <div data-process-list className="relative mt-16">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-border" aria-hidden="true" />
            <div
              data-process-line-vertical
              className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-foreground motion-reduce:scale-y-100"
              aria-hidden="true"
            />
            <ol>
              {processSteps.map((step) => (
                <li key={step.index} data-process-step className="pb-16 pl-8">
                  <p className="text-[0.68rem] tracking-[0.2em] text-accent uppercase">{step.index}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-none tracking-[-0.03em]">
                    {step.name}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="process-horizontal hidden lg:block">
        <div data-process-pin>
          <div data-process-stage className="flex min-h-svh flex-col justify-center px-12">
            <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Process</p>
            <div data-process-board className="process-board mt-16">
              <div className="relative">
                <div className="absolute top-3 right-0 left-0 h-px bg-border" aria-hidden="true" />
                <div
                  data-process-line
                  className="absolute top-3 left-0 h-px w-full origin-left scale-x-0 bg-foreground"
                  aria-hidden="true"
                />
                <ol className="relative grid grid-cols-6 gap-6">
                  {processSteps.map((step, index) => (
                    <li
                      key={step.index}
                      data-process-step
                      className={index === 0 ? "is-active pt-8" : "pt-8"}
                    >
                      <p className="font-serif text-3xl leading-none tracking-[-0.04em]">{step.index}</p>
                      <h3 className="mt-4 text-sm leading-snug tracking-[0.14em] uppercase">
                        {step.name}
                      </h3>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-16 max-w-xl">
                <p
                  data-process-title
                  className="font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-none tracking-[-0.03em]"
                >
                  {processSteps[0].index} — {processSteps[0].name}
                </p>
                <p data-process-text className="mt-5 text-lg leading-relaxed text-muted">
                  {processSteps[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
