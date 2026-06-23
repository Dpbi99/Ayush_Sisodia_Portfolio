import { useEffect, useRef } from "react";

/**
 * Firewatch-style layered parallax scene — improvised with the site's
 * teal/violet aurora palette instead of the original warm sunset.
 *
 * Each layer translates on Y at a different speed driven by scroll,
 * batched through a single rAF loop for smoothness.
 */
export function ParallaxScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    if (!rootRef.current) return;
    layersRef.current = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>("[data-depth]"),
    );

    const apply = () => {
      rafRef.current = null;
      const y = scrollY.current;
      for (const el of layersRef.current) {
        const depth = parseFloat(el.dataset.depth || "0");
        // Negative depth => moves slower (further away). Positive => faster (closer).
        const ty = y * depth;
        const scale = el.dataset.scale ? parseFloat(el.dataset.scale) : 1;
        el.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale})`;
      }
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1px" }}
    >
      {/* Sky gradient */}
      <div
        className="absolute inset-x-0 -top-20 h-[120%]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.05 280) 0%, oklch(0.22 0.07 260) 30%, oklch(0.28 0.09 220) 55%, oklch(0.32 0.12 200) 75%, oklch(0.18 0.04 280) 100%)",
        }}
      />

      {/* Stars */}
      <svg
        data-depth="-0.08"
        className="absolute inset-x-0 top-0 h-[70%] w-full will-change-transform"
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137.5) % 1600;
          const y = (i * 53.3) % 480;
          const r = (i % 5) * 0.3 + 0.5;
          const o = 0.4 + ((i * 17) % 60) / 100;
          return <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={o} />;
        })}
      </svg>

      {/* Sun / moon orb */}
      <div
        data-depth="-0.15"
        className="absolute left-1/2 top-[26%] h-72 w-72 -translate-x-1/2 rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, oklch(0.95 0.12 195 / 0.95), oklch(0.78 0.22 230 / 0.55) 45%, transparent 70%)",
          filter: "blur(2px)",
          boxShadow:
            "0 0 120px 20px oklch(0.85 0.17 195 / 0.35), 0 0 220px 60px oklch(0.72 0.22 315 / 0.25)",
        }}
      />

      {/* Far mountains */}
      <svg
        data-depth="0.12"
        className="absolute inset-x-0 top-[42%] w-full will-change-transform"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="far" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.30 0.10 240)" />
            <stop offset="1" stopColor="oklch(0.20 0.06 270)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#far)"
          d="M0,320 L120,200 L240,260 L360,150 L500,240 L640,170 L800,250 L960,160 L1100,230 L1260,180 L1400,250 L1600,200 L1600,400 L0,400 Z"
        />
      </svg>

      {/* Mid mountains */}
      <svg
        data-depth="0.25"
        className="absolute inset-x-0 top-[55%] w-full will-change-transform"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="mid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.22 0.08 260)" />
            <stop offset="1" stopColor="oklch(0.14 0.04 280)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#mid)"
          d="M0,260 L180,120 L320,220 L480,90 L640,200 L820,110 L980,210 L1160,130 L1320,220 L1480,150 L1600,210 L1600,400 L0,400 Z"
        />
      </svg>

      {/* Fog layer */}
      <div
        data-depth="0.18"
        className="absolute inset-x-0 top-[60%] h-40 will-change-transform"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.85 0.17 195 / 0.12) 50%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* Near mountains */}
      <svg
        data-depth="0.4"
        className="absolute inset-x-0 top-[64%] w-full will-change-transform"
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="near" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.16 0.05 290)" />
            <stop offset="1" stopColor="oklch(0.10 0.02 280)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#near)"
          d="M0,300 L140,140 L300,260 L460,110 L620,240 L780,150 L940,260 L1120,120 L1280,250 L1460,160 L1600,240 L1600,500 L0,500 Z"
        />
      </svg>

      {/* Foreground silhouette — pine trees */}
      <svg
        data-depth="0.7"
        className="absolute inset-x-0 bottom-[-40px] w-full will-change-transform"
        viewBox="0 0 1600 260"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="fg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.08 0.02 280)" />
            <stop offset="1" stopColor="oklch(0.04 0.01 280)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#fg)"
          d="M0,260 L0,200
             L40,200 L60,140 L80,200
             L120,200 L150,80 L180,200
             L220,200 L240,150 L260,200
             L300,200 L335,60 L370,200
             L420,200 L445,120 L470,200
             L520,200 L555,40 L590,200
             L640,200 L665,110 L690,200
             L740,200 L775,70 L810,200
             L860,200 L885,130 L910,200
             L960,200 L995,50 L1030,200
             L1080,200 L1105,120 L1130,200
             L1180,200 L1215,80 L1250,200
             L1300,200 L1325,140 L1350,200
             L1400,200 L1435,60 L1470,200
             L1520,200 L1545,130 L1570,200
             L1600,200 L1600,260 Z"
        />
      </svg>

      {/* Atmospheric vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 40%, oklch(0.11 0.015 270 / 0.6) 100%)",
        }}
      />
    </div>
  );
}
