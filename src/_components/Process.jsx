import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { processSteps } from "@/constants";

export default function Process() {
  const icons = [
    <svg
      key="orbit"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <circle cx="32" cy="32" r="8" />
      <path d="M32 16a16 16 0 0 1 16 16" strokeLinecap="round" />
      <path d="M32 8a24 24 0 0 1 24 24" strokeLinecap="round" />
      <path d="M32 24a8 8 0 0 0-8 8" strokeLinecap="round" />
    </svg>,
    <svg
      key="cube"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <path d="M32 12L50 22V42L32 52L14 42V22L32 12Z" />
      <path d="M32 12V52" />
      <path d="M50 22L14 42" />
      <path d="M14 22L50 42" />
    </svg>,
    <svg
      key="layers"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <path d="M32 12L52 22L32 32L12 22L32 12Z" />
      <path d="M12 32L32 42L52 32" />
      <path d="M12 42L32 52L52 42" />
    </svg>,
    <svg
      key="grid"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-[#f8eee9]/90 stroke-[2.2]"
    >
      <rect x="12" y="12" width="40" height="40" rx="2" />
      <path d="M12 28h40" />
      <path d="M28 28v24" />
      <path d="M40 12v16" />
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
    <section ref={targetRef} className="relative h-[500vh] md:py-12">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex items-center gap-12 md:gap-16 pl-6 md:pl-12 "
        >
          <div className="w-[55vw] md:w-[30vw] flex-none flex flex-col h-[60vh] pr-6">
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
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ service, index, total, smoothProgress }) {
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
        y: index === 0 ? 0 : y,
        scale: index === 0 ? 1 : scale,
      }}
      className="w-[65vw] md:w-[30vw] flex-col flex group h-[42vh] lg:h-[45vh] xl:h-[55vh] bg-[#723f27] text-[#f8eee9] p-6 lg:p-10 justify-between flex-none"
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
