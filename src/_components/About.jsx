"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "@/constants";

export default function About() {
  const dialogRef = useRef(null);

  const isInView = useInView(dialogRef, { once: true, amount: 0.3 });

  const { heading } = aboutContent;
  const headingWords = heading.split(/\s+/);

  return (
    <section className="relative z-10 mt-[-100svh] flex min-h-screen w-full items-center justify-center bg-[#f8eee9] px-4">
      <motion.div className="flex w-full flex-col items-center gap-12 py-10 text-center">
        <div
          ref={dialogRef}
          className="mx-auto w-full overflow-hidden leading-[1.3] md:max-w-6xl md:px-12"
        >
          <motion.h2 className="flex flex-wrap justify-center gap-y-1 text-center text-4xl font-semibold leading-none tracking-wider md:text-5xl lg:text-6xl">
            {headingWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-flex whitespace-nowrap overflow-hidden leading-[1.1] pb-[0.15em] mb-[-0.15em] mr-[0.25em] last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    initial={{ y: "140%" }}
                    animate={isInView ? { y: "0%" } : { y: "140%" }}
                    transition={{
                      duration: 0.65,
                      ease: [0.23, 1, 0.32, 1],
                      delay: wordIndex * 0.04 + letterIndex * 0.01,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>
        </div>

        <Link
          href="/about"
          className="group inline-flex w-fit self-center items-center justify-between gap-6 rounded-md bg-[#361e13] px-6 py-3 text-base font-medium tracking-wide text-[#f8eee9] transition-all duration-300 sm:text-lg"
        >
          <span>Our Journey</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8eee9] text-[#361e13] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
