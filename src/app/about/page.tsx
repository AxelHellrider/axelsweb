import type { Metadata } from "next";
import AboutView from "../../views/AboutView";

export const metadata: Metadata = {
  title: "About | Alexandros Nomikos",
};

export default function Page() {
  return <AboutView />;
}