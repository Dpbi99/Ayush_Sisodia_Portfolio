import { Reveal } from "./Reveal";

const items = [
  { year: "2026", title: "Production AI apps", desc: "Shipped multi-model AI tooling for real users; deepened ML engineering." },
  { year: "2025", title: "Hackathons & open source", desc: "Top finishes at university hackathons; first sustained OSS contributions." },
  { year: "2024", title: "Full-stack & cloud certs", desc: "Earned cloud and full-stack credentials; built end-to-end side projects." },
  { year: "2023", title: "Started CS degree", desc: "Fell in love with algorithms, systems, and the web." },
  { year: "2022", title: "First lines of code", desc: "Wrote my first website, broke it many times, never looked back." },
];

export function Timeline() {
  return (
    <section className="relative py-40 overflow-hidden">
      <span className="section-numeral left-[-2vw] top-10">05</span>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-24 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">— Journey / 05</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-8 font-display text-6xl font-semibold leading-[0.9] md:text-8xl">
                A <span className="font-serif italic text-gradient">timeline</span><br />
                of growth.
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-5 md:pt-24" delay={200}>
            <p className="text-lg text-muted-foreground">
              Five moments that shaped how I think, build, and ship. The next
              entry is always being written.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-[120px]" />

          <div className="space-y-2">
            {items.map((it, i) => (
              <Reveal key={it.year} delay={i * 80}>
                <div className="group relative grid grid-cols-1 gap-4 border-b border-border py-10 transition-colors hover:bg-card/30 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-2 pl-8 md:pl-0">
                    <div className="absolute left-[-4px] top-12 h-2 w-2 rounded-full bg-primary shadow-glow md:left-[116px]" />
                    <p className="font-display text-3xl font-semibold text-gradient">{it.year}</p>
                  </div>
                  <div className="md:col-span-1" />
                  <h3 className="md:col-span-5 font-display text-2xl font-semibold transition-transform group-hover:translate-x-2 md:text-3xl">
                    {it.title}
                  </h3>
                  <p className="md:col-span-4 text-muted-foreground">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
