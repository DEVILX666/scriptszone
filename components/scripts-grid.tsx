"use client"

import { ScriptCard } from "./script-card"
import { scripts } from "@/lib/scripts-data"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ScriptsGrid() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredScripts = useMemo(() => {
    if (!searchQuery.trim()) return scripts

    const query = searchQuery.toLowerCase()
    return scripts.filter(
      (script) =>
        script.name.toLowerCase().includes(query) ||
        script.game.toLowerCase().includes(query) ||
        script.description.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <section id="scripts" className="relative py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Section header - optimized for mobile */}
          <div className="text-center space-y-2 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Premium Scripts
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Choose from our collection of premium scripts for the most popular Roblox games
            </p>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search scripts by name, game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Scripts grid - optimized for mobile with better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredScripts.length > 0 ? (
              filteredScripts.map((script) => <ScriptCard key={script.id} script={script} />)
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No scripts found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
