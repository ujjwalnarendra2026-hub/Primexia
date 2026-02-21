import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[0-9+\-() ]*$/, "Please enter a valid phone number")
    .optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type ContactForm = z.infer<typeof contactSchema>;

/**
 * Sanitize text to prevent XSS and HTML injection
 * Removes HTML tags, control characters, and potentially dangerous characters
 */
export function sanitizeText(input: string): string {
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove control characters except newlines and tabs
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    // Encode HTML special characters when needed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .trim();
}

/**
 * Escape HTML for safe display
 */
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
