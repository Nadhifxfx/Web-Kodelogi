import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

type RouteWipeTransitionProps = {
  triggerKey: string
  label: string
  holdMs?: number
  wipeDurationMs?: number
  onWipeStart?: () => void
  onComplete?: () => void
}

export default function RouteWipeTransition({
  triggerKey,
  label,
  holdMs = 520,
  wipeDurationMs = 900,
  onWipeStart,
  onComplete,
}: RouteWipeTransitionProps) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<"hold" | "wipe">("hold")
  const [wipeStarted, setWipeStarted] = useState(false)

  const wipeDuration = Math.max(0.35, wipeDurationMs / 1000)

  const safeLabel = useMemo(() => label?.trim() || "", [label])

  useEffect(() => {
    setVisible(true)
    setPhase("hold")
    setWipeStarted(false)

    const timeoutId = window.setTimeout(() => setPhase("wipe"), Math.max(120, holdMs))
    return () => window.clearTimeout(timeoutId)
  }, [holdMs, triggerKey])

  useEffect(() => {
    if (!visible) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    if (phase !== "wipe") return
    if (wipeStarted) return

    setWipeStarted(true)
    onWipeStart?.()
  }, [onWipeStart, phase, visible, wipeStarted])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[90]" aria-label="Page transition" role="status">
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ clipPath: "ellipse(140% 120% at 50% 0%)" }}
        animate={{
          clipPath: phase === "wipe" ? "ellipse(140% 0% at 50% 0%)" : "ellipse(140% 120% at 50% 0%)",
        }}
        transition={{
          duration: phase === "wipe" ? wipeDuration : 0,
          ease: [0.2, 0.9, 0.1, 1],
        }}
        onAnimationComplete={() => {
          if (phase !== "wipe") return
          setVisible(false)
          onComplete?.()
        }}
        style={{ willChange: "clip-path" }}
        aria-hidden
      >
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-grid-soft opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,hsl(var(--primary)/0.22),transparent_62%)] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,hsl(var(--accent)/0.16),transparent_60%)] opacity-70" />

          <motion.div
            className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle_at_35%_35%,hsl(var(--accent)/0.55),hsl(var(--primary)/0.22)_42%,transparent_72%)]"
            initial={{ scale: 0.95, opacity: 0.28 }}
            animate={{ scale: 1.05, opacity: 0.4 }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="absolute -left-44 -bottom-52 h-[560px] w-[560px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_40%_40%,hsl(var(--primary)/0.45),hsl(var(--accent)/0.18)_45%,transparent_74%)]"
            initial={{ scale: 1.05, opacity: 0.22 }}
            animate={{ scale: 0.98, opacity: 0.32 }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground"
          >
            {safeLabel}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
