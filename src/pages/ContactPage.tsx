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

const ContactPage = () => {
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
      // Store in database
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        company: result.data.company || null,
        subject: result.data.subject,
        message: result.data.message,
      });

      if (dbError) throw dbError;

      // Send email notification
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
    } catch (err: any) {
      setServerError("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AnimatedHeading>
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground">Message sent.</h1>
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
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <AnimatedHeading>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Contact
          </h1>
        </AnimatedHeading>

        <AnimatedParagraph delay={0.15}>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Tell us what you're working on. Whether it's a business enquiry, investment
            opportunity, or partnership discussion — we'll respond within two business days.
          </p>
        </AnimatedParagraph>

        <AnimatedButton delay={0.25}>
          <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  name="name"
                  placeholder="Full name *"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address *"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  name="company"
                  placeholder="Company (optional)"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  name="subject"
                  placeholder="Subject *"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your message *"
                rows={6}
                value={form.message}
                onChange={handleChange}
                className={inputClass + " resize-none"}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </AnimatedButton>

        <AnimatedParagraph delay={0.4}>
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              You can also reach us directly at{" "}
              <a href="mailto:careers@primexia.co" className="text-primary hover:opacity-80 transition-opacity">
                careers@primexia.co
              </a>
            </p>
          </div>
        </AnimatedParagraph>
      </div>
    </div>
  );
};

export default ContactPage;
