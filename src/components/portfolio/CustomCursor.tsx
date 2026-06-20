import { useEffect, useRef, useState } from "react";

type Variant = "default" | "hover" | "view" | "text" | "drag" | "hide";

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let bx = x, by = y;
    let raf = 0;
    let running = true;
    let dirty = true;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dirty = true;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      if (!running) { raf = 0; return; }
      const dxR = x - rx, dyR = y - ry;
      const dxB = x - bx, dyB = y - by;
      // Skip work when essentially settled and no new input
      if (!dirty && Math.abs(dxR) < 0.1 && Math.abs(dyR) < 0.1 && Math.abs(dxB) < 0.1 && Math.abs(dyB) < 0.1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      rx += dxR * 0.22;
      ry += dyR * 0.22;
      bx += dxB * 0.08;
      by += dyB * 0.08;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (blob.current) blob.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      if (label.current) label.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      dirty = Math.abs(dxR) > 0.1 || Math.abs(dyR) > 0.1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) { running = true; raf = requestAnimationFrame(tick); }
    };
    const stop = () => {
      running = false;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, input, textarea, [data-cursor]"
      );
      if (!t) {
        setVariant((v) => (v === "default" ? v : "default"));
        setLabelText((l) => (l === "" ? l : ""));
        return;
      }
      const v = (t.dataset.cursor as Variant) || "";
      const txt = t.dataset.cursorLabel || "";
      let next: Variant = "hover";
      let nextLabel = "";
      if (v) { next = v; nextLabel = txt; }
      else if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") { next = "text"; }
      else if (t.tagName === "IMG" || t.closest("[data-cursor-view]")) { next = "view"; nextLabel = "view"; }
      setVariant((cur) => (cur === next ? cur : next));
      setLabelText((cur) => (cur === nextLabel ? cur : nextLabel));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => { setVariant("default"); setLabelText(""); };

    // Pause the loop while the user is actively scrolling
    const onScroll = () => {
      if (blob.current && blob.current.style.opacity !== "0") {
        blob.current.style.opacity = "0";
      }
      stop();
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (blob.current) blob.current.style.opacity = "";
        dirty = true;
        start();
      }, 120);
    };

    const onVisibility = () => {
      if (document.hidden) stop(); else start();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (scrollTimer) clearTimeout(scrollTimer);
      stop();
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
    variant === "view" ? "border-primary/70 bg-primary/10" :
    variant === "hover" ? "border-primary/60 bg-primary/5" :
    variant === "text" ? "border-0 bg-primary" :
    variant === "drag" ? "border-accent/70 bg-accent/10" :
    "border-foreground/40";

  const hidden = variant === "hide";

  return (
    <>
      {/* Soft glowing blob trailing far behind — cheaper blur, hidden on scroll */}
      <div
        ref={blob}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[99] -ml-24 -mt-24 h-48 w-48 rounded-full bg-primary/15 blur-2xl will-change-transform transition-opacity duration-200 ${hidden ? "opacity-0" : "opacity-60"}`}
      />
      {/* Outer ring */}
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border mix-blend-difference will-change-transform transition-[width,height,margin,background-color,border-color,opacity,transform] duration-200 ease-out ${ringSize} ${ringStyle} ${down ? "scale-75" : ""} ${hidden ? "opacity-0" : ""}`}
      >
        <span
          ref={label}
          className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 translate-y-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/90 whitespace-nowrap will-change-transform"
          style={{ opacity: labelText && !hidden ? 1 : 0, transition: "opacity 200ms ease" }}
        >
          {labelText}
        </span>
      </div>
      {/* Inner dot */}
      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[101] -ml-[3px] -mt-[3px] rounded-full bg-primary will-change-transform transition-opacity duration-200 ${
          hidden ? "opacity-0" : variant === "default" ? "h-1.5 w-1.5 opacity-100" : "h-1 w-1 opacity-0"
        }`}
      />
    </>
  );
}
