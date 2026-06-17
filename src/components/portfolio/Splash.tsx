import { useEffect, useState } from "react";

export function Splash() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        done ? "-translate-y-full" : ""
      }`}
      aria-hidden={done}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />

      <div className="relative flex flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Loading experience
        </p>
        <p className="mt-8 font-display text-[20vw] leading-none text-gradient md:text-[12rem]">
          {String(progress).padStart(3, "0")}
        </p>
        <div className="mt-6 h-px w-64 overflow-hidden bg-border">
          <div
            className="h-full bg-gradient-primary transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>v1.0 · portfolio</span>
        <span>est. 2026</span>
      </div>
    </div>
  );
}
