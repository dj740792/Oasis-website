import { Aboreto, Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import MainLayout from "@/_components/MainLayout";
import ScrollToTop from "@/_components/ScrollToTop";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-sans",
  subsets: ["latin"],
   display:"swap"
});

const lexend = Raleway({
  subsets: ["latin"],
  weight: "600",
  display:"swap"
});
const lato = Aboreto({
  subsets: ["latin"],
  weight: "400",
   display:"swap"
});

export const metadata = {
  metadataBase: new URL("https://studio-oasis.com"),
  title: {
    default: "Studio Oasis ",
    template: "%s | Studio Oasis",
  },
  description:
    "Studio Oasis is a spatial design studio specializing in quiet, modern architecture, residential builds, and tailored interior environments.",
  openGraph: {
    title: "Studio Oasis | Spatial & Architectural Design Studio",
    description:
      "Modern architectural builds, custom spatial environments, and minimalist residential design.",
    url: "https://studio-oasis.com",
    siteName: "Studio Oasis",
    images: [
      {
        url: "/heroImgs/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studio Oasis Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Oasis",
    description:
      "Modern architectural builds and minimalist spatial environments.",
    images: ["/heroImgs/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable}  ${lexend.variable} ${lato.variable}  h-full antialiased`}
    >
      <body
        className={`min-h-full flex  flex-col items-center w-full  ${lexend.className}`}
      >
        <ScrollToTop />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
