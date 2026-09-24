import { Button } from "@/components/ui/button"
import { SevenSeg } from "@/components/seven-seg"
import { us } from "@/lib/us"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center gap-6 px-4 sm:px-6">
      <SevenSeg value="404" label="Error 404" className="stamp-glow h-20" />
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
        This page got lost somewhere between {us.me.city} and {us.you.city}.
      </h1>
      <p className="text-lg text-frame-soft">Everything worth seeing is on the front page.</p>
      <Button asChild size="lg" className="h-12 rounded-full px-5 text-[0.95rem] font-semibold">
        <a href="/">Back to the front page</a>
      </Button>
    </main>
  )
}
