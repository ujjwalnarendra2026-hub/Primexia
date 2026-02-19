import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Let's build together.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Tell us what you're making. We'll respond within two business days.
        </p>
        <a
          href="mailto:careers@primexia.co"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
