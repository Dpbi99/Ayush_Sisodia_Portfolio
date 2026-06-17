import { Reveal } from "./Reveal";
import { Github, Code, Terminal, Trophy } from "lucide-react";

const stats = [
  { icon: Github, label: "GitHub contributions", value: "1,240+", sub: "Last 12 months" },
  { icon: Code, label: "Repositories", value: "48", sub: "Public + private" },
  { icon: Trophy, label: "Problems solved", value: "650+", sub: "LeetCode / Codeforces" },
  { icon: Terminal, label: "Languages", value: "8", sub: "Actively used" },
];

// fake heatmap weeks
const heat = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() ** 1.8 * 5));

export function Coding() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 05 / In the terminal</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl font-semibold md:text-6xl">
                I ship, often & <span className="text-gradient">openly</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <a href="#" className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium hover:border-primary/40">
              <Github className="h-4 w-4" /> @yourhandle
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="glass relative overflow-hidden rounded-3xl p-7 noise">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Contribution activity</h3>
                <span className="font-mono text-xs text-muted-foreground">past year</span>
              </div>
              <div className="mt-6 grid grid-flow-col grid-rows-7 gap-[3px]">
                {heat.map((v, i) => (
                  <div
                    key={i}
                    className="h-2.5 w-2.5 rounded-[3px]"
                    style={{
                      background:
                        v === 0
                          ? "oklch(0.2 0.03 270)"
                          : `oklch(${0.45 + v * 0.1} ${0.1 + v * 0.03} 200 / ${0.4 + v * 0.15})`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((v) => (
                    <div
                      key={v}
                      className="h-2.5 w-2.5 rounded-[3px]"
                      style={{
                        background:
                          v === 0
                            ? "oklch(0.2 0.03 270)"
                            : `oklch(${0.45 + v * 0.1} ${0.1 + v * 0.03} 200 / ${0.4 + v * 0.15})`,
                      }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="grid h-full grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5 hover-lift hover:border-primary/40">
                  <s.icon className="h-5 w-5 text-primary" />
                  <p className="mt-4 font-display text-3xl font-semibold text-gradient">{s.value}</p>
                  <p className="mt-1 text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-12" delay={200}>
            <div className="glass overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">~/portfolio — zsh</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
<span className="text-primary">$</span> whoami
<span className="text-muted-foreground">cs-student · developer · ai-enthusiast</span>

<span className="text-primary">$</span> stack --current
<span className="text-muted-foreground">react · next.js · node.js · python · postgres · docker · openai</span>

<span className="text-primary">$</span> status
<span className="text-muted-foreground">building, learning, shipping</span><span className="animate-blink">▍</span>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
