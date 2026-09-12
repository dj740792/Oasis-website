"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ctaImages, ctaLines } from "@/constants";

function FloatingCard({ img, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], img.yRange);

  return (
    <motion.div
      style={{ y }}
      className={`absolute overflow-hidden ${img.className}`}
    >
      <Image
        src={img.src}
        alt="Visual element"
        fill
        className="object-cover"
        sizes="20vw"
      />
    </motion.div>
  );
}

export default function Cta({ text = "Tell us your story" }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen h-[105vh] flex flex-col items-center justify-between py-28 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none block">
        {ctaImages.map((img, idx) => (
          <FloatingCard key={idx} img={img} scrollYProgress={scrollYProgress} />
        ))}
      </div>

      <div
        ref={headingRef}
        className="relative z-10 w-full text-center mt-15 md:mt-8 lg:mt-18 overflow-hidden"
      >
        <h1 className="flex flex-col items-center tracking-normal lg:tracking-wide leading-[1.1] lg:leading-[0.9] select-none whitespace-nowrap text-[10vw] md:text-[5vw] md:mx-8">
          {ctaLines.map((line, lineIndex) => (
            <div key={lineIndex} className="overflow-hidden">
              {line.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${lineIndex}-${letterIndex}`}
                  initial={{ y: "140%" }}
                  animate={isInView ? { y: "0%" } : { y: "140%" }}
                  transition={{
                    duration: 1.2,
                    ease: [0.23, 1, 0.32, 1],
                    delay: lineIndex * 0.25 + letterIndex * 0.03,
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          ))}
        </h1>

        <div className="flex justify-center">
          <motion.div initial="initial" whileHover="hovered" className="mt-10">
            <Link
              href="/contact"
              className="cursor-pointer flex items-center bg-[#361e13] text-[#f8eee9] scale-100"
            >
              <div className="px-8 py-5 overflow-hidden">
                <div
                  className="relative block overflow-hidden whitespace-nowrap"
                  style={{ lineHeight: 1.5 }}
                >
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hovered: { y: "-100%" },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="text-md md:text-md lg:text-lg xl:text-xl 2xl:text-xl"
                  >
                    {text}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 text-md md:text-md lg:text-lg xl:text-xl 2xl:text-xl"
                    variants={{
                      initial: { y: "100%" },
                      hovered: { y: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {text}
                  </motion.div>
                </div>
              </div>

              <div className="mr-2 w-12 h-12 bg-[#f8eee9] text-[#361e13] rounded-lg overflow-hidden flex items-center justify-center">
                <div
                  className="relative block overflow-hidden"
                  style={{ lineHeight: 0.9 }}
                >
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hovered: { y: "-100%" },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeIn",
                    }}
                  >
                    <ArrowUpRight size={27} />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    variants={{
                      initial: { y: "100%" },
                      hovered: { y: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeIn",
                    }}
                  >
                    <ArrowUpRight size={27} />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
