import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const logos = [
  "Sony Pictures",
  "WPP Group",
  "Sequoia Capital",
  "BlackRock",
  "Bechtel",
];

const TrustedBySection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-16 px-6 md:px-10 border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <p
          className={`text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((name, i) => (
            <span
              key={name}
              className={`text-lg md:text-xl font-semibold text-muted-foreground/50 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
