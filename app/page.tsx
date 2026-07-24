import type { Metadata } from "next";
import { HOME_HTML } from "@/app/_content/home";

export const metadata: Metadata = {
  title: "Whispers Lab",
};

export default function Home() {
  return <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
}
