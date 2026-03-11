import React, { useState, useEffect } from "react";
import {
  Users,
  Trophy,
  Lightbulb,
  Star,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

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

/* --- TYPING EFFECT --- */
const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;

    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;

      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

/* --- APP --- */
const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* --- TEAM DATA --- */
  const team = [
    {
      name: "Alex Kurnia",
      role: "Senior Fullstack Dev",
      img: "https://i.pravatar.cc/150?u=alex",
    },
    {
      name: "Sarah Utami",
      role: "UI/UX Designer",
      img: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Budi Rehan",
      role: "Cloud Engineer",
      img: "https://i.pravatar.cc/150?u=budi",
    },
  ];

  /* --- TESTIMONIAL DATA --- */
  const testimonials = [
    {
      name: "Rizky Fauzi",
      job: "Junior Web Dev di TechID",
      text: "Materi React-nya sangat mendalam. Dalam 3 bulan saya berhasil dapat kerja!",
    },
    {
      name: "Amanda Putri",
      job: "Mahasiswa IT",
      text: "Komunitasnya sangat membantu. Mentor selalu standby kalau kita stuck di error.",
    },
    {
      name: "Doni Setiawan",
      job: "Freelancer",
      text: "Belajar Tailwind di sini bikin workflow kerja saya jadi 2x lebih cepat.",
    },
  ];

  return (
    <div className="min-h-screen scroll-smooth">
      {/* HERO */}
      <section
        id="home"
        className={`pt-24 pb-20 px-6 transition-all duration-1000 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl font-black text-white mb-6 leading-[1.1]">
            <TypingEffect text="Membangun Karir" /> <br />
            <span className="text-gradient">Developer Masa Depan.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto animate-pulse">
          Kami bukan sekadar platform belajar. Kami adalah platform yang membantu pemula memahami dasar pemrograman melalui materi ringkas, contoh kode, dan kuis interaktif untuk mempersiapkan karier sebagai developer.
          </p>
        </div>
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-justify">
            {[
              {
                title: "Apa yang Kami Tawarkan",
                desc: "Materi pembelajaran yang fokus pada konsep inti pemrograman seperti HTML, CSS, JavaScript, Python, dan algoritma dasar.",
                color: "from-zinc-500/20 to-gray-800/20",
              },
              {
                title: "Tujuan Platform",
                desc: "Membantu pemula memahami dasar coding dengan cara yang lebih sederhana, praktis, dan mudah dipahami tanpa harus membaca materi yang terlalu panjang.",
                color: "from-zinc-500/20 to-gray-800/20",
              },
              {
                title: "Metode Belajar",
                desc: "Setiap topik dilengkapi dengan penjelasan singkat, contoh kode, serta kuis interaktif untuk membantu pengguna memahami materi secara lebih efektif.",
                color: "from-zinc-500/20 to-gray-800/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group h-full"
              >
                <div className="relative rounded-xl border border-border bg-card p-6 h-full flex flex-col transition-all duration-300 group-hover:glow-primary group-hover:border-primary/30 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl text-primary">
                      </span>

                      <h3 className="text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
    </div>
      </section>

      {/* TEAM */}
      <section id="tim" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Instruktur Expert
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="group p-8 rounded-3xl bg-zinc-950 border border-white/5 text-center transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="relative inline-block">
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-24 h-24 rounded-2xl mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />

                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity scale-110"></div>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {member.name}
                </h3>

                <p className="text-cyan-500 text-sm mb-6">
                  {member.role}
                </p>

                <div className="flex justify-center gap-4">
                  <Github
                    className="w-5 h-5 text-zinc-600 hover:text-white hover:scale-125 transition-transform cursor-pointer"
                    aria-label="Github"
                  />
                  <Linkedin
                    className="w-5 h-5 text-zinc-600 hover:text-cyan-400 hover:scale-125 transition-transform cursor-pointer"
                    aria-label="LinkedIn"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="testimoni" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Apa Kata Mereka
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Beberapa pengalaman dari pengguna yang telah belajar
              dan berkembang bersama platform kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60 transition-colors"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-zinc-300 italic mb-8 leading-relaxed">
                  "{testi.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-zinc-950 text-xs">
                    {testi.name[0]}
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {testi.name}
                    </h4>
                    <p className="text-zinc-500 text-xs">
                      {testi.job}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default App;