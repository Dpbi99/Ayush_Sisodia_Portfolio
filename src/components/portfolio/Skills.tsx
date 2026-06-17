import { Reveal } from "./Reveal";

const categories = [
  {
    label: "Frontend",
    accent: "from-cyan-400 to-blue-500",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    accent: "from-violet-400 to-purple-600",
    items: ["Node.js", "APIs", "Databases"],
  },
  {
    label: "Programming",
    accent: "from-pink-400 to-rose-500",
    items: ["Python", "Java", "C++"],
  },
  {
    label: "AI",
    accent: "from-emerald-400 to-teal-500",
    items: ["Machine Learning", "AI Tools", "AI Applications"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 02 / Skills</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl font-semibold md:text-6xl">
                The <span className="text-gradient">ecosystem</span>
                <br />I build in.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-md text-muted-foreground">
              A curated toolkit spanning the modern web, intelligent systems,
              and the languages that power both.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <Reveal key={cat.label} delay={idx * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 hover-lift hover:border-primary/40">
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${cat.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{cat.label}</h3>
                <ul className="mt-6 space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="group/it flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-card/60"
                    >
                      <span className="text-foreground/90">{item}</span>
                      <span className="font-mono text-xs text-muted-foreground opacity-0 transition-opacity group-hover/it:opacity-100">
                        ↗
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
