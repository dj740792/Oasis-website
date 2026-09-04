import WorkClient from "./WorkClient";

export const metadata = {
  title: "Selected Works ",
  description:
    "A collection of digital experiences, custom web development, and interface designs built for performance and quiet architecture.",
  openGraph: {
    title: "Selected Works ",
    description:
      "Explore our archive of spatial design, residential builds, and quiet architecture.",
    images: ["/heroImgs/og-image.jpg"],
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
