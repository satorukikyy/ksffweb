import { existsSync } from "node:fs"
import { join } from "node:path"
import Image from "next/image"

import { HeartDoodle } from "@/components/doodles"
import { SevenSeg } from "@/components/seven-seg"
import { stamp, wibDate } from "@/lib/time"
import { us } from "@/lib/us"
import { cn } from "@/lib/utils"

const TILT = ["-rotate-[1.5deg]", "rotate-[1.2deg]", "-rotate-[0.6deg]", "rotate-[1.8deg]"]

export const hasPhoto = (src: string) => existsSync(join(process.cwd(), "public", src))

export function Roll() {
  return (
    <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {us.photos.map((p, i) => (
        <li key={p.src} className={cn("relative mx-auto w-full max-w-[20rem]", TILT[i % TILT.length])}>
          <span className="tape absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-4deg]" aria-hidden />
          <figure className="flex flex-col gap-3 rounded-[3px] bg-foreground p-2.5 pb-4 text-ink shadow-[var(--shadow-table)]">
            <div className="photo relative aspect-[9/16] overflow-hidden rounded-[2px]">
              {hasPhoto(p.src) ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              ) : (
                <div className="relative z-[3] grid h-full place-items-center text-center text-foreground/75">
                  <div className="flex flex-col items-center gap-2">
                    <HeartDoodle className="size-9" />
                    <span className="font-pen text-2xl leading-none">photo coming soon</span>
                  </div>
                </div>
              )}
              {p.date && (
                <SevenSeg
                  value={stamp(wibDate(p.date), us.timeZone)}
                  className="stamp-glow absolute right-3 bottom-3 z-[3] h-4"
                />
              )}
            </div>
            <figcaption className="flex flex-col gap-0.5 px-1.5">
              <span className="font-pen text-[1.9rem] leading-none">{p.title}</span>
              <span className="text-sm text-ink-soft">{p.note}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  )
}
