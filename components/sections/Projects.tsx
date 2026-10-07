"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  formatFloorCount,
  formatProjectNumber,
  projects,
} from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]", root);
      const progress = root.querySelector<HTMLElement>("[data-project-progress]");
      const progressBar = root.querySelector<HTMLElement>("[data-project-progressbar]");
      const count = panels.length;
      if (count === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-project-visual]", { opacity: 1 });
        gsap.set("[data-project-media]", { scale: 1 });
        gsap.set("[data-project-copy]", { opacity: 1, y: 0 });
        panels.forEach((panel) => panel.removeAttribute("aria-hidden"));
      });

      const buildStory = (distance: number, scrub: number) => {
        let active = 0;
        const span = 1;

        panels.forEach((panel, index) => {
          if (index > 0) panel.setAttribute("aria-hidden", "true");
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * count * distance)}`,
            pin: stage,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.min(count - 1, Math.floor(self.progress * count));

              if (index === active) return;

              panels[active]?.setAttribute("aria-hidden", "true");
              panels[index]?.removeAttribute("aria-hidden");
              progressBar?.setAttribute("aria-valuenow", String(index + 1));
              progressBar?.setAttribute(
                "aria-valuetext",
                `Project ${index + 1} of ${count}`,
              );
              active = index;
            },
          },
        });

        panels.forEach((panel, index) => {
          const visual = panel.querySelector<HTMLElement>("[data-project-visual]");
          const media = panel.querySelector<HTMLElement>("[data-project-media]");
          const copy = panel.querySelector<HTMLElement>("[data-project-copy]");
          const slotStart = index * span;
          const slotEnd = (index + 1) * span;
          const enter = index === 0 ? 0 : slotStart - 0.28;

          if (media) {
            timeline.fromTo(
              media,
              { scale: 1.06 },
              {
                scale: 1,
                duration: slotEnd - enter,
                immediateRender: index === 0,
              },
              enter,
            );
          }

          if (index > 0 && visual && copy) {
            timeline.fromTo(
              visual,
              { opacity: 0, clipPath: "inset(8% 0% 12% 0%)" },
              {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.42,
                immediateRender: false,
              },
              enter,
            );
            timeline.fromTo(
              copy,
              { opacity: 0, y: 18, force3D: false },
              { opacity: 1, y: 0, force3D: false, duration: 0.42, immediateRender: false },
              enter,
            );
          }

          if (index < count - 1 && visual && copy) {
            const leave = slotEnd - 0.28;
            timeline.to(visual, { opacity: 0, duration: 0.28 }, leave);
            timeline.to(copy, { opacity: 0, y: -16, force3D: false, duration: 0.28 }, leave);
          }
        });

        if (progress) {
          timeline.fromTo(
            progress,
            { scaleX: 0 },
            { scaleX: 1, duration: count * span, immediateRender: false },
            0,
          );
        }

        return () => {
          panels.forEach((panel) => panel.removeAttribute("aria-hidden"));
        };
      };

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () =>
        buildStory(0.62, 0.3),
      );
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
        buildStory(1, 0.7),
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="work" aria-label="Selected work" className="bg-foreground">
      <h2 className="sr-only">Selected work</h2>
      <div ref={stageRef} className="project-stage">
        {projects.map((project, index) => (
          <article key={project.slug} data-project-panel className="project-panel">
            <div data-project-visual className="absolute inset-0">
              <div className="absolute inset-0 overflow-hidden">
                <div
                  data-project-media
                  className="project-media absolute inset-0 origin-center"
                >
                  <Image
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    fill
                    sizes="100vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: project.heroImage.position }}
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,21,19,0.08)_0%,rgba(22,21,19,0.02)_38%,rgba(22,21,19,0.62)_72%,rgba(22,21,19,0.86)_100%)]"
              />
            </div>

            <div
              data-project-copy
              className="absolute inset-x-0 bottom-0 z-10 px-6 pt-24 pb-10 md:px-12 md:pb-14"
            >
              <p className="flex items-center justify-between text-[0.68rem] tracking-[0.28em] text-background/75 uppercase">
                <span>{formatProjectNumber(index, projects.length)}</span>
                <span>{project.category}</span>
              </p>
              <h3 className="mt-4 font-serif text-[clamp(2.7rem,8vw,6.2rem)] leading-[0.9] tracking-[-0.04em]">
                {project.name}
              </h3>
              <p className="mt-4 text-sm text-background/80 md:text-base">
                {project.location}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {project.year}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-background/75 md:text-base">
                {project.description}
              </p>
              <p className="mt-6 text-[0.68rem] tracking-[0.22em] text-background/70 uppercase">
                {project.area}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {formatFloorCount(project.floors)}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {project.status}
              </p>
            </div>
          </article>
        ))}

        <div
          data-project-progressbar
          className="project-progress"
          role="progressbar"
          aria-label="Project progress"
          aria-valuemin={1}
          aria-valuemax={projects.length}
          aria-valuenow={1}
          aria-valuetext={`Project 1 of ${projects.length}`}
        >
          <span data-project-progress className="project-progress-fill" />
        </div>
      </div>
    </section>
  );
}
