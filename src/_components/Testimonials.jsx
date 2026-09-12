"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/constants";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
        <div className="hidden md:block w-full md:w-1/2 relative h-125 lg:h-150 overflow-hidden  shrink-0">
          <Image
            src="/testimonialImgs/testiImg5.jpg"
            alt="Interior showcase"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full min-h-100 py-4">
          <div>
            <span className="text-sm uppercase tracking-widest block mb-3">
              CLIENT REVIEWS
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-12">
              What it's like working with us — from the people who know best
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col gap-8"
              >
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed  font-light max-w-xl">
                  “{current.quote}”
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-zinc-200 shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold">{current.name}</h4>
                    <p className="text-xs font-mono">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center border-t border-zinc-200 pt-6 mt-12">
            <div className="flex items-center gap-2 ">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 h-2 bg-amber-950 rounded-2xl cursor-pointer "
                      : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400 rounded-2xl cursor-pointer"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
