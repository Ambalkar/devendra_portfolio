import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, About, Experience, Projects, Skills, Achievements, Contact, Cursor,
} from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devendra Ambalkar — MERN Full-Stack Engineer" },
      { name: "description", content: "Portfolio of Devendra Ambalkar — MERN full-stack engineer crafting production-grade web platforms with React, Node.js, Express, and MongoDB." },
      { property: "og:title", content: "Devendra Ambalkar — MERN Full-Stack Engineer" },
      { property: "og:description", content: "Production-grade full-stack web applications. React · Node · Express · MongoDB. AWS & IBM certified, SIH 2024 Grand Finalist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  );
}
