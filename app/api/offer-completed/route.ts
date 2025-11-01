import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Offer completion received:", body)

    // Verify the completion with lockverify.org API
    const { offer_id, user_ip, user_agent, status, game_name } = body

    if (status === "completed") {
      console.log(`Offer ${offer_id} completed by ${user_ip} for game: ${game_name}`)

      // Store completion in database (you would implement this)
      // For now, we'll return the script URL for the specific game

      // Map game names to script URLs
      const scriptUrls: { [key: string]: string } = {
        "99 Nights in the Forest": "https://99nightsscripts.vercel.app/",
        "Plants Vs Brainrots": "https://plantsvsbrainrotsscripts.vercel.app/",
        "Grow a Garden": "https://premiumscripts.vercel.app/",
        "Steal a Brainrot": "https://stealbrainrotscripts.vercel.app/",
        "Brookhaven": "https://brookhavenscripts.vercel.app/",
      }

      const scriptUrl = scriptUrls[game_name] || "https://premiumscripts.vercel.app/"

      return NextResponse.json({
        success: true,
        timerStarted: true,
        scriptUrl: scriptUrl,
        message: "Offer completed - timer started",
      })
    }

    return NextResponse.json({ success: false, message: "Offer not completed" })
  } catch (error) {
    console.error("Error handling offer completion:", error)
    return NextResponse.json({ error: "Failed to process completion" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Offer completion endpoint" })
}
