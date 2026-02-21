import nodemailer from "nodemailer";
import { getEmailNotificationEnv } from "@/lib/env";

export interface ContactNotificationPayload {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactNotification(payload: ContactNotificationPayload): Promise<boolean> {
  let env: ReturnType<typeof getEmailNotificationEnv>;
  try {
    env = getEmailNotificationEnv();
  } catch {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.gmailUser,
      pass: env.gmailAppPassword,
    },
  });

  const phone = payload.phone ? payload.phone : "N/A";
  const safe = {
    id: escapeHtml(payload.id),
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(phone),
    subject: escapeHtml(payload.subject),
    message: escapeHtml(payload.message),
    createdAt: escapeHtml(payload.createdAt),
  };

  const text = [
    "New contact submission from primexia.in",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${phone}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
    "",
    `Submission ID: ${payload.id}`,
    `Created at: ${payload.createdAt}`,
  ].join("\n");

  const html = `
    <h2>New contact submission from primexia.in</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Phone:</strong> ${safe.phone}</p>
    <p><strong>Subject:</strong> ${safe.subject}</p>
    <p><strong>Message:</strong><br/>${safe.message.replaceAll("\n", "<br/>")}</p>
    <hr/>
    <p><small>Submission ID: ${safe.id}</small></p>
    <p><small>Created at: ${safe.createdAt}</small></p>
  `;

  await transporter.sendMail({
    from: env.gmailUser,
    to: env.adminEmail,
    subject: `[Primexia Contact] ${payload.subject}`,
    text,
    html,
    replyTo: payload.email,
  });

  return true;
}
