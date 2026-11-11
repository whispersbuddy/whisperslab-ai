import type { Metadata } from "next";
import BookPage from "@/components/contact/BookPage";

export const metadata: Metadata = {
  title: "Book a Call | Whispers Lab",
  description:
    "Pick a slot and get on a call with Whispers Lab. No forms, no back-and-forth. Just a real conversation about where AI can save you the most time.",
  alternates: { canonical: "/book" },
  openGraph: {
    type: "website",
    siteName: "Whispers Lab",
    locale: "en_US",
    title: "Book a Call | Whispers Lab",
    description:
      "Pick a slot and get on a call with Whispers Lab. No forms, no back-and-forth. Just a real conversation about where AI can save you the most time.",
    url: "/book",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Whispers Lab. We delete busywork.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call | Whispers Lab",
    description:
      "Pick a slot and get on a call with Whispers Lab. No forms, no back-and-forth. Just a real conversation about where AI can save you the most time.",
    images: ["/og-image.png"],
  },
};

export default function Book() {
  return <BookPage />;
}
