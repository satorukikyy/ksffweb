// Pure helpers, no imports, so scripts/check.mjs can run them straight in Node.

export type LatLng = readonly [lat: number, lng: number]

const DAY = 86_400_000

// Both cities are on WIB (UTC+7, no DST), so every date in the config is read as WIB.
export function wibDate(isoDay: string): Date {
  return new Date(`${isoDay}T00:00:00+07:00`)
}

export function clock(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00"
  return { hour: Number(get("hour")), text: `${get("hour")}:${get("minute")}` }
}

export function stamp(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00"
  return `${get("day")}.${get("month")}.${get("year")}`
}

export function moodFor(hour: number) {
  if (hour < 5) return "Way past bedtime, for both of us."
  if (hour < 9) return "Good morning, you."
  if (hour < 12) return "Hope your morning is being kind."
  if (hour < 15) return "Lunch time. Eat something real."
  if (hour < 18) return "Afternoon slump. Almost there."
  if (hour < 22) return "Evening. My favorite part of the day."
  return "We should both be sleeping. Call?"
}

export function countdown(isoDay: string, now: Date) {
  const ms = Math.max(0, wibDate(isoDay).getTime() - now.getTime())
  return {
    done: ms === 0,
    days: Math.floor(ms / DAY),
    hours: Math.floor((ms % DAY) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
  }
}

export function kmBetween(a: LatLng, b: LatLng) {
  return Math.round(haversine(a, b))
}

function haversine([lat1, lng1]: LatLng, [lat2, lng2]: LatLng) {
  const rad = Math.PI / 180
  const dLat = (lat2 - lat1) * rad
  const dLng = (lng2 - lng1) * rad
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

// Solar time moves 4 minutes per degree of longitude.
export function sunLagMinutes(a: LatLng, b: LatLng) {
  return Math.round(Math.abs(a[1] - b[1]) * 4)
}

// Running distance along a path of [lng, lat] points, for animating along a real route.
export function cumulativeKm(path: [number, number][]) {
  let total = 0
  return path.map((point, i) => {
    if (i > 0) {
      const [lng1, lat1] = path[i - 1]
      const [lng2, lat2] = point
      total += haversine([lat1, lng1], [lat2, lng2])
    }
    return total
  })
}
