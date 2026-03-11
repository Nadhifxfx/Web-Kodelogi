import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import {
  BadgeCheck,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Globe,
  Rocket,
  Route,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react"
import DeveloperProfileCard from "@/components/Team"
import { useNavigate } from "react-router-dom"

type RollingNumberProps = {
  target: string
  duration?: number
}

function RollingNumber({ target, duration = 2000 }: RollingNumberProps) {
  const [value, setValue] = useState(0)

  const parsed = useMemo(() => {
    const trimmed = String(target ?? "").trim()
    const match = trimmed.match(/^-?\d+(?:[.,]\d+)?/)
    if (!match) {
      return { finalValue: NaN, suffix: trimmed, decimals: 0 }
    }

    const numericRaw = match[0]
    const suffix = trimmed.slice(numericRaw.length)
    const normalized = numericRaw.replace(",", ".")
    const decimals = normalized.includes(".") ? normalized.split(".")[1]?.length ?? 0 : 0
    const finalValue = Number.parseFloat(normalized)

    return { finalValue, suffix, decimals }
  }, [target])

  useEffect(() => {
    if (!Number.isFinite(parsed.finalValue)) return

    let startTimestamp: number | null = null
    let rafId = 0

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setValue(progress * parsed.finalValue)
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step)
      }
    }

    rafId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(rafId)
  }, [duration, parsed.finalValue])

  if (!Number.isFinite(parsed.finalValue)) {
    return <span>{target}</span>
  }

  const formatted =
    parsed.decimals > 0 ? value.toFixed(parsed.decimals) : Math.floor(value).toString()

  return (
    <span>
      {formatted}
      {parsed.suffix}
    </span>
  )
}

type Course = {
  title: string
  description: string
  ctaLabel: string
  icon: LucideIcon
}

type TrackTone = {
  card: string
  iconWrap: string
  link: string
}

type Track = {
  key: string
  title: string
  description: string
  icon: LucideIcon
  tone: TrackTone
  items: string[]
}

function slugifyCourseTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function courseImageUrlFor(title: string) {
  const slug = slugifyCourseTitle(title)
  return `/assets/courses/${slug}.png`
}

const TRACKS: Track[] = [
  {
    key: "frontend",
    title: "Front-End Developer",
    description: "Bangun UI modern yang responsif, accessible, dan rapi.",
    icon: Code2,
    tone: {
      card: "border-accent/16 bg-card/35",
      iconWrap: "bg-primary/14 text-primary border-primary/22",
      link: "text-primary",
    },
    items: ["HTML • CSS • JavaScript", "React + TypeScript", "UI System + Accessibility"],
  },
  {
    key: "backend",
    title: "Back-End Developer",
    description: "Rancang API, database, dan sistem yang scalable.",
    icon: Boxes,
    tone: {
      card: "border-accent/16 bg-card/35",
      iconWrap: "bg-primary/14 text-primary border-primary/22",
      link: "text-primary",
    },
    items: ["REST API + Auth", "SQL + Database Design", "Deployment + Monitoring"],
  },
  {
    key: "mobile",
    title: "Mobile Developer",
    description: "Bikin aplikasi mobile yang smooth dan siap publish.",
    icon: Rocket,
    tone: {
      card: "border-accent/16 bg-card/35",
      iconWrap: "bg-primary/14 text-primary border-primary/22",
      link: "text-primary",
    },
    items: ["UI Mobile Patterns", "State + Data Fetching", "Build & Release"],
  },
]

const COURSES: Course[] = TRACKS.map((track) => ({
  title: `${track.title} Track`,
  description: track.description,
  ctaLabel: "Lihat Materi",
  icon: track.icon,
}))

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const HOME_SECTION_HEADING = "text-2xl md:text-3xl font-semibold tracking-tight"
const HOME_SECTION_LEAD = "mt-3 text-sm md:text-base text-muted-foreground leading-relaxed"

const SHOWCASES = [
  {
    title: "Gojek",
    tag: "App",
    desc: "UI modern dengan layout rapi dan kontras yang clean.",
    imageSrc: "/gojek.jpg",
    accent: "from-primary/18 via-background/10 to-accent/16",
    stack: ["/Icon/html.png", "/Icon/css.png", "/Icon/javascript.png"],
  },
  {
    title: "Vidio",
    tag: "Website",
    desc: "Hero + card layout futuristik dengan glow yang subtle.",
    imageSrc: "/Gradient.png",
    accent: "from-accent/18 via-background/10 to-primary/16",
    stack: ["/Icon/react.png", "/Icon/tailwind.png", "/Icon/typescript.png"],
  },
  {
    title: "Space for the Unbound",
    tag: "Game",
    desc: "Komponen tabel & statistik yang fokus ke readability.",
    imageSrc: "/space for the unbond.jpeg",
    accent: "from-primary/16 via-background/10 to-primary/6",
    stack: ["/Icon/javascript.png", "/Icon/react.png"],
  },
  {
    title: "Tokopedia",
    tag: "Concept",
    desc: "Design system mini untuk layout mobile.",
    imageSrc: "/Tokopedia.png",
    accent: "from-accent/14 via-background/10 to-accent/6",
    stack: ["/Icon/react.png", "/Icon/tailwind.png", "/Icon/typescript.png"],
  },
  {
    title: "Coffe Talk",
    tag: "Game",
    desc: "Struktur konten + navigasi yang mudah dipakai.",
    imageSrc: "/Coffe talk.webp",
    accent: "from-primary/14 via-background/10 to-accent/10",
    stack: ["/Icon/javascript.png", "/Icon/html.png", "/Icon/css.png"],
  },
  {
    title: "Creative",
    tag: "Experiment",
    desc: "Eksperimen visual dengan gradient + depth.",
    imageSrc: "/space for the unbond.jpeg",
    accent: "from-accent/16 via-background/10 to-primary/10",
    stack: ["/Icon/react.png", "/Icon/javascript.png"],
  },
] as const

export default function Home() {
  const navigate = useNavigate()
  const [showcaseIndex, setShowcaseIndex] = useState(0)
  const [showcaseDirection, setShowcaseDirection] = useState<1 | -1>(1)

  const showcaseTotal = Math.max(1, SHOWCASES.length)
  const currentShowcase = SHOWCASES[showcaseIndex % showcaseTotal]

  const handleShowcasePrev = () => {
    setShowcaseDirection(-1)
    setShowcaseIndex((idx) => (idx - 1 + showcaseTotal) % showcaseTotal)
  }

  const handleShowcaseNext = () => {
    setShowcaseDirection(1)
    setShowcaseIndex((idx) => (idx + 1) % showcaseTotal)
  }

  return (
    <main>
      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        {/* Backdrop (public asset + safe overlays) */}
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-grid-soft opacity-[0.10]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/70 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,hsl(var(--primary)/0.22),transparent_62%)] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,hsl(var(--accent)/0.16),transparent_60%)] opacity-70" />

          {/* Decorative orbs (inspired by palette) */}
          <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full blur-2xl opacity-60 bg-[radial-gradient(circle_at_35%_35%,hsl(var(--accent)/0.55),hsl(var(--primary)/0.25)_38%,transparent_70%)]" />
          <div className="absolute -left-40 -bottom-44 h-[560px] w-[560px] rounded-full blur-3xl opacity-35 bg-[radial-gradient(circle_at_40%_40%,hsl(var(--primary)/0.45),hsl(var(--accent)/0.18)_42%,transparent_72%)]" />
        </div>

        <div className="container px-6 relative z-10 min-h-[calc(100vh-4rem)] py-14 md:py-20 flex items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
                Dari Nol Jadi <span className="text-gradient">Developer</span>
              </h1>

              <p className="mt-5 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Kodelagi adalah ruang belajar digital yang menggabungkan teori dan praktik pemrograman secara terstruktur untuk membangun pola pikir logis dan inovatif
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/content")}
                  className="relative inline-flex w-full sm:w-auto max-w-sm sm:max-w-none mx-auto items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold transition-all hover:glow-primary hover:scale-[1.02]"
                >
                  <span className="absolute -inset-0.5 rounded-full bg-primary/25 blur-xl opacity-60 animate-pulse-glow" />
                  <span className="relative inline-flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Get Started Free
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="mt-10 sm:mt-12 md:mt-14 rounded-3xl border border-accent/16 bg-black/35 backdrop-blur-md px-6 py-7 shadow-[0_30px_120px_-95px_hsl(var(--primary)/0.9)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
                  {[
                    { value: "450K+", label: "Happy Customer" },
                    { value: "20.5k+", label: "Complete Project" },
                    { value: "150+", label: "Team Members" },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className={
                        "text-center lg:px-8 " +
                        (idx === 1 ? "lg:border-x lg:border-border/60" : "")
                      }
                    >
                      <div className="text-4xl md:text-4xl font-semibold tracking-tight text-foreground">
                        <RollingNumber target={item.value} />
                      </div>
                      <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT: LEARNING PATH + COURSES */}
      <section id="content" className="py-20 md:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/30 px-4 py-1.5 text-xs tracking-widest uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              What we do?
            </div>

            <h2 className={"mt-5 " + HOME_SECTION_HEADING}>
              Learning <span className="text-gradient">Path</span>
            </h2>

            <p className={HOME_SECTION_LEAD + " max-w-2xl"}>
              Roadmap bertingkat untuk dari nol sampai siap bikin project nyata — rapi, terstruktur, dan fokus ke skill yang relevan.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track, index) => {
              const Icon = track.icon

              return (
                <motion.div
                  key={track.key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * index }}
                  className={
                    "group relative overflow-hidden rounded-3xl border backdrop-blur-sm p-7 transition-all hover:scale-[1.01] hover:shadow-[0_24px_80px_-60px_hsl(var(--primary)/0.75)] " +
                    track.tone.card
                  }
                >
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/20 to-background/0" />
                    <div className="absolute -top-20 -right-24 h-48 w-48 rounded-full bg-background/30 blur-2xl" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={
                          "inline-flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_24px_80px_-70px_hsl(var(--primary)/0.9)] " +
                          track.tone.iconWrap
                        }
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Learning Path
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-tight">{track.title}</h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{track.description}</p>

                    <ul className="mt-4 space-y-2">
                      {track.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                          <BadgeCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => navigate("/content")}
                      className={
                        "mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-foreground " +
                        track.tone.link
                      }
                    >
                      Learn more <span aria-hidden>→</span>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h3 className={HOME_SECTION_HEADING}>
                  Courses by <span className="text-gradient">Track</span>
                </h3>
                <p className={HOME_SECTION_LEAD}>Pilih track dan mulai belajar dari kurikulum yang relevan.</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((course, idx) => (
                <motion.div
                  key={course.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.04 * idx }}
                  className="group relative overflow-hidden rounded-3xl border border-accent/16 bg-card/30 backdrop-blur-sm min-h-[520px] transition-all hover:scale-[1.01] hover:border-accent/26 hover:shadow-[0_30px_120px_-95px_hsl(var(--primary)/0.9)]"
                >
                  {(() => {
                    const imageSrc = courseImageUrlFor(course.title)
                    return (
                      <>
                        {/* Background */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-accent/10 to-black/30" />
                          <div
                            className="absolute inset-0 bg-cover bg-center scale-110 opacity-60"
                            style={{ backgroundImage: `url(${imageSrc})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/85" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-80" />
                        </div>

                        {/* Foreground content */}
                        <div className="relative flex flex-col h-full">
                          <div className="px-8 pt-10 pb-6 flex items-start justify-center">
                            <div className="relative w-[240px] max-w-[75%] h-[220px]">
                              <div className="absolute inset-0 rounded-3xl border border-border/60 bg-background/10 backdrop-blur-sm flex items-center justify-center">
                                {(() => {
                                  const Icon = course.icon
                                  return <Icon className="w-8 h-8 text-primary" />
                                })()}
                              </div>
                              <img
                                src={imageSrc}
                                alt={course.title}
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.classList.add("hidden")
                                }}
                                className="relative w-full h-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                              />
                            </div>
                          </div>

                          <div className="mt-auto px-8 pb-8">
                            <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                              {course.title}
                            </div>
                            <p className="mt-3 text-sm md:text-base text-foreground/80 leading-relaxed max-w-sm">
                              {course.description}
                            </p>

                            <button
                              type="button"
                              onClick={() => navigate("/content")}
                              className="mt-7 inline-flex items-center justify-center rounded-xl border border-border/60 bg-background/10 px-6 py-3 text-sm font-semibold text-foreground/90 transition-all hover:border-primary/30 hover:text-primary hover:glow-primary"
                            >
                              {course.ctaLabel}
                            </button>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h3 className={HOME_SECTION_HEADING}>
                  Challenge by <span className="text-gradient">Track</span>
                </h3>
                <p className={HOME_SECTION_LEAD}>
                  Pilih bidang kerja dan mulai challenge yang sesuai fokus skill.
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card/30 backdrop-blur-sm">
              <div className="divide-y divide-border/60">
                {TRACKS.map((track) => {
                  const Icon = track.icon

                  return (
                    <button
                      key={track.key}
                      type="button"
                      onClick={() => navigate("/content")}
                      className="w-full text-left px-6 py-5 flex items-start gap-4 transition-colors hover:bg-background/10"
                    >
                      <div
                        className={
                          "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border " +
                          track.tone.iconWrap
                        }
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-semibold tracking-tight">{track.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{track.description}</div>
                      </div>

                      <div className={"pt-0.5 text-xs font-semibold tracking-widest uppercase " + track.tone.link}>
                        Start →
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h2 className={HOME_SECTION_HEADING}>
              Why Choose <span className="text-gradient">This Platform</span>
            </h2>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Structured Learning Path",
                desc: "Skill tree yang jelas dari fundamental sampai advanced.",
                icon: Route,
              },
              {
                title: "Project-Based Approach",
                desc: "Belajar lewat praktik dan mini-project yang relevan.",
                icon: Boxes,
              },
              {
                title: "Beginner Friendly",
                desc: "Materi tersusun rapi, step-by-step, tanpa bikin overwhelmed.",
                icon: GraduationCap,
              },
              {
                title: "Industry Relevant Skills",
                desc: "Topik yang dipakai di workflow modern developer.",
                icon: BadgeCheck,
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.04 * idx }}
                  className="rounded-2xl border border-accent/16 bg-card/35 backdrop-blur-sm p-6 transition-all hover:border-primary/22 hover:shadow-[0_26px_90px_-70px_hsl(var(--primary)/0.85)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl border border-primary/18 bg-gradient-to-b from-primary/18 to-black/20 flex items-center justify-center shadow-[0_0_40px_-10px_hsl(var(--primary)/0.55)]">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-tight">{item.title}</div>
                      <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Showcase */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-20"
          >
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div className="max-w-2xl">
                <h3 className={HOME_SECTION_HEADING}>
                  Project <span className="text-gradient">Showcase</span>
                </h3>
                <p className={HOME_SECTION_LEAD}>
                  Contoh hasil karya dan eksperimen UI dari track yang dipelajari.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShowcasePrev}
                  aria-label="Slide sebelumnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform hover:scale-[1.04]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleShowcaseNext}
                  aria-label="Slide selanjutnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform hover:scale-[1.04]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-10 overflow-hidden">
              <AnimatePresence initial={false} mode="wait" custom={showcaseDirection}>
                <motion.div
                  key={showcaseIndex}
                  custom={showcaseDirection}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={{
                    enter: (direction: 1 | -1) => ({
                      opacity: 0,
                      x: direction === 1 ? 64 : -64,
                    }),
                    center: { opacity: 1, x: 0 },
                    exit: (direction: 1 | -1) => ({
                      opacity: 0,
                      x: direction === 1 ? -64 : 64,
                    }),
                  }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className={
                    "grid items-center gap-8 lg:gap-12 lg:grid-cols-12 " +
                    (showcaseIndex % 2 === 0 ? "" : "")
                  }
                >
                  {/* Text (editor-style card) */}
                  <div
                    className={
                      "lg:col-span-5 " +
                      (showcaseIndex % 2 === 0 ? "lg:order-1" : "lg:order-2")
                    }
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-black/30 backdrop-blur-sm shadow-[0_30px_120px_-90px_hsl(var(--primary)/0.9)]">
                      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                          <span className="h-2.5 w-2.5 rounded-full bg-accent/55" />
                        </div>
                        <div className="text-[11px] text-muted-foreground tracking-widest uppercase">
                          Featured Project
                        </div>
                      </div>

                      <div className="px-6 py-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/10 px-3 py-1.5 text-[11px] tracking-widest uppercase text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                          {currentShowcase.tag}
                        </div>

                        <div className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                          {currentShowcase.title}
                        </div>

                        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                          {currentShowcase.desc}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                          {currentShowcase.stack.map((src) => {
                            const name = src.split("/").pop()?.replace(/\.(png|webp|jpg|jpeg)$/i, "") ?? "tech"
                            return (
                              <span
                                key={src}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/10"
                              >
                                <img src={src} alt={name} loading="lazy" className="h-6 w-6 object-contain" />
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview (editor-style frame, smaller image) */}
                  <div
                    className={
                      "lg:col-span-7 flex " +
                      (showcaseIndex % 2 === 0 ? "lg:justify-end lg:order-2" : "lg:justify-start lg:order-1")
                    }
                  >
                    <div className="w-full max-w-[780px]">
                      <div className="overflow-hidden rounded-3xl border border-border/60 bg-black/30 backdrop-blur-sm shadow-[0_40px_140px_-110px_hsl(var(--accent)/0.9)]">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                            <span className="h-2.5 w-2.5 rounded-full bg-accent/55" />
                          </div>
                          <div className="text-[11px] text-muted-foreground">Preview</div>
                        </div>

                        <div className="p-5">
                          <div className="mx-auto w-full max-w-[700px]">
                            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-background/10">
                              <img
                                src={currentShowcase.imageSrc}
                                alt={`${currentShowcase.title} preview`}
                                width={1920}
                                height={1080}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-20"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className={HOME_SECTION_HEADING}>
                Meet our <span className="text-gradient">Teams</span>
              </h3>
              <p className={HOME_SECTION_LEAD}>Built by developers, for future developers.</p>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Isma",
                  role: "Frontend Engineer",
                  handle: "Ismawati Ainol Robbi",
                  imageUrl: "/team/isma.jpg",
                },
                {
                  name: "Nadhif",
                  role: "Backend & System Architect",
                  handle: "Nadhif Fathur Rahman",
                  imageUrl: "/team/Nadhif.png",
                },
                {
                  name: "Fahmi",
                  role: "Programming Mentor",
                  handle: "Fahmi Basyarahil Zawawi",
                  imageUrl: "/team/fahmi.png",
                },
              ].map((member, idx) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 * idx }}
                >
                  <DeveloperProfileCard
                    name={member.name}
                    role={member.role}
                    handle={member.handle}
                    imageUrl={member.imageUrl}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl border border-accent/16 bg-gradient-to-r from-primary/18 via-background/10 to-accent/18 p-8 md:p-12 shadow-[0_40px_140px_-110px_hsl(var(--primary)/0.9)]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className={HOME_SECTION_HEADING}>
                  Ready to Start Your <span className="text-gradient">Developer Journey?</span>
                </h3>
                <p className={HOME_SECTION_LEAD}>
                  Mulai dari roadmap yang jelas, belajar lewat praktik, dan naik level secara bertahap.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/content")}
                className="relative inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground px-7 py-4 font-semibold transition-all hover:glow-primary hover:scale-[1.02]"
              >
                <span className="absolute -inset-0.5 rounded-2xl bg-primary/25 blur-xl opacity-60 animate-pulse-glow" />
                <span className="relative inline-flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Start Learning
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
    </main>
  )
}
