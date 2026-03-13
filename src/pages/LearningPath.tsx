import { motion } from "framer-motion";

type LearningPath = {
  id: string;
  title: string;
  description: string;
  icons: Array<{ src: string; alt: string }>;
  steps: string[];
};

const learningPaths: LearningPath[] = [
  {
    id: "frontend",
    title: "Front End",
    description:
      "Fokus membangun tampilan dan interaksi website yang nyaman dipakai user.",
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
  return (
    <div className="min-h-screen pt-24 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-4 leading-[1.05]">
            Learning <span className="text-gradient">Path</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Pilih jalur belajar dan ikuti urutan konsepnya. Fokus di satu jalur dulu
            sampai nyaman, lalu lanjut eksplorasi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    {path.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {path.icons.map((icon) => (
                    <img
                      key={`${path.id}-${icon.alt}`}
                      src={icon.src}
                      alt={icon.alt}
                      className="w-8 h-8 object-contain"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <ol className="space-y-2">
                {path.steps.map((step, i) => (
                  <li
                    key={`${path.id}-step-${i}`}
                    className="flex gap-3 text-sm text-foreground/90"
                  >
                    <span className="w-6 shrink-0 text-muted-foreground">
                      {i + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
