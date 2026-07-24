import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, company, bottleneck, message } = body as {
    name?: string;
    email?: string;
    company?: string;
    bottleneck?: string;
    message?: string;
  };

  if (!email || !name) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Resend is not configured: missing RESEND_API_KEY or CONTACT_NOTIFY_EMAIL");
    return NextResponse.json({ error: "Contact form is not configured yet" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Whispers Lab <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      bottleneck ? `Bottleneck: ${bottleneck}` : null,
      "",
      message ?? "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
