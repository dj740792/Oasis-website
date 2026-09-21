"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/_components/smoothScroll";
import Navbar from "@/_components/Navbar";
import Footer from "@/_components/Footer";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <SmoothScroll>
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-4 px-4">
        <div className="pointer-events-auto w-full flex justify-center">
          <Navbar />
        </div>
      </header>

      <div className="flex min-h-screen w-full flex-col">
        <main className="w-full grow">{children}</main>

        {!isContactPage && <Footer />}
      </div>
    </SmoothScroll>
  );
}
