import StickyBar from "@/components/sections/StickyBar";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import LogosMarquee from "@/components/sections/LogosMarquee";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Benefits from "@/components/sections/Benefits";
import Comparison from "@/components/sections/Comparison";
import MockupInteractive from "@/components/sections/MockupInteractive";
import Testimonials from "@/components/sections/Testimonials";
import Offer from "@/components/sections/Offer";
import Formulario from "@/components/sections/Formulario";
import FAQ from "@/components/sections/FAQ";

import CTAFooter from "@/components/sections/CTAFooter";

export default function Home() {
  return (
    <main id="main">
      <StickyBar />
      <Header />
      <Hero />
      <LogosMarquee />
      <Problem />
      <Solution />
      <Benefits />
      <Comparison />
      <MockupInteractive />
      <Testimonials />
      <Offer />
      <Formulario />
      <FAQ />

      <CTAFooter />
    </main>
  );
}
