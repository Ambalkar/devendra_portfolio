import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mail, Phone, MapPin, ArrowUpRight, Download,
  Code2, Server, Database, Cloud, Shield, Sparkles, Trophy, Award,
  ChevronRight,
} from "lucide-react";

const Github = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);
const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/* ---------- Cursor ---------- */
export function Cursor() {
  const x = useSpring(0, { stiffness: 500, damping: 40 });
  const y = useSpring(0, { stiffness: 500, damping: 40 });
  const xRing = useSpring(0, { stiffness: 120, damping: 20 });
  const yRing = useSpring(0, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 4); y.set(e.clientY - 4);
      xRing.set(e.clientX - 18); yRing.set(e.clientY - 18);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, xRing, yRing]);
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-[var(--cyan)] md:block" />
      <motion.div style={{ x: xRing, y: yRing }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-[var(--cyan)]/40 md:block" />
    </>
  );
}

/* ---------- Nav ---------- */
const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className={`glass rounded-full px-4 py-2 font-display text-sm font-semibold tracking-tight ${scrolled ? "glow-soft" : ""}`}>
          <span className="text-gradient">DA</span>
          <span className="text-muted-foreground">.dev</span>
        </a>
        <nav className="glass hidden rounded-full px-2 py-2 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="glass-strong group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:glow-primary">
          Let's talk
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 aurora-bg animate-aurora" />
      <div className="absolute inset-0 mesh-grid" />
      {/* floating orbs */}
      <motion.div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[var(--violet)]/30 blur-3xl animate-pulse-glow" />
      <motion.div className="absolute right-[10%] bottom-[15%] h-96 w-96 rounded-full bg-[var(--cyan)]/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for full-time opportunities · 2026
        </motion.div>

        <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl md:text-[8rem]">
          {["Devendra", "Ambalkar"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              <span className={i === 0 ? "text-foreground" : "text-gradient"}>{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          MERN full-stack engineer crafting production-grade web platforms
          end-to-end — from pixel-tight React interfaces to secure Node APIs and
          scalable MongoDB architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#projects" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--primary)] to-[var(--violet)] px-7 py-3.5 font-medium text-primary-foreground glow-primary transition-transform hover:scale-[1.03]">
            <span className="relative z-10 flex items-center gap-2">
              View selected work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
          <a href="/resume.pdf" download className="glass-strong group flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-all hover:bg-white/10">
            <Download className="h-4 w-4" /> Download Résumé
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-6 text-muted-foreground"
        >
          {[
            { Icon: Github, href: "https://github.com" },
            { Icon: Linkedin, href: "https://linkedin.com" },
            { Icon: Mail, href: "mailto:devendraambalkar11@gmail.com" },
          ].map(({ Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="glass rounded-full p-3 transition-all hover:scale-110 hover:text-foreground hover:glow-soft">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Section helpers ---------- */
function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
      className="mb-16 max-w-3xl"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <Sparkles className="h-3 w-3 text-[var(--cyan)]" /> {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ---------- About ---------- */
export function About() {
  const stats = [
    { value: "2+", label: "Years building" },
    { value: "10+", label: "Projects shipped" },
    { value: "3", label: "Certifications" },
    { value: "2", label: "Hackathon finals" },
  ];
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading eyebrow="About" title="Engineer by craft, product-thinker by instinct." />
      <div className="grid gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="lg:col-span-3 space-y-6 text-lg leading-relaxed text-muted-foreground"
        >
          <p>
            I'm a <span className="text-foreground">MERN full-stack developer</span> from Wardha, India,
            obsessed with the moment an interface clicks — when a complex backend disappears behind
            an experience that feels effortless.
          </p>
          <p>
            I've owned applications end-to-end: scaffolding React component systems, designing
            REST API contracts, modeling MongoDB schemas, hardening auth with JWT and RBAC, and
            shipping with structured Git workflows. I care about <span className="text-foreground">type safety,
            accessibility, and pixel-tight visual systems</span> as much as I care about clean route handlers.
          </p>
          <p>
            Currently finishing my B.Tech in Computer Engineering, AWS- and IBM-certified, and a
            Smart India Hackathon 2024 Grand Finalist. Looking for a team that ships fast and treats
            the craft seriously.
          </p>
        </motion.div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:glow-soft"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-[var(--violet)]/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="font-display text-4xl font-semibold text-gradient">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience / Timeline ---------- */
const EXPERIENCE = [
  {
    when: "Aug — Oct 2025",
    title: "Founding Engineer · The System Store",
    kind: "Personal Build · MERN Stack",
    body: "Shipped a production-grade e-commerce platform end-to-end: catalogue, cart, orders, JWT auth with RBAC, and an admin surface. Designed normalized Mongoose schemas with embedded sub-docs and indexed reads for sub-100ms queries.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
  },
  {
    when: "Jan — Apr 2025",
    title: "Full-Stack Developer · Event Management System",
    kind: "Academic · React + Java",
    body: "Built a React frontend for event scheduling and registration over a Java/JDBC/MySQL backend. Applied MVC separation that mirrors Express controller/route/model patterns, with validation and reactive UI state.",
    stack: ["React", "Java", "MySQL", "JDBC", "Spring", "MVC"],
  },
  {
    when: "2024",
    title: "SIH 2024 Grand Finalist",
    kind: "National Hackathon · Cybersecurity",
    body: "Selected as a national finalist for software / cybersecurity innovation among thousands of teams — built and pitched a working prototype under 36 hours.",
    stack: ["Node.js", "Security", "Rapid prototyping"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="Experience"
        title="A timeline of things I've shipped."
        sub="From hackathon prototypes to production-grade full-stack platforms."
      />
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[var(--primary)]/40 to-transparent md:left-1/2" />
        <div className="space-y-12">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.05 }}
              className={`relative grid gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative md:px-12">
                <div className="absolute left-4 top-6 -translate-x-1/2 md:left-0 md:translate-x-0">
                  <div className="relative h-3 w-3 rounded-full bg-[var(--cyan)] glow-primary">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[var(--cyan)]/60" />
                  </div>
                </div>
                <div className="ml-10 md:ml-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--cyan)]">{e.when}</div>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{e.title}</h3>
                  <div className="mt-1 text-sm text-muted-foreground">{e.kind}</div>
                </div>
              </div>
              <div className="glass ml-10 rounded-2xl p-6 md:ml-0">
                <p className="text-muted-foreground">{e.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    name: "The System Store",
    tag: "MERN · Production",
    blurb: "Full-stack e-commerce: catalogue, cart, orders, JWT-secured admin & customer roles.",
    metrics: [
      { k: "100%", v: "End-to-end ownership" },
      { k: "JWT + RBAC", v: "Auth model" },
      { k: "Mongoose", v: "Indexed schemas" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    accent: "from-[var(--cyan)] to-[var(--primary)]",
    href: "https://github.com",
  },
  {
    name: "Event Management System",
    tag: "React · Java · MySQL",
    blurb: "React UI on a Java/JDBC backend for event creation, scheduling, registration & cancellation.",
    metrics: [
      { k: "MVC", v: "Architecture" },
      { k: "JDBC", v: "Data layer" },
      { k: "Reactive", v: "UI state" },
    ],
    stack: ["React", "Java", "MySQL", "Spring"],
    accent: "from-[var(--violet)] to-[var(--magenta)]",
    href: "https://github.com",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects that taught me how to ship."
        sub="Each one was built end-to-end — design, API, data, deploy."
      />
      <div className="space-y-8">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.name} href={p.href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: i * 0.05 }}
            className="group relative block overflow-hidden rounded-[2rem] glass-strong p-1 transition-all hover:glow-primary"
          >
            <div className="relative grid gap-8 rounded-[1.85rem] bg-card/40 p-8 md:grid-cols-5 md:p-12">
              <div className="md:col-span-3">
                <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${p.accent} bg-clip-text text-xs font-medium uppercase tracking-[0.2em] text-transparent`}>
                  <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" /> {p.tag}
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">{p.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">{s}</span>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--cyan)]">
                  View case study
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 gap-3">
                {p.metrics.map((m) => (
                  <div key={m.v} className="glass rounded-2xl p-5">
                    <div className="font-display text-2xl font-semibold text-gradient-aurora">{m.k}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
              {/* spotlight */}
              <div className={`pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br ${p.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILLS = [
  { Icon: Code2, label: "Frontend", items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "React Router", "Component Architecture", "State Management", "HTML5 / CSS3"] },
  { Icon: Server, label: "Backend & APIs", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "Middleware Design", "MVC Architecture"] },
  { Icon: Database, label: "Databases", items: ["MongoDB", "Mongoose ODM", "Schema Design", "MySQL", "JDBC"] },
  { Icon: Cloud, label: "Cloud & DevOps", items: ["AWS", "Linux", "Docker (basics)", "Git / GitHub", "Postman", "npm"] },
  { Icon: Shield, label: "Security", items: ["Secure Coding", "JWT", "RBAC", "SOC Fundamentals"] },
  { Icon: Sparkles, label: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "Shell"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading
        eyebrow="Capabilities"
        title="A full-stack toolkit, sharpened on real builds."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:glow-soft"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--violet)]/20 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--violet)]/20 text-[var(--cyan)]">
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{s.label}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span key={it} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Achievements ---------- */
const ACHIEVEMENTS = [
  { Icon: Trophy, t: "SIH 2024 Grand Finalist", s: "Smart India Hackathon — software / cybersecurity track" },
  { Icon: Trophy, t: "IISF 2024 S&T Finalist", s: "Science & Technology hackathon recognition" },
  { Icon: Award, t: "AWS Cloud Developing", s: "AWS Academy Graduate · cloud-native development" },
  { Icon: Award, t: "AWS Cloud Foundations", s: "AWS Academy Graduate · core services & architecture" },
  { Icon: Shield, t: "SOC in Practice", s: "IBM SkillsBuild · hands-on SOC operations" },
  { Icon: Sparkles, t: "B.Tech Computer Engineering", s: "Bajaj Institute of Technology · Expected Nov 2026" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionHeading eyebrow="Recognition" title="Certifications & awards." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.t}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:glow-soft"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/15 to-[var(--violet)]/15 text-[var(--cyan)]">
                <a.Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold leading-tight">{a.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.s}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-20">
        <div className="absolute inset-0 aurora-bg animate-aurora opacity-60" />
        <div className="absolute inset-0 mesh-grid opacity-50" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to opportunities
            </div>
            <h2 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Let's build something <span className="text-gradient-aurora">worth shipping</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm available for full-time roles, contract work, and meaningful side
              collaborations. The fastest way to reach me is email.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { Icon: Mail, l: "Email", v: "devendraambalkar11@gmail.com", h: "mailto:devendraambalkar11@gmail.com" },
              { Icon: Phone, l: "Phone", v: "+91 72496 40336", h: "tel:+917249640336" },
              { Icon: Linkedin, l: "LinkedIn", v: "in/devendra-ambalkar", h: "https://linkedin.com" },
              { Icon: Github, l: "GitHub", v: "@devendra-ambalkar", h: "https://github.com" },
            ].map((c) => (
              <a key={c.l} href={c.h} target="_blank" rel="noreferrer"
                className="group glass flex items-center justify-between rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:glow-soft">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--violet)]/20 text-[var(--cyan)]">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{c.l}</div>
                    <div className="mt-0.5 font-medium">{c.v}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> Wardha, Maharashtra, India · open to remote
          </div>
        </div>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-muted-foreground md:flex-row">
        <div>© 2026 Devendra Ambalkar · Crafted with obsession</div>
        <div className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <a href="#top" className="hover:text-foreground">Back to top</a>
        </div>
      </footer>
    </section>
  );
}
