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
    isMobile ? ["60vh", "80vh"] : ["60vh", "90vh"],
  );

  return (
    <section ref={ref} className="w-full  py-10 md:py-24 px-6 md:px-12 ">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start ">
        {/*  LEFT COL */}
        <div className="md:col-span-1 flex flex-col gap-8 ">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl  lg:text-5xl font-bold tracking-tight leading-[1.1]"
          >
            Transforming quiet ideas into physical presence.
          </motion.h2>

          <p className="text-md lg:text-lg xl:text-xl text-[#695349] font-semibold leading-relaxed max-w-md">
            Our mission is to translate your ambition into tangible spaces. We
            offer a range of specialized spatial design services tailored to
            craft your unique environment.
          </p>
        </div>
        {/* MIDDLE COL */}
        <motion.div
          style={{ height }}
          transition={{
            ease: "easeOut",
          }}
          className="md:col-span-1.5  md:h-full relative overflow-hidden "
        >
          <Image
            src="/heroImgs/img2.jpg"
            alt="Interior design details showing spatial depth"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
        {/* RIGHT COL */}
        <div className="md:col-span-1.5 flex flex-col gap-8 lg:gap-14">
          <div className="border-b pb-2">
            <motion.h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[0.9]">
              Our Services
            </motion.h1>
          </div>
          <div className="flex flex-col gap-10">
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
                className="flex flex-col gap-2 group"
              >
                <h3 className="text-xl  lg:text-3xl font-semibold tracking-normal  transition-colors">
                  {service.title}
                </h3>
                <p className="text-md lg:text-lg opacity-80 font-semibold leading-relaxed max-w-md">
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
