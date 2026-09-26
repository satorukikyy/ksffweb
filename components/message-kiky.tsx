"use client"

import { MessageCircleHeartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { clock } from "@/lib/time"
import { us, waLink } from "@/lib/us"
import { useNow } from "@/lib/use-now"
import { cn } from "@/lib/utils"

// Opens WhatsApp with a prefilled note; Amanda can still edit it before sending.
export function MessageKiky({
  className,
  variant,
}: {
  className?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const now = useNow()
  const time = now ? ` It's ${clock(now, us.timeZone).text} ${us.timeZoneLabel} here in ${us.you.city}.` : ""
  const text = `Hi ${us.me.name}, I'm thinking of you.${time}`

  return (
    <Button
      asChild
      size="lg"
      variant={variant}
      className={cn("h-12 rounded-full px-5 text-[0.95rem] font-semibold", className)}
    >
      <a href={waLink(text)} target="_blank" rel="noopener noreferrer">
        <MessageCircleHeartIcon data-icon="inline-start" />
        Text {us.me.name} on WhatsApp
      </a>
    </Button>
  )
}
