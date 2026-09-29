import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { processSteps } from "@/constants";

export default function Process() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => setIsDesktop(desktopQuery.matches);

    updateLayout();
    desktopQuery.addEventListener("change", updateLayout);
    return () => desktopQuery.removeEventListener("change", updateLayout);
  }, []);

  const shouldReduceMotion = useReducedMotion();
  const drawStroke = (delay) => ({
    initial: { pathLength: shouldReduceMotion ? 1 : 0 },
    animate: {
      pathLength: shouldReduceMotion ? 1 : [0, 1, 1, 0],
    },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          pathLength: {
            duration: 3.6,
            times: [0, 0.52, 0.78, 1],
            ease: "easeInOut",
            delay,
            repeat: Infinity,
            repeatDelay: 0.4,
          },
        },
  });
  const icons = [
    <svg
      key="orbit"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <motion.circle {...drawStroke(0)} cx="32" cy="32" r="8" />
      <motion.path
        {...drawStroke(0.35)}
        d="M32 16a16 16 0 0 1 16 16"
        strokeLinecap="round"
      />
      <motion.path
        {...drawStroke(0.7)}
        d="M32 8a24 24 0 0 1 24 24"
        strokeLinecap="round"
      />
      <motion.path
        {...drawStroke(1.05)}
        d="M32 24a8 8 0 0 0-8 8"
        strokeLinecap="round"
      />
      <motion.circle
        r="2"
        fill="currentColor"
        stroke="none"
        initial={{ cx: 32, cy: 8 }}
        animate={
          shouldReduceMotion
            ? { cx: 32, cy: 8 }
            : {
                cx: [32, 49, 56, 49, 32, 15, 8, 15, 32],
                cy: [8, 15, 32, 49, 56, 49, 32, 15, 8],
              }
        }
        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
      />
    </svg>,
    <svg
      key="cube"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <motion.path
        {...drawStroke(0)}
        d="M32 12L50 22V42L32 52L14 42V22L32 12Z"
      />
      <motion.path {...drawStroke(0.4)} d="M32 12V52" />
      <motion.path {...drawStroke(0.8)} d="M50 22L14 42" />
      <motion.path {...drawStroke(1.2)} d="M14 22L50 42" />
    </svg>,
    <svg
      key="layers"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <motion.path {...drawStroke(0)} d="M32 12L52 22L32 32L12 22L32 12Z" />
      <motion.path {...drawStroke(0.45)} d="M12 32L32 42L52 32" />
      <motion.path {...drawStroke(0.9)} d="M12 42L32 52L52 42" />
    </svg>,
    <svg
      key="grid"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <motion.rect
        {...drawStroke(0)}
        x="12"
        y="12"
        width="40"
        height="40"
        rx="2"
      />
      <motion.path {...drawStroke(0.4)} d="M12 28h40" />
      <motion.path {...drawStroke(0.8)} d="M28 28v24" />
      <motion.path {...drawStroke(1.2)} d="M40 12v16" />
    </svg>,
  ];
  const services = processSteps.map((step, index) => ({
    ...step,
    icon: icons[index],
  }));

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 90,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], ["1%", "-60%"]);

  return (
    <section ref={targetRef} className="relative w-full lg:h-[700vh] lg:py-12">
      <div className="flex flex-col gap-10 px-6 py-16 md:px-12 lg:sticky lg:top-0 lg:h-screen lg:flex-row lg:items-center lg:gap-16 lg:overflow-hidden lg:px-0 lg:py-0">
        <motion.div
          style={{ x: isDesktop ? x : 0 }}
          className="flex w-full flex-col items-center gap-8 lg:w-max lg:flex-row lg:gap-16 lg:pl-6 xl:pl-12"
        >
          <div className="flex w-full flex-none flex-col lg:h-[45vh] lg:w-[30vw] lg:pr-6 xl:h-[55vh]">
            <div className="flex flex-col gap-10">
              <h2 className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold tracking-tight leading-none uppercase">
                Our process <br />
                of forming spaces
              </h2>
              <p className="w-full text-md lg:text-lg xl:text-xl leading-relaxed text-[#483b35]">
                From initial vision to final detail, we approach each step with
                precision, collaboration, and calm intention.
              </p>
            </div>
          </div>

          {services.map((service, index) => (
            <ProjectCard
              key={index}
              service={service}
              index={index}
              total={services.length}
              smoothProgress={smoothProgress}
              isDesktop={isDesktop}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ service, index, total, smoothProgress, isDesktop }) {
  const start = index / (total + 1);

  const y = useTransform(smoothProgress, [start - 0.2, start + 0.05], [190, 0]);

  const scale = useTransform(
    smoothProgress,
    [start - 0.2, start + 0.05],
    [0.94, 1],
  );

  return (
    <motion.div
      style={{
        y: isDesktop && index !== 0 ? y : 0,
        scale: isDesktop && index !== 0 ? scale : 1,
      }}
      className="flex h-auto min-h-80 w-full max-w-2xl flex-none flex-col justify-between bg-[#723f27] p-6 text-[#f8eee9] md:w-[min(70vw,24rem)] lg:h-[45vh] lg:w-[30vw] lg:max-w-none lg:p-10 xl:h-[55vh]"
    >
      <div className="flex items-center justify-between w-full border-b border-[#f8eee9]/60 pb-6">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-none">
          {service.num}
        </h1>
        <div className="flex items-center justify-center">{service.icon}</div>
      </div>

      <div className="flex flex-col gap-3 lg:gap-4 pt-4">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight">
          {service.title}
        </h2>
        <p className="text-xs lg:text-base leading-relaxed text-[#f8eee9]/80 font-light">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}
