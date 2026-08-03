import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, About, Experience, Projects, Skills, Achievements, Contact, Cursor } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devendra Ambalkar - Java Full-Stack Developer" },
      { name: "description", content: "Portfolio of Devendra Ambalkar - Java full-stack developer building production web apps with Spring Boot, React, MySQL, MongoDB, AWS, and Git." },
      { property: "og:title", content: "Devendra Ambalkar - Java Full-Stack Developer" },
      { property: "og:description", content: "Production-grade full-stack web applications. Java, Spring Boot, React, MySQL, and MongoDB. AWS & IBM certified, SIH 2024 Grand Finalist." },
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
