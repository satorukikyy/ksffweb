"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import type { GeoJSONSource, LngLatBoundsLike, Map as MapLibreMap, Marker } from "maplibre-gl"
import { ExternalLinkIcon, RotateCcwIcon } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { SevenSeg } from "@/components/seven-seg"
import { Button } from "@/components/ui/button"
import { ROAD_KM, ROUTE } from "@/lib/route"
import { cumulativeKm } from "@/lib/time"
import { us } from "@/lib/us"

const ALONG = cumulativeKm(ROUTE)
const TOTAL = ALONG[ALONG.length - 1]
const lngLat = ([lat, lng]: readonly [number, number]): [number, number] => [lng, lat]
const BOUNDS = ROUTE.reduce(
  (b, [lng, lat]) => [Math.min(b[0], lng), Math.min(b[1], lat), Math.max(b[2], lng), Math.max(b[3], lat)],
  [180, 90, -180, -90]
) as LngLatBoundsLike

// Canvas can't read CSS variables; these mirror --window, --window-2, --stamp.
const MAP = { land: "#2b2527", water: "#151213", line: "#4a4144", label: "#a99fa1", stamp: "#f59a3a" }
const HEART =
  "M20.5 32.5C14 27.6 4.3 21.2 3.6 12.8 3.1 7.2 7 3.4 11.6 3.6c3.9.2 6.7 3.1 8.6 6.7 1.8-3.9 4.9-6.9 9-6.8 4.8.1 8.1 4.2 7.4 9.6-1.1 8.4-9.6 14.4-16.1 19.4Z"

const ROUTE_URL = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
  `${us.me.city}, ${us.me.region}`
)}&destination=${encodeURIComponent(`${us.you.city}, ${us.you.region}`)}&travelmode=driving`

type Place = readonly [number, number]

function line(coords: [number, number][]): GeoJSON.Feature {
  return { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } }
}

function pin(name: string, city: string, photo?: string) {
  const el = document.createElement("button")
  el.type = "button"
  el.className = "pin"
  el.setAttribute("aria-label", `Zoom in on ${city}`)
  const face = document.createElement(photo ? "img" : "span")
  face.className = photo ? "pin-face" : "pin-dot"
  if (photo) Object.assign(face, { src: photo, alt: "" })
  const label = document.createElement("span")
  label.className = "pin-label"
  const who = document.createElement("b")
  who.textContent = name
  label.append(who, ` ${city}`)
  el.append(face, label)
  return el
}

export function DistanceMap({ youPhoto }: { youPhoto?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const map = useRef<MapLibreMap | null>(null)
  const heartMarker = useRef<Marker | null>(null)
  const raf = useRef(0)
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")
  const [shownKm, setShownKm] = useState(0)

  // Room for the pin labels and the km readout in the bottom-left corner.
  const padding = () =>
    box.current && box.current.clientWidth < 640
      ? { top: 56, bottom: 120, left: 72, right: 72 }
      : { top: 60, bottom: 90, left: 150, right: 110 }

  const fly = useCallback((target: "route" | Place) => {
    const m = map.current
    if (!m) return
    if (target === "route") m.fitBounds(BOUNDS, { padding: padding(), duration: 1800 })
    else m.flyTo({ center: lngLat(target), zoom: 11.5, duration: 2200 })
  }, [])

  const play = useCallback(() => {
    const m = map.current
    if (!m) return
    cancelAnimationFrame(raf.current)
    const source = m.getSource<GeoJSONSource>("route")
    const heart = heartMarker.current?.getElement()

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      m.fitBounds(BOUNDS, { padding: padding(), animate: false })
      source?.setData(line(ROUTE))
      if (heart) heart.style.opacity = "0"
      setShownKm(ROAD_KM)
      return
    }

    source?.setData(line([ROUTE[0]]))
    setShownKm(0)
    m.jumpTo({ center: lngLat(us.me.coords), zoom: 9 })
    m.fitBounds(BOUNDS, { padding: padding(), duration: 2600, curve: 1.6 })
    m.once("moveend", () => {
      const start = performance.now()
      const DURATION = 3200
      let idx = 0
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / DURATION)
        const eased = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2
        while (idx < ALONG.length - 1 && ALONG[idx + 1] <= eased * TOTAL) idx++
        source?.setData(line(ROUTE.slice(0, Math.max(2, idx + 1))))
        heartMarker.current?.setLngLat(ROUTE[idx])
        if (heart) heart.style.opacity = p < 1 ? "1" : "0"
        setShownKm(Math.round(eased * ROAD_KM))
        if (p < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    })
  }, [])

  useEffect(() => {
    const el = box.current
    if (!el) return
    let cancelled = false
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setStatus("loading")
        try {
          const maplibregl = await import("maplibre-gl")
          if (cancelled) return
          // Copied by the postinstall script; bundlers can't resolve MapLibre's own worker path.
          maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs")
          const m = new maplibregl.Map({
            container: el,
            style: "https://tiles.openfreemap.org/styles/dark",
            center: lngLat(us.me.coords),
            zoom: 9,
            cooperativeGestures: true,
            dragRotate: false,
            pitchWithRotate: false,
            attributionControl: { compact: true },
          })
          m.touchZoomRotate.disableRotation()
          m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right")
          map.current = m

          m.once("load", () => {
            const paint = (id: string, prop: Parameters<typeof m.setPaintProperty>[1], value: string) => {
              if (m.getLayer(id)) m.setPaintProperty(id, prop, value)
            }
            paint("background", "background-color", MAP.land)
            paint("water", "fill-color", MAP.water)
            paint("waterway", "line-color", MAP.water)
            for (const id of ["boundary_state", "boundary_country_z0-4", "boundary_country_z5-"])
              paint(id, "line-color", MAP.line)
            for (const layer of m.getStyle().layers) {
              if (layer.type === "symbol") {
                paint(layer.id, "text-color", MAP.label)
                paint(layer.id, "text-halo-color", MAP.water)
              }
            }

            m.addSource("ghost", { type: "geojson", data: line(ROUTE) })
            m.addSource("route", { type: "geojson", data: line([ROUTE[0]]) })
            m.addLayer({
              id: "ghost",
              type: "line",
              source: "ghost",
              layout: { "line-join": "round" },
              paint: { "line-color": MAP.stamp, "line-opacity": 0.3, "line-width": 1.5, "line-dasharray": [2, 3] },
            })
            m.addLayer({
              id: "route-glow",
              type: "line",
              source: "route",
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": MAP.stamp, "line-width": 12, "line-blur": 8, "line-opacity": 0.45 },
            })
            m.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: { "line-cap": "round", "line-join": "round" },
              paint: { "line-color": MAP.stamp, "line-width": 3 },
            })

            const me = pin(us.me.name, us.me.city)
            me.addEventListener("click", () => fly(us.me.coords))
            new maplibregl.Marker({ element: me }).setLngLat(lngLat(us.me.coords)).addTo(m)
            const you = pin(us.you.name, us.you.city, youPhoto)
            you.addEventListener("click", () => fly(us.you.coords))
            new maplibregl.Marker({ element: you }).setLngLat(lngLat(us.you.coords)).addTo(m)

            const heart = document.createElement("div")
            heart.className = "pin-heart"
            heart.innerHTML = `<svg viewBox="0 0 40 36" width="26" height="24" aria-hidden="true"><path fill="${MAP.stamp}" stroke="#fff" stroke-width="2.5" d="${HEART}"/></svg>`
            heartMarker.current = new maplibregl.Marker({ element: heart }).setLngLat(ROUTE[0]).addTo(m)

            setStatus("ready")
            play()
          })
          m.on("error", () => {
            if (!m.loaded()) setStatus("error")
          })
        } catch {
          setStatus("error")
        }
      },
      { rootMargin: "120px" }
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      cancelAnimationFrame(raf.current)
      map.current?.remove()
      map.current = null
    }
  }, [play, fly, youPhoto])

  const ready = status === "ready"
  const jumps: [string, () => void][] = [
    [us.me.city, () => fly(us.me.coords)],
    ["Whole route", () => fly("route")],
    [us.you.city, () => fly(us.you.coords)],
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[3px] bg-foreground p-2.5 shadow-[var(--shadow-table)] lg:p-3">
        <div className="photo relative aspect-[4/5] overflow-hidden rounded-[2px] sm:aspect-[16/11] lg:aspect-[16/10]">
          {/* MapLibre forces position: relative on its container, so the sizing lives on a wrapper. */}
          <div className="absolute inset-0">
            <div ref={box} className="size-full" aria-label={`Map of the road from ${us.me.city} to ${us.you.city}`} />
          </div>
          {!ready && (
            <div className="absolute inset-0 z-[3] grid place-items-center p-6 text-center">
              {status === "error" ? (
                <p className="max-w-xs text-sm text-window-muted">
                  The map didn&apos;t load this time. The route is still right there on Google Maps.
                </p>
              ) : (
                <p className="animate-pulse font-pen text-3xl text-foreground/80">unfolding the map…</p>
              )}
            </div>
          )}
          <div className="pointer-events-none absolute bottom-3 left-3 z-[3] flex flex-col gap-1 rounded-[3px] bg-window/85 px-3 py-2.5 sm:bottom-4 sm:left-4">
            <p className="flex items-end gap-2">
              <SevenSeg
                value={String(ready ? shownKm : ROAD_KM).padStart(4, " ")}
                label={`${ROAD_KM} km by road`}
                className="stamp-glow h-9 sm:h-11"
              />
              <span className="pb-0.5 text-xs font-semibold tracking-[0.12em] text-window-muted uppercase" aria-hidden>
                km
              </span>
            </p>
            <p className="text-xs text-window-muted">by road, ferry included</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Button asChild size="lg" className="h-11 rounded-full px-5 text-[0.95rem] font-semibold">
          <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer">
            Open the route in Google Maps
            <ExternalLinkIcon data-icon="inline-end" />
          </a>
        </Button>
        <Button variant="ghost" size="lg" className="h-11 rounded-full px-4" onClick={play} disabled={!ready}>
          <RotateCcwIcon data-icon="inline-start" />
          Drive it again
        </Button>
        <span className="flex items-center gap-0.5 rounded-full bg-frame-deep p-1" role="group" aria-label="Move the map">
          {jumps.map(([label, go]) => (
            <Button
              key={label}
              variant="ghost"
              size="lg"
              className="h-11 rounded-full px-3.5"
              onClick={go}
              disabled={!ready}
            >
              {label}
            </Button>
          ))}
        </span>
      </div>
    </div>
  )
}
