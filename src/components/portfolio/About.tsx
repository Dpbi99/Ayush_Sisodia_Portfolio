import { Reveal } from "./Reveal";
import { Code2, Cpu, Layers, Smartphone } from "lucide-react";

const interests = [
  { icon: Layers, title: "Web Development", desc: "Modern, performant interfaces" },
  { icon: Smartphone, title: "App Development", desc: "Cross-platform mobile apps" },
  { icon: Cpu, title: "Artificial Intelligence", desc: "ML models & AI tooling" },
  { icon: Code2, title: "Software Engineering", desc: "Clean, scalable systems" },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 01 / About</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl font-semibold leading-tight md:text-6xl">
                A storyteller in <span className="text-gradient">code</span>.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={150}>
              <p className="text-xl leading-relaxed text-muted-foreground">
                I'm a Computer Science student fascinated by the space where
                <span className="text-foreground"> design, code, and intelligence </span>
                collide. Every project is an experiment in turning ideas into
                something tangible — and a little magical.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base leading-relaxed text-muted-foreground">
                My journey started with curiosity about how the web works and grew
                into building full-stack applications, exploring machine learning,
                and shipping side projects that push my limits. I learn by making.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="grid gap-3 sm:grid-cols-2 pt-4">
                {interests.map((it) => (
                  <div
                    key={it.title}
                    className="group glass rounded-xl p-4 hover-lift hover:border-primary/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary/20 text-primary">
                        <it.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{it.title}</p>
                        <p className="text-xs text-muted-foreground">{it.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <Stat n="20+" l="Projects" />
                <Stat n="3+" l="Years coding" />
                <Stat n="∞" l="Curiosity" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-semibold text-gradient">{n}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
    </div>
  );
}
