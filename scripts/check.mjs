// node scripts/check.mjs — sanity check for lib/time.ts
import assert from "node:assert/strict"
import { atHour, clock, countdown, cumulativeKm, kmBetween, moodFor, stamp, sunLagMinutes } from "../lib/time.ts"
import { ROAD_KM, ROUTE } from "../lib/route.ts"

const depok = [-6.4, 106.8186]
const bireuen = [5.2, 96.7]

const km = kmBetween(depok, bireuen)
assert.ok(km > 1650 && km < 1800, `Depok-Bireuen should be ~1,700 km, got ${km}`)
assert.equal(sunLagMinutes(depok, bireuen), 40)

const now = new Date("2026-09-24T15:41:00Z") // 22:41 WIB
assert.deepEqual(clock(now, "Asia/Jakarta"), { hour: 22, text: "22:41" })
assert.equal(stamp(now, "Asia/Jakarta"), "24.09.26")
assert.equal(moodFor(22), "We should both be sleeping. Call?")
assert.equal(moodFor(0), "Way past bedtime, for both of us.")

const day = [{ from: 6, s: "coffee" }, { from: 12, s: "eat" }, { from: 23, s: "late" }]
assert.equal(atHour(day, 6).s, "coffee")
assert.equal(atHour(day, 11).s, "coffee")
assert.equal(atHour(day, 23).s, "late")
assert.equal(atHour(day, 2).s, "late", "before the first entry, last night's entry is still on")

assert.deepEqual(countdown("2026-09-26", now), { done: false, days: 1, hours: 1, minutes: 19 })
assert.equal(countdown("2026-01-01", now).done, true)

// The simplified road geometry should still measure close to the router's road distance.
const along = cumulativeKm(ROUTE)
assert.equal(along[0], 0)
assert.ok(along.every((d, i) => i === 0 || d >= along[i - 1]), "distance must only grow")
assert.ok(Math.abs(along.at(-1) - ROAD_KM) / ROAD_KM < 0.08, `route ${Math.round(along.at(-1))} vs ${ROAD_KM}`)

console.log(`ok: ${km} km straight, ${ROAD_KM} km by road (geometry ${Math.round(along.at(-1))}), sun lag ${sunLagMinutes(depok, bireuen)} min`)
