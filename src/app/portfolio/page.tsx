"use client";
import PortfolioView from "@/views/PortfolioView";

export default function PortfolioPage() {
  return <PortfolioView onBack={() => history.back()} />;
}