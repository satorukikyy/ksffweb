"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { HeartDoodle } from "@/components/doodles"
import { SevenSeg } from "@/components/seven-seg"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { stamp } from "@/lib/time"
import { us } from "@/lib/us"
import { cn } from "@/lib/utils"

const KEY = "opened-letters"
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-[0.5deg]", "-rotate-[1.5deg]"]

function readOpened(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}")
  } catch {
    return {}
  }
}

export function Letters() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [opened, setOpened] = useState<Record<string, string>>({})
  useEffect(() => setOpened(readOpened()), [])

  const index = us.letters.findIndex((l) => l.id === openId)
  const letter = index >= 0 ? us.letters[index] : null

  function open(id: string) {
    setOpenId(id)
    if (opened[id]) return
    const next = { ...opened, [id]: stamp(new Date(), us.timeZone) }
    setOpened(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
        {us.letters.map((l, i) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => open(l.id)}
              className={cn(
                "glassine group relative flex aspect-[4/5] w-full lg:aspect-[5/4] flex-col justify-end overflow-hidden rounded-[3px] p-3.5 text-left text-ink shadow-[var(--shadow-table)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:rotate-0 focus-visible:-translate-y-1.5 focus-visible:rotate-0 sm:p-5",
                TILT[i % TILT.length]
              )}
            >
              <span
                className="absolute inset-x-[12%] top-[20%] h-[32%] overflow-hidden rounded-[2px] bg-paper/55 p-3 text-[0.7rem] leading-snug text-ink/50 blur-[3px] sm:h-[44%] transition-transform duration-500 ease-out group-hover:-translate-y-3 sm:p-4 sm:text-sm"
                aria-hidden
              >
                {l.body[0]}
              </span>
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4">
                {opened[l.id] ? (
                  <span className="flex flex-col items-end gap-1 font-pen text-xl leading-none text-ink">
                    opened
                    <SevenSeg value={opened[l.id].slice(0, 5)} label={`on ${opened[l.id]}`} className="h-3 text-ink" />
                  </span>
                ) : (
                  <span className="block -rotate-12 text-frame">
                    <HeartDoodle className="size-9 sm:size-11" />
                    <span className="sr-only">sealed</span>
                  </span>
                )}
              </span>
              <span className="relative font-pen text-[1.75rem] leading-[0.95] sm:text-[2.2rem]">
                <span className="text-ink/70">open when </span>
                {l.when}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!letter} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent
          showCloseButton={false}
          className="on-paper paper-grain max-h-[calc(100svh-2rem)] -rotate-[0.6deg] overflow-y-auto rounded-[3px] bg-paper p-0 text-ink ring-0 shadow-[0_30px_80px_-20px_oklch(0.1_0.05_18/0.7)] sm:max-w-lg"
        >
          {letter && (
            <motion.article
              key={letter.id}
              initial={{ y: 28, rotate: -1.5, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", visualDuration: 0.5, bounce: 0.18 }}
              className="flex flex-col gap-6 p-6 sm:p-9"
            >
              <header className="flex items-start justify-between gap-4">
                <DialogTitle className="font-pen text-[2.6rem] leading-[0.9] font-normal">
                  <span className="text-ink/70">open when </span>
                  {letter.when}
                </DialogTitle>
                {opened[letter.id] && (
                  <SevenSeg
                    value={opened[letter.id]}
                    label={`Opened ${opened[letter.id]}`}
                    className="mt-2 h-3.5 shrink-0 text-frame"
                  />
                )}
              </header>
              <DialogDescription className="sr-only">A letter from {us.me.name}.</DialogDescription>
              <div className="flex flex-col gap-4 text-[1.05rem] leading-relaxed">
                {letter.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="font-pen text-4xl leading-none text-frame">Love, {us.me.name}</p>
              <footer className="flex flex-wrap gap-2.5 border-t border-ink/10 pt-5">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-5"
                  onClick={() => open(us.letters[(index + 1) % us.letters.length].id)}
                >
                  Next letter
                </Button>
                <Button size="lg" variant="ghost" className="h-11 rounded-full px-4" onClick={() => setOpenId(null)}>
                  Close
                </Button>
              </footer>
            </motion.article>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
