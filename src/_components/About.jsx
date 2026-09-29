"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { aboutContent } from "@/constants";

const MotionLink = motion(Link);

export default function About() {
  const dialogRef = useRef(null);

  const isInView = useInView(dialogRef, { once: true, amount: 0.3 });

  const { heading } = aboutContent;
  const headingWords = heading.split(/\s+/);
  const paragraph =
    "Our mission is to translate your ambition into tangible spaces. We offer a range of specialized spatial design services tailored to craft your unique environment.";
  const paragraphWords = paragraph.split(/\s+/);

  return (
    <section className="relative z-10 mt-[-100svh] flex min-h-screen w-full items-center justify-center bg-[#f8eee9] px-4">
      <motion.div className="flex w-full flex-col items-center gap-4 py-10 text-center">
        <div
          ref={dialogRef}
          className="mx-auto w-full overflow-hidden leading-[1.3] md:max-w-6xl md:px-12 flex flex-col gap-12 items-center"
        >
          <motion.h2 className="flex flex-wrap justify-center gap-y-1 text-center text-4xl font-semibold leading-none tracking-wider md:text-5xl lg:text-5xl xl:text-6xl">
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

          <p className="text-sm font-semibold leading-relaxed text-[#695349] md:text-sm lg:max-w-4xl lg:text-lg xl:text-xl">
            {paragraphWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="mr-[0.25em] inline-flex overflow-hidden pb-[0.1em] leading-[1.3] last:mr-0"
              >
                <motion.span
                  initial={{ y: "140%" }}
                  animate={isInView ? { y: "0%" } : { y: "140%" }}
                  transition={{
                    duration: 0.65,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.25 + wordIndex * 0.025,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-14 w-px origin-top bg-[#695349]/50"
        />

        <MotionLink
          href="/about"
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          className="group relative flex h-14 w-56 self-center items-center justify-center rounded-md bg-[#361e13] px-6 text-base font-medium tracking-wide text-[#f8eee9] transition-all duration-300 sm:text-lg"
        >
          <span>Our Journey</span>
          <div className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 translate-x-1 items-center justify-center text-[#f8eee9] transition-transform duration-300 group-hover:translate-x-0 group-focus-visible:translate-x-0">
            <motion.svg
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <motion.path
                d="M12 32H52"
                variants={{
                  rest: {
                    opacity: 0,
                    pathLength: 0,
                    transition: {
                      pathLength: {
                        duration: 0.48,
                        delay: 0.08,
                        ease: [0.4, 0, 1, 1],
                      },
                      opacity: { duration: 0.01, delay: 0.5 },
                    },
                  },
                  hover: {
                    opacity: 1,
                    pathLength: 1,
                    transition: {
                      pathLength: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.08 },
                    },
                  },
                }}
              />
              <motion.path
                d="M38 18L52 32L38 46"
                variants={{
                  rest: {
                    opacity: 0,
                    pathLength: 0,
                    transition: {
                      pathLength: { duration: 0.28, ease: [0.4, 0, 1, 1] },
                      opacity: { duration: 0.01, delay: 0.3 },
                    },
                  },
                  hover: {
                    opacity: 1,
                    pathLength: 1,
                    transition: {
                      pathLength: {
                        duration: 0.48,
                        delay: 0.18,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      opacity: { duration: 0.08, delay: 0.16 },
                    },
                  },
                }}
              />
            </motion.svg>
          </div>
        </MotionLink>
      </motion.div>
    </section>
  );
}
