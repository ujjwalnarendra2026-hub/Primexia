import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactFormFullSection = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactForm;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        company: result.data.company || null,
        subject: result.data.subject,
        message: result.data.message,
      });
      if (dbError) throw dbError;

      await supabase.functions.invoke("send-contact-email", {
        body: {
          name: result.data.name,
          email: result.data.email,
          company: result.data.company || "",
          subject: result.data.subject,
          message: result.data.message,
        },
      });

      setStatus("success");
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
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
            <p className="mt-4 text-muted-foreground">
              Thank you for reaching out. We'll respond within two business days.
            </p>
          </AnimatedParagraph>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center px-6 md:px-10 overflow-y-auto">
      <div className="max-w-2xl w-full mx-auto py-10">
        <AnimatedParagraph delay={0.05} y={10}>
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
            Contact
          </span>
        </AnimatedParagraph>

        <AnimatedHeading delay={0.12}>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Let's build together.
          </h2>
        </AnimatedHeading>

        <AnimatedParagraph delay={0.2}>
          <p className="mt-3 text-muted-foreground text-sm">
            We'll respond within two business days.
          </p>
        </AnimatedParagraph>

        <AnimatedButton delay={0.28}>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input name="name" placeholder="Full name *" value={form.name} onChange={handleChange} className={inputClass} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="company" placeholder="Company (optional)" value={form.company} onChange={handleChange} className={inputClass} />
              <div>
                <input name="subject" placeholder="Subject *" value={form.subject} onChange={handleChange} className={inputClass} />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
              </div>
            </div>
            <div>
              <textarea name="message" placeholder="Your message *" rows={4} value={form.message} onChange={handleChange} className={inputClass + " resize-none"} />
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
            Or email us at{" "}
            <a href="mailto:careers@primexia.co" className="text-primary hover:opacity-80 transition-opacity">
              careers@primexia.co
            </a>
          </p>
        </AnimatedParagraph>
      </div>
    </div>
  );
};

export default ContactFormFullSection;
