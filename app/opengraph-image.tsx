import { ImageResponse } from "next/og"

import { kmBetween } from "@/lib/time"
import { us } from "@/lib/us"

export const alt = `For ${us.you.name}, from ${us.me.name}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  const km = kmBetween(us.me.coords, us.you.coords).toLocaleString("en-US")
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#a6263b", padding: 56 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            background: "#fbf9f9",
            padding: 18,
            borderRadius: 6,
            transform: "rotate(-1.5deg)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "#1f1b1c",
              color: "#fbf9f9",
              padding: "48px 56px",
              borderRadius: 3,
            }}
          >
            <div style={{ fontSize: 34, color: "#cfc6c7" }}>
              {`${us.me.city} to ${us.you.city} · ${km} km · same clock`}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 118, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
                {`For ${us.you.name}.`}
              </div>
              <div style={{ fontSize: 40, color: "#f59a3a", marginTop: 18 }}>{`from ${us.me.name}, with love`}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
