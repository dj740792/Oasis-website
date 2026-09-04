import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact ",
  description:
    "Get in touch with Oasis Architecture for new project inquiries, spatial design consultations, and press requests. Based globally, designing everywhere.",
  openGraph: {
    title: "Contact studio Oasis",
    description:
      "Partner with us on your next architectural build, interior space, or spatial environment.",
    images: ["/heroImgs/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
