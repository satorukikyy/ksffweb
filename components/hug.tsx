"use client"

import { HeartHandshakeIcon, MessageCircleHeartIcon } from "lucide-react"
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

import { HeartDoodle } from "@/components/doodles"
import { SevenSeg } from "@/components/seven-seg"
import { mirror, POSES, Stickman, type Face, type Pose } from "@/components/stickman"
import { Button } from "@/components/ui/button"
import { ROAD_KM } from "@/lib/route"
import { us, waLink } from "@/lib/us"

const KEY = "hugs-sent"
const HOLD_S = 1.8
const HUG_MS = 2800

type Phase = "idle" | "going" | "back" | "hug" | "apart"

const CAPTION: Record<Phase, string> = {
  idle: "hold the button",
  going: "closer…",
  back: "don't let go!",
  hug: "got you.",
  apart: "again?",
}
const LABEL: Record<Phase, string> = {
  idle: "Hold to hug",
  going: "Keep holding…",
  back: "Hold to hug",
  hug: "Hug sent",
  apart: "Hold for another",
}

// Amanda hugs back with one foot popped up behind her.
const hugBack: Pose = { ...mirror(POSES.hug), legR: -18, shinR: -80 }

const CAST: Record<Phase, { me: Pose; you: Pose; face: Face }> = {
  idle: { me: POSES.sway, you: mirror(POSES.sway), face: "smile" },
  going: { me: POSES.run, you: mirror(POSES.run), face: "smile" },
  back: { me: mirror(POSES.walk), you: POSES.walk, face: "pout" },
  hug: { me: POSES.hug, you: hugBack, face: "happy" },
  apart: { me: mirror(POSES.walk), you: POSES.walk, face: "smile" },
}

const pad = (n: number) => String(n).padStart(3, "0")
const isHoldKey = (key: string) => key === " " || key === "Enter"

// The km readout re-renders on every frame of the walk, so it listens on its own.
function Km({ progress }: { progress: MotionValue<number> }) {
  const [km, setKm] = useState(ROAD_KM)
  useMotionValueEvent(progress, "change", (p) => setKm(Math.round(ROAD_KM * (1 - p))))
  return (
    <p className="flex items-end gap-2">
      <SevenSeg value={String(km)} label={`${km} km apart`} className="stamp-glow h-7 sm:h-11" />
      <span className="pb-0.5 text-xs font-semibold tracking-[0.12em] text-window-muted uppercase" aria-hidden>
        km
      </span>
    </p>
  )
}

export function Hug() {
  const progress = useMotionValue(0)
  // Each of us walks --reach of the stage in from 22% and 78%. It is set per breakpoint so the
  // meeting gap tracks the figures' size (they scale with height, the stage with width).
  const meX = useTransform(progress, (p) => `calc(var(--reach) * ${p})`)
  const youX = useTransform(progress, (p) => `calc(var(--reach) * ${-p})`)
  const [phase, setPhase] = useState<Phase>("idle")
  const [near, setNear] = useState(false)
  const [hugs, setHugs] = useState<number | null>(null)
  const anim = useRef<AnimationPlaybackControls | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useMotionValueEvent(progress, "change", (p) => setNear(p > 0.72))

  useEffect(() => {
    try {
      setHugs(Number(localStorage.getItem(KEY)) || 0)
    } catch {
      setHugs(0)
    }
    return () => {
      anim.current?.stop()
      window.clearTimeout(timer.current)
    }
  }, [])

  function arrive() {
    setPhase("hug")
    setHugs((h) => {
      const n = (h ?? 0) + 1
      try {
        localStorage.setItem(KEY, String(n))
      } catch {}
      return n
    })
    timer.current = window.setTimeout(() => {
      setPhase("apart")
      anim.current = animate(progress, 0, { duration: 1.6, ease: "easeInOut", onComplete: () => setPhase("idle") })
    }, HUG_MS)
  }

  function start() {
    if (phase === "hug") return
    window.clearTimeout(timer.current)
    anim.current?.stop()
    setPhase("going")
    anim.current = animate(progress, 1, {
      duration: HOLD_S * (1 - progress.get()),
      ease: "linear",
      onComplete: arrive,
    })
  }

  function release() {
    // A release can land in the same tick the hug completes; the hug wins.
    if (phase !== "going" || progress.get() >= 1) return
    anim.current?.stop()
    setPhase("back")
    anim.current = animate(progress, 0, {
      duration: 0.35 + progress.get() * 0.9,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setPhase("idle"),
    })
  }

  const cast = CAST[phase]
  const caption = phase === "going" && near ? "almost…" : CAPTION[phase]

  return (
    <div className="flex flex-col gap-5">
      <div className="rotate-[0.6deg] rounded-[3px] bg-foreground p-2.5 shadow-[var(--shadow-table)] lg:p-3">
        <div className="photo flex aspect-[4/3.4] flex-col justify-between overflow-hidden rounded-[2px] p-4 sm:aspect-[16/9] sm:p-6 lg:aspect-[21/9]">
          <div className="relative z-[3] flex items-start justify-between gap-4">
            <p className="font-pen text-[1.65rem] leading-none whitespace-nowrap text-foreground/90" aria-hidden>
              {caption}
            </p>
            <Km progress={progress} />
          </div>

          <div
            className="absolute inset-x-0 top-[25%] bottom-[20%] z-[3] [--reach:21.5%] sm:top-[22%] sm:[--reach:23.5%] lg:[--reach:24.5%]"
            aria-hidden
          >
            {/* The figures' feet sit at 85% of their height, so the road does too. */}
            <svg className="absolute inset-x-[8%] top-[85%] h-1 w-[84%] text-window-muted/50" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="100%" y2="2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeDasharray="1 9" />
            </svg>
            {(
              [
                { who: "kiky", x: meX, at: "left-[22%]", name: "me", pose: cast.me },
                { who: "amanda", x: youX, at: "left-[78%]", name: "you", pose: cast.you },
              ] as const
            ).map((p) => (
              <motion.div key={p.who} style={{ x: p.x }} className="absolute inset-0">
                <div className={`absolute top-0 h-full -translate-x-1/2 ${p.at}`}>
                  <Stickman who={p.who} pose={p.pose} face={cast.face} blush={phase === "hug"} strokeWidth={2.8} className="h-full w-auto" />
                  <span
                    className="absolute top-[89%] left-1/2 -translate-x-1/2 font-pen text-[1.4rem] leading-none text-window-muted transition-opacity duration-300"
                    style={{ opacity: phase === "hug" ? 0 : 1 }}
                  >
                    {p.name}
                  </span>
                </div>
              </motion.div>
            ))}
            <span
              className="absolute top-[89%] left-1/2 -translate-x-1/2 font-pen text-[1.4rem] leading-none text-foreground transition-opacity duration-300"
              style={{ opacity: phase === "hug" ? 1 : 0 }}
            >
              us
            </span>
            <AnimatePresence>
              {phase === "hug" && (
                <motion.span
                  key="heart"
                  className="absolute top-[-22%] left-1/2 -ml-5 block"
                  initial={{ scale: 0, y: 14, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0, transition: { duration: 0.4 } }}
                  transition={{ type: "spring", visualDuration: 0.4, bounce: 0.55 }}
                >
                  <HeartDoodle className="stamp-glow size-10" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <p className="relative z-[3] flex items-end gap-2">
            <SevenSeg
              value={hugs === null ? "---" : pad(hugs)}
              label={hugs === null ? "Counting hugs" : `${hugs} hugs sent`}
              className="stamp-glow h-5"
            />
            <span className="text-xs font-semibold tracking-[0.12em] text-window-muted uppercase" aria-hidden>
              hugs sent
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="lg"
          aria-describedby="hug-hint"
          className="relative h-12 min-w-[12.5rem] touch-none overflow-hidden rounded-full px-5 text-[0.95rem] font-semibold [-webkit-touch-callout:none]"
          onPointerDown={(e) => {
            if (e.button !== 0) return
            e.currentTarget.setPointerCapture(e.pointerId)
            start()
          }}
          onPointerUp={release}
          onPointerCancel={release}
          onKeyDown={(e) => {
            if (!isHoldKey(e.key)) return
            e.preventDefault()
            if (!e.repeat) start()
          }}
          onKeyUp={(e) => {
            if (!isHoldKey(e.key)) return
            e.preventDefault()
            release()
          }}
          onBlur={release}
          // Screen readers and switch access send a plain click with no press: run the whole hug.
          onClick={(e) => e.detail === 0 && phase !== "going" && start()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <motion.span aria-hidden className="absolute inset-0 origin-left bg-frame/20" style={{ scaleX: progress }} />
          <HeartHandshakeIcon data-icon="inline-start" className="relative" />
          <span className="relative">{LABEL[phase]}</span>
        </Button>
        {!!hugs && (
          <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-4 text-[0.95rem] font-semibold">
            <a
              href={waLink(`Hi ${us.me.name}, I just sent you hug number ${hugs} from ${us.you.city}. Hug me back?`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleHeartIcon data-icon="inline-start" />
              Tell {us.me.name}
            </a>
          </Button>
        )}
      </div>
      <p id="hug-hint" className="sr-only">
        Press and hold until the two of us meet in the middle.
      </p>
      <p className="sr-only" aria-live="polite">
        {phase === "hug" ? `Hug delivered. ${hugs} sent so far.` : ""}
      </p>
    </div>
  )
}
