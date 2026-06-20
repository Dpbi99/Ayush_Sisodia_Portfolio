import { useEffect } from "react";

/**
 * Global magnetic + hover interaction layer.
 * Applies a subtle magnetic pull and scale to every <a>, <button>
 * and [data-magnetic] element. Pointer-coarse and reduced-motion safe.
 */
export function MagneticInteractions() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SELECTOR = 'a, button, [data-magnetic], [data-cursor="hover"]';
    const STRENGTH = 0.25; // 0..1
    const MAX = 14; // px clamp

    type Tracked = {
      el: HTMLElement;
      raf: number;
      tx: number;
      ty: number;
      cx: number;
      cy: number;
    };

    const tracked = new WeakMap<HTMLElement, Tracked>();

    const animate = (t: Tracked) => {
      t.cx += (t.tx - t.cx) * 0.18;
      t.cy += (t.ty - t.cy) * 0.18;
      t.el.style.transform = `translate3d(${t.cx.toFixed(2)}px, ${t.cy.toFixed(2)}px, 0)`;
      if (Math.abs(t.tx - t.cx) > 0.1 || Math.abs(t.ty - t.cy) > 0.1) {
        t.raf = requestAnimationFrame(() => animate(t));
      } else {
        t.raf = 0;
        if (t.tx === 0 && t.ty === 0) {
          t.el.style.transform = "";
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const t = tracked.get(el);
      if (!t) return;
      t.tx = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
      t.ty = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
      if (!t.raf) t.raf = requestAnimationFrame(() => animate(t));
    };

    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const t = tracked.get(el);
      if (!t) return;
      t.tx = 0;
      t.ty = 0;
      el.classList.remove("is-magnetic-hover");
      if (!t.raf) t.raf = requestAnimationFrame(() => animate(t));
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.classList.add("is-magnetic-hover");
    };

    const attach = (el: HTMLElement) => {
      if (tracked.has(el)) return;
      // Skip opt-outs and inputs / mobile menu burger noise
      if (el.dataset.magneticOff === "true") return;
      if (el.dataset.cursor === "hide") return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      el.style.willChange = "transform";
      el.style.transition = "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)";
      tracked.set(el, { el, raf: 0, tx: 0, ty: 0, cx: 0, cy: 0 });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    };

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach(attach);
    };

    scan();

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches?.(SELECTOR)) attach(n);
            scan(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
    };
  }, []);

  return null;
}
