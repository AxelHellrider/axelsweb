"use client";
import React from "react";
import ContactView from "@/views/ContactView";

export default function ContactPage() {
  return <ContactView onBack={() => history.back()} />;
}