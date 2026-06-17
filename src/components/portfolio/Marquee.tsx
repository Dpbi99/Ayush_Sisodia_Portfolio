const top = [
  "Web Development", "Artificial Intelligence", "App Development",
  "Software Engineering", "Machine Learning", "Creative Coding",
];
const bottom = ["React", "Next.js", "Python", "TypeScript", "Node.js", "Tailwind", "PostgreSQL", "OpenAI"];

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-card/20 py-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="flex whitespace-nowrap animate-marquee">
        {[...top, ...top].map((w, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10 font-display text-3xl md:text-5xl font-medium">
            <span className="text-foreground">{w}</span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>

      <div className="mt-6 flex whitespace-nowrap animate-marquee-rev">
        {[...bottom, ...bottom, ...bottom].map((w, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
            <span>{w}</span>
            <span className="text-primary/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
