import { useNavigate } from "react-router-dom"

type DeveloperProfileCardProps = {
  name: string
  role: string
  handle: string
  statusText?: string
  imageUrl: string
}

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
  return (first + last).toUpperCase()
}

export default function DeveloperProfileCard({
  name,
  role,
  handle,
  statusText = "Online",
  imageUrl,
}: DeveloperProfileCardProps) {
  const navigate = useNavigate()
  const initials = initialsFromName(name)

  return (
    <div
      className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 60%, hsl(0 0% 6%) 100%)",
        boxShadow: "0 0 0 1.5px hsl(var(--primary) / 0.30), 0 0 40px -18px hsl(var(--primary) / 0.40), inset 0 0 80px -40px hsl(var(--accent) / 0.18)",
      }}
    >
      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 60px -10px hsl(var(--primary) / 0.50)",
        }}
      />

      {/* Glow frame border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10"
        style={{
          boxShadow: "inset 0 0 0 1.5px hsl(var(--primary) / 0.35), inset 0 0 60px -30px hsl(var(--accent) / 0.22)",
        }}
      />

      {/* Side glow vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 50% 100%, hsl(var(--accent) / 0.22) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 0% 50%, hsl(var(--primary) / 0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 50%, hsl(var(--primary) / 0.14) 0%, transparent 60%)",
        }}
      />

      {/* Photo — square frame, optimised for 1080×1080 */}
      <div className="relative z-[2] px-5 pt-5 pb-0">
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none" }}
              className="absolute inset-0 w-full h-full object-cover object-[55%_30%] object-center"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))" }}
            />
          ) : (
            <div className="absolute inset-0 rounded-2xl border border-primary/30 bg-background/40 flex items-center justify-center">
              <span className="text-5xl font-bold text-foreground/20">{initials}</span>
            </div>
          )}
          {/* Bottom photo fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.97), transparent)" }}
          />
        </div>
      </div>

      {/* Bottom info */}
      <div className="relative z-[3] px-6 pb-5 pt-3">
        <div className="text-xl font-bold tracking-tight text-foreground">{name}</div>
        <div className="text-xs text-primary/80 mt-0.5 font-medium">{role}</div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground truncate">{handle}</div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">{statusText}</div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="shrink-0 rounded-xl px-4 py-1.5 text-xs font-semibold text-foreground/90 border border-accent/30 transition-all hover:scale-[1.04] hover:border-primary/50 hover:text-primary"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.18), hsl(var(--accent) / 0.12))",
              boxShadow: "0 0 20px -8px hsl(var(--primary) / 0.45)",
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  )
}
