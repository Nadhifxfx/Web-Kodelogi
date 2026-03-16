import { ChevronRight, Github, Instagram, MessageSquare, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const NAV_LINKS: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Learning Path", path: "/learning-path" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
]

const HELP_LINKS = ["FAQ", "Terms & Conditions", "Privacy"]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/60">
      <div className="container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-full border border-primary/22 bg-primary/14 text-primary inline-flex items-center justify-center transition-all group-hover:glow-primary">
                <img
                  src="/Logo%20Kodelogi.png"
                  alt="Kodelogi"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="font-semibold text-base tracking-tight text-foreground">Kodelogi</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The best platform to learn coding for your dream career.
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
            <div className="text-sm font-semibold text-foreground">Navigation</div>
            <div className="mt-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Help</div>
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
                  placeholder="Your email"
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
          © {new Date().getFullYear()} KODELOGI. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
