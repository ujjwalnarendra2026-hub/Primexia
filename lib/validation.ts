import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export type ContactForm = z.infer<typeof contactSchema>;

export function sanitizeText(input: string) {
  return input.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}
