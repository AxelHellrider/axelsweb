import type { Metadata } from "next";
import PortfolioView from "../../views/PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio | Alexandros Nomikos",
};

export default function Page() {
  return <PortfolioView />;
}