export interface GameScript {
  id: string
  name: string
  description: string
  category: "FPS" | "RPG" | "Simulator" | "Adventure" | "Obby" | "Horror" | "Other"
  features: string[]
  logoUrl: string
}

export const gameScripts: GameScript[] = [
  {
    id: "steal-brainrot",
    name: "Steal a Brainrot",
    description: "",
    category: "Adventure",
    features: ["Auto Steal", "Item ESP", "Speed Hack", "TELEPORT", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-598b7294760eb03d16baa6f2d58221f3/150/150/Image/Webp/noFilter",
  },
  {
    id: "plants-vs-brainrots",
    name: "Escape Tsunami For Brainrots",
    description: "",
    category: "Other",
    features: ["Item Dupe", "Auto Farm & Auto Buy", "Auto-Attack", "Kill-Aura", "No Cooldown"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-1672c48d00e803abd07b5ce24a9e7d27/150/150/Image/Webp/noFilter",
  },
  {
    id: "grow-garden",
    name: "RIVALS",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/150/150/Image/Webp/noFilter",
  },
  {
    id: "99-nights-forest",
    name: "99 Nights in the Forest",
    description: "",
    category: "Horror",
    features: ["Diamonds Finder", "Godmode", "Kill-Aura", "Auto Rescue Child", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-c8912f9bbd8f573fee48f73f0529cf59/150/150/Image/Webp/noFilter",
  },
  {
    id: "brookhaven",
    name: "Brookhaven",
    description: "",
    category: "RPG",
    features: ["Teleport", "Speed Hack", "Godmode", "Item Spawn", "Fly"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-dd996ac969cb40bbede0512178c95ce9/150/150/Image/Webp/noFilter",
  },
   {
    id: "brookhaven",
    name: "Blox Fruits",
    description: "",
    category: "RPG",
    features: ["Teleport", "Speed Hack", "Godmode", "Item Spawn", "Fly"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-f58da008ccb8da3f107be1a6408aaef3/150/150/Image/Webp/noFilter",
  },
]
