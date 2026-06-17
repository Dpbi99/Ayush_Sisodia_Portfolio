import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const setH = (v: boolean) => () => setHover(v);
    const targets = document.querySelectorAll("a, button, [data-cursor='hover']");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", setH(true));
      t.addEventListener("mouseleave", setH(false));
    });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", setH(true));
        t.removeEventListener("mouseleave", setH(false));
      });
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border transition-[width,height,margin,background,border-color] duration-300 ${
          hover
            ? "h-16 w-16 -ml-8 -mt-8 border-primary/60 bg-primary/10 backdrop-blur-sm"
            : "border-foreground/40"
        }`}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary"
      />
    </>
  );
}
