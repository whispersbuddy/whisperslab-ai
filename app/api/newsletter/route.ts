import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Resend is not configured: missing RESEND_API_KEY or CONTACT_NOTIFY_EMAIL");
    return NextResponse.json({ error: "Newsletter signup is not configured yet" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Whispers Lab <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New newsletter signup: ${email}`,
    text: `New newsletter signup.\n\nEmail: ${email}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
