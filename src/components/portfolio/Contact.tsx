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
    <section id="contact" className="relative py-40 overflow-hidden">
      <span className="section-numeral right-[-2vw] top-10">07</span>
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />

      {/* Giant statement */}
      <div className="relative mx-auto max-w-[100rem] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">— Contact / 07</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-10 font-display text-[clamp(3rem,13vw,14rem)] font-semibold leading-[0.82] tracking-[-0.04em]">
            Let's build<br />
            <span className="font-serif italic text-gradient">something</span>{" "}
            <span className="text-outline-strong">great.</span>
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="text-lg text-muted-foreground">
                Open to internships, collaborations, and ambitious side
                projects. I read every message — usually within a day.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <ul className="mt-12 divide-y divide-border border-y border-border">
                <ContactLink icon={Mail} label="ayushsisodia2006@gmail.com" sub="Email" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ayushsisodia2006@gmail.com" />
                <ContactLink icon={Linkedin} label="/in/ayush-sisodia-0b7514337/" sub="LinkedIn" href="https://www.linkedin.com/in/ayush-sisodia-0b7514337/" />
                <ContactLink icon={Github} label="@Dpbi99" sub="GitHub" href="https://github.com/Dpbi99" />
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={200}>
            <form
              onSubmit={onSubmit}
              className="glass relative overflow-hidden rounded-3xl p-8 md:p-12"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="01 Name" name="name" placeholder="Your name" />
                  <Field label="02 Email" name="email" type="email" placeholder="you@domain.com" />
                </div>
                <Field label="03 Subject" name="subject" placeholder="What's it about?" />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">04 Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me a bit about your idea…"
                    className="mt-3 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-primary px-7 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send transmission"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="mt-32 max-w-5xl font-display text-3xl leading-tight md:text-5xl">
            <span className="text-muted-foreground">Building </span>
            <span className="font-serif italic text-gradient-pink">ideas</span>
            <span className="text-muted-foreground"> into </span>
            <span>digital experiences</span>
            <span className="text-muted-foreground"> — one commit at a time.</span>
          </p>
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
      <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="mt-3 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
      />
    </div>
  );
}

function ContactLink({
  icon: Icon, label, sub, href,
}: { icon: typeof Mail; label: string; sub: string; href: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-4 py-6"
      >
        <span className="flex items-center gap-5">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{sub}</span>
            <span className="mt-1 block font-display text-2xl font-medium transition-colors group-hover:text-gradient">{label}</span>
          </span>
        </span>
        <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
      </a>
    </li>
  );
}
