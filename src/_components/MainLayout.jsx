"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import SmoothScroll from "@/_components/smoothScroll";
import Navbar from "@/_components/Navbar";
import Footer from "@/_components/Footer";

const curtainEase = [0.76, 0, 0.24, 1];
const curtainDuration = 0.6;

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isContactPage = pathname === "/contact";
  const reduceMotion = useReducedMotion();
  const previousPathname = useRef(pathname);
  const pendingPathname = useRef(null);
  const transitionTimeout = useRef(null);
  const curtainControls = useAnimationControls();

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    window.clearTimeout(transitionTimeout.current);

    if (reduceMotion) {
      pendingPathname.current = null;
      curtainControls.set({ y: "100%" });
      return;
    }

    if (pendingPathname.current) {
      pendingPathname.current = null;
      curtainControls.start({
        y: "100%",
        transition: { duration: curtainDuration, ease: curtainEase },
      });
      return;
    }

    curtainControls.set({ y: "-100%" });
    curtainControls.start({
      y: ["-100%", "0%", "100%"],
      transition: {
        duration: curtainDuration * 2,
        times: [0, 0.5, 1],
        ease: curtainEase,
      },
    });
  }, [pathname, reduceMotion, curtainControls]);

  const handleLinkClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link = event.target.closest?.("a");
    if (!link || link.target === "_blank" || link.hasAttribute("download"))
      return;

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname === pathname
    ) {
      return;
    }

    event.preventDefault();
    if (pendingPathname.current) return;

    if (reduceMotion) {
      router.push(
        `${destination.pathname}${destination.search}${destination.hash}`,
      );
      return;
    }

    pendingPathname.current = destination.pathname;
    curtainControls.set({ y: "-100%" });
    curtainControls
      .start({
        y: "0%",
        transition: { duration: curtainDuration, ease: curtainEase },
      })
      .then(() => {
        if (!pendingPathname.current) return;

        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );
        transitionTimeout.current = window.setTimeout(() => {
          if (!pendingPathname.current) return;

          pendingPathname.current = null;
          curtainControls.start({
            y: "100%",
            transition: { duration: curtainDuration, ease: curtainEase },
          });
        }, 5000);
      });
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full" onClickCapture={handleLinkClick}>
        <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-4 px-4">
          <div className="pointer-events-auto w-full flex justify-center">
            <Navbar />
          </div>
        </header>

        <div className="flex min-h-screen w-full flex-col">
          <main className="w-full grow">{children}</main>

          {!isContactPage && <Footer />}
        </div>
        <motion.div
          aria-hidden="true"
          initial={{ y: "100%" }}
          animate={curtainControls}
          className="fixed inset-0 z-200 bg-[#361e13]"
        />
      </div>
    </SmoothScroll>
  );
}
