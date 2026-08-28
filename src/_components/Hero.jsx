"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Fjalla_One,
} from "next/font/google";

const lexend = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

const images = [
  { src: "/heroImgs/img1.jpg", height: "h-[40vh] md:h-[30vh]" },
  { src: "/photos/restraunt/restraunt2.jpg", height: "h-[36vh] md:h-[26vh]" },
  { src: "/photos/lounge/lounge3.jpg", height: "h-[32vh] md:h-[32vh]" },
  { src: "/heroImgs/img9.jpg", height: "h-[39vh] md:h-[29vh]" },
  { src: "/photos/pavillion/pavillion1.jpg", height: "h-[37vh] md:h-[27vh]" },
  { src: "/heroImgs/img6.jpg", height: "h-[32vh] md:h-[32vh]" },
  { src: "/heroImgs/img7.jpg", height: "h-[39vh] md:h-[29vh]" },
  { src: "/photos/villa/villa3.jpg", height: "h-[37vh] md:h-[27vh]" },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logo = "OASIS.";
  const duplicatedImages = [...images, ...images];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen h-[105vh] flex flex-col justify-between pt-28 md:pt-36 overflow-hidden"
    >
      <div className="w-full text-center mt-15 md:mt-8 lg:mt-18 overflow-hidden">
        <motion.div
          style={{
            y: logoY,
            scale: logoScale,
          }}
          className="w-full text-center my-auto"
        >
          <h1
            className={`relative flex justify-center tracking-wider leading-none select-none whitespace-nowrap text-[28vw] md:text-[25vw] lg:text-[20vw] xl:text-[16vw] font-black ${lexend.className}`}
          >
            {logo.split("").map((letter, index) => (
              <span key={index} className="inline-block overflow-hidden">
                {mounted ? (
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.35 + index * 0.045,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="inline-block drop-shadow-md"
                  >
                    {letter}
                  </motion.span>
                ) : (
                  <span className="inline-block">{letter}</span>
                )}
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="w-full px-6 md:px-12 my-6 ">
          <div className="w-full border-t mb-6 md:mb-14" />
        </div>
      </div>
      <div className="relative w-full flex overflow-hidden pb-10 mask-gradient">
        {mounted && (
          <motion.div
            className="flex gap-2 shrink-0 pr-6 items-end"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {duplicatedImages.map((img, index) => (
              <div
                key={index}
                className={`relative shrink-0 w-55 md:w-55 overflow-hidden ${img.height}`}
              >
                <Image
                  src={img.src}
                  alt="Studio Oasis interior layout creation"
                  fill
                  sizes="(max-w-768px) 280px, 340px"
                  priority={index < 5}
                  className="object-cover select-none pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
