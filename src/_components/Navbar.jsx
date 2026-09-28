"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fjalla_One } from "next/font/google";
import { navigationLinks } from "@/constants";

const fjalla = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

const navigationLabels = {
  About: "About Us",
  Works: "Projects",
  Contact: "Contact Us",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuLinks = {
    closed: {
      transition: {
        staggerChildren: 0.09,
      },
    },
    opened: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.45,
      },
    },
  };
  const menuLink = {
    closed: {
      y: 80,
      opacity: 0,
    },
    opened: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <>
      <nav className="fixed left-1/2 top-5 z-100 h-15 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2">
        <div className="relative flex h-full items-center justify-between rounded-2xl border border-white/30 bg-white/20 px-4 shadow-[0_9px_32px_rgba(0,0,0,0.1)] backdrop-blur-lg lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`text-3xl uppercase font-bold  ${fjalla.className}`}
          >
            Oasis.
          </Link>
          <div className="hidden items-center gap-12 lg:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.title}
                href={link.url}
                className="text-lg font-medium text-[#361e13] transition-opacity hover:opacity-60"
              >
                {navigationLabels[link.title] ?? link.title}
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-110 flex h-5 w-7 cursor-pointer flex-col justify-center lg:hidden"
          >
            <motion.span
              animate={open ? "opened" : "closed"}
              variants={{
                closed: {
                  rotate: 0,
                  y: -5,
                },

                opened: {
                  rotate: 45,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="absolute h-1 w-7 rounded-full bg-[#361e13]"
            />

            <motion.span
              animate={open ? "opened" : "closed"}
              variants={{
                closed: {
                  rotate: 0,
                  y: 5,
                },

                opened: {
                  rotate: -45,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="absolute h-1 w-7 rounded-full bg-[#361e13]"
            />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute right-0 top-[calc(100%+0.75rem)] z-90 w-[min(42rem,calc(60vw-3rem))] md:w-[min(42rem,calc(40vw-3rem))] overflow-hidden border border-[#272321] shadow-xl lg:hidden"
            >
             
              <motion.div
                variants={menuLinks}
                initial="closed"
                animate="opened"
                className="bg-[#f6f0ec] px-5 py-2"
              >
                {navigationLinks.map((link) => (
                  <motion.div
                    key={link.title}
                    variants={menuLink}
                    className="border-b border-[#361e13]/15 last:border-b-0"
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-xl font-medium text-center text-[#361e13] transition-opacity hover:opacity-60 sm:text-2xl"
                    >
                      {navigationLabels[link.title] ?? link.title}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
