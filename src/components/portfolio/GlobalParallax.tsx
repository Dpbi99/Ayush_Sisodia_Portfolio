import { useEffect, useRef } from "react";

/**
 * Site-wide parallax + scroll-velocity warp.
 *
 * - Any element with `data-parallax="<speed>"` translates on Y at that speed
 *   (negative = slower/further, positive = faster/closer). Optional
 *   `data-parallax-x="<speed>"` adds horizontal drift.
 * - A single rAF loop drives all elements + decays a `--scroll-velocity`
 *   CSS variable on <html>, so any element with class `warp-on-scroll` gets
 *   a subtle skew/blur during fast scrolling — a unique "in-motion" feel
 *   you don't see on most parallax sites.
 * - Optional `data-tilt` adds cursor-driven 3D tilt on hover.
 */
export function GlobalParallax() {
  const elementsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const velocity = useRef(0);
  const targetVel = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    const collect = () => {
      elementsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
    };
    collect();

    const observer = new MutationObserver(collect);
    observer.observe(document.body, { childList: true, subtree: true });

    const apply = () => {
      rafRef.current = null;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      for (const el of elementsRef.current) {
        const speed = parseFloat(el.dataset.parallax || "0");
        const speedX = parseFloat(el.dataset.parallaxX || "0");
        const rect = el.getBoundingClientRect();
        // distance from viewport center, normalized
        const center = rect.top + rect.height / 2 - vh / 2;
        const ty = -center * speed * 0.15;
        const tx = -center * speedX * 0.15;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
        el.style.willChange = "transform";
      }

      // Smoothly approach target velocity, then decay it
      velocity.current += (targetVel.current - velocity.current) * 0.18;
      targetVel.current *= 0.85;
      const clamped = Math.max(-1, Math.min(1, velocity.current / 60));
      root.style.setProperty("--scroll-velocity", clamped.toFixed(3));

      if (Math.abs(velocity.current) > 0.4 || Math.abs(targetVel.current) > 0.4) {
        rafRef.current = requestAnimationFrame(apply);
      }

      lastY.current = scrollY;
    };

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(8, now - lastT.current);
      const dy = window.scrollY - lastY.current;
      targetVel.current = (dy / dt) * 16; // px per ~frame
      lastT.current = now;
      lastY.current = window.scrollY;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(apply);
    };

    lastY.current = window.scrollY;
    lastT.current = performance.now();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);

    // Cursor-driven 3D tilt for [data-tilt] containers
    const tilts = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const tiltCleanups: Array<() => void> = [];
    for (const el of tilts) {
      el.style.transformStyle = "preserve-3d";
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      let raf: number | null = null;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf != null) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
        });
      };
      const onLeave = () => {
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      tiltCleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      tiltCleanups.forEach((fn) => fn());
      root.style.removeProperty("--scroll-velocity");
    };
  }, []);

  return null;
}
