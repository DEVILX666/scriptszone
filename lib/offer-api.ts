export interface Offer {
  id: string
  title: string
  description: string
  difficulty: "VERY EASY" | "EASY" | "MEDIUM" | "HARD"
  reward: string
  url: string
  icon?: string
  category?: string
}

export interface OfferApiResponse {
  success: boolean
  offers: Offer[]
  error?: string
}

const API_BASE_URL = "https://installchecker.site/api/v2"
const API_KEY = "36037|rX5DteReRl8FOTGQcYytqqBYIqN0guGx6MF2G6sMc79706ca"

export async function fetchOffers(userIP: string, userAgent: string, maxOffers = 6): Promise<OfferApiResponse> {
  try {
    const params = new URLSearchParams({
      ip: userIP,
      user_agent: userAgent,
      max: "6",
      min: "6",
      ctype: "1",
    })

    const response = await fetch(`${API_BASE_URL}?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("API Response:", data)
    console.log("Number of offers from API:", data.offers?.length || 0)

    const offers: Offer[] =
      data.offers?.map((offer: any, index: number) => ({
        id: offer.offerid?.toString() || `offer-${index}`,
        title: offer.name_short || offer.name || "Complete Offer",
        description: offer.adcopy || offer.description || "Complete this offer to unlock premium scripts",
        difficulty: "VERY EASY",
        reward: "Premium Scripts Access",
        url: offer.link || "#",
        icon: offer.picture || getDefaultOfferIcon(index),
        category: offer.device || "General",
      })) || []

    console.log("API offers count:", offers.length)
    console.log(
      "API offers:",
      offers.map((o) => o.title),
    )

    return {
      success: true,
      offers: offers,
    }
  } catch (error) {
    console.error("Error fetching offers:", error)
    return {
      success: false,
      offers: [],
      error: error instanceof Error ? error.message : "Failed to fetch offers",
    }
  }
}

function getDefaultOfferIcon(index: number): string {
  const icons = [
    "https://cdn-icons-png.flaticon.com/512/888/888857.png",
    "https://cdn-icons-png.flaticon.com/512/888/888854.png",
    "https://cdn-icons-png.flaticon.com/512/888/888851.png",
    "https://cdn-icons-png.flaticon.com/512/888/888848.png",
  ]
  return icons[index % icons.length]
}

export async function getUserIP(): Promise<string> {
  try {
    if (typeof window === "undefined") {
      return "127.0.0.1"
    }

    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error("Error fetching IP:", error)
    return "127.0.0.1"
  }
}
