import { ChevronRight, Code2, Github, Instagram, MessageSquare, Twitter } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NAV_LINKS: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Kursus", path: "/content" },
  { label: "Tentang Kami", path: "/about" },
  { label: "Karir", path: "/contact" },
]

const HELP_LINKS = ["FAQ", "Syarat & Ketentuan", "Privasi"]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-background border-t border-border/60">
      <div className="container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/22 bg-primary/14 text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-tight text-foreground">Kodelagi</div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Platform belajar coding terbaik untuk karir impian Anda.
            </p>

            <div className="flex items-center gap-4">
              {[
                { label: "GitHub", icon: Github, href: "https://github.com" },
                { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
                { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
                { label: "Community", icon: MessageSquare, href: "#" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center justify-center h-11 w-11 rounded-xl border border-border/60 bg-card/20 text-muted-foreground transition-all hover:text-primary hover:border-primary/40 hover:glow-primary"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Navigasi</div>
            <div className="mt-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => navigate(link.path)}
                  className="block text-left text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Bantuan</div>
            <div className="mt-6 space-y-4">
              {HELP_LINKS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Newsletter</div>
            <div className="mt-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="h-12 w-full rounded-2xl border border-border/60 bg-card/30 px-5 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/45 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 inline-flex h-8 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-[1.05]"
                  aria-label="Subscribe"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border/60 pt-10 text-center text-xs text-muted-foreground tracking-widest">
          © {new Date().getFullYear()} KODELAGI. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
