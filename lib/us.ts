import type { LatLng } from "@/lib/time"

// Everything personal lives here. Edit freely; the page reads only this file.
// Anything in [brackets] or set to null is a placeholder waiting for the real thing.

export type Scene = "sleep" | "coffee" | "work" | "eat" | "phone"

export const us = {
  me: {
    name: "Kiky",
    city: "Depok",
    region: "West Java",
    coords: [-6.4, 106.8186] as LatLng,
    whatsapp: "6285716491620", // 0857-1649-1620, international format for wa.me
  },
  you: {
    name: "Amanda",
    fullName: "Amanda Safira",
    city: "Bireuen",
    region: "Aceh",
    coords: [5.2, 96.7] as LatLng,
  },
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "WIB",

  // "YYYY-MM-DD", read as WIB. null shows "date to be decided".
  nextVisit: null as string | null,

  letters: [
    {
      id: "miss",
      when: "you miss me",
      body: [
        "Hey you. If you're reading this, you miss me, and I promise it's mutual.",
        "Right now I'm probably doing something boring in Depok and thinking about you anyway. Close your eyes for ten seconds and picture me annoying you in person. That part is coming.",
        "Until then, text me. Even just \"hey\". It always counts.",
      ],
    },
    {
      id: "sleep",
      when: "you can't sleep",
      body: [
        "Can't sleep? Same clock, remember. I'm either awake too, or I'll wake up to your message and smile.",
        "Put the phone down after this. Breathe slow. Think about the next time I get to hear you fall asleep on a call.",
        "Good night, Amanda. I mean it. Sleep.",
      ],
    },
    {
      id: "bad-day",
      when: "you had a bad day",
      body: [
        "I'm sorry today was heavy. You don't have to be okay right now, and you don't have to explain it unless you want to.",
        "Eat something, drink some water, and be gentle with yourself for the rest of the night. Tomorrow gets a fresh start.",
        "Whatever happened, I'm still on your side. Always.",
      ],
    },
    {
      id: "laugh",
      when: "you need a laugh",
      body: [
        "Emergency laugh plan: picture me trying to cook something fancy for you and setting off the smoke alarm.",
        "Now picture me standing in the smoke, insisting it was on purpose.",
        "That's the future you signed up for. You're welcome.",
      ],
    },
    {
      id: "proud",
      when: "you're proud of yourself",
      body: [
        "Look at you. Whatever you just did, I'm proud of you too, probably louder than you are.",
        "Screenshot this and send it to me so I can hear the whole story. Every detail, even the boring parts. Especially the boring parts.",
      ],
    },
    {
      id: "counting",
      when: "you're counting the days",
      body: [
        "Me too. Every day that passes is one less between us, and that math only goes one way.",
        "Waiting is hard, so make it a little easier: pick one thing we'll do first when I see you, and tell me. I'll make it happen.",
      ],
    },
  ],

  // What I'm probably doing, by WIB hour (0 to 23). Each entry runs until the next one starts.
  // Scenes: sleep, coffee, work, eat, phone. Lines are starters, make them true.
  day: [
    { from: 0, scene: "sleep", line: "Asleep. Probably dreaming about you." },
    { from: 6, scene: "coffee", line: "Coffee first. Then checking if you texted." },
    { from: 9, scene: "work", line: "Busy, with you in the back of my head." },
    { from: 12, scene: "eat", line: "Lunch. Eating properly, like you told me to." },
    { from: 13, scene: "work", line: "Afternoon grind. Counting down to talking to you." },
    { from: 18, scene: "phone", line: "Done for the day. Staring at my phone, waiting for you." },
    { from: 23, scene: "phone", line: "Should be asleep. Would rather be talking to you." },
  ] as { from: number; scene: Scene; line: string }[],

  // Starter coupons. Redeeming one opens WhatsApp with the coupon in the message.
  coupons: [
    { id: "call", title: "One video call, right now", fine: "Valid any hour. Even 2 a.m. Especially 2 a.m." },
    { id: "right", title: "One \"you were right\"", fine: "Said out loud, fully meant, no \"but\" at the end." },
    { id: "snack", title: "One snack, on me", fine: "You pick it, I get it delivered to your door in Bireuen." },
    { id: "sulk", title: "One free sulk", fine: "Sulk as long as you like. I'll wait it out and still be here." },
    { id: "song", title: "One song, sung by me", fine: "Delivered as a voice note. Off-key is part of the deal." },
    { id: "plan", title: "One day, planned by you", fine: "Next visit. You make the plan, I show up and say yes." },
  ],

  // Starter lines. Swap in your own, the specific ones always land better.
  reasons: [
    "My day gets lighter the second your name pops up on my screen.",
    "Falling asleep on a call with you feels like being in the same room.",
    "You make a long distance feel like a short walk.",
    "Missing you is hard, but it's never confusing. It's you, and that's that.",
    "Every plan I make now has a little room in it for you.",
    "You make ordinary days worth telling someone about.",
    "Good morning from you hits different.",
    "You're my favorite notification. Sorry, everyone else.",
    "I like who I am when I'm talking to you.",
    "Even the waiting feels like it's going somewhere.",
    "You're the first person I want to tell things to.",
    "Because it's you. Honestly, that's the whole list.",
  ],

  // Photos live in /public/photos. A missing file shows an empty frame. date: "YYYY-MM-DD" or null.
  photos: [
    {
      src: "/photos/amanda-1.jpg",
      alt: "Amanda in a striped top, pouting at the camera",
      title: "This face.",
      note: "The one I think about when I should be working.",
      date: null,
    },
    {
      src: "/photos/amanda-2.jpg",
      alt: "Amanda in a black hijab, smiling",
      title: "That smile.",
      note: "Worth every one of those kilometers.",
      date: null,
    },
    {
      src: "/photos/amanda-3.png",
      alt: "Amanda blowing an air kiss, two frames stacked",
      title: "Air kiss, received.",
      note: "Saved. Obviously.",
      date: null,
    },
  ] as { src: string; alt: string; title: string; note: string; date: string | null }[],

  // Used for Amanda's pin on the map.
  avatar: "/photos/amanda-avatar.jpg",
}

// WhatsApp chat with Kiky, message prefilled. Amanda can still edit it before sending.
export const waLink = (text: string) => `https://wa.me/${us.me.whatsapp}?text=${encodeURIComponent(text)}`
