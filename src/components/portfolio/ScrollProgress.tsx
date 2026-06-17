import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.max(0, Math.min(1, scrolled)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-px w-full bg-transparent">
      <div
        className="h-full bg-gradient-primary origin-left"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
