import React, { useState, useEffect } from 'react';
import { 
  Code2, Users, Trophy, Lightbulb, Menu, X, 
  ChevronRight, Star, Github, Linkedin, Twitter,
  Mail, Phone, MapPin, Instagram, MessageSquare,
} from 'lucide-react';

const RollingNumber = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const finalValue = parseInt(target.replace(/[^0-9]/g, ''));
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

  const suffix = target.replace(/[0-9]/g, '');
  return <span>{count}{suffix}</span>;
};

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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const team = [
    { name: "Alex Kurnia", role: "Senior Fullstack Dev", img: "https://i.pravatar.cc/150?u=alex" },
    { name: "Sarah Utami", role: "UI/UX Designer", img: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Budi Rehan", role: "Cloud Engineer", img: "https://i.pravatar.cc/150?u=budi" },
  ];

  const testimonials = [
    { name: "Rizky Fauzi", job: "Junior Web Dev di TechID", text: "Materi React-nya sangat mendalam. Dalam 3 bulan saya berhasil dapat kerja!" },
    { name: "Amanda Putri", job: "Mahasiswa IT", text: "Komunitasnya sangat membantu. Mentor selalu standby kalau kita stuck di error." },
    { name: "Doni Setiawan", job: "Freelancer", text: "Belajar Tailwind di sini bikin workflow kerja saya jadi 2x lebih cepat." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-poppins selection:bg-cyan-500/30 scroll-smooth">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-cyan-500 p-2 rounded-xl group-hover:rotate-[360deg] transition-transform duration-700">
              <Code2 className="text-zinc-950 w-6 h-6" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight uppercase">NAMA<span className="text-cyan-400">WEB</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Kursus', 'Tim', 'Testimoni'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold hover:text-cyan-400 transition-all hover:tracking-widest uppercase tracking-widest text-zinc-500">
                {item}
              </a>
            ))}
            <button className="bg-white text-zinc-950 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95">
              Masuk
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className={`pt-48 pb-20 px-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            <TypingEffect text="Membangun Karir" /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Developer Masa Depan.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto animate-pulse">
            Kami bukan sekadar platform belajar. Kami adalah ekosistem yang dirancang untuk mengubah pemula menjadi engineer kelas dunia.
          </p>
        </div>
      </section>

      {/* --- STATS SECTION (ROLLING NUMBERS) --- */}
      <section className="py-20 px-6 border-y border-white/5 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Siswa Aktif', value: '150K+' },
            { label: 'Mentor Expert', value: '200+' },
            { label: 'Alumni Kerja', value: '85%' },
            { label: 'Rating Global', value: '5' },
          ].map((stat, i) => (
            <div key={i} className="text-center group border-r border-white/5 last:border-0">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                <RollingNumber target={stat.value} />
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section id="kursus" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Lightbulb className="w-8 h-8 text-cyan-400" />, title: 'Kurikulum Update', desc: 'Materi diperbarui setiap bulan mengikuti tren teknologi terbaru.' },
              { icon: <Users className="w-8 h-8 text-purple-400" />, title: 'Komunitas Inklusif', desc: 'Dapatkan dukungan dari ribuan member dan sesi tanya jawab mentor.' },
              { icon: <Trophy className="w-8 h-8 text-yellow-400" />, title: 'Sertifikat Diakui', desc: 'Sertifikat kelulusan diakui oleh 500+ perusahaan teknologi mitra.' },
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/50 transition-all hover:-translate-y-3 hover:bg-zinc-900/80">
                <div className="mb-6 p-4 bg-zinc-950 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TIM KAMI --- */}
      <section id="tim" className="py-24 px-6 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Instruktur Expert</h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-zinc-950 border border-white/5 text-center transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="relative inline-block">
                    <img src={member.img} alt={member.name} className="w-24 h-24 rounded-2xl mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity scale-110"></div>
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-cyan-500 text-sm mb-6">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <Github className="w-5 h-5 text-zinc-600 hover:text-white hover:scale-125 transition-transform cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-zinc-600 hover:text-cyan-400 hover:scale-125 transition-transform cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONI --- */}
      <section id="testimoni" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <div key={i} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60 transition-colors">
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-zinc-300 italic mb-8 leading-relaxed">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-zinc-950 text-xs">
                    {testi.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{testi.name}</h4>
                    <p className="text-zinc-500 text-xs">{testi.job}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-12 md:p-20 text-center relative overflow-hidden group">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-6 relative z-10 group-hover:scale-105 transition-transform">Siap Menjadi Developer Pro?</h2>
          <button className="px-10 py-4 bg-zinc-950 text-white rounded-2xl font-bold shadow-2xl hover:bg-zinc-900 transition-all active:scale-95 relative z-10">
            Daftar Sekarang
          </button>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/30 transition-all"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-cyan-500 p-2 rounded-xl"><Code2 className="text-zinc-950 w-5 h-5" /></div>
                <span className="text-white font-bold text-xl uppercase tracking-tighter">NAMA WEB</span>
              </div>
              <p className="text-sm text-zinc-500">Platform belajar coding terbaik untuk karir impian Anda.</p>
              <div className="flex gap-4">
                {[Github, Twitter, Instagram, MessageSquare].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-500 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            {/* --- FOOTER --- */}
            <div>
              <h4 className="text-white font-bold mb-6">Navigasi</h4>
              <ul className="space-y-4 text-sm">
                {['Home', 'Kursus', 'Tentang Kami', 'Karir'].map(item => (
                  <li key={item}><a href="#" className="hover:text-cyan-400 hover:pl-2 transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Bantuan</h4>
              <ul className="space-y-4 text-sm">
                {['FAQ', 'Syarat & Ketentuan', 'Privasi'].map(item => (
                  <li key={item}><a href="#" className="hover:text-cyan-400 hover:pl-2 transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <div className="relative">
                <input type="email" placeholder="Email Anda" className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-cyan-500 outline-none transition-all" />
                <button className="absolute right-2 top-2 bg-cyan-500 text-zinc-950 p-1.5 rounded-lg hover:scale-110 transition-transform"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-zinc-600 font-bold tracking-widest uppercase">
            <p>© 2026 NAMA WEB. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;