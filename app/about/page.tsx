import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutStory } from "@/components/sections/AboutStory";
import { company } from "@/data/company";

const description =
  "Amaar develops residential, commercial, and mixed-use buildings across Afghanistan. The practice was founded by Javed Ishaq, with an office in Aino Mina, Kandahar.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About — ${company.name}`,
    description,
    url: "/about",
    siteName: company.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 2000,
        height: 1333,
        alt: "A modern two-storey residence at dusk, with timber cladding, tall windows, and a lit living room.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About — ${company.name}`,
    description,
    images: ["/images/hero.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main">
        <AboutStory />
      </main>
      <Footer />
    </>
  );
}
