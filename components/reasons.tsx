"use client"

import { ShuffleIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { SevenSeg } from "@/components/seven-seg"
import { Button } from "@/components/ui/button"
import { us } from "@/lib/us"

const pad = (n: number) => String(n).padStart(2, "0")

export function Reasons() {
  const [i, setI] = useState(0)
  const total = us.reasons.length

  function another() {
    setI((prev) => {
      const next = Math.floor(Math.random() * (total - 1))
      return next >= prev ? next + 1 : next
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="-rotate-[0.6deg] rounded-[3px] bg-foreground p-2.5 shadow-[var(--shadow-table)] lg:p-3">
        <div className="photo flex min-h-[19rem] flex-col justify-between gap-8 overflow-hidden rounded-[2px] p-6 sm:min-h-[22rem] sm:p-10">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="pointer-events-none absolute inset-0 z-[2] bg-foreground"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
            />
          </AnimatePresence>
          <div className="relative z-[3] flex items-start justify-between gap-4">
            <p className="font-pen text-[1.65rem] leading-none text-foreground/90">reason</p>
            <p className="flex items-end gap-1.5">
              <SevenSeg value={pad(i + 1)} label={`${i + 1} of ${total}`} className="stamp-glow h-8" />
              <span className="text-xs font-semibold tracking-[0.12em] text-window-muted" aria-hidden>
                / {pad(total)}
              </span>
            </p>
          </div>
          <div className="relative z-[3]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[22ch] text-[clamp(1.65rem,4.4vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
              >
                {us.reasons[i]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div>
        <Button size="lg" className="h-11 rounded-full px-5 text-[0.95rem] font-semibold" onClick={another}>
          <ShuffleIcon data-icon="inline-start" />
          Another reason
        </Button>
      </div>
    </div>
  )
}
