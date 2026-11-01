import { Logo } from "@/components/Logo";
import { company, formatLocation } from "@/data/company";

export function Footer() {
  return (
    <footer id="site-footer" className="bg-foreground text-background">
      <div className="grid gap-12 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
            {company.summary}
          </p>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.22em] text-background/45 uppercase">Visit</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{formatLocation()}</p>
          <p className="mt-3 text-sm text-background/70">Always open</p>
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.22em] text-background/45 uppercase">Contact</p>
          <div className="mt-4 flex flex-col items-start gap-2 text-sm">
            <a className="hover:text-accent focus-visible:outline-background" href={company.contact.mobileHref}>
              {company.contact.mobile}
            </a>
            <a
              className="hover:text-accent focus-visible:outline-background"
              href={company.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="hover:text-accent focus-visible:outline-background"
              href={company.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-background/12 px-6 py-5 text-[0.68rem] tracking-[0.18em] uppercase sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p className="text-background/45">{formatLocation("short")}</p>
        <a className="hover:text-accent focus-visible:outline-background" href="#main">
          Back to top
        </a>
      </div>
    </footer>
  );
}
