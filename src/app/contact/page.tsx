import type { Metadata } from "next";
import ContactView from "../../views/ContactView";

export const metadata: Metadata = {
  title: "Contact | Alexandros Nomikos",
};

export default function Page() {
  return <ContactView />;
}