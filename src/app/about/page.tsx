"use client";
import AboutView from "@/views/AboutView";

export default function AboutPage() {
  return <AboutView onBack={() => history.back()} />;
}