"use client"

import { motion, useReducedMotion } from "motion/react"

import { SevenSeg } from "@/components/seven-seg"
import { POSES, Stickman } from "@/components/stickman"
import { atHour, clock } from "@/lib/time"
import { us, type Scene } from "@/lib/us"
import { useNow } from "@/lib/use-now"

const HEART = "M0 3.4C-1.6 2.2-4 .6-4.2-1.5-4.3-2.9-3.3-3.8-2.2-3.8c1 0 1.7.8 2.2 1.7.5-1 1.2-1.7 2.3-1.7 1.2 0 2 1 1.9 2.4C4-.8 1.6.9 0 3.4Z"

// Loops that only exist for charm; reduced motion gets the still frame.
function Loop({ children, animate, dur, delay = 0, rest = 0 }: {
  children: React.ReactNode
  animate: Record<string, number[]>
  dur: number
  delay?: number
  rest?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.g
      style={{ transformBox: "fill-box", originY: 1 }}
      animate={reduce ? undefined : animate}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: rest, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  )
}

function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeWidth={1.6}>
      {[0, 5].map((dx, i) => (
        <Loop key={dx} animate={{ y: [0, -3, 0], opacity: [0.2, 0.9, 0.2] }} dur={1.8} delay={i * 0.6}>
          <path d={`M${dx} 0q-2-2.5 0-5t0-5`} />
        </Loop>
      ))}
    </g>
  )
}

function Chair() {
  return <path d="M47 75h18M48 75l-2-23M49 75l-1 11M63 75l1 11" />
}

function Desk() {
  return <path d="M68 57h54M118 57v29" />
}

function Floor() {
  return <path d="M34 86h100" strokeDasharray="1 7" strokeWidth={2} />
}

// Every scene is drawn on a 160x100 sheet, the figure placed on its own 60x100 rig.
function Drawing({ scene }: { scene: Scene | null }) {
  switch (scene) {
    case "sleep":
      return (
        <>
          <path d="M28 70h104M30 48v34M130 62v20" />
          <ellipse cx={43} cy={66.5} rx={11} ry={3.4} />
          <g transform="translate(30 88) rotate(-90)">
            <Stickman who="kiky" pose={POSES.lie} face="sleep" width={60} height={100} />
          </g>
          {[
            [56, 40, 9],
            [63, 30, 12],
            [71, 18, 15],
          ].map(([x, y, size], i) => (
            <Loop key={i} animate={{ y: [4, -4], opacity: [0, 1, 0] }} dur={2.4} delay={i * 0.8}>
              <text x={x} y={y} fontSize={size} stroke="none" fill="currentColor" className="font-pen">
                z
              </text>
            </Loop>
          ))}
          <path d="M134 10a8 8 0 1 0 8 12 6.5 6.5 0 1 1-8-12Z" />
        </>
      )
    case "coffee":
      return (
        <>
          <Floor />
          <Stickman
            who="kiky"
            pose={POSES.coffee}
            x={50}
            y={1}
            width={60}
            height={100}
            hands={{
              r: (
                <g transform="rotate(145)">
                  <path d="M1-5h8v7a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 1 2Z" />
                  <path d="M1-3h-1.4a1.7 1.7 0 0 0 0 3.4H1" strokeWidth={1.6} />
                  <Steam x={3} y={-8} />
                </g>
              ),
            }}
          />
          <g transform="translate(136 18)">
            <circle r={6} />
            <path d="M0-11v-3M0 11v3M-11 0h-3M11 0h3M-8-8l-2-2M8 8l2 2M-8 8l-2 2M8-8l2-2" />
          </g>
        </>
      )
    case "work":
    case "eat":
      return (
        <>
          <Floor />
          <Chair />
          <Desk />
          {scene === "work" ? (
            <>
              <path d="M80 56h18l6-15" />
              <g transform="translate(92 8)">
                <circle cx={-18} cy={16} r={1.3} />
                <circle cx={-13} cy={11} r={2} />
                <Loop animate={{ scale: [0.85, 1, 0.85], opacity: [0, 1, 0] }} dur={2.2} rest={0.8}>
                  <path d="M-7 4c-2-5 4-8 7-5 2-4 9-3 9 1 5-1 7 5 3 7 1 4-5 6-8 3-3 3-10 2-9-2-3 0-4-3-2-4Z" />
                  <path d={HEART} transform="translate(2 3.5) scale(0.9)" strokeWidth={1.6} />
                </Loop>
              </g>
            </>
          ) : (
            <>
              <path d="M84 51h16q-1 6-8 6t-8-6Z" />
              <Steam x={89} y={47} />
            </>
          )}
          <Stickman
            who="kiky"
            pose={scene === "work" ? POSES.work : POSES.eat}
            x={30}
            y={15}
            width={60}
            height={100}
            hands={scene === "eat" ? { r: <path d="M0 0v5m0 1.5a1.4 2 0 1 0 0 .1" strokeWidth={1.6} /> } : undefined}
          />
        </>
      )
    case "phone":
      return (
        <>
          <Floor />
          <Chair />
          <Stickman
            who="kiky"
            pose={POSES.phone}
            x={30}
            y={15}
            width={60}
            height={100}
            hands={{ r: <rect transform="rotate(120)" x={-3} y={-9} width={6} height={10} rx={1.2} strokeWidth={1.8} /> }}
          />
          <g transform="translate(80 34)">
            <Loop animate={{ y: [4, -4], scale: [0.4, 1], opacity: [0, 1, 0] }} dur={1.6} rest={1.6}>
              <path d={HEART} strokeWidth={1.8} />
            </Loop>
          </g>
          <path d="M134 10a8 8 0 1 0 8 12 6.5 6.5 0 1 1-8-12Z" />
        </>
      )
    default:
      return (
        <>
          <Floor />
          <Stickman who="kiky" pose={POSES.wave} x={50} y={1} width={60} height={100} />
        </>
      )
  }
}

export function Meanwhile() {
  const now = useNow()
  const time = now ? clock(now, us.timeZone) : null
  const slot = time ? atHour(us.day, time.hour) : null

  return (
    <div className="relative -rotate-[0.8deg]">
      <span className="tape absolute -top-3 left-10 z-10 h-6 w-24 rotate-[-5deg]" aria-hidden />
      <figure className="rounded-[3px] bg-foreground p-2.5 shadow-[var(--shadow-table)] lg:p-3">
        <div className="photo flex flex-col gap-2 overflow-hidden rounded-[2px] p-4 sm:p-6">
          <div className="relative z-[3] flex items-start justify-between gap-4">
            <p className="font-pen text-[1.65rem] leading-none text-foreground/90">me, right now</p>
            <p className="flex items-end gap-1.5">
              <SevenSeg value={time?.text ?? "--:--"} label={time ? `${time.text} ${us.timeZoneLabel}` : "Checking the time"} className="stamp-glow h-6" />
              <span className="text-xs font-semibold tracking-[0.12em] text-window-muted uppercase" aria-hidden>
                {us.timeZoneLabel}
              </span>
            </p>
          </div>
          <svg
            viewBox="10 -4 150 96"
            className="stickman relative z-[3] mx-auto aspect-[150/96] w-full max-w-[34rem] text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label={slot ? `A doodle of ${us.me.name}: ${slot.line}` : `A doodle of ${us.me.name} waving`}
          >
            <Drawing key={slot?.scene ?? "wait"} scene={slot?.scene ?? null} />
          </svg>
          <figcaption className="relative z-[3] text-[0.95rem] leading-snug font-medium text-card-foreground">
            {slot?.line ?? "Checking the clock…"}
          </figcaption>
        </div>
      </figure>
    </div>
  )
}
