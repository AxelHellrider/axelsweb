import type { Metadata } from "next";
import ServicesView from "../../views/ServicesView";

export const metadata: Metadata = {
  title: "Services | Axel",
};

export default function Page() {
  return <ServicesView />;
}