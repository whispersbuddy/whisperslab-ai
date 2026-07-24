import type { Metadata } from "next";
import { CONTACT_HTML } from "@/app/_content/contact";

export const metadata: Metadata = {
  title: "Contact — Whispers Lab",
};

export default function ContactPage() {
  return <div dangerouslySetInnerHTML={{ __html: CONTACT_HTML }} />;
}
