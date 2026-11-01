import Link from "next/link";
import { company } from "@/data/company";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${company.name}, home`}
      className={`inline-flex shrink-0 flex-col leading-none focus-visible:outline-current ${className}`}
    >
      <span className="font-serif text-[1.45rem] tracking-[-0.04em]">{company.name}</span>
      <span className="mt-1.5 text-[0.68rem] leading-none opacity-70">{company.localName}</span>
    </Link>
  );
}
