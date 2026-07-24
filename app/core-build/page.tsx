import type { Metadata } from "next";
import { CORE_BUILD_HTML } from "@/app/_content/coreBuild";

export const metadata: Metadata = {
  title: "The Core Build — Whispers Lab",
};

export default function CoreBuildPage() {
  return <div dangerouslySetInnerHTML={{ __html: CORE_BUILD_HTML }} />;
}
