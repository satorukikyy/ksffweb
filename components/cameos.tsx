"use client"

import { AnimatePresence, motion, useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { HeartDoodle } from "@/components/doodles"
import { mirror, POSES, Stickman, type Pose } from "@/components/stickman"
import { us } from "@/lib/us"

// Small stick-figure cameos: the header logo, the footer ledge, the 404 page.

export function Logo() {
  const [pops, setPops] = useState(0)
  const [show, setShow] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <a
      href="#top"
      onClick={() => {
        setPops((n) => n + 1)
        setShow(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setShow(false), 2400)
      }}
      className="relative -my-2 flex items-center gap-1.5 py-2.5 text-lg font-extrabold tracking-tight"
    >
      {us.me.name}
      <HeartDoodle className="size-5" />
      {us.you.name}
      <AnimatePresence>
        {show && (
          <motion.span
            key={pops}
            aria-hidden
            className="absolute bottom-1 left-full ml-2 flex items-end gap-1"
            initial={{ y: 14, scale: 0.3, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", visualDuration: 0.35, bounce: 0.5 }}
          >
            <Stickman who="kiky" pose={POSES.wave} face="happy" strokeWidth={1.8} className="h-10 w-auto" />
            <span className="mb-6 font-pen text-xl leading-none font-normal whitespace-nowrap text-frame-soft">hi, you</span>
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  )
}

// Kiky and Amanda sitting on the footer's top edge, legs over the side.
// Knees out to the sides, shins hanging over the edge and swinging.
const dangle: Pose = { armL: 16, foreL: -30, armR: -16, foreR: 30, legL: 58, shinL: [-70, -38], legR: -58, shinR: [42, 66], dur: 0.8 }
const ME: Record<"wave" | "sit" | "boop", Pose> = {
  wave: { ...dangle, armL: 150, foreL: [5, -35], head: 6, dur: 0.3 },
  sit: { ...dangle, armR: -90, foreR: 0, head: 9 },
  boop: { ...POSES.jump, head: 9 },
}
const YOU: Record<"wave" | "sit" | "boop", Pose> = {
  wave: { ...mirror(dangle), head: -6, look: -0.5 },
  sit: { ...mirror(dangle), head: -11, look: -0.5 },
  boop: { ...POSES.jump, head: -9 },
}

export function FooterPair() {
  const ref = useRef<HTMLButtonElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const [mode, setMode] = useState<"wave" | "sit" | "boop">("sit")
  const timer = useRef<number | undefined>(undefined)

  function run(next: "wave" | "boop", ms: number) {
    setMode(next)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMode("sit"), ms)
  }

  useEffect(() => {
    if (seen) run("wave", 2600)
  }, [seen])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => run("boop", 1400)}
      className="absolute top-0 right-4 flex h-24 -translate-y-[58%] cursor-pointer items-start rounded-[3px] text-foreground sm:right-10 lg:h-28"
    >
      <span className="sr-only">Boop us</span>
      <Stickman who="kiky" pose={ME[mode]} face={mode === "sit" ? "smile" : "happy"} blush={mode !== "wave"} className="h-full w-auto" />
      <Stickman who="amanda" pose={YOU[mode]} face={mode === "sit" ? "smile" : "happy"} blush={mode !== "wave"} className="-ml-[1.6rem] h-full w-auto lg:-ml-8" />
      <AnimatePresence>
        {mode === "boop" && (
          <motion.span
            key="heart"
            aria-hidden
            className="absolute -top-7 left-1/2 -ml-4"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", visualDuration: 0.35, bounce: 0.55 }}
          >
            <HeartDoodle className="size-8" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// Kiky, lost on the way to a page that isn't there, turning his map around.
export function Lost() {
  return (
    <svg
      viewBox="0 -8 60 100"
      className="stickman h-40 w-auto overflow-visible text-foreground sm:h-48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <Stickman who="kiky" pose={POSES.lost} width={60} height={100} />
      <g>
        <rect x={13} y={37} width={34} height={17} rx={1} fill="var(--paper)" stroke="none" />
        <path d="M24.3 37v17M35.6 37v17" stroke="var(--ink)" strokeOpacity={0.25} strokeWidth={1} />
        <path d="M16 50c4-2 6-8 11-6s6 3 11-1" stroke="var(--frame)" strokeWidth={1.4} strokeDasharray="2 2" />
        <path d="M40 40.5l3 3M43 40.5l-3 3" stroke="var(--frame)" strokeWidth={1.4} />
      </g>
      <motion.text
        x={39}
        y={0}
        fontSize={24}
        stroke="none"
        fill="currentColor"
        className="font-pen"
        animate={{ y: [0, -3, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </motion.text>
    </svg>
  )
}
