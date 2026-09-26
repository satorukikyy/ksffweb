import { MailIcon } from "lucide-react"

import { FooterPair, Logo } from "@/components/cameos"
import { Coupons } from "@/components/coupons"
import { DistanceMap } from "@/components/distance-map"
import { ArrowDoodle, SquiggleDoodle } from "@/components/doodles"
import { Hug } from "@/components/hug"
import { Letters } from "@/components/letters"
import { Meanwhile } from "@/components/meanwhile"
import { MessageKiky } from "@/components/message-kiky"
import { Reasons } from "@/components/reasons"
import { StickyAfter } from "@/components/in-view"
import { hasPhoto, Roll } from "@/components/roll"
import { Strip } from "@/components/strip"
import { Button } from "@/components/ui/button"
import { ROAD_HOURS, ROAD_KM } from "@/lib/route"
import { kmBetween } from "@/lib/time"
import { us } from "@/lib/us"

const straightKm = kmBetween(us.me.coords, us.you.coords).toLocaleString("en-US")
const roadKm = ROAD_KM.toLocaleString("en-US")

const h2 = "text-[clamp(2.1rem,5vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.03em]"
const lede = "max-w-[40ch] text-lg leading-relaxed text-frame-soft"

export default function Page() {
  return (
    <div id="top" className="overflow-x-clip">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-5 sm:px-6">
        <Logo />
        <nav aria-label="Sections" className="hidden gap-6 text-sm font-medium text-frame-soft md:flex lg:gap-7">
          <a href="#map" className="hover:text-foreground hover:underline">The map</a>
          <a href="#hug" className="hover:text-foreground hover:underline">Hugs</a>
          <a href="#letters" className="hover:text-foreground hover:underline">Letters</a>
          <a href="#reasons" className="hover:text-foreground hover:underline">Reasons</a>
          <a href="#coupons" className="hover:text-foreground hover:underline">Coupons</a>
          <a href="#roll" className="hover:text-foreground hover:underline">Our roll</a>
        </nav>
      </header>

      <main className="pb-28 md:pb-0">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-8 pb-20 sm:px-6 lg:gap-12 lg:pt-14 lg:pb-28">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-12">
            <h1 className="max-w-[12ch] text-[clamp(2.75rem,7.4vw,5.5rem)] leading-[0.93] font-extrabold tracking-[-0.035em]">
              {us.you.name}, this one&apos;s for{" "}
              <span className="relative inline-block">
                you.
                <SquiggleDoodle className="absolute -bottom-2 left-0 h-3 w-[92%] text-stamp" />
              </span>
            </h1>
            <div className="flex flex-col gap-6 lg:pb-2">
              <p className={lede}>
                Same clock, {roadKm} km of road apart.
                <span className="hidden sm:inline"> A small place for the days in between, all from me.</span>
              </p>
              <div id="hero-actions" className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-full px-5 text-[0.95rem] font-semibold">
                  <a href="#letters">
                    <MailIcon data-icon="inline-start" />
                    Open a letter
                  </a>
                </Button>
                <MessageKiky variant="secondary" />
              </div>
            </div>
          </div>
          <div className="relative">
            <p className="absolute -top-11 left-[25%] hidden items-start gap-2 font-pen text-2xl text-frame-soft lg:flex">
              <ArrowDoodle className="mt-3 h-9 w-12 -scale-x-100 rotate-[20deg] text-frame-soft" />
              the clock is live, by the way
            </p>
            <Strip />
          </div>
        </section>

        <section id="now" className="mx-auto grid max-w-6xl scroll-mt-6 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div className="flex flex-col gap-4 lg:order-2">
            <h2 className={h2}>Meanwhile, in {us.me.city}.</h2>
            <p className={lede}>
              A live guess at what I&apos;m doing, going by the clock we share. Mostly accurate. The thinking about you
              part is always accurate.
            </p>
          </div>
          <Meanwhile />
        </section>

        <section id="map" className="mx-auto grid max-w-6xl scroll-mt-6 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:py-24">
          <div className="flex flex-col gap-4 lg:sticky lg:top-10 lg:self-start">
            <h2 className={h2}>
              {us.me.city} to {us.you.city}.
            </h2>
            <p className={lede}>
              {roadKm} km by road, about {ROAD_HOURS} hours of driving: the ferry across the Sunda Strait, then up
              almost the whole of Sumatra. {straightKm} km in a straight line. Same clock the whole way.
            </p>
          </div>
          <DistanceMap youPhoto={hasPhoto(us.avatar) ? us.avatar : undefined} />
        </section>

        <section id="hug" className="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-10 px-4 py-16 sm:px-6 lg:gap-12 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className={h2}>Come here, you.</h2>
            <p className={lede}>
              Press and hold until we meet in the middle. It&apos;s the closest thing to a hug a website can do. For now.
            </p>
          </div>
          <Hug />
        </section>

        <section id="letters" className="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-10 px-4 py-16 sm:px-6 lg:gap-14 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className={h2}>Open when…</h2>
            <p className={lede}>
              {us.letters.length} letters for {us.letters.length} kinds of days. Pick the one that fits today. They&apos;ll
              still be here tomorrow.
            </p>
          </div>
          <Letters />
        </section>

        <section id="reasons" className="mx-auto grid max-w-6xl scroll-mt-6 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:py-24">
          <div className="flex flex-col gap-4 lg:pt-6">
            <h2 className={h2}>Reasons, in no particular order.</h2>
            <p className={lede}>
              {us.reasons.length} so far. Tap for another one. The list keeps getting longer.
            </p>
          </div>
          <Reasons />
        </section>

        <section id="coupons" className="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-10 px-4 py-16 sm:px-6 lg:gap-14 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className={h2}>Coupons. They never expire.</h2>
            <p className={lede}>
              Cash one in whenever you like. It opens WhatsApp with the message ready, so I can&apos;t pretend I didn&apos;t
              see it.
            </p>
          </div>
          <Coupons />
        </section>

        <section id="roll" className="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-12 px-4 py-16 sm:px-6 lg:gap-16 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className={h2}>Our roll.</h2>
            <p className={lede}>A few frames of you, taped up where I can see them every day.</p>
            <p className="flex items-center gap-2 font-pen text-2xl text-frame-soft sm:hidden">
              swipe
              <ArrowDoodle className="h-7 w-10 -rotate-12 text-frame-soft" />
            </p>
          </div>
          <Roll />
        </section>
      </main>

      <footer className="relative bg-frame-deep">
        <FooterPair />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-16 pb-36 sm:px-6 md:pb-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <div className="flex flex-col gap-4">
            <p className="font-pen text-[clamp(3.25rem,9vw,6rem)] leading-[0.85]">See you soon, {us.you.name}.</p>
            <p className="text-frame-soft">
              Love, {us.me.name}, from {us.me.city}. Made for one person only.
            </p>
          </div>
          <MessageKiky className="hidden md:inline-flex" />
        </div>
      </footer>

      <StickyAfter afterId="hero-actions">
        <MessageKiky className="w-full" />
      </StickyAfter>
    </div>
  )
}
