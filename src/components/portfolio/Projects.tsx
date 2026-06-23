import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowUpRight, Github } from "lucide-react";
import ai from "@/assets/project-ai.jpg";
import web from "@/assets/project-web.jpg";
import dev from "@/assets/project-devtool.jpg";
import creative from "@/assets/project-creative.jpg";

const projects = [
  {
    n: "01",
    title: "Neural Studio",
    tag: "AI Application",
    year: "2026",
    desc: "An AI-powered creative studio that generates and refines content with multi-model reasoning and live previews.",
    tech: ["Next.js", "Python", "OpenAI", "Tailwind"],
    image: ai,
  },
  {
    n: "02",
    title: "Orbit Workspace",
    tag: "Full-Stack Web App",
    year: "2025",
    desc: "Real-time collaboration with rich analytics, role-based access and an extensible plugin layer.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    image: web,
  },
  {
    n: "03",
    title: "Devforge CLI",
    tag: "Developer Tool",
    year: "2025",
    desc: "A modular CLI that scaffolds production apps, automates deploys, and integrates with your stack.",
    tech: ["TypeScript", "Node.js", "Bun"],
    image: dev,
  },
  {
    n: "04",
    title: "Liquid Forms",
    tag: "Creative Experiment",
    year: "2024",
    desc: "An interactive WebGL playground exploring generative gradients, particle fields and physics motion.",
    tech: ["Three.js", "GLSL", "GSAP"],
    image: creative,
  },
];

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const cards = wrapRef.current.querySelectorAll<HTMLElement>("[data-card]");
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="projects" className="relative py-40 overflow-hidden">
      <span className="section-numeral right-[-2vw] top-10">04</span>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">— Selected work / 04</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-8 font-display text-6xl font-semibold leading-[0.9] md:text-8xl">
                Things I've <br />
                <span className="font-serif italic text-gradient">built</span>
                <span className="text-outline-strong">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:text-right" delay={200}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <p className="mt-2 text-muted-foreground">
              A scrollable index of recent projects.
            </p>
          </Reveal>
        </div>

        <div ref={wrapRef} className="grid gap-8 lg:grid-cols-12">
          {/* Sticky preview pane */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-3xl glass shadow-elevated">
              {projects.map((p, i) => (
                <img
                  key={p.title}
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  {projects[active].tag} · {projects[active].year}
                </p>
                <h3 className="mt-2 font-display text-4xl font-semibold">
                  {projects[active].title}
                </h3>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-6">
            {projects.map((p, i) => (
              <article
                key={p.title}
                data-card
                className={`group relative border-b border-border py-10 transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "lg:opacity-50 hover:opacity-100"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {p.n}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {p.year}
                  </span>
                </div>

                {/* Mobile image */}
                <div className="mt-4 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
                  <span className="link-underline">{p.title}</span>
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {p.tag}
                </p>

                <p className="mt-5 max-w-md text-muted-foreground">{p.desc}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground animate-border-glow"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium hover:border-primary/40 animate-border-glow"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                  <a
                    href="#"
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
                  >
                    Live demo
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
