"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Fjalla_One, Lato } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { projects } from "@/constants";
import Image from "next/image";

const numFont = Lato({ subsets: ["latin"], weight: "400" });

const lexend = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

export default function WorkClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = "Our Projects";
  const containerRef = useRef(null);
  return (
    <section className="w-full min-h-screen flex flex-col px-8 py-12 lg:py-24 lg:px-16 pt-38 gap-22">
      <motion.div
        ref={containerRef}
        className="w-full  gap-4 md:gap-8 lg:gap-12 md:px-4 "
      >
        <div className="w-full flex flex-col lg:flex-row text-center lg:text-start items-center  mt-4 justify-between md:mt-3 lg:mt-18 overflow-hidden lg:gap-12 ">
          <h1
            className={`flex justify-start items-center tracking-tight leading-none select-none whitespace-nowrap text-[16vw] md:text-[12vw] lg:text-[10vw] h-[19vh] xl:text-[9vw] xl:h-[23vh] md:mx-4  ${lexend.className}`}
          >
            {logo.split("").map((letter, index) => (
              <span key={index} className=" inline-block">
                {mounted ? (
                  <motion.span
                    initial={{ y: "140%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.13, 1, 0.22, 1],
                      delay: index * 0.02,
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ) : (
                  <span className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                )}
              </span>
            ))}
          </h1>
          <p className="text-md md:text-lg xl:text-xl font-normal leading-relaxed max-w-xl opacity-80">
            A selection of spaces shaped around material, atmosphere and the way
            people experience them.
          </p>
        </div>

        {/* project section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mt-22">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer flex flex-col"
            >
              <Link
                href={`/work/${project.slug}`}
                className="block overflow-hidden relative w-full aspect-16/10 "
              >
                <Image
                  src={project.src}
                  alt=""
                  fill
                  sizes="(max-widht:768px)100vw , 50vw"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              <div className="flex justify-between mt-4">
                <p className="text-md md:text-lg xl:text-xl  tracking-wide font-semibold">
                  {project.title}
                </p>
                <p
                  className={`text-md md:text-lg tracking-wide font-semibold opacity-70 ${numFont.className}`}
                >
                  {project.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
