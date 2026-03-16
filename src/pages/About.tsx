import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DeveloperProfileCard from "@/components/Team";
import { Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

/* --- ROLLING NUMBER --- */
const RollingNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const finalValue = parseInt(target.replace(/[^0-9]/g, ""));
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setCount(Math.floor(progress * finalValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  const suffix = target.replace(/[0-9]/g, "");

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

/* --- APP --- */
const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth">
      {/* HERO */}
      <section
        id="home"
        className={`pt-14 md:pt-20 pb-20 px-6 transition-all duration-1000 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6 leading-[1.05]">
            Membangun Karir <br />
            <span className="text-gradient">Developer Masa Depan.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Kami bukan sekadar platform belajar. Kami adalah platform yang membantu pemula memahami dasar pemrograman melalui materi ringkas, contoh kode, dan kuis interaktif untuk mempersiapkan karier sebagai developer.
          </p>
        </div>
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Apa yang Kami Tawarkan",
              desc: "Materi pembelajaran yang fokus pada konsep inti pemrograman seperti HTML, CSS, JavaScript, Python, dan algoritma dasar.",
            },
            {
              title: "Tujuan Platform",
              desc: "Membantu pemula memahami dasar coding dengan cara yang lebih sederhana, praktis, dan mudah dipahami tanpa harus membaca materi yang terlalu panjang.",
            },
            {
              title: "Metode Belajar",
              desc: "Setiap topik dilengkapi dengan penjelasan singkat, contoh kode, serta kuis interaktif untuk membantu pengguna memahami materi secara lebih efektif.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group h-full"
            >
              <div className="h-full flex flex-col items-center">
                <div
                  className="h-16 w-16 rounded-full border border-primary/30 bg-primary text-primary-foreground flex items-center justify-center shadow-none group-hover:glow-primary"
                  aria-hidden
                >
                  <Check className="h-7 w-7" />
                </div>

                <div className="relative mt-6 w-full flex-1 overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm px-8 pb-10 pt-10 text-center transition-all duration-300 group-hover:glow-primary group-hover:border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/10" aria-hidden />

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Meet our <span className="text-gradient">Teams</span>
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Built by developers, for future developers.
              </p>
            </div>
 
            <div className="mt-10 grid md:grid-cols-3 gap-6 object-top">
              {[
                {
                  name: "Isma",
                  role: "Frontend Engineer",
                  handle: "Ismawati Ainol Robbi",
                  imageUrl: "/team/isma.png",
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
                  imageUrl: "/team/fahmi.jpeg",
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

    </div>
  );
};

export default App;