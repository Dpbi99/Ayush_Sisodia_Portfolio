import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Timeline } from "@/components/portfolio/Timeline";
import { Coding } from "@/components/portfolio/Coding";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — CS Student, Developer & AI Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of a computer science student building modern web, app, and AI experiences. Selected projects, skills and contact.",
      },
      { property: "og:title", content: "Your Name — CS Student, Developer & AI Enthusiast" },
      {
        property: "og:description",
        content:
          "Portfolio of a computer science student building modern web, app, and AI experiences.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Coding />
      <Contact />
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </main>
  );
}
