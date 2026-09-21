"use client";
import Link from "next/link";
import { Lato } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { footerLinks } from "@/constants";

const numFont = Lato({ subsets: ["latin"], weight: "400" });

export default function Footer() {
  return (
    <footer className="w-full p-4 sm:p-6 md:p-8  ">
      <div className="w-full shrink-0 bg-[#361e13] text-[#f8eee9] p-8 md:p-2 pb-12 md:pb-2 flex flex-col justify-between min-h-[80vh] h-auto rounded-xl">
        <div className="justify-center flex ">
          <h1 className="text-[25vw] lg:text-[24vw] xl:text-[20vw] leading-none font-bold  tracking-wide uppercase select-none  opacity-90">
            OASIS.
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:p-12">
          <div className="lg:col-span-4 space-y-6 ">
            <p className="text-2xl md:text-2xl font-light leading-snug 2xl:text-3xl">
              We shape spaces that
              <br />
              stay with you.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex text-sm font-semibold tracking-wider uppercase  transition-opacity hover:opacity-70 2xl:text-xl gap-3"
              >
                LETS CONNECT{" "}
                <span>
                  {" "}
                  <ArrowUpRight size={25} />
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="space-y-2 ">
              <p>
                <Link
                  href="mailto:info@oasis.com"
                  className="text-xl hover:opacity-70 2xl:text-2xl"
                >
                  info@oasis.com
                </Link>
              </p>
              <p
                className={`text-xl ${numFont.className} hover:opacity-70 2xl:text-2xl`}
              >
                +123 456 789
              </p>
            </div>

            <div className="space-y-2">
              <ul className="space-y-1">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-2xl  hover:opacity-70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 text-xl 2xl:text-2xl">
              <ul className="space-y-1 ">
                <li>
                  <Link href="/privacy" className="hover:opacity-70">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:opacity-70">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
