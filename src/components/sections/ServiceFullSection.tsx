import { ArrowRight } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton, AnimatedImage } from "@/components/AnimatedContent";

interface Props {
  label: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  reverse?: boolean;
  onContact: () => void;
}

const ServiceFullSection = ({
  label,
  title,
  description,
  cta,
  image,
  imageAlt,
  secondaryImage,
  secondaryImageAlt,
  reverse = false,
  onContact,
}: Props) => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className={`max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}>
      <div className={reverse ? "md:order-2" : ""}>
        <AnimatedImage delay={0.05}>
          <div className="relative rounded-lg overflow-hidden group">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-56 md:h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>
        </AnimatedImage>
        {secondaryImage && (
          <AnimatedImage delay={0.2}>
            <div className="relative rounded-lg overflow-hidden mt-5 group">
              <img
                src={secondaryImage}
                alt={secondaryImageAlt || ""}
                className="w-full h-40 md:h-56 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </div>
          </AnimatedImage>
        )}
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <AnimatedParagraph delay={0.1} y={10}>
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
            {label}
          </span>
        </AnimatedParagraph>
        <AnimatedHeading delay={0.18}>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h2>
        </AnimatedHeading>
        <AnimatedParagraph delay={0.28}>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
            {description}
          </p>
        </AnimatedParagraph>
        <AnimatedButton delay={0.4}>
          <button
            onClick={onContact}
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity"
          >
            {cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedButton>
      </div>
    </div>
  </div>
);

export default ServiceFullSection;
