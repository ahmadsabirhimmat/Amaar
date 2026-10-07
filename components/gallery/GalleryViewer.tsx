"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";
import { gsap, useGSAP } from "@/lib/gsap";

type GalleryViewerProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function GalleryViewer({ images, index, onClose, onChange }: GalleryViewerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const total = images.length;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        "[data-viewer-frame]",
        { autoAlpha: 0, scale: 1.04 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power2.out" },
      );
    },
    { scope: rootRef, dependencies: [image.src], revertOnUpdate: true },
  );

  useEffect(() => {
    const previous = document.activeElement;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % total);
      if (event.key === "ArrowLeft") onChange((index - 1 + total) % total);

      if (event.key !== "Tab") return;
      const root = rootRef.current;
      if (!root) return;
      const focusable = [...root.querySelectorAll<HTMLElement>("button, a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, onChange, onClose, total]);

  if (!image) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.project} photograph`}
      className="fixed inset-0 z-[70] flex flex-col bg-foreground text-background"
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <p className="text-[0.68rem] tracking-[0.22em] uppercase">
          {String(index + 1).padStart(2, "0")}
          <span className="text-background/50"> / {String(total).padStart(2, "0")}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          className="text-[0.68rem] tracking-[0.22em] uppercase focus-visible:outline-background"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div
        data-viewer-frame
        className="relative mx-auto min-h-0 w-full flex-1 px-6 md:px-16"
        onPointerUp={(event) => {
          const start = Number(event.currentTarget.dataset.swipe ?? event.clientX);
          const delta = event.clientX - start;
          if (delta > 56) onChange((index - 1 + total) % total);
          if (delta < -56) onChange((index + 1) % total);
        }}
        onPointerDown={(event) => {
          event.currentTarget.dataset.swipe = String(event.clientX);
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          quality={75}
          loading="eager"
          className="object-contain"
        />
      </div>

      <div className="flex items-end justify-between gap-6 px-6 py-6 md:px-12">
        <div>
          <p className="font-serif text-3xl tracking-[-0.03em]">{image.project}</p>
          <p className="mt-2 text-sm text-background/70">
            {image.location}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {image.year}
          </p>
        </div>
        <div className="flex gap-6">
          <button
            type="button"
            className="text-[0.68rem] tracking-[0.18em] uppercase focus-visible:outline-background"
            onClick={() => onChange((index - 1 + total) % total)}
          >
            Previous
          </button>
          <button
            type="button"
            className="text-[0.68rem] tracking-[0.18em] uppercase focus-visible:outline-background"
            onClick={() => onChange((index + 1) % total)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
