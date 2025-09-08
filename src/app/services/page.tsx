"use client";
import React from "react";
import ServicesView from "@/views/ServicesView";

export default function ServicesPage() {
  return <ServicesView onBack={() => history.back()} />;
}