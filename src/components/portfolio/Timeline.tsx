import { Reveal } from "./Reveal";

const items = [
  { year: "2026", title: "Building production AI apps", desc: "Shipped multi-model AI tooling for real users; deepened ML engineering." },
  { year: "2025", title: "Hackathon wins & open source", desc: "Top finishes at university hackathons; first sustained open source contributions." },
  { year: "2024", title: "Full-stack & cloud certifications", desc: "Earned cloud and full-stack credentials; built end-to-end side projects." },
  { year: "2023", title: "Started CS degree", desc: "Began computer science, fell in love with algorithms, systems, and the web." },
  { year: "2022", title: "First lines of code", desc: "Wrote my first website, broke it many times, and never looked back." },
];

export function Timeline() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 04 / Journey</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-5xl font-semibold md:text-6xl">
              A <span className="text-gradient">timeline</span> of growth.
            </h2>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {items.map((it, i) => (
              <Reveal key={it.year} delay={i * 80}>
                <div className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="absolute h-4 w-4 rounded-full bg-primary/30 animate-pulse-glow" />
                    <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                  </div>
                  <div className={`pl-8 md:pl-0 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                    <p className="font-mono text-sm text-primary">{it.year}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold">{it.title}</h3>
                  </div>
                  <div className="pl-8 md:pl-0">
                    <p className="text-muted-foreground">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
