"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { getGalleryImages } from "@/data/gallery";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

const images = getGalleryImages();

export function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = root.querySelector<HTMLElement>("[data-gallery-heading]");
        const headingSplit = heading
          ? revealWords(heading, {
              duration: 1.15,
              stagger: 0.06,
              scrollTrigger: { trigger: heading, start: "top 86%", once: true },
            })
          : null;

        root.querySelectorAll<HTMLElement>("[data-gallery-item]").forEach((item) => {
          const frame = item.querySelector("[data-gallery-frame]");

          if (frame) {
            gsap.from(frame, {
              clipPath: "inset(14% 0% 14% 0%)",
              duration: 1.25,
              ease: motion.ease.out,
              scrollTrigger: {
                trigger: item,
                start: "top 86%",
                once: true,
              },
            });
          }
        });

        if (canHover) {
          gsap.set("[data-gallery-caption]", { autoAlpha: 0, y: 10 });
        }

        return () => headingSplit?.revert();
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-gallery-item]").forEach((item) => {
          const parallax = item.querySelector("[data-gallery-parallax]");
          if (!parallax) return;

          gsap.fromTo(
            parallax,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });
    },
    { scope: rootRef },
  );

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (reduce || !canHover) return;

      const cleanups: Array<() => void> = [];

      root.querySelectorAll<HTMLElement>("[data-gallery-item]").forEach((item) => {
        const media = item.querySelector("[data-gallery-media]");
        const caption = item.querySelector("[data-gallery-caption]");

        const enter = contextSafe(() => {
          gsap.to(media, { scale: 1.06, duration: 0.9, ease: "power2.out" });
          gsap.to(caption, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
        });
        const leave = contextSafe(() => {
          gsap.to(media, { scale: 1, duration: 0.8, ease: "power2.out" });
          gsap.to(caption, { autoAlpha: 0, y: 10, duration: 0.35, ease: "power2.out" });
        });

        item.addEventListener("pointerenter", enter);
        item.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          item.removeEventListener("pointerenter", enter);
          item.removeEventListener("pointerleave", leave);
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef },
  );

  const closeViewer = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (!lenis) return;

    if (activeIndex !== null) lenis.stop();
    else lenis.start();

    return () => {
      lenis.start();
    };
  }, [activeIndex, lenis]);

  return (
    <section
      ref={rootRef}
      id="gallery"
      aria-label="Gallery"
      className="bg-background px-6 py-24 text-foreground md:px-12 md:py-36"
    >
      <div className="max-w-3xl">
        <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Photographs</p>
        <h2
          data-gallery-heading
          className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.04em]"
        >
          Gallery
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
        {images.map((image, index) => (
          <figure key={`${image.src}-${image.project}`} className={image.className}>
            <button
              type="button"
              data-gallery-item
              className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-foreground"
              aria-label={`Open ${image.project}: ${image.alt}`}
              onClick={() => setActiveIndex(index)}
            >
              <span data-gallery-frame className={`relative block overflow-hidden ${image.aspect}`}>
                <span data-gallery-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
                  <span data-gallery-media className="relative block h-full w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={image.sizes}
                      quality={75}
                      loading="lazy"
                      className="object-cover"
                      style={{ objectPosition: image.position }}
                    />
                  </span>
                </span>
                <span
                  data-gallery-caption
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent px-4 pt-16 pb-4 text-background md:px-5 md:pb-5"
                >
                  <span className="block text-[0.68rem] tracking-[0.22em] uppercase">
                    {image.project}
                  </span>
                  <span className="mt-2 block text-sm text-background/80">{image.location}</span>
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {activeIndex !== null ? (
        <GalleryViewer
          images={images}
          index={activeIndex}
          onClose={closeViewer}
          onChange={setActiveIndex}
        />
      ) : null}
    </section>
  );
}
