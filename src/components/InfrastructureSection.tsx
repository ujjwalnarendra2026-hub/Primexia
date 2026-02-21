import { ArrowRight, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import infraCity from "@/assets/infra-city.jpg";
import infraServers from "@/assets/infra-servers.jpg";
import infraConstruction from "@/assets/infra-construction.jpg";
import infraLogistics from "@/assets/infra-logistics.jpg";

const InfrastructureSection = () => {
  const { ref: topRef, isVisible: topVisible } = useScrollAnimation(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.15);

  return (
    <section id="infrastructure" className="py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div
          ref={topRef}
          className={`rounded-lg overflow-hidden mb-8 transition-all duration-700 ease-out ${
            topVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <img
            src={infraCity}
            alt="City infrastructure aerial view"
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        <div
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-start transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
              Infrastructure
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Systems that scale.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              Logistics, facilities, and digital infrastructure—designed for reliability and long-term value.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="rounded-lg overflow-hidden">
                <img src={infraServers} alt="Server room" className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src={infraConstruction} alt="Construction" className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src={infraLogistics} alt="Logistics" className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:pt-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Request a capability deck
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:careers@primexia.co"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
