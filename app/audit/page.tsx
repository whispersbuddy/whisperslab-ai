import type { Metadata } from "next";
import { AUDIT_HTML } from "@/app/_content/audit";

export const metadata: Metadata = {
  title: "The Automation Audit — Whispers Lab",
};

export default function AuditPage() {
  return <div dangerouslySetInnerHTML={{ __html: AUDIT_HTML }} />;
}
