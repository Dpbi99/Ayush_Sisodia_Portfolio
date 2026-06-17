import { Reveal } from "./Reveal";
import { ArrowUpRight, Github } from "lucide-react";
import ai from "@/assets/project-ai.jpg";
import web from "@/assets/project-web.jpg";
import dev from "@/assets/project-devtool.jpg";
import creative from "@/assets/project-creative.jpg";

const projects = [
  {
    title: "Neural Studio",
    tag: "AI Application",
    desc: "An AI-powered creative studio that generates and refines content with multi-model reasoning and live previews.",
    tech: ["Next.js", "Python", "OpenAI", "Tailwind"],
    image: ai,
    github: "#",
    demo: "#",
  },
  {
    title: "Orbit Workspace",
    tag: "Full-Stack Web App",
    desc: "A real-time collaboration platform with rich analytics, role-based access, and an extensible plugin layer.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    image: web,
    github: "#",
    demo: "#",
  },
  {
    title: "Devforge CLI",
    tag: "Developer Tool",
    desc: "A modular CLI that scaffolds production-ready apps, automates deploys, and integrates with your stack of choice.",
    tech: ["TypeScript", "Node.js", "Bun"],
    image: dev,
    github: "#",
    demo: "#",
  },
  {
    title: "Liquid Forms",
    tag: "Creative Experiment",
    desc: "An interactive WebGL playground exploring generative gradients, particle fields, and physics-based motion.",
    tech: ["Three.js", "GLSL", "GSAP"],
    image: creative,
    github: "#",
    demo: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 03 / Selected work</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl font-semibold md:text-6xl">
                Things I've <span className="text-gradient">built</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <a href="#contact" className="link-underline text-sm text-muted-foreground">
              Have a project in mind? Let's collaborate →
            </a>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 120}>
              <article className="group relative h-full overflow-hidden rounded-3xl glass hover-lift hover:border-primary/40 hover:shadow-glow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-card/80"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
                    >
                      Live demo <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
