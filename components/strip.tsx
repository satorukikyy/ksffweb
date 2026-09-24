"use client"

import { HeartDoodle } from "@/components/doodles"
import { SevenSeg } from "@/components/seven-seg"
import { ROAD_KM } from "@/lib/route"
import { clock, countdown, kmBetween, moodFor, stamp, sunLagMinutes } from "@/lib/time"
import { us } from "@/lib/us"
import { useNow } from "@/lib/use-now"

const km = kmBetween(us.me.coords, us.you.coords)
const lag = sunLagMinutes(us.me.coords, us.you.coords)

export function Strip() {
  const now = useNow()
  const time = now ? clock(now, us.timeZone) : null
  const next = now && us.nextVisit ? countdown(us.nextVisit, now) : null

  const frames = [
    {
      pen: "right now",
      value: time?.text ?? "--:--",
      unit: us.timeZoneLabel,
      line: time ? moodFor(time.hour) : "Same clock for both of us.",
      sub: `Same time in ${us.me.city} and ${us.you.city}.`,
    },
    {
      pen: "between us",
      value: String(ROAD_KM),
      unit: "km",
      line: `${us.me.city} to ${us.you.city} by road.`,
      sub: `${km.toLocaleString("en-US")} km in a straight line. The sun reaches you ${lag} minutes after me.`,
    },
    {
      pen: "together",
      value: "∞",
      unit: "",
      line: "No end date on this one.",
      sub: "Still my favorite streak.",
    },
    {
      pen: "next hug",
      value: next === null ? "--" : String(next.days),
      unit: "days",
      line: !us.nextVisit
        ? "Date to be decided."
        : next?.done
          ? "It's today. Finally."
          : next
            ? `Plus ${next.hours}h ${next.minutes}m.`
            : "Counting…",
      sub: us.nextVisit ? "Then it's you and me, same city." : "Soon, I promise.",
    },
  ]

  return (
    <div
      className="relative mx-auto flex w-full max-w-[23rem] rotate-[0.8deg] flex-col gap-2.5 rounded-[3px] bg-foreground p-2.5 text-ink shadow-[var(--shadow-table)] lg:max-w-none lg:-rotate-[1.2deg] lg:flex-row lg:gap-3 lg:p-3"
      role="group"
      aria-label="Our photo strip"
    >
      {frames.map((f, i) => (
        <figure
          key={f.pen}
          style={{ "--i": i } as React.CSSProperties}
          className="photo develop flex aspect-[3/2] flex-col justify-between overflow-hidden rounded-[2px] p-4 sm:p-5 lg:aspect-square lg:flex-1"
        >
          <figcaption className="relative z-[3] font-pen text-[1.65rem] leading-none text-foreground/90">
            {f.pen}
          </figcaption>
          <div className="relative z-[3] flex flex-col gap-3">
            <p className="flex items-end gap-2">
              <SevenSeg
                value={f.value}
                label={f.value === "∞" ? "forever" : `${f.value} ${f.unit}`}
                className="stamp-glow h-12 sm:h-14"
              />
              <span className="pb-0.5 text-xs font-semibold tracking-[0.12em] text-window-muted uppercase" aria-hidden>
                {f.unit}
              </span>
            </p>
            <div className="text-sm leading-snug">
              <p className="font-medium text-card-foreground">{f.line}</p>
              <p className="mt-0.5 text-window-muted">{f.sub}</p>
            </div>
          </div>
        </figure>
      ))}
      <div className="flex items-center justify-between gap-3 px-1.5 pt-1 pb-0.5 lg:w-14 lg:flex-col lg:justify-center lg:px-0 lg:pt-0 [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl]">
        <p className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight lg:rotate-180">
          {us.me.name} <HeartDoodle className="size-4 text-frame lg:rotate-90" /> {us.you.name}
        </p>
        <SevenSeg
          value={now ? stamp(now, us.timeZone) : "--.--.--"}
          label={now ? `Printed ${stamp(now, us.timeZone)}` : "Printing"}
          className="h-3.5 text-ink-soft lg:hidden"
        />
      </div>
    </div>
  )
}
