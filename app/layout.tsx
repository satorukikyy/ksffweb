import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Nanum_Pen_Script } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers"
import { us } from "@/lib/us"
import { cn } from "@/lib/utils"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
})

const pen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nanum-pen",
})

export const metadata: Metadata = {
  title: `For ${us.you.name}`,
  description: `A little place for ${us.you.name}, from ${us.me.name}. ${us.me.city} to ${us.you.city}, same clock.`,
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: "#a51c34",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("antialiased", bricolage.variable, pen.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
