import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FloorPlans } from "@/components/sections/FloorPlans";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <FloorPlans />
        <Gallery />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
