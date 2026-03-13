import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type LearningPath = {
  id: string;
  title: string;
  description: string;
  heroImageSrc?: string;
  icons: Array<{ src: string; alt: string }>;
  steps: string[];
};

const learningPaths: LearningPath[] = [
  {
    id: "frontend",
    title: "Front End",
    description:
      "Fokus membangun tampilan dan interaksi website yang nyaman dipakai user.",
    heroImageSrc: "/Tokopedia.png",
    icons: [
      { src: "/Icon/html.png", alt: "HTML" },
      { src: "/Icon/css.png", alt: "CSS" },
      { src: "/Icon/javascript.png", alt: "JavaScript" },
      { src: "/Icon/react.png", alt: "React" },
      { src: "/Icon/tailwind.png", alt: "Tailwind CSS" },
      { src: "/Icon/typescript.png", alt: "TypeScript" },
    ],
    steps: [
      "Pahami HTML semantic + struktur halaman",
      "Kuasai CSS (layout Flexbox/Grid, responsive, accessibility dasar)",
      "Belajar JavaScript (DOM, fetch, async/await)",
      "Pelajari React (component, props/state, hooks, routing)",
      "Gunakan tooling modern (Vite, TypeScript, Tailwind) + best practice",
    ],
  },
  {
    id: "backend",
    title: "Back End",
    description:
      "Fokus membangun server, API, dan pengolahan data (database + auth).",
    heroImageSrc: "/vidio.png",
    icons: [
      { src: "/Icon/nodejs.png", alt: "Node.js" },
      { src: "/Icon/python.png", alt: "Python" },
      { src: "/Icon/php.png", alt: "PHP" },
      { src: "/Icon/mysql.png", alt: "MySQL" },
      { src: "/Icon/postgresql.svg", alt: "PostgreSQL" },
      { src: "/Icon/golang.png", alt: "Golang" },
    ],
    steps: [
      "Pilih 1 bahasa backend utama (Node.js / Python / PHP / Go)",
      "Pahami HTTP, REST API, status code, dan error handling",
      "Belajar database relasional (schema, query, join, indexing dasar)",
      "Implementasi autentikasi & otorisasi (session/JWT, role)",
      "Deploy & observability (env config, logging, basic security)",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    description:
      "Fokus membangun aplikasi Android/iOS yang performanya bagus dan rapi.",
    heroImageSrc: "/gojek.jpg",
    icons: [
      { src: "/Icon/flutter.png", alt: "Flutter" },
      { src: "/Icon/dart.png", alt: "Dart" },
      { src: "/Icon/kotlin.png", alt: "Kotlin" },
      { src: "/Icon/swift.png", alt: "Swift" },
    ],
    steps: [
      "Tentukan jalur: Cross-platform (Flutter) atau Native (Kotlin/Swift)",
      "Bangun UI + navigation + state management yang konsisten",
      "Integrasi API + storage lokal (cache, offline-first dasar)",
      "Pahami lifecycle, permission, dan performance (profiling)",
      "Rilis aplikasi (build, signing, CI sederhana, store guideline)",
    ],
  },
  {
    id: "game",
    title: "Game Developer",
    description:
      "Fokus membuat game: gameplay, physics, asset, dan optimasi runtime.",
    heroImageSrc: "/space for the unbond.jpeg",
    icons: [
      { src: "/Icon/c-sharp.png", alt: "C#" },
      { src: "/Icon/s.png", alt: "CS" },
    ],
    steps: [
      "Kuasai dasar game loop, input, dan timing (delta time)",
      "Belajar engine (Unity/Unreal/Godot) dan workflow asset",
      "Pahami physics/animation/audio + collision handling",
      "Bangun sistem gameplay (state, level, UI, saving)",
      "Optimasi (profiling, draw call, memory) dan build target",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    description:
      "Fokus belajar model prediksi dari data: training, evaluasi, dan deployment.",
    heroImageSrc: "/Coffe talk.webp",
    icons: [
      { src: "/Icon/python.png", alt: "Python" },
    ],
    steps: [
      "Kuatkan dasar matematika (aljabar linear, probabilitas, statistik dasar)",
      "Belajar Python untuk data (NumPy/Pandas) + visualisasi",
      "Pahami workflow ML (split data, training, evaluation, metrics)",
      "Gunakan model klasik (regression, tree, clustering) sebelum deep learning",
      "Deploy model sederhana (API inference) + monitoring performa",
    ],
  },
];

export default function LearningPathPage() {
  const [activeId, setActiveId] = useState<string>(learningPaths[0]?.id ?? "frontend");

  const activePath = useMemo(() => {
    return learningPaths.find((p) => p.id === activeId) ?? learningPaths[0];
  }, [activeId]);

  if (!activePath) return null;

  return (
    <main className="min-h-[calc(100vh-4rem)] pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Choose Your <span className="text-gradient">Learning Path</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Jelajahi berbagai jalur belajar pemrograman melalui ringkasan singkat dan urutan langkah.
            Pilih jalur yang paling sesuai untuk mulai belajar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
          <aside className="lg:sticky lg:top-20">
            <div className="rounded-2xl border border-sidebar-border bg-sidebar text-sidebar-foreground overflow-hidden">
              <div className="px-5 py-4 border-b border-sidebar-border">
                <h2 className="mt-1 text-lg font-semibold">Pilih Jalur</h2>
              </div>

              <div className="p-2">
                {learningPaths.map((path, index) => {
                  const isActive = path.id === activeId;
                  return (
                    <motion.button
                      key={path.id}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                      onClick={() => setActiveId(path.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`w-full text-left rounded-xl px-3 py-3 transition-colors border ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border"
                          : "bg-transparent hover:bg-sidebar-accent/60 text-sidebar-foreground/85 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 shrink-0 text-xs font-semibold tracking-[0.25em] tabular-nums ${
                            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/55"
                          }`}
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="min-w-0">
                          <p className={`font-medium ${isActive ? "text-sidebar-foreground" : "text-sidebar-foreground"}`}>
                            {path.title}
                          </p>
                          <p className="text-xs text-sidebar-foreground/65 leading-snug">
                            {path.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-black/30 backdrop-blur-sm shadow-[0_30px_120px_-90px_hsl(var(--primary)/0.9)]">
            <div className="absolute inset-0" aria-hidden>
              <div className="absolute inset-0 bg-grid-soft opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,hsl(var(--primary)/0.12),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_85%,hsl(var(--accent)/0.10),transparent_65%)]" />
            </div>

            {/* Chrome-like popup header */}
            <div className="relative z-10 border-b border-border/60 bg-black/25 backdrop-blur-sm">
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex items-center gap-2" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/55" />
                </div>

                <div className="flex-1">
                  <div className="mx-auto max-w-[520px] rounded-full border border-border/60 bg-background/10 px-4 py-1.5 text-[11px] text-muted-foreground">
                    <span className="block truncate">kodelagi.dev/learning-path</span>
                  </div>
                </div>

              </div>
            </div>

            <motion.div
              key={activePath.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 p-6 sm:p-10"
            >
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[0.95]">
                {activePath.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {activePath.description}
              </p>

              <div className="mt-6 flex items-center gap-2 flex-wrap">
                {activePath.icons.map((icon) => (
                  <div
                    key={`${activePath.id}-${icon.alt}`}
                    className="h-10 w-10 rounded-xl border border-border/60 bg-background/10 flex items-center justify-center"
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                {activePath.steps.map((step, i) => (
                  <div
                    key={`${activePath.id}-step-${i}`}
                    className="rounded-xl border border-border/60 bg-background/10 p-4"
                  >
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      Step {i + 1}
                    </p>
                    <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
