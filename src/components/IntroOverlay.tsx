import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

const DEFAULT_WORDS = ["Selamat Datang", "科德拉吉", "Коделаги", "कोडेलागी", "كودلاجي", "Kodelagi"]
type IntroShowMode = "always" | "once-per-session"

type IntroOverlayProps = {
  showMode?: IntroShowMode
  storageKey?: string
  wordDurationMs?: number
  wipeDurationMs?: number
  holdLastWordMs?: number
  words?: string[]
  navigateTo?: string
  onWipeStart?: () => void
  onComplete?: () => void
}

export default function IntroOverlay({
  showMode = "always",
  storageKey = "kodelagi:intro_seen",
  wordDurationMs = 700,
  wipeDurationMs = 950,
  holdLastWordMs = 900,
  words: wordsProp,
  navigateTo,
  onWipeStart,
  onComplete,
}: IntroOverlayProps) {
  const navigate = useNavigate()
  const words = useMemo(
    () => (wordsProp && wordsProp.length > 0 ? wordsProp : DEFAULT_WORDS),
    [wordsProp],
  )
  const [visible, setVisible] = useState(() => {
    if (showMode === "always") return true
    if (typeof window === "undefined") return false
    return sessionStorage.getItem(storageKey) !== "1"
  })
  const [phase, setPhase] = useState<"words" | "wipe">("words")
  const [wordIndex, setWordIndex] = useState(0)
  const [wipeStarted, setWipeStarted] = useState(false)

  useEffect(() => {
    if (!visible) return
    setPhase("words")
    setWordIndex(0)
    setWipeStarted(false)

    if (showMode === "once-per-session") {
      sessionStorage.setItem(storageKey, "1")
    }
  }, [showMode, storageKey, visible])

  useEffect(() => {
    if (!visible) return
    if (phase !== "words") return

    const total = Math.max(1, words.length)
    const isLast = wordIndex >= total - 1

    if (isLast) {
      const timeoutId = window.setTimeout(
        () => setPhase("wipe"),
        Math.max(200, holdLastWordMs, wordDurationMs),
      )
      return () => window.clearTimeout(timeoutId)
    }

    const timeoutId = window.setTimeout(
      () => setWordIndex((idx) => Math.min(idx + 1, total - 1)),
      Math.max(120, wordDurationMs),
    )

    return () => window.clearTimeout(timeoutId)
  }, [holdLastWordMs, phase, visible, wordDurationMs, wordIndex, words.length])

  useEffect(() => {
    if (!visible) return
    if (phase !== "wipe") return
    if (wipeStarted) return

    setWipeStarted(true)
    onWipeStart?.()
  }, [onWipeStart, phase, visible, wipeStarted])

  useEffect(() => {
    if (!visible) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [visible])

  const wipeDuration = Math.max(0.35, wipeDurationMs / 1000)
  const currentWord = words[Math.min(wordIndex, Math.max(0, words.length - 1))] ?? ""

  return (
    <AnimatePresence>
      {visible ? (
        <div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-label="Intro"
          role="status"
        >
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ clipPath: "ellipse(140% 120% at 50% 0%)" }}
            animate={{
              clipPath:
                phase === "wipe"
                  ? "ellipse(140% 0% at 50% 0%)"
                  : "ellipse(140% 120% at 50% 0%)",
            }}
            transition={{
              duration: phase === "wipe" ? wipeDuration : 0,
              ease: [0.2, 0.9, 0.1, 1],
            }}
            onAnimationComplete={() => {
              if (phase !== "wipe") return
              setVisible(false)
              onComplete?.()
              if (navigateTo) {
                navigate(navigateTo, { replace: true })
              }
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

            <motion.div
              className="absolute inset-0 flex items-center justify-center px-6 text-foreground"
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="text-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentWord}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
                  >
                    {currentWord === "Kodelagi" ? (
                      <span className="text-gradient">{currentWord}</span>
                    ) : (
                      currentWord
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
