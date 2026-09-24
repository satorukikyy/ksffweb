import type { LatLng } from "@/lib/time"

// Everything personal lives here. Edit freely; the page reads only this file.
// Anything in [brackets] or set to null is a placeholder waiting for the real thing.

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
