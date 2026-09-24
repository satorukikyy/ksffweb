"use client"

import { useEffect, useState } from "react"

// null until mounted, so server HTML and first client render match.
export function useNow(everyMs = 15_000) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), everyMs)
    return () => clearInterval(id)
  }, [everyMs])
  return now
}
