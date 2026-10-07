"use client";

import { useRef, useState } from "react";
import { floorDrawings } from "@/components/floor-plans";
import { NorthArrow, PLAN_VIEWBOX } from "@/components/floor-plans/marks";
import {
  floorPlanProject,
  floorPlans,
  type FloorId,
} from "@/data/floor-plans";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function FloorPlans() {
  const rootRef = useRef<HTMLElement>(null);
  const seenRef = useRef(false);
  const [activeId, setActiveId] = useState<FloorId>("ground");
  const active = floorPlans.find((floor) => floor.id === activeId) ?? floorPlans[0];
  const Drawing = floorDrawings[active.id];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const play = () => {
        const walls = root.querySelectorAll<SVGGeometryElement>("[data-plan-wall]");

        const mobile = window.matchMedia("(max-width: 767px)").matches;

        walls.forEach((shape) => {
          const length = shape.getTotalLength();
          if (!length) return;
          gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
        });

        gsap.set("[data-plan-detail]", { autoAlpha: 0 });

        gsap.to(walls, {
          strokeDashoffset: 0,
          duration: mobile ? 1.05 : 1.55,
          stagger: mobile ? 0.02 : 0.045,
          ease: "power2.inOut",
        });
        gsap.to("[data-plan-detail]", {
          autoAlpha: 1,
          duration: 0.6,
          delay: mobile ? 0.25 : 0.45,
          stagger: 0.012,
          ease: "power2.out",
        });
        gsap.from("[data-floor-copy]", {
          y: 14,
          autoAlpha: 0,
          force3D: false,
          duration: 0.65,
          ease: "power2.out",
        });
      };

      if (seenRef.current) {
        play();
        return;
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        once: true,
        onEnter: () => {
          seenRef.current = true;
          play();
        },
      });
    },
    { scope: rootRef, dependencies: [active.id], revertOnUpdate: true },
  );

  function selectFloor(id: FloorId) {
    setActiveId(id);
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;

    event.preventDefault();
    const next = (index + (forward ? 1 : -1) + floorPlans.length) % floorPlans.length;
    const floor = floorPlans[next];
    selectFloor(floor.id);
    document.getElementById(`floor-tab-${floor.id}`)?.focus();
  }

  return (
    <section
      ref={rootRef}
      id="plans"
      aria-label="Floor plans"
      className="bg-background px-6 py-24 text-foreground md:px-12 md:py-36"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Drawings</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.04em]">
            Floor plans
          </h2>
        </div>
        <p className="text-sm leading-relaxed md:text-right">
          {floorPlanProject.name}
          <span className="mt-1 block text-muted">
            {floorPlanProject.location}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            Scale {floorPlanProject.scale}
          </span>
        </p>
      </div>

      <div className="mt-12 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8">
        <div
          role="tablist"
          aria-label="Floors"
          className="order-1 flex max-w-full gap-6 overflow-x-auto border-b border-border lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0"
        >
          {floorPlans.map((floor, index) => {
            const selected = floor.id === active.id;

            return (
              <button
                key={floor.id}
                id={`floor-tab-${floor.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="floor-plan-sheet"
                tabIndex={selected ? 0 : -1}
                className={`flex shrink-0 items-baseline gap-4 border-b-2 py-3 text-left focus-visible:outline-foreground lg:border-b-0 lg:border-l-2 lg:py-4 lg:pl-4 ${
                  selected
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted"
                }`}
                onClick={() => selectFloor(floor.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className={selected ? "text-accent" : undefined}>{floor.index}</span>
                <span className="text-sm tracking-[0.16em] uppercase">{floor.name}</span>
              </button>
            );
          })}
        </div>

        <div className="order-2 mt-8 border border-foreground lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0">
          <div id="floor-plan-sheet" role="tabpanel" aria-labelledby={`floor-tab-${active.id}`} className="max-w-full overflow-x-auto">
            <svg
              viewBox={PLAN_VIEWBOX}
              role="img"
              aria-label={`${active.name} plan, ${active.width} by ${active.depth}`}
              className="block h-auto w-full min-w-[680px] text-foreground md:min-w-0"
            >
              <rect
                x="16"
                y="16"
                width="948"
                height="648"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <NorthArrow />
              <text x="48" y="56" fontSize="22" stroke="none" className="fill-accent">
                {active.index}
              </text>
              <Drawing />
            </svg>
          </div>
        </div>

        <div data-floor-copy className="order-3 mt-10 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-0">
          <p className="text-[0.68rem] tracking-[0.22em] text-muted uppercase">
            Sheet {active.sheet}
          </p>
          <h3 className="mt-3 font-serif text-[clamp(2.4rem,4vw,3.5rem)] leading-none tracking-[-0.03em]">
            {active.name}
          </h3>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">{active.summary}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <dt className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">Area</dt>
              <dd className="mt-2 font-serif text-3xl tracking-[-0.03em]">{active.area}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">Overall</dt>
              <dd className="mt-2 text-sm leading-relaxed">
                {active.width}
                <span aria-hidden="true"> × </span>
                <span className="sr-only"> by </span>
                {active.depth}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">Floor to floor</dt>
              <dd className="mt-2 text-sm">{active.floorToFloor}</dd>
            </div>
          </dl>

          <ul className="mt-8">
            {active.rooms.map((room, index) => (
              <li
                key={`${active.id}-${index}`}
                className="flex items-baseline justify-between gap-6 border-t border-border py-2.5 text-sm"
              >
                <span>{room.name}</span>
                <span className="text-muted">{room.area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
