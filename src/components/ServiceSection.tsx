import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceSectionProps {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  reverse?: boolean;
}

const ServiceSection = ({
  id,
  label,
  title,
  description,
  cta,
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
  reverse = false,
}: ServiceSectionProps) => {
  const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation(0.15);
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation(0.15);

  return (
    <section id={id} className="py-16 px-6 md:px-10">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:direction-rtl" : ""
        }`}
      >
        <div
          ref={imgRef}
          className={`${reverse ? "md:order-2" : ""} transition-all duration-700 ease-out ${
            imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="rounded-lg overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-72 md:h-96 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
          {secondaryImage && (
            <div className="rounded-lg overflow-hidden mt-5">
              <img
                src={secondaryImage}
                alt={secondaryImageAlt || ""}
                className="w-full h-48 md:h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
        <div
          ref={textRef}
          className={`${reverse ? "md:order-1" : ""} transition-all duration-700 ease-out ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
            {label}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
            {description}
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity"
          >
            {cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
