export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Your Name. Crafted with care.</p>
        <p className="font-mono text-xs">v1.0 · designed & built solo</p>
      </div>
    </footer>
  );
}
