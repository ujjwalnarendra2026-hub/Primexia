"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";
import { contactSchema, type ContactForm } from "@/lib/validation";

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export default function ContactFormFullSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (!response.ok) {
        if (data.fieldErrors) {
          const nextErrors: FormErrors = {};
          for (const [key, value] of Object.entries(data.fieldErrors)) {
            nextErrors[key as keyof ContactForm] = value[0];
          }
          setErrors(nextErrors);
        }
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      if (data.ok) {
        setStatus("success");
        setForm(initialForm);
      }
    } catch {
      setServerError("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";

  if (status === "success") {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AnimatedHeading>
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground">Message sent.</h2>
          </AnimatedHeading>
          <AnimatedParagraph delay={0.15}>
            <p className="mt-4 text-muted-foreground">Thank you for reaching out. We&apos;ll respond within two business days.</p>
          </AnimatedParagraph>
        </div>
      </div>
    );
  }

  return (
    <section className="h-full flex flex-col px-6 md:px-10 overflow-y-auto" aria-labelledby="contact-heading">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto py-10">
          <AnimatedParagraph delay={0.05} y={10}>
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">Contact</span>
          </AnimatedParagraph>

          <AnimatedHeading delay={0.12}>
            <h2 id="contact-heading" className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Let&apos;s build together.
            </h2>
          </AnimatedHeading>

          <AnimatedParagraph delay={0.2}>
            <p className="mt-3 text-muted-foreground text-sm">We&apos;ll respond within two business days.</p>
          </AnimatedParagraph>

          <AnimatedButton delay={0.28}>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">Full name</label>
                  <input id="name" name="name" autoComplete="name" placeholder="Full name *" value={form.name} onChange={handleChange} className={inputClass} aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="Email *" value={form.email} onChange={handleChange} className={inputClass} aria-invalid={!!errors.email} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="sr-only">Company</label>
                  <input id="company" name="company" autoComplete="organization" placeholder="Company (optional)" value={form.company} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">Subject</label>
                  <input id="subject" name="subject" placeholder="Subject *" value={form.subject} onChange={handleChange} className={inputClass} aria-invalid={!!errors.subject} />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" name="message" placeholder="Your message *" rows={4} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} aria-invalid={!!errors.message} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              {serverError && <p className="text-sm text-destructive">{serverError}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {status === "loading" ? "Sending..." : "Send message"}
                {status !== "loading" && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </AnimatedButton>

          <AnimatedParagraph delay={0.5}>
            <p className="mt-8 text-xs text-muted-foreground">
              Or email us at <a href="mailto:careers@primexia.co" className="text-primary hover:opacity-80 transition-opacity">careers@primexia.co</a>
            </p>
          </AnimatedParagraph>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto py-5 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Primexia Private Limited</p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link href="/about-primexia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/business-structure-operating-approach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Structure</Link>
          <Link href="/operating-focus" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Focus</Link>
          <Link href="/ventures-investments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ventures</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Legal</Link>
        </div>
      </div>
    </section>
  );
}
