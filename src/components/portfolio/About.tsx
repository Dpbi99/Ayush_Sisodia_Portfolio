import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-40 overflow-hidden">
      <span className="section-numeral right-[-2vw] top-10">02</span>
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">— About / 02</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-8 font-display text-6xl font-semibold leading-[0.9] md:text-7xl">
                A <span className="font-serif italic text-gradient">storyteller</span>
                <br />in code.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <Stat n="20+" l="Projects" />
                <Stat n="3+" l="Years" />
                <Stat n="∞" l="Curiosity" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 space-y-20">
            <Block n="i." title="Origins">
              <p>
                I started by breaking websites in my browser — viewing source
                and wondering how everything fit together. That curiosity
                became a craft, and the craft became a calling.
              </p>
            </Block>
            <Block n="ii." title="Today">
              <p>
                I'm a Computer Science student building across the stack: from
                pixel-perfect interfaces to systems that reason with language.
                I treat every project as a chance to experiment, ship, and
                <span className="text-foreground"> learn out loud</span>.
              </p>
            </Block>
            <Block n="iii." title="Obsessions">
              <p>
                Web development, app development, AI / machine learning, and
                software engineering. The thread connecting them: turning
                ambiguous ideas into experiences that feel inevitable.
              </p>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid grid-cols-12 gap-6 border-t border-border pt-8">
        <div className="col-span-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{n}</div>
        <div className="col-span-10">
          <h3 className="font-display text-3xl font-semibold">{title}</h3>
          <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-4xl font-semibold text-gradient">{n}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</p>
    </div>
  );
}
