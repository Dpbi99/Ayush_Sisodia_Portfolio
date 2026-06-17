import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elevated" : ""
          }`}
        >
          <a href="#home" className="group flex items-center gap-2 font-display text-lg font-semibold">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <span className="text-[11px] font-bold">◆</span>
            </span>
            <span className="tracking-tight">Portfolio<span className="text-primary">.</span></span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border bg-card/40 px-5 py-2 text-sm font-medium transition-all hover:border-primary/60 hover:shadow-glow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              Let's talk
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-foreground transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </nav>

        {open && (
          <div className="mt-2 glass rounded-2xl p-5 md:hidden animate-rise">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="block text-base text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
