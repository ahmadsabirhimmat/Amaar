"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/Logo";
import { contactAction, primaryNavigation } from "@/data/navigation";
import { company, formatLocation } from "@/data/company";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const menuLinks = [...primaryNavigation, contactAction];

function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href") ?? "";

  if (href.startsWith("#") && !document.getElementById(href.slice(1))) {
    event.preventDefault();
  }
}

export function Header() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const wasOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const home = pathname === "/";
  const solid = !home || scrolled || open;

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });

      const panel = panelRef.current;
      if (!panel) return;

      const links = panel.querySelectorAll<HTMLElement>("[data-menu-link]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const timeline = gsap.timeline({ paused: true });
      timeline
        .fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: reduce ? 0 : 0.7, ease: "power2.out" },
        )
        .fromTo(
          links,
          { y: reduce ? 0 : 24, opacity: reduce ? 1 : 0 },
          {
            y: 0,
            opacity: 1,
            force3D: false,
            duration: reduce ? 0 : 0.95,
            stagger: reduce ? 0 : 0.06,
            ease: "power3.out",
          },
          reduce ? 0 : 0.08,
        );

      timelineRef.current = timeline;

      return () => {
        timelineRef.current = null;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (open) timeline.play();
    else if (wasOpenRef.current) timeline.reverse();

    if (wasOpenRef.current && !open) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!lenis) return;

    if (open) lenis.stop();
    else lenis.start();

    return () => {
      lenis.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;

    const root = rootRef.current;
    const panel = panelRef.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const nodes = [
      root?.querySelector<HTMLElement>("a[aria-label]"),
      menuButtonRef.current,
      ...(panel ? [...panel.querySelectorAll<HTMLElement>("a")] : []),
    ].filter((node): node is HTMLElement => node !== null);

    const frame = requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>("[data-menu-link]")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header ref={rootRef} className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="absolute top-4 left-6 z-[60] -translate-y-24 bg-background px-3 py-2 text-xs tracking-[0.18em] text-foreground uppercase focus:translate-y-0"
      >
        Skip to content
      </a>

      <div
        className={`relative z-50 grid grid-cols-[1fr_auto] items-center px-6 py-4 motion-reduce:transition-none transition-[background-color,color,border-color,box-shadow] duration-700 md:grid-cols-[1fr_auto_1fr] md:px-12 ${
          solid
            ? "border-b border-border/80 bg-background/80 text-foreground shadow-[0_10px_40px_-28px_rgba(18,17,16,0.45)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent text-background"
        }`}
      >
        <Logo />

        <nav className="hidden justify-self-center md:block" aria-label="Primary">
          <ul className="flex items-center gap-5 xl:gap-8">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === pathname ? "page" : undefined}
                  className="text-xs tracking-[0.22em] uppercase transition-opacity duration-500 hover:opacity-60 focus-visible:outline-current aria-[current=page]:text-accent"
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-6">
          <Link
            href={contactAction.href}
            className={`hidden rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase transition-colors duration-500 focus-visible:outline-current md:inline-flex ${
              solid
                ? "border-foreground/15 hover:bg-foreground hover:text-background"
                : "border-background/35 hover:bg-background hover:text-foreground"
            }`}
          >
            {contactAction.label}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center focus-visible:outline-current md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 motion-reduce:transition-none ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 motion-reduce:transition-none ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-40 bg-background text-foreground opacity-0 md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <nav className="flex h-full flex-col justify-end px-6 pt-28 pb-16" aria-label="Mobile">
          <ul className="flex flex-col gap-3">
            {menuLinks.map((item) => (
              <li key={item.label} className="overflow-hidden">
                <Link
                  data-menu-link
                  href={item.href}
                  className="block font-serif text-[clamp(2.8rem,12vw,4.5rem)] leading-[0.95] tracking-[-0.03em] focus-visible:outline-foreground"
                  onClick={(event) => {
                    handleNavClick(event);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-2 text-sm text-muted">
            <p>{formatLocation()}</p>
            <a data-menu-link href={company.contact.mobileHref} onClick={() => setOpen(false)}>
              {company.contact.mobile}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
