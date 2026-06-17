const words = [
  "Web Development",
  "Artificial Intelligence",
  "App Development",
  "Software Engineering",
  "Machine Learning",
  "Creative Coding",
];

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-card/30 py-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-12 inline-flex items-center gap-12 font-display text-2xl font-medium text-muted-foreground">
            {w}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
