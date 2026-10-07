import Link from "next/link";
import { company } from "@/data/company";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-10 w-[2.9rem]" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${company.name}, home`}
      className={`inline-block shrink-0 bg-current focus-visible:outline-current ${className}`}
      style={{
        maskImage: "url(/images/amaar-logo.png)",
        WebkitMaskImage: "url(/images/amaar-logo.png)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
