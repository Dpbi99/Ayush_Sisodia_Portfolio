import { useEffect, useRef, useState } from "react";

type Variant = "default" | "hover" | "view" | "text" | "drag";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const [labelText, setLabelText] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let bx = x, by = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      bx += (x - bx) * 0.08;
      by += (y - by) * 0.08;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (blob.current) blob.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      if (label.current) label.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, input, textarea, [data-cursor]"
      );
      if (!t) { setVariant("default"); setLabelText(""); return; }
      const v = (t.dataset.cursor as Variant) || "";
      const txt = t.dataset.cursorLabel || "";
      if (v) { setVariant(v); setLabelText(txt); return; }
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
        setVariant("text"); setLabelText(""); return;
      }
      if (t.tagName === "IMG" || t.closest("[data-cursor-view]")) {
        setVariant("view"); setLabelText("view"); return;
      }
      setVariant("hover"); setLabelText("");
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => { setVariant("default"); setLabelText(""); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const ringSize =
    variant === "view" ? "h-24 w-24 -ml-12 -mt-12" :
    variant === "hover" ? "h-16 w-16 -ml-8 -mt-8" :
    variant === "text" ? "h-8 w-[2px] -ml-[1px] -mt-4 rounded-sm" :
    variant === "drag" ? "h-20 w-20 -ml-10 -mt-10" :
    "h-9 w-9 -ml-[18px] -mt-[18px]";

  const ringStyle =
    variant === "view" ? "border-primary/70 bg-primary/10 backdrop-blur-md" :
    variant === "hover" ? "border-primary/60 bg-primary/5 backdrop-blur-sm" :
    variant === "text" ? "border-0 bg-primary" :
    variant === "drag" ? "border-accent/70 bg-accent/10" :
    "border-foreground/40";

  return (
    <>
      {/* Soft glowing blob trailing far behind */}
      <div
        ref={blob}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-32 -mt-32 h-64 w-64 rounded-full bg-primary/15 blur-3xl opacity-70"
      />
      {/* Outer ring */}
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border mix-blend-difference transition-[width,height,margin,background,border-color,opacity] duration-300 ease-out ${ringSize} ${ringStyle} ${down ? "scale-75" : ""}`}
      >
        <span
          ref={label}
          className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 translate-y-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/90 whitespace-nowrap"
          style={{ opacity: labelText ? 1 : 0, transition: "opacity 200ms ease" }}
        >
          {labelText}
        </span>
      </div>
      {/* Inner dot */}
      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[101] -ml-[3px] -mt-[3px] rounded-full bg-primary transition-[width,height,opacity] duration-200 ${
          variant === "default" ? "h-1.5 w-1.5 opacity-100" : "h-1 w-1 opacity-0"
        }`}
      />
    </>
  );
}
