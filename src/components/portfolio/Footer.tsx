export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:grid-cols-3">
        <p>© {new Date().getFullYear()} — Your Name</p>
        <p className="md:text-center">Designed & built solo</p>
        <p className="md:text-right">v1.0 / portfolio</p>
      </div>
    </footer>
  );
}
