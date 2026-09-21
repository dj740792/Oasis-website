"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { aboutContent } from "@/constants";

const textContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.13, 1, 0.22, 1],
    },
  },
};

export default function About() {
  const headingRef = useRef(null);
  const dialogRef = useRef(null);
  const modalVideoRef = useRef(null);

  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  const { heading, paragraph } = aboutContent;
  const headingWords = heading.split(/\s+/);
  const paragraphWords = paragraph.split(/\s+/);

  const handleOpenVideo = () => {
    if (dialogRef.current && modalVideoRef.current) {
      dialogRef.current.showModal();
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.muted = false;
      modalVideoRef.current.play();
    }
  };

  const handleCloseVideo = () => {
    if (dialogRef.current && modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.muted = true;
      dialogRef.current.close();
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-16 px-4">
      <motion.div className="w-full flex flex-col gap-12 mt-20 mb-20 md:mt-0">
        <div
          ref={headingRef}
          className="md:max-w-7xl leading-[1.3] md:px-12 overflow-hidden"
        >
          <motion.h2 className="lg:text-6xl md:text-5xl text-2xl font-bold tracking-wider leading-none flex flex-wrap gap-y-1">
            {headingWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-flex whitespace-nowrap overflow-hidden pb-[0.15em] mb-[-0.15em] mr-[0.25em] last:mr-0"
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

        <div className="flex justify-center lg:justify-around md:flex-row md:gap-4 gap-12 flex-col items-center">
          <div className="w-full sm:w-2/3 md:w-1/3 flex flex-col gap-9">
            <motion.p
              variants={textContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-md md:text-lg xl:text-xl 2xl:text-2xl leading-8 tracking-wide font-bold opacity-90 flex flex-wrap gap-x-[0.25em] gap-y-1"
            >
              {paragraphWords.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex overflow-hidden">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.p>

            <Link
              href="/about"
              className="w-fit self-start group inline-flex items-center justify-between gap-6 px-6 py-3 bg-[#361e13] text-[#f8eee9] rounded-md text-base sm:text-lg font-medium tracking-wide transition-all duration-300"
            >
              <span>Our Journey</span>
              <div className="w-8 h-8 rounded-full bg-[#f8eee9] text-[#361e13] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </div>

          <motion.div
            onClick={handleOpenVideo}
            className="relative overflow-hidden w-80 h-90 2xl:h-110 2xl:w-80 flex flex-col justify-between cursor-pointer group rounded-none"
          >
            <div className="relative w-full h-full overflow-hidden rounded-none">
              <video
                src="/video/about.mp4"
                preload="none"
                loop
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-none"
              />
            </div>
            <div className="flex justify-between items-center w-full pt-3 text-md uppercase tracking-widest">
              <p className="font-semibold text-xs md:text-md">showcase reel</p>
              <p className="font-semibold text-xs md:text-md opacity-70">
                2026
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <dialog
        ref={dialogRef}
        onClick={handleCloseVideo}
        className="fixed inset-0 m-auto bg-transparent p-0 border-none outline-none backdrop:bg-black/85 backdrop:backdrop-blur-sm max-w-5xl w-full overflow-visible shadow-none border-0 rounded-none"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full aspect-video overflow-hidden shadow-2xl bg-black rounded-none"
        >
          <button
            onClick={handleCloseVideo}
            aria-label="close video modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
          >
            <X size={20} />
          </button>

          <video
            ref={modalVideoRef}
            src="/video/about.mp4"
            controls
            playsInline
            className="w-full h-full object-cover rounded-none"
          />
        </div>
      </dialog>
    </section>
  );
}
