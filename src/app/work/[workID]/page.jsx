import { projects } from "@/_data/projects";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

export async function generateMetadata({ params }) {
  const { workID } = await params;
  const project = projects.find((p) => p.slug === workID);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: project.title,
    description:
      project.description ||
      `Explore ${project.title} by Studio Oasis located in ${project.location}.`,
    openGraph: {
      title: `${project.title} | Studio Oasis`,
      description:
        project.description || `Explore ${project.title} by Studio Oasis`,
      images: [
        {
          url: project.src,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.workID);

  if (!project) {
    notFound();
  }

  return <ProjectClient params={params} />;
}
