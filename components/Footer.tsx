import { Logo } from "@/components/Logo";
import { formatLocation } from "@/data/company";

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border px-6 py-6 text-foreground md:px-12">
      <div className="flex flex-col gap-4 text-[0.68rem] tracking-[0.2em] uppercase sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-8 w-[2.3rem]" />
        <p className="text-muted">{formatLocation("short")}</p>
        <a className="hover:text-accent focus-visible:outline-foreground" href="#main">
          Back to top
        </a>
      </div>
    </footer>
  );
}
