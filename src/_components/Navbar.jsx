"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fjalla_One } from "next/font/google";

const fjalla = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
});

const links = [
  {
    url: "/about",
    title: "About",
  },
  {
    url: "/work",
    title: "Works",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

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
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-100 w-2/3 md:w-1/3 h-15">
        <div className="relative flex h-full items-center justify-between px-4 rounded-2xl border  border-white/30 bg-white/20 shadow-[0_9px_32px_rgba(0,0,0,0.1)] backdrop-blur-lg">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`text-xl uppercase font-bold ${open ? "text-[#f6f0ec]" : "text-[#361e13]"} ${fjalla.className}`}
          >
            Oasis.
          </Link>
          {/* HAMBURGER */}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="relative z-110 w-7 h-5 flex flex-col justify-center cursor-pointer"
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
              className={`absolute w-7 h-1 rounded-full transition-colors duration-300 ${
                open ? "bg-[#f6f0ec]" : "bg-[#361e13]"
              }`}
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
              className={`absolute w-7 h-1 rounded-full transition-colors duration-300 ${
                open ? "bg-[#f6f0ec]" : "bg-[#361e13]"
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              y: "-100%",
            }}
            animate={{
              y: "0%",
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 left-0 right-0 bottom-0 z-90 bg-[#361e13]"
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                variants={menuLinks}
                initial="closed"
                animate="opened"
                className="group/links flex flex-col items-center gap-4"
              >
                {links.map((link) => (
                  <motion.div
                    key={link.title}
                    variants={menuLink}
                    className="group relative"
                  >
                    <Link
                      href={link.url}
                      onClick={() => setOpen(false)}
                      className="text-[#f6f0ec] text-6xl md:text-8xl uppercase font-medium transition-opacity duration-300 group-hover/links:opacity-40 hover:opacity-100!"
                    >
                      {link.title}
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          y: 20,
                        }}
                        whileHover={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="pointer-events-none absolute left-full top-1/2 ml-8 -translate-y-1/2 w-56 h-72 overflow-hidden rounded-xl"
                      >
                        <img
                          src={link.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
