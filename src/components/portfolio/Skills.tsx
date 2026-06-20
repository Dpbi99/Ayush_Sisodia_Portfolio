import { Reveal } from "./Reveal";

const categories = [
  {
    n: "01", label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    n: "02", label: "Backend",
    items: ["Node.js", "REST APIs", "Databases"],
  },
  {
    n: "03", label: "Programming",
    items: ["Python", "Java", "C++"],
  },
  {
    n: "04", label: "Artificial Intelligence",
    items: ["Machine Learning", "AI Tools", "AI Applications"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-40 overflow-hidden">
      <span className="section-numeral left-[-2vw] top-10">03</span>
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-24 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">— Skills / 03</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-8 font-display text-6xl font-semibold leading-[0.9] md:text-8xl">
                An <span className="font-serif italic text-gradient">ecosystem</span>
                <br />of tools.
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-5 md:pt-32" delay={200}>
            <p className="text-lg text-muted-foreground">
              A curated stack spanning the modern web, intelligent systems,
              and the languages that bridge them — chosen, not collected.
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {categories.map((cat, idx) => (
            <Reveal key={cat.label} delay={idx * 80}>
              <div className="group grid grid-cols-12 gap-6 py-10 transition-colors hover:bg-card/30">
                <div className="col-span-2 font-mono text-sm text-muted-foreground">{cat.n}</div>
                <h3 className="col-span-10 md:col-span-4 font-display text-3xl font-semibold transition-colors group-hover:text-gradient md:text-5xl">
                  {cat.label}
                </h3>
                <ul className="col-span-12 md:col-span-6 flex flex-wrap content-center gap-3 md:justify-end">
                  {cat.items.map((item, i) => {
                    const floatClass = `animate-float-${(i % 4) + 1}`;
                    const delay = `${(i * 0.7 + idx * 0.3).toFixed(1)}s`;
                    const duration = `${(5 + (i % 3) * 0.8).toFixed(1)}s`;
                    return (
                      <li
                        key={item}
                        className={`rounded-full border border-border bg-card/40 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:text-primary hover:shadow-glow ${floatClass}`}
                        style={{
                          animationDelay: delay,
                          animationDuration: duration,
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
