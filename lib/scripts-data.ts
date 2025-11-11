export interface Script {
  id: string
  name: string
  game: string
  description: string
  category: "FPS" | "RPG" | "Simulator" | "Adventure" | "Obby" | "Horror" | "Other"
  features: string[]
  thumbnailUrl: string
  lockerUrl: string
}

export const scripts: Script[] = [
  {
    id: "steal-brainrot-3",
    name: "GO TO BASE SCRIPT",
    game: "Steal a Brainrot",
    description: "STEAL AND TELEPORT TO BASE IN SECOND 🔥",
    category: "Adventure",
    features: [],
    thumbnailUrl: "https://i.imgur.com/FsNdwuc.png",
    lockerUrl: "https://installchecker.site/cl/i/l7k6o6",
  },
  {
    id: "steal-brainrot-1",
    name: "ROBLOX CHAT FILTER BYPASS SCRIPT",
    game: "Roblox",
    description: "TYPE ANYTHING WITHOUT GETTING FILTERED 🔥",
    category: "Adventure",
    features: ["Auto Steal", "Item ESP", "Speed Hack", "TELEPORT", "FLY"],
    thumbnailUrl: "https://solvexscripts.com/covers/8.webp",
    lockerUrl: "https://installchecker.site/cl/i/w6orm7",
  },
  {
    id: "steal-brainrot-2",
    name: "UNLOCK ROBLOX VOICE CHAT SCRIPT",
    game: "Roblox",
    description: "UNLOCK VOICE CHAT WITHOUT ID VERIFICATION 🔥",
    category: "Adventure",
    features: ["Auto Farm", "ESP", "Speed", "Teleport"],
    thumbnailUrl: "https://solvexscripts.com/covers/3.webp",
    lockerUrl: "https://installchecker.site/cl/i/gr6l42",
  },
  {
    id: "99-nights-1",
    name: "DIAMONDS AUTO FARM SCRIPT",
    game: "99 Nights in the Forest",
    description: "AUTO FARM DIAMONDS EASILY 🔥",
    category: "Horror",
    features: ["Diamonds Finder", "Godmode", "Kill-Aura", "Auto Rescue Child", "FLY"],
    thumbnailUrl: "https://imgs.search.brave.com/JTDLOxCLuEZ16DstbQx83rsejoxCBIKfb1jHIEwFyb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly85OW5p/Z2h0c2ludGhlZm9y/ZXN0c2NyaXB0LnBy/by93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NS8wOS9TY3JpcHQt/OTktTmlnaHRzLWlu/LXRoZS1Gb3Jlc3Qt/Um9ibG94LndlYnA",
    lockerUrl: "https://installchecker.site/cl/i/6nd1km",
  },
]
