import type { Metadata } from "next";
import PortfolioView from "../../views/PortfolioView";
import {PROJECTS} from "@/constants/PROJECTS";
import {fetchOgImage} from "@/lib/og-image";

export const metadata: Metadata = {
  title: "Portfolio | Alexandros Nomikos",
};

export default async function Page() {
  const projects = await Promise.all(
      PROJECTS.map(async (project) => {
        const ogImage = await fetchOgImage(project.href);
        return {
          ...project,
          image: ogImage
              ? `/api/og-image?url=${encodeURIComponent(ogImage)}`
              : project.image,
          fallbackImage: project.image,
        };
      })
  );

  return <PortfolioView projects={projects} />;
}