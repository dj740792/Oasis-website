import HeroSection from "@/_components/about/HeroSection";
import StatsSection from "@/_components/about/StatsSection";
import TeamSection from "@/_components/about/TeamSection";
import FaqSection from "@/_components/about/FaqSection";

export const metadata = {
  title: "About ",
  description:
    "Learn about Oasis and our approach to quiet architecture, raw textures, and enduring environmental spaces.",
  openGraph: {
    title: "About Our Studio | studio Oasis",
    description:
      "Learn about Oasis and our approach to quiet architecture, raw textures, and enduring environmental spaces.",
    images: ["/heroImgs/og-image.jpg"],
  },
};

export default function page() {
  return (
    <main className="w-full">
      <HeroSection />
      <StatsSection />
      <TeamSection />
      <FaqSection />
    </main>
  );
}
