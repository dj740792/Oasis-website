"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { serviceList } from "@/constants";

export default function Services() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const height = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? ["0vh", "80vh"] : ["0vh", "90vh"],
  );

  return (
    <section ref={ref} className="w-full py-10 md:py-24 px-6 md:px-12">
      <div className="max-w-8xl mx-auto flex flex-col gap-10 md:flex-row md:items-start md:gap-6 lg:gap-8">
        {/*  LEFT COL */}
        <div className="flex min-w-0 flex-col gap-5 md:w-[29%] md:shrink-0 lg:gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl font-bold tracking-tight leading-[1.1] lg:text-5xl"
          >
            Transforming quiet ideas into physical presence.
          </motion.h2>

        </div>
        {/* MIDDLE COL */}
        <motion.div
          style={{ height }}
          transition={{ ease: "easeOut" }}
          className="relative w-full shrink-0 overflow-hidden md:w-[30%]"
        >
          <Image
            src="/heroImgs/img2.jpg"
            alt="Interior design details showing spatial depth"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 33vw"
          />
        </motion.div>
        {/* RIGHT COL */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 md:h-[80vh] md:gap-4 lg:h-[90vh] lg:gap-6">
          <div className="border-b pb-2">
            <motion.h1 className="text-2xl font-extrabold tracking-tight leading-[0.9] lg:text-4xl">
              Our Services
            </motion.h1>
          </div>
          <div className="flex flex-col gap-4 md:gap-3 lg:gap-5">
            {serviceList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col gap-1.5 group"
              >
                <h3 className="text-base font-semibold tracking-normal transition-colors md:text-lg lg:text-2xl">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold leading-snug opacity-80 md:text-sm lg:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
