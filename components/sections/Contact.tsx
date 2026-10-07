"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { company, formatLocation } from "@/data/company";
import { services } from "@/data/services";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealWords } from "@/lib/motion";

const projectTypes = [...services.map((service) => service.name), "Not yet sure"] as const;

export function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const lines = hero.querySelectorAll<HTMLElement>("[data-contact-line]");
      const split = revealWords(lines, {
        duration: 1.3,
        stagger: 0.06,
        scrollTrigger: { trigger: hero, start: "top 74%", once: true },
      });

      gsap.from("[data-contact-meta]", {
        autoAlpha: 0,
        y: 16,
        force3D: false,
        duration: 0.9,
        delay: 0.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: hero,
          start: "top 74%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-contact-media]",
        { scale: 1.06, clipPath: "inset(8% 0% 10% 0%)" },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: hero,
            start: "top 78%",
            once: true,
          },
        },
      );

      return () => split.revert();
    },
    { scope: heroRef },
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section
        id="contact"
        ref={heroRef}
        data-contact-hero
        aria-label="Contact"
        className="relative flex min-h-svh items-end overflow-hidden bg-foreground text-background"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div data-contact-media className="absolute inset-0 origin-center">
            <Image
              src="/images/projects/04-house.jpg"
              alt="A white two-storey house with a timber ceiling, full-height glass, and a still pool in the court."
              fill
              sizes="100vw"
              quality={75}
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,21,19,0.42)_0%,rgba(22,21,19,0.12)_38%,rgba(22,21,19,0.55)_68%,rgba(22,21,19,0.88)_100%)]"
          />
        </div>

        <div className="relative z-10 w-full px-6 pt-32 pb-12 md:px-12 md:pb-16">
          <h2 className="max-w-[12ch] font-serif text-[clamp(3.6rem,11vw,8.4rem)] leading-[0.86] tracking-[-0.045em]">
            <span className="block overflow-hidden">
              <span data-contact-line className="block pb-[0.06em]">
                Let&apos;s build
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-contact-line className="block pb-[0.06em]">
                something
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-contact-line className="block pb-[0.08em] italic">
                that lasts.
              </span>
            </span>
          </h2>

          <div data-contact-meta className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-[0.68rem] tracking-[0.22em] text-background/60 uppercase">Email</dt>
                <dd className="mt-2">
                  <a
                    className="text-sm hover:text-accent focus-visible:outline-background"
                    href={company.contact.emailHref}
                  >
                    {company.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.22em] text-background/60 uppercase">Phone</dt>
                <dd className="mt-2 flex flex-col gap-1 text-sm">
                  <a
                    className="hover:text-accent focus-visible:outline-background"
                    href={company.contact.mobileHref}
                  >
                    {company.contact.mobile}
                  </a>
                  <a
                    className="text-background/75 hover:text-accent focus-visible:outline-background"
                    href={company.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {company.contact.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.22em] text-background/60 uppercase">Location</dt>
                <dd className="mt-2">
                  <a
                    className="text-sm hover:text-accent focus-visible:outline-background"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatLocation())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatLocation()}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] tracking-[0.22em] text-background/60 uppercase">Social</dt>
                <dd className="mt-2 flex gap-5 text-sm">
                  <a
                    className="hover:text-accent focus-visible:outline-background"
                    href={company.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    className="hover:text-accent focus-visible:outline-background"
                    href={company.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-4">
              <a
                className="inline-flex border border-background/70 px-5 py-3 text-[0.68rem] tracking-[0.22em] uppercase hover:bg-background hover:text-foreground focus-visible:outline-background"
                href={company.contact.emailHref}
              >
                Contact
              </a>
              <a
                className="inline-flex border border-background px-5 py-3 text-[0.68rem] tracking-[0.22em] uppercase hover:bg-background hover:text-foreground focus-visible:outline-background"
                href="#inquiry"
              >
                Project inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="inquiry" aria-label="Project inquiry" className="scroll-mt-24 bg-background px-6 py-24 text-foreground md:px-12 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[0.68rem] tracking-[0.28em] text-muted uppercase">Inquiry</p>
            <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em]">
              Tell us about the building.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <p
                role="status"
                className="max-w-md font-serif text-4xl leading-tight tracking-[-0.03em]"
              >
                Held on this page. A live inbox is not connected yet.
              </p>
            ) : (
              <form className="grid gap-10 md:grid-cols-2" onSubmit={onSubmit} noValidate={false}>
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
                <label className="block" htmlFor="projectType">
                  <span className="text-[0.68rem] tracking-[0.22em] text-muted uppercase">Project type</span>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    defaultValue=""
                    className="mt-3 w-full border-0 border-b border-foreground/30 bg-transparent py-3 text-lg focus-visible:border-foreground focus-visible:outline-foreground"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block md:col-span-2" htmlFor="message">
                  <span className="text-[0.68rem] tracking-[0.22em] text-muted uppercase">Message</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-3 w-full resize-y border-0 border-b border-foreground/30 bg-transparent py-3 text-lg focus-visible:border-foreground focus-visible:outline-foreground"
                  />
                </label>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="border border-foreground px-6 py-3 text-[0.68rem] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background focus-visible:outline-foreground"
                  >
                    Send inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-[0.68rem] tracking-[0.22em] text-muted uppercase">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-3 w-full border-0 border-b border-foreground/30 bg-transparent py-3 text-lg focus-visible:border-foreground focus-visible:outline-foreground"
      />
    </label>
  );
}
