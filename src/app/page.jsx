"use client";
import About from "@/_components/About";
import Hero from "@/_components/Hero";
import Works from "@/_components/Works";
import Services from "@/_components/Services";
import Process from "@/_components/Process";
import Cta from "@/_components/Cta";
import Testimonials from "@/_components/Testimonials";

export default function page() {
  return (
    <main className="relative w-full min-h-screen">
      <Hero />
      <About />
      <Works />
       <Process />
      <Services />   
      <Testimonials />
      <Cta />
    </main>
  );
}
