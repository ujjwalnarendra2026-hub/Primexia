const logos = [
  "Sony Pictures",
  "WPP Group",
  "Sequoia Capital",
  "BlackRock",
  "Bechtel",
];

const TrustedBySection = () => {
  return (
    <section className="py-16 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg md:text-xl font-semibold text-muted-foreground/50"
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
