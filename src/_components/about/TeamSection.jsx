"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { teamMembers } from "@/constants";

export default function TeamSection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="w-full px-4  py-20 lg:py-25 xl:py-30 md:px-20">
      <div className="mb-20 flex flex-col justify-center items-center text-center">
        <span className="text-xs lg:text-lg font-semibold tracking-wide uppercase opacity-80 block mb-2">
          Meet the team
        </span>
        <h2 className="text-3xl lg:text-6xl xl:text-7xl font-bold tracking-wide max-w-4xl ">
          The people that makes all these possible
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member, isMobile }) {
  const itemRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const clipProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1 && !revealed) {
      setRevealed(true);
    }
  });

  return (
    <div
      ref={itemRef}
      className={`${member.gridClass} flex flex-col gap-2 w-full`}
    >
      <motion.div
        style={{
          clipPath: isMobile || revealed ? "none" : clipProgress,
        }}
        className="relative w-full aspect-square overflow-hidden "
      >
        <Image
          src={member.src}
          alt={member.name}
          fill
          className="object-cover w-full"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </motion.div>
      <div className="flex justify-between items-center">
        <p className="text-md md:text-md xl:text-xl  tracking-wide font-semibold">
          {member.name}
        </p>
        <p className="text-sm md:text-sm xl:text-lg tracking-wide font-semibold opacity-70">
          {member.role}
        </p>
      </div>
    </div>
  );
}
