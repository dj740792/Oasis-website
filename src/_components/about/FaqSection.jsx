"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/constants";

export default function FaqSection({ text = "Let's Connect" }) {
  const [openId, setOpenId] = useState(null);

  const openFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full px-4 py-20 lg:py-25 xl:py-30 md:px-20 ">
      <div className="mb-13 pb-3 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl  xl:text-6xl font-extrabold tracking-tight uppercase leading-tight md:leading-none">
              frequently asked questions
            </h2>
            <p className="text-sm lg:text-lg xl:text-xl font-semibold max-w-md leading-relaxed md:leading-snug opacity-90">
              A few questions asked to us about how we work and what to expect
            </p>
          </div>

          <div className="bg-[#723f27]/3 p-6 max-w-md rounded-xl border border-[#723f27]/10 space-y-6">
            <p className="text-md md:text-lg xl:text-xl font-medium">
              Feel free to reach out whenever you have more questions.
            </p>

            <motion.div
              initial="initial"
              whileHover="hovered"
              className="inline-block"
            >
              <Link
                href="/contact"
                className="cursor-pointer flex items-center bg-[#361e13] text-[#f8eee9] rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 overflow-hidden">
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
                      className="text-sm sm:text-base font-semibold"
                    >
                      {text}
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 text-sm sm:text-base font-semibold"
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

                <div className="m-1.5 w-10 h-10 bg-[#f8eee9] text-[#361e13] rounded-md overflow-hidden flex items-center justify-center">
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
                      <ArrowUpRight size={22} />
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
                      <ArrowUpRight size={22} />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col divide-y border-b ">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="py-6 sm:py-8">
                <button
                  onClick={() => openFaq(faq.id)}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight uppercase  transition-opacity">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="relative flex items-center justify-center w-12 h-12   transition-colors shrink-0 mt-1">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xl leading-none "
                    >
                      <Plus size={32} strokeWidth={1} />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 sm:pl-10 pr-4 pt-4 pb-2">
                        <p className="text-md lg:text-lg  font-light leading-relaxed opacity-90">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
