"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Sticky mobile bar that only shows once the element with `afterId` has scrolled away.
export function StickyAfter({ afterId, children }: { afterId: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = document.getElementById(afterId)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [afterId])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-frame via-frame/90 to-transparent px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-out md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
      aria-hidden={!show}
      inert={!show}
    >
      {children}
    </div>
  )
}

// Adds data-seen once the element scrolls into view, so CSS can run the flash-develop there.
export function DevelopOnView({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-seen={seen || undefined} className={cn("develop-on-view", className)}>
      {children}
    </div>
  )
}
