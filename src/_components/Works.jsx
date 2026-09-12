"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Lato } from "next/font/google";
import { projects } from "@/constants";
const numFont = Lato({ subsets: ["latin"], weight: "400" });

export default function FeaturedProjects() {
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
    <section className="w-full  px-4 md:px-8 py-32 ">
      <div className="flex justify-between items-baseline mb-10  pb-8">
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tight">
          Featured Projects
        </h2>
        <Link
          href="/work"
          className="text-[10px] md:text-sm xl:text-lg font-semibold tracking-widest uppercase"
        >
          See more works
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-x-6 gap-y-20 items-start">
        {projects.slice(0, 5).map((project) => (
          <ProjectCard key={project.id} project={project} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, isMobile }) {
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
    <div ref={itemRef} className={`${project.gridClass}  flex flex-col gap-2`}>
      <Link
        href={`/work/${project.slug} `}
        className="className=group flex flex-col gap-2 w-full"
      >
        <motion.div
          style={{
            clipPath: isMobile || revealed ? "none" : clipProgress,
          }}
          className={`relative w-full ${project.aspect} overflow-hidden`}
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover w-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <div className="flex justify-between">
          <p className="text-md md:text-lg xl:text-xl  tracking-wide font-semibold">
            {project.title}
          </p>
          <p
            className={`text-md md:text-lg tracking-wide font-semibold opacity-70 ${numFont.className}`}
          >
            {project.year}
          </p>
        </div>
      </Link>
    </div>
  );
}
