"use client";

import { use, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lato } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/constants";

const numFont = Lato({ subsets: ["latin"], weight: "400" });

const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const metaVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.23, 1, 0.32, 1],
      delay: 0.6,
    },
  },
};

const descContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0.8,
    },
  },
};

const descWordVariants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function ProjectClient({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const project = projects.find((p) => p.slug === params.workID);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.history.scrollRestoration = "auto";
      }
    };
  }, [params.workID]);

  if (!project) {
    notFound();
  }

  const words = project.title.split(" ");
  const descWords = project.description.split(" ");

  return (
    <main className="w-full min-h-screen px-4 md:px-8 pt-32 pb-24">
      <div className="flex flex-col gap-8 mt-16">
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 select-none text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-wide leading-[1.05]"
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex ">
              {word.split("").map((letter, letterIdx) => (
                <motion.span
                  key={`${wordIdx}-${letterIdx}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="overflow-hidden">
          <motion.div
            variants={metaVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row md:items-baseline justify-between pb-8 gap-2  "
          >
            <p className="text-lg md:text-xl font-medium">{project.location}</p>
            <p
              className={`text-lg md:text-xl font-semibold lg:ml-12 ${numFont.className}`}
            >
              {project.year}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full mt-12 mb-24 flex justify-end">
        <motion.p
          variants={descContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full xl:max-w-7xl max-w-3xl lg:max-w-4xl tracking-wide text-xl md:text-2xl leading-relaxed font-normal md:text-left flex flex-wrap gap-x-[0.25em] gap-y-1"
        >
          {descWords.map((word, idx) => (
            <span key={idx} className="inline-flex overflow-hidden">
              <motion.span variants={descWordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </div>

      <div className="relative w-full aspect-video overflow-hidden mb-10 md:mb-20">
        <Image
          src={project.src}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {project.gallery.map((imgSrc, index) => (
          <div
            key={index}
            className="relative w-full aspect-4/2 md:aspect-4/3 overflow-hidden"
          >
            <Image
              src={imgSrc}
              alt={`${project.title} gallery view ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
