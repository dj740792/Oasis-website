"use client";
import { Lato } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { brands, stats } from "@/constants";

const numFont = Lato({ subsets: ["latin"], weight: "400" });
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export default function StatsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section
      ref={containerRef}
      className="w-full px-4 py-16 md:py-39 md:px-20 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-extrabold tracking-tight uppercase leading-tight md:leading-none">
            REAL RESULTS WE ARE <br className="hidden sm:block" />
            PROUD TO SHARE
          </h2>
        </div>
        <p className="text-sm lg:text-lg xl:text-xl font-semibold max-w-md leading-relaxed md:leading-snug">
          Every figure represents spaces shaped, precision engineering, and
          lasting architectural identity.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-12 mb-24 lg:mb-36"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={cardVariants}
            className="col-span-12 md:col-span-4 border-l md:border-l-2 xl:border-l-3 pl-4 md:pl-8 flex flex-col justify-between"
          >
            <div>
              <p
                className={`text-3xl lg:text-5xl xl:text-7xl font-black tracking-wide leading-none mb-3 md:mb-4 ${numFont.className}`}
              >
                {stat.value}
              </p>
              <p className="text-xl lg:text-3xl font-bold tracking-wide uppercase mb-2 md:mb-3">
                {stat.label}
              </p>
              <p className="text-xs sm:text-sm md:text-lg font-semibold leading-relaxed">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full pt-3 lg:pt-8  overflow-hidden">
        <div className="flex flex-col justify-start items-start lg:justify-between lg:items-center lg:text-center  mb-12 md:mb-24 gap-6 md:gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight uppercase leading-tight md:leading-none">
              OUR CLIENTS
            </h2>
          </div>
          <p className="text-md lg:text-lg xl:text-2xl font-semibold max-w-xl leading-relaxed opacity-80">
            Trusted by some of the region's most recognised names across real
            estate, hospitality, retail, and public design.
          </p>
        </div>

        <div className="w-full overflow-hidden flex  ">
          <motion.div
            style={{ x: xTransform }}
            className="flex gap-16 items-center shrink-0"
          >
            {duplicatedBrands.map((brand, i) => (
              <div
                key={i}
                className="flex items-center gap-12 sm:gap-16 shrink-0"
              >
                <div className="relative w-40 h-16 lg:w-45 lg:h-20 opacity-60 hover:opacity-100 transition-opacity hover:filter-[invert(14%)_sepia(38%)_saturate(1180%)_hue-rotate(334deg)_brightness(92%)_contrast(88%)]">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="w-2 h-2 rounded-full bg-[#723f27]/30" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
