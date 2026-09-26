"use client"

import { MessageCircleHeartIcon } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { SevenSeg } from "@/components/seven-seg"
import { Button } from "@/components/ui/button"
import { stamp } from "@/lib/time"
import { us, waLink } from "@/lib/us"
import { cn } from "@/lib/utils"

const KEY = "used-coupons"
const TILT = ["-rotate-1", "rotate-[1.4deg]", "rotate-[0.6deg]", "-rotate-[1.6deg]", "-rotate-[0.4deg]", "rotate-1"]
const pad = (n: number) => String(n).padStart(2, "0")

function readUsed(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}")
  } catch {
    return {}
  }
}

export function Coupons() {
  const [used, setUsed] = useState<Record<string, string>>({})
  const [fresh, setFresh] = useState<string | null>(null)
  useEffect(() => setUsed(readUsed()), [])

  function redeem(id: string) {
    const next = { ...used, [id]: stamp(new Date(), us.timeZone) }
    setUsed(next)
    setFresh(id)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
  }

  return (
    <ul className="grid gap-x-8 gap-y-7 md:grid-cols-2 lg:gap-x-12 lg:gap-y-9">
      {us.coupons.map((c, i) => (
        <li key={c.id} className={cn("drop-table md:even:translate-y-8", TILT[i % TILT.length])}>
          <article className="ticket on-paper relative flex min-h-44 rounded-[3px] bg-paper text-ink">
            <div className="flex w-[var(--stub)] shrink-0 flex-col items-center justify-between border-r-2 border-dashed border-ink/20 py-4">
              <span className="rotate-180 font-pen text-xl leading-none text-ink-soft [writing-mode:vertical-rl]">
                coupon
              </span>
              <SevenSeg value={pad(i + 1)} label={`Coupon ${i + 1}`} className="h-5 text-frame" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:pl-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-pen text-[2.1rem] leading-[0.92] font-normal text-balance">{c.title}</h3>
                <p className="max-w-[34ch] text-sm leading-snug text-ink-soft">{c.fine}</p>
              </div>
              <Button asChild size="lg" className="h-11 self-start rounded-full px-4 text-[0.9rem] font-semibold">
                <a
                  href={waLink(`Hi ${us.me.name}, I'm redeeming coupon ${pad(i + 1)}: ${c.title}. No expiry, remember?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => redeem(c.id)}
                >
                  <MessageCircleHeartIcon data-icon="inline-start" />
                  {used[c.id] ? "Use it again" : "Redeem"}
                </a>
              </Button>
            </div>
            {used[c.id] && (
              <motion.div
                key={used[c.id]}
                initial={fresh === c.id ? { scale: 1.9, opacity: 0, rotate: -2 } : false}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                transition={{ type: "spring", visualDuration: 0.3, bounce: 0.35 }}
                className="pointer-events-none absolute right-4 bottom-5 flex flex-col items-center gap-1 rounded-[3px] border-2 border-frame px-2.5 py-1.5 text-frame mix-blend-multiply"
              >
                <span className="text-xs font-extrabold tracking-[0.12em] uppercase">Redeemed</span>
                <SevenSeg value={used[c.id]} label={`on ${used[c.id]}`} className="h-3.5" />
              </motion.div>
            )}
          </article>
        </li>
      ))}
    </ul>
  )
}
