"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { serviceList } from "@/constants";

export default function Services() {
  return (
    <section className="w-full  px-6 py-16 md:px-12 md:py-12">
      <div className="mx-auto max-w-8xl">
        <header className="pb-10 md:pb-14">
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
            Transforming quiet ideas into physical presence.
          </h2>
        </header>

        <div>
          {serviceList.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-8 lg:gap-12 lg:py-12"
            >
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden md:w-[28%]">
                <Image
                  src={service.image}
                  alt={`${service.title} project interior`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 40vw, 36vw"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 md:gap-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl xl:text-4xl">
                    {service.title}
                  </h3>
                  <span className="shrink-0 pt-1 text-xs tracking-[0.08em] text-[#695349] md:hidden">
                    [{String(index + 1).padStart(2, "0")}]
                  </span>
                </div>
                <p className="max-w-3xl text-base leading-relaxed text-[#695349] lg:text-lg">
                  {service.description}
                </p>
              </div>

             
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
