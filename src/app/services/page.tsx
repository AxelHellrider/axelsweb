import type { Metadata } from "next";
import ServicesView from "../../views/ServicesView";

export const metadata: Metadata = {
  title: "Web Services | Alexandros Nomikos",
};

export default function Page() {
  return <ServicesView />;
}