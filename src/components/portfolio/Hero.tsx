import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowDown } from "lucide-react";

const roles = ["Developer", "AI Builder", "Web Crafter", "Problem Solver"];


export function Hero() {
  const [i, setI] = useState(0);
  const [time, setTime] = useState("");
  const nameRef = useRef<HTMLSpanElement>(null);

  const magnetRaf = useRef<number | null>(null);
  const magnetTarget = useRef({ x: 0, y: 0 });

  const handleMagnet = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    magnetTarget.current.x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    magnetTarget.current.y = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    if (magnetRaf.current == null) {
      magnetRaf.current = requestAnimationFrame(() => {
        magnetRaf.current = null;
        if (nameRef.current) {
          nameRef.current.style.transform = `translate3d(${magnetTarget.current.x}px, ${magnetTarget.current.y}px, 0)`;
        }
      });
    }
  };
  const resetMagnet = () => {
    if (magnetRaf.current != null) {
      cancelAnimationFrame(magnetRaf.current);
      magnetRaf.current = null;
    }
    if (nameRef.current) nameRef.current.style.transform = "translate3d(0px, 0px, 0)";
  };

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST",
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[140px] animate-float-slow" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/25 blur-[160px] animate-float-slower" />

      {/* Top meta bar */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 pt-32 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          available · 2026
        </div>
        <div className="hidden md:block">{time}</div>
        <div className="hidden md:block">portfolio / 001</div>
      </div>

      {/* Massive kinetic headline */}
      <div className="relative mx-auto max-w-[110rem] px-6 pt-16 md:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">
          <span className="mask-rise"><span style={{ animationDelay: "0.2s" }}>— Introducing</span></span>
        </p>

        <h1 className="mt-8 font-display font-semibold leading-[0.82] tracking-[-0.04em]">
          <div className="text-[clamp(3rem,11vw,11rem)]">
            <span className="mask-rise"><span style={{ animationDelay: "0.35s" }}>Hi, I'm</span></span>{" "}
            <span
              className="mask-rise inline-block"
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              data-cursor="hide"
            >
              <span
                ref={nameRef}
                style={{ animationDelay: "0.45s", transition: "text-shadow 0.4s ease, filter 0.4s ease", willChange: "transform" }}
                className="font-serif italic text-name-gradient inline-block cursor-none"
              >
                Ayush Sisodia
              </span>
            </span>
          </div>
          <div className="mt-2 text-[clamp(3rem,11vw,11rem)]">
            <span className="mask-rise"><span style={{ animationDelay: "0.6s" }} className="text-outline-strong">building</span></span>{" "}
            <span className="mask-rise"><span style={{ animationDelay: "0.7s" }}>the</span></span>
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-6 text-[clamp(3rem,11vw,11rem)]">
            <span className="mask-rise"><span style={{ animationDelay: "0.85s" }}>future of</span></span>
            <span className="relative inline-block overflow-hidden align-baseline">
              <span
                key={i}
                className="block animate-rise font-serif italic text-gradient"
              >
                {roles[i]}.
              </span>
            </span>
          </div>
        </h1>

        {/* Bottom grid: description + ctas + scroll */}
        <div className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
          <div className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            (01) <br />Index
          </div>
          <p className="md:col-span-5 text-lg leading-relaxed text-muted-foreground">
            Computer Science student crafting immersive interfaces,
            <span className="text-foreground"> intelligent software</span>, and
            experimental digital experiences at the edge of code and design.
          </p>
          <div className="md:col-span-4 flex flex-wrap items-end gap-3 md:justify-end">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03] hover:bg-primary/90"
            >
              <span className="relative z-10">View Projects</span>
              <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1">
                <ArrowDown className="h-3.5 w-3.5 -rotate-45" />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium transition-all hover:border-primary/60 hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
