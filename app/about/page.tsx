import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutStory } from "@/components/sections/AboutStory";
import { company } from "@/data/company";

const description =
  "Time Towers (ټايم ټاورز) is a residence and real estate address on 26th Street, 2nd Aino Mina, District 11, Kandahar. Time Tower Founder started the practice. The office is always open.";

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
        alt: "A Time Towers residence at dusk, with timber cladding, tall windows, and a lit living room.",
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
