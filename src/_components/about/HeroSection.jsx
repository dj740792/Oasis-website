"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Fjalla_One } from "next/font/google";
import { aboutContent } from "@/constants";

const lexend = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { y: "140%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.13, 1, 0.22, 1],
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.012,
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

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = "Our Journey";
  const containerRef = useRef(null);

  const { text1, text2, card1Heading, card1Text, card2Heading, card2Text } =
    aboutContent.journey;

  const text1Words = text1.split(" ");
  const text2Words = text2.split(" ");
  const card1Words = card1Text.split(" ");
  const card2Words = card2Text.split(" ");

  return (
    <section className="w-full min-h-screen flex px-8 py-12 lg:py-24 lg:px-16 pt-38">
      <motion.div
        ref={containerRef}
        className="w-full flex flex-col gap-4 md:gap-8 lg:gap-12 md:px-4"
      >
        <div className="w-full text-start mt-4 md:mt-3 lg:mt-18 overflow-hidden">
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className={`flex justify-start items-center tracking-tight leading-none select-none whitespace-nowrap text-[16vw] md:text-[12vw] lg:text-[10vw] h-[19vh] xl:text-[9vw] xl:h-[23vh] md:mx-4  ${lexend.className}`}
          >
            {logo.split("").map((letter, index) => (
              <span key={index} className="inline-block ">
                <motion.span variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        <div className="w-full md:w-1/2 mt-12 lg:mt-12 ml-auto flex flex-col gap-8 md:gap-12 border-l pl-3 lg:p-9 tracking-wide">
          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="text-lg md:text-xl xl:text-2xl font-normal leading-relaxed flex flex-wrap gap-x-[0.25em] gap-y-1"
          >
            {text1Words.map((word, idx) => (
              <span key={idx} className="inline-flex overflow-hidden">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="text-lg md:text-xl xl:text-2xl font-normal leading-relaxed opacity-80 flex flex-wrap gap-x-[0.25em] gap-y-1"
          >
            {text2Words.map((word, idx) => (
              <span key={idx} className="inline-flex overflow-hidden">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>
        </div>

        <div className="relative mt-24 lg:mt-12 w-full flex flex-col md:flex-row gap-5">
          <motion.div className="w-full md:w-1/3 relative h-[60vh] lg:h-[70vh] xl:h-[80vh]">
            <Image
              src="/teamImgs/img7.jpg"
              alt="OASIS architectural interior"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div className="w-full md:w-1/3 relative h-[60vh] lg:h-[70vh] xl:h-[80vh] md:p-7 flex flex-col justify-around md:justify-between self-center">
            <div className="mt-8 md:space-y-2">
              <motion.h3
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-3xl lg:text-4xl font-medium tracking-tight uppercase flex flex-wrap gap-x-[0.25em]"
              >
                {card1Heading.map((word, idx) => (
                  <span key={idx} className="inline-flex overflow-hidden">
                    <motion.span
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h3>

              <motion.p
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-md xl:text-xl opacity-90 leading-relaxed pt-2 flex flex-wrap gap-x-[0.25em] gap-y-1"
              >
                {card1Words.map((word, idx) => (
                  <span key={idx} className="inline-flex overflow-hidden">
                    <motion.span
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.p>
            </div>

            <div className="md:space-y-2">
              <motion.p
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-3xl xl:text-4xl font-medium tracking-tight uppercase flex flex-wrap gap-x-[0.25em]"
              >
                {card2Heading.map((word, idx) => (
                  <span key={idx} className="inline-flex overflow-hidden">
                    <motion.span
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.p>

              <motion.p
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-md xl:text-xl opacity-90 leading-relaxed pt-2 flex flex-wrap gap-x-[0.25em] gap-y-1"
              >
                {card2Words.map((word, idx) => (
                  <span key={idx} className="inline-flex overflow-hidden">
                    <motion.span
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.p>
            </div>
          </div>

          <motion.div className="w-3/5 md:w-1/5 relative h-[30vh] lg:h-[30vh] self-end xl:h-[40vh] md:ml-auto">
            <Image
              src="/teamImgs/img8.jpg"
              alt="OASIS architectural landscape"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
