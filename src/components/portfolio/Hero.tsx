import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowUpRight, Sparkles } from "lucide-react";

const roles = ["Developer", "AI Enthusiast", "Problem Solver", "Web Builder"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[140px] animate-float-slower" />

      {/* Floating UI chips */}
      <FloatingChip className="left-[8%] top-[28%] animate-float-slow" label="React" dot="bg-primary" />
      <FloatingChip className="right-[10%] top-[22%] animate-float-slower" label="Python" dot="bg-accent" />
      <FloatingChip className="left-[12%] bottom-[18%] animate-float-slower" label="AI/ML" dot="bg-primary" />
      <FloatingChip className="right-[8%] bottom-[24%] animate-float-slow" label="Next.js" dot="bg-accent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground animate-rise" style={{ animationDelay: "100ms" }}>
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Available for opportunities</span>
        </div>

        <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight animate-rise" style={{ animationDelay: "200ms" }}>
          Hi, I'm <span className="text-gradient">Your Name</span>
          <br />
          <span className="text-muted-foreground/90">building the </span>
          <span className="relative inline-block">
            <span key={i} className="inline-block animate-rise text-gradient">
              {roles[i]}
            </span>
          </span>
          <span className="text-muted-foreground/90"> era.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-muted-foreground animate-rise" style={{ animationDelay: "400ms" }}>
          Computer Science Student · Developer · AI & Web Enthusiast crafting
          immersive digital experiences and intelligent software.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "500ms" }}>
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-all hover:border-primary/40 hover:bg-card/60"
          >
            Contact Me
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse-glow">
          <div className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ className, label, dot }: { className?: string; label: string; dot: string }) {
  return (
    <div className={`pointer-events-none absolute hidden md:block ${className}`}>
      <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-elevated">
        <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-pulse-glow`} />
        {label}
      </div>
    </div>
  );
}
