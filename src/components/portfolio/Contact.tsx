import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent!", { description: "I'll get back to you soon." });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">— 06 / Contact</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-6xl font-semibold leading-[0.95] md:text-7xl">
                Let's build <br />
                <span className="text-gradient">something</span>
                <br />great.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-lg text-muted-foreground">
                Open to internships, collaborations, and ambitious side projects.
                Drop a line — I read every message.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <ul className="mt-10 space-y-3">
                <ContactLink icon={Mail} label="hello@yourname.dev" href="mailto:hello@yourname.dev" />
                <ContactLink icon={Linkedin} label="linkedin.com/in/yourname" href="#" />
                <ContactLink icon={Github} label="github.com/yourhandle" href="#" />
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={200}>
            <form
              onSubmit={onSubmit}
              className="glass relative overflow-hidden rounded-3xl p-8 md:p-10"
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative space-y-6">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
                <Field label="Subject" name="subject" placeholder="What's it about?" />
                <div>
                  <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me a bit about your idea…"
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send message"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="mt-32 border-t border-border pt-16 text-center">
            <p className="font-display text-4xl font-semibold leading-tight md:text-6xl">
              Building <span className="text-gradient">ideas</span> into
              <br />digital experiences.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", placeholder,
}: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function ContactLink({ icon: Icon, label, href }: { icon: typeof Mail; label: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center justify-between rounded-2xl border border-border bg-card/30 px-5 py-4 transition-all hover:border-primary/40 hover:bg-card/60"
      >
        <span className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary/20 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-medium">{label}</span>
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
      </a>
    </li>
  );
}
