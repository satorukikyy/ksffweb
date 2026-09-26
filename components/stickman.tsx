"use client"

import { motion, useInView, useReducedMotion, type Transition } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

// Kiosk-pen stick figures, rigged on a 60x100 grid. Each joint is a rotation in degrees, clockwise on
// screen, with limbs hanging straight down at 0. "L" and "R" mean the viewer's left and right.
// An array loops between its values, and only while the figure is on screen.
type Deg = number | number[]
export type Pose = {
  armL?: Deg
  foreL?: Deg
  armR?: Deg
  foreR?: Deg
  legL?: Deg
  shinL?: Deg
  legR?: Deg
  shinR?: Deg
  head?: Deg
  lean?: Deg
  y?: Deg
  look?: Deg // -1 left, 0 ahead, 1 right
  dur?: number // seconds per swing
  rest?: number // pause at each end of a swing
}
export type Face = "smile" | "happy" | "pout" | "sleep" | "o"

// Joint heights on the rig's centre line. Motion only honours originX/originY for SVG pivots.
const SHOULDER = 32
const ELBOW = 45
const HIP = 58
const KNEE = 72
const NECK = 25
const pivot = (y: number) => ({ transformBox: "view-box" as const, originX: "30px", originY: `${y}px` })
const SPRING: Transition = { type: "spring", visualDuration: 0.45, bounce: 0.35 }

const stand: Pose = { armL: 22, foreL: -10, armR: -22, foreR: 10, legL: 10, legR: -10 }
const sit: Pose = { legL: -90, shinL: 90, legR: -84, shinR: 84 }

// Directional poses face right; mirror() turns them around.
export const POSES = {
  stand,
  sway: { ...stand, lean: [-2.5, 2.5], head: [-4, 4], dur: 1.8 },
  wave: { ...stand, armR: -145, foreR: [-5, 35], dur: 0.32 },
  run: {
    armL: [35, -10],
    foreL: [-30, -70],
    armR: [-70, -92],
    foreR: -18,
    legL: [30, -25],
    shinL: [50, 10],
    legR: [-25, 30],
    shinR: [10, 50],
    lean: 8,
    y: [0, -3],
    dur: 0.3,
  },
  walk: {
    armL: [18, -18],
    foreL: -15,
    armR: [-18, 18],
    foreR: -15,
    legL: [16, -16],
    shinL: [22, 4],
    legR: [-16, 16],
    shinR: [4, 22],
    y: [0, -1.5],
    dur: 0.45,
  },
  hug: { armL: -35, foreL: -70, armR: -80, foreR: -45, legL: 10, legR: -6, head: 12, lean: 6 },
  jump: { armL: 140, foreL: 20, armR: -140, foreR: -20, legL: 20, shinL: 30, legR: -20, shinR: -30, y: -8 },
  lie: { armL: 4, armR: -4, legL: 3, legR: -3 },
  coffee: { ...stand, armR: [-35, -100], foreR: [-110, -120], look: [0, 0.5], dur: 0.9, rest: 1.8 },
  work: { ...sit, armL: -45, foreL: [-45, -38], armR: -55, foreR: [-35, -43], look: 1, dur: 0.16 },
  eat: { ...sit, armL: -40, foreL: -60, armR: [-55, -95], foreR: [-35, -119], look: 1, dur: 0.8, rest: 1.2 },
  phone: { ...sit, armL: -30, foreL: -95, armR: -40, foreR: -80, head: [8, 13], look: 1, dur: 1.6 },
  lost: { ...stand, armL: 25, foreL: 14, armR: -25, foreR: -14, head: [-7, 7], look: [-1, 1], dur: 1.3, rest: 0.5 },
} satisfies Record<string, Pose>

const flip = (v?: Deg) => (v === undefined ? undefined : Array.isArray(v) ? v.map((n) => -n) : -v)

export function mirror(p: Pose): Pose {
  return {
    ...p,
    armL: flip(p.armR),
    foreL: flip(p.foreR),
    armR: flip(p.armL),
    foreR: flip(p.foreL),
    legL: flip(p.legR),
    shinL: flip(p.shinR),
    legR: flip(p.legL),
    shinR: flip(p.shinL),
    head: flip(p.head),
    lean: flip(p.lean),
    look: flip(p.look),
  }
}

type Rig = { pose: Pose; live: boolean }

function move(v: Deg | undefined, { pose, live }: Rig, scale = 1, speed = 1) {
  const loop = Array.isArray(v) && v.length > 1 && live
  const at = (n: number) => n * scale
  return {
    value: loop ? (v as number[]).map(at) : at(Array.isArray(v) ? v[0] : (v ?? 0)),
    transition: loop
      ? ({
          duration: (pose.dur ?? 1) / speed,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: pose.rest ?? 0,
          ease: "easeInOut",
        } satisfies Transition)
      : SPRING,
  }
}

function Bend({ at, deg, rig, children }: { at: number; deg?: Deg; rig: Rig; children: React.ReactNode }) {
  const m = move(deg, rig)
  return (
    <motion.g
      style={pivot(at)}
      animate={{ rotate: m.value }}
      transition={m.transition}
    >
      {children}
    </motion.g>
  )
}

function Limb({
  top,
  bottom,
  from,
  rig,
  end,
}: {
  top?: Deg
  bottom?: Deg
  from: "arm" | "leg"
  rig: Rig
  end?: React.ReactNode
}) {
  const [a, b, c, j1, j2] = from === "arm" ? [32, 45, 57, SHOULDER, ELBOW] : [58, 72, 85, HIP, KNEE]
  return (
    <Bend at={j1} deg={top} rig={rig}>
      <line x1={30} y1={a} x2={30} y2={b} />
      <Bend at={j2} deg={bottom} rig={rig}>
        <line x1={30} y1={b} x2={30} y2={c} />
        {end && <g transform={`translate(30 ${c})`}>{end}</g>}
      </Bend>
    </Bend>
  )
}

function Features({ face, blush, rig }: { face: Face; blush?: boolean; rig: Rig }) {
  const look = move(rig.pose.look, rig, 2.4)
  const closed = face === "happy" || face === "sleep"
  return (
    <motion.g animate={{ x: look.value }} transition={look.transition}>
      {closed ? (
        <path
          strokeWidth={1.6}
          d={face === "happy" ? "M25.6 15.8q1.4-2 2.8 0M31.6 15.8q1.4-2 2.8 0" : "M25.6 14.6q1.4 1.6 2.8 0M31.6 14.6q1.4 1.6 2.8 0"}
        />
      ) : (
        <motion.g
          stroke="none"
          fill="currentColor"
          style={pivot(15)}
          animate={rig.live ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
          transition={rig.live ? { duration: 0.22, repeat: Infinity, repeatDelay: 3.4 } : { duration: 0 }}
        >
          <circle cx={27} cy={15} r={1.3} />
          <circle cx={33} cy={15} r={1.3} />
        </motion.g>
      )}
      {face === "smile" && <path strokeWidth={1.6} d="M27.2 18.6q2.8 2.4 5.6 0" />}
      {face === "happy" && <path strokeWidth={1.4} fill="currentColor" d="M26.8 18.2h6.4q-.6 3.6-3.2 3.6t-3.2-3.6Z" />}
      {face === "pout" && <path strokeWidth={1.6} d="M28 20.4q2-1.6 4 0" />}
      {face === "sleep" && <path strokeWidth={1.6} d="M29 19.6h2" />}
      {face === "o" && <circle strokeWidth={1.4} cx={30} cy={19.6} r={1.4} />}
      {blush && <path strokeWidth={1.1} d="M23.6 19.6l1.3-1.6M25.4 19.6l1.3-1.6M33.4 19.6l1.3-1.6M35.2 19.6l1.3-1.6" />}
    </motion.g>
  )
}

export function Stickman({
  who,
  pose,
  face = "smile",
  blush,
  hands,
  className,
  strokeWidth = 2.4,
  ...svg
}: {
  who: "kiky" | "amanda"
  pose: Pose
  face?: Face
  blush?: boolean
  hands?: { l?: React.ReactNode; r?: React.ReactNode }
} & Omit<React.SVGProps<SVGSVGElement>, "ref">) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { margin: "120px" })
  const reduce = useReducedMotion()
  const rig: Rig = { pose, live: inView && !reduce }
  const y = move(pose.y, rig, 1, 2)

  return (
    <svg
      ref={ref}
      viewBox="0 0 60 100"
      overflow="visible"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("stickman", className)}
      {...svg}
    >
      <motion.g animate={{ y: y.value }} transition={y.transition}>
        <Limb from="leg" top={pose.legL} bottom={pose.shinL} rig={rig} />
        <Limb from="leg" top={pose.legR} bottom={pose.shinR} rig={rig} />
        <Bend at={HIP} deg={pose.lean} rig={rig}>
          {who === "amanda" ? (
            <path fill="currentColor" fillOpacity={0.14} d="M30 30L20.5 64.5Q30 67 39.5 64.5Z" />
          ) : (
            <line x1={30} y1={24} x2={30} y2={58} />
          )}
          <Limb from="arm" top={pose.armL} bottom={pose.foreL} rig={rig} end={hands?.l} />
          <Limb from="arm" top={pose.armR} bottom={pose.foreR} rig={rig} end={hands?.r} />
          <Bend at={NECK} deg={pose.head} rig={rig}>
            {who === "amanda" ? (
              // Hijab: a dome over the head that drapes to the shoulders, with the face left open.
              <path
                fill="currentColor"
                fillOpacity={0.14}
                fillRule="evenodd"
                d="M30 3.5C23 3.5 18.8 8.6 18.8 15c0 5-1 9.4-3.8 14.6Q30 36 45 29.6C42.2 24.4 41.2 20 41.2 15 41.2 8.6 37 3.5 30 3.5ZM37.6 15.6a7.6 7.6 0 1 0-15.2 0 7.6 7.6 0 1 0 15.2 0Z"
              />
            ) : (
              <>
                <circle cx={30} cy={15} r={8.6} />
                <path d="M26 6.9l-1.4-3.2M30 6.4V2.8M34 6.9l1.6-3" />
              </>
            )}
            <Features face={face} blush={blush} rig={rig} />
          </Bend>
        </Bend>
      </motion.g>
    </svg>
  )
}
