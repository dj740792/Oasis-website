"use client";

import { Fjalla_One } from "next/font/google";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fjalla = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const subHeadY = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Studio Oasis"
      className="relative z-0 h-[200svh] w-full px-4 pt-28 md:px-4 md:pt-28 md:pb-6"
    >
      <div className="sticky top-0 flex h-screen min-h-136 w-full items-center justify-center overflow-hidden">
        <video
          src="/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover "
        ></video>
        <div className="flex flex-col text-white z-10 gap-14 mt-40 lg:mt-12 items-center">
          <motion.h1
            style={{
              y: logoY,
              scale: logoScale,
              transform: "none",
            }}
            className={`relative text-center select-none whitespace-nowrap text-[38vw] leading-none  drop-shadow-md md:text-[16vw] lg:text-[20vw] ${fjalla.className}`}
          >
            OASIS
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
