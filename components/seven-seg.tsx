import { cn } from "@/lib/utils"

// Film-camera date imprint. Digits, "-", ":", ".", " " and "∞".
const SEGMENTS = {
  a: [2.5, 0.5, 7, 2],
  b: [9.5, 2.5, 2, 6.5],
  c: [9.5, 11, 2, 6.5],
  d: [2.5, 17.5, 7, 2],
  e: [0.5, 11, 2, 6.5],
  f: [0.5, 2.5, 2, 6.5],
  g: [2.5, 9, 7, 2],
} as const

const LIT: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
}

const DIGIT_W = 12
const GAP = 2.5
const NARROW_W = 4
const WIDE_W = 34

export function SevenSeg({
  value,
  label,
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  let x = 0
  const glyphs = [...value].map((ch, i) => {
    const narrow = ch === ":" || ch === "." || ch === " "
    const at = x
    x += (narrow ? NARROW_W : ch === "∞" ? WIDE_W : DIGIT_W) + GAP
    if (ch === "∞")
      return (
        <path
          key={i}
          transform={`translate(${at} 0)`}
          d="M17 10C14 5.5 11.5 2.5 8 2.5a7.5 7.5 0 0 0 0 15c3.5 0 6-3 9-7.5s5.5-7.5 9-7.5a7.5 7.5 0 0 1 0 15c-3.5 0-6-3-9-7.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray="6 1.4"
        />
      )
    if (ch === ":")
      return (
        <g key={i} transform={`translate(${at} 0)`}>
          <rect x={1} y={5} width={2} height={2} rx={0.6} />
          <rect x={1} y={13} width={2} height={2} rx={0.6} />
        </g>
      )
    if (ch === ".")
      return <rect key={i} x={at + 1} y={17.5} width={2} height={2} rx={0.6} />
    if (ch === " ") return null
    const lit = LIT[ch] ?? ""
    return (
      <g key={i} transform={`translate(${at} 0)`}>
        {Object.entries(SEGMENTS).map(([seg, [sx, sy, w, h]]) => (
          <rect
            key={seg}
            x={sx}
            y={sy}
            width={w}
            height={h}
            rx={1}
            opacity={lit.includes(seg) ? 1 : 0.09}
          />
        ))}
      </g>
    )
  })
  const width = Math.max(x - GAP, 1)

  return (
    <span className={cn("inline-flex", className)}>
      <svg
        viewBox={`-1 0 ${width + 3} 20`}
        className="h-full w-auto -skew-x-6 fill-current"
        aria-hidden
      >
        {glyphs}
      </svg>
      <span className="sr-only">{label ?? value}</span>
    </span>
  )
}
