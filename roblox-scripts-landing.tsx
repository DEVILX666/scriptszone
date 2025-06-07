"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Loader2, Download, CheckCircle, Shield, Lock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

// Memoized components to reduce re-renders
const MemoizedBadge = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="bg-[#00ff88]/10 backdrop-blur-sm px-5 py-2 rounded-xl text-sm flex items-center gap-2 border border-[#00ff88]/20 hover:bg-[#00ff88]/15 transition-colors duration-300">
    {icon} {text}
  </div>
))
MemoizedBadge.displayName = "MemoizedBadge"

const MemoizedFeature = memo(({ icon, name }: { icon: string; name: string }) => (
  <div className="bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-xl text-center border border-white/10 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,255,136,0.15)] group">
    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className="font-medium">{name}</div>
  </div>
))
MemoizedFeature.displayName = "MemoizedFeature"

export default function RobloxScriptsLanding() {
  const [downloadState, setDownloadState] = useState<"download" | "preparing" | "redirecting">("download")
  const particlesRef = useRef<HTMLDivElement>(null)

  // Create particles with optimized performance
  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current
      // Reduced particle count for better performance
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add("particle")

        const size = Math.random() * 8 + 2
        const posX = Math.random() * 100
        const duration = Math.random() * 20 + 15
        const delay = Math.random() * -20

        // Simplified color generation
        const hue = Math.floor(Math.random() * 120) + 120 // Limit color range for better performance
        const color = `hsl(${hue}, 80%, 60%)`

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${posX}%`
        particle.style.bottom = `-10px`
        particle.style.background = color
        particle.style.animationDuration = `${duration}s`
        particle.style.animationDelay = `${delay}s`
        particle.style.opacity = "0.5"

        particles.appendChild(particle)
      }
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ""
      }
    }
  }, [])

  // Handle download button click with optimized transitions
  const handleDownload = useCallback(() => {
    setDownloadState("preparing")

    // Optimized transition timing
    setTimeout(() => {
      setDownloadState("redirecting")

      // Redirect with minimal animation
      setTimeout(() => {
        window.location.href = "https://installchecker.site/cl/i/2ljkdp"
      }, 1000)
    }, 1000)
  }, [])

  // Optimized motion variants for better performance
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans">
      {/* Floating Particles - optimized */}
      <div ref={particlesRef} className="particles fixed w-full h-full top-0 left-0 z-0 pointer-events-none"></div>

      {/* Main Content - always visible */}
      <motion.div
        className="container max-w-4xl mx-auto px-6 py-16 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src="https://i.imgur.com/SYt9D3P.png"
              alt="Roblox Scripts Logo"
              width={220}
              height={66}
              className="h-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Premium Roblox Scripts
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            UNLOCK ALL PREMIUM GROW A GARDEN SCRIPTS NOW! 🔥
          </motion.p>

          {/* Download Button - optimized */}
          <motion.div
            className="mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              onClick={handleDownload}
              disabled={downloadState !== "download"}
              className={`
                inline-block px-12 py-5 text-2xl font-bold text-black 
                bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] 
                rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]
                transition-all duration-300 relative overflow-hidden
                ${downloadState !== "download" ? "opacity-90" : "hover:scale-105"}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {downloadState === "download" && (
                <>
                  <Download className="inline-block mr-3 h-6 w-6" /> DOWNLOAD NOW (3.2MB)
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
                </>
              )}
              {downloadState === "preparing" && (
                <>
                  <Loader2 className="inline-block mr-3 h-6 w-6 animate-spin" /> PREPARING...
                </>
              )}
              {downloadState === "redirecting" && (
                <>
                  <CheckCircle className="inline-block mr-3 h-6 w-6" /> REDIRECTING...
                </>
              )}
            </motion.button>

            <motion.div
              className="flex justify-center gap-6 flex-wrap mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { icon: <Shield className="h-4 w-4 text-[#00ff88]" />, text: "Anti-Ban" },
                { icon: <Lock className="h-4 w-4 text-[#00ff88]" />, text: "Secure Download" },
                { icon: <Zap className="h-4 w-4 text-[#00ff88]" />, text: "Undetected" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <MemoizedBadge icon={badge.icon} text={badge.text} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </header>

        {/* Features Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#8a2be2] to-[#00ff88] bg-clip-text text-transparent">
            🔥 Premium Features Included
          </h2>

          {/* Features Grid - optimized with memoized components */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "💎", name: "Dupe Items" },
              { icon: "🛑", name: "Item Stealer" },
              { icon: "🐾", name: "Pet-Spawner" },
              { icon: "🌱", name: "Fast Growth" },
              { icon: "🛒", name: "Auto Buy" },
              { icon: "⚡", name: "120FPS Boost" },
              { icon: "⚙️", name: "Auto Farm" },
              { icon: "🔍", name: "ESP" },
              { icon: "🌾", name: "Infinite Seeds" },
              { icon: "🚫", name: "No Cooldowns" },
              { icon: "🌻", name: "Auto Sell" },
              { icon: "🔄", name: "Auto Harvest" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
              >
                <MemoizedFeature icon={feature.icon} name={feature.name} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Features */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-[#111]/80 to-[#222]/80 p-8 rounded-2xl border border-[#00ff88]/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-[#00ff88]">🔒 100% Anti-ban</h3>
            <p className="text-gray-300 text-lg mb-4">
              Advanced anti-detection technology keeps you safe from bans and safe and secure and 100K players used it
              right now
            </p>
          </div>
        </motion.section>
      </motion.div>

      <style jsx global>{`
        :root {
          --primary: #00ff88;
          --secondary: #8a2be2;
          --accent: #00bfff;
          --bg-dark: #0a0a0a;
          --bg-light: #111;
          --text: #ffffff;
        }

        body {
          background-color: var(--bg-dark);
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(138, 43, 226, 0.08), transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(0, 191, 255, 0.08), transparent 40%);
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
          will-change: transform;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          5% { opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shine {
          animation: shine 2s infinite;
          will-change: transform;
        }

        /* Improve animation performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  )
}
