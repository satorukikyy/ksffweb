// Kiosk-pen doodles: one stroke weight, round caps, drawn by hand.
type Props = { className?: string }

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function HeartDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 40 36" className={className} aria-hidden>
      <path
        {...stroke}
        d="M20.5 32.5C14 27.6 4.3 21.2 3.6 12.8 3.1 7.2 7 3.4 11.6 3.6c3.9.2 6.7 3.1 8.6 6.7 1.8-3.9 4.9-6.9 9-6.8 4.8.1 8.1 4.2 7.4 9.6-1.1 8.4-9.6 14.4-16.1 19.4Z"
      />
    </svg>
  )
}

export function ArrowDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <path {...stroke} d="M4 8c10 18 26 26 48 24" />
      <path {...stroke} d="M44 24l9 8-11 5" />
    </svg>
  )
}

export function SquiggleDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 120 14" className={className} aria-hidden preserveAspectRatio="none">
      <path {...stroke} d="M2 9c8-7 14 5 22-1s14 5 22-1 14 5 22-1 14 5 22-1 14 5 26-1" />
    </svg>
  )
}

export function SparkDoodle({ className }: Props) {
  return (
    <svg viewBox="0 0 30 30" className={className} aria-hidden>
      <path {...stroke} d="M15 3v8M15 19v8M3 15h8M19 15h8M7 7l4 4M19 19l4 4" />
    </svg>
  )
}
