"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Loader2, Download, CheckCircle, Shield, Lock, Zap, ChevronRight, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Random Roblox-style usernames - reduced list for better performance
const robloxUsernames = [
  "MoonBunny777",
  "ProGamer2024",
  "RobloxKing123",
  "CoolDude456",
  "GalaxyQueen99",
  "NinjaWarrior55",
  "DiamondGirl22",
  "EpicPlayer888",
  "StarDestroyer42",
  "UnicornLover11",
  "DragonSlayer99",
  "PixelMaster64",
  "ShadowNinjaX",  
  "NeonGhost404",  
  "CosmicTiger99",  
  "PixelHunter23",  
  "CyberWolf777",  
  "StarlightDreamer",  
  "BlazeRider2024",  
  "MysticFox55",  
  "ThunderStrike88",  
  "LunarPhoenix11",  
  "DarkKnight3000",  
  "AquaDragon42",  
  "GoldenEagle777",  
  "FrostByte64",  
  "EmeraldQueen33",  
  "TechWizard101",  
  "InfernoBlaze99",  
  "CrystalWolfX",  
 "SolarFlare2024",  
 "MidnightRacerZ",  
"BubbleGumPanda",  
"CupcakeSprinkle",  
"HappyPuppy123",  
"RainbowDashie",  
"Snickerdoodle22",  
"FluffyBunnyHop",  
"SugarRushKid",  
"BerryBlast99",  
"CottonCandyX",  
"LuckyKitten777",  
"NoobSlayer9000",  
"PotatoGamer123",  
"BananaPeelSlip",  
"TacoNinja42",  
"PizzaLord2024",  
"DerpHunter64",  
"AFKForever99",  
"Error404Found",  
"LaggyMcLag"  
]

type Notification = {
  id: number
  username: string
  message: string
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
  const [name, setName] = useState("")
  const [nameSubmitted, setNameSubmitted] = useState(false)
  const [showUnlockProcess, setShowUnlockProcess] = useState(true)
  const [downloadState, setDownloadState] = useState<"download" | "preparing" | "redirecting">("download")
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const successSoundRef = useRef<HTMLAudioElement>(null)
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressAnimationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const steps = [
    "Verifying Roblox session...",
    "Bypassing anti-cheat...",
    "Injecting script loader...",
    "Decrypting premium scripts...",
    "Finalizing unlock sequence...",
  ]

  const stepsData = [
    { text: `Verified session (ID: ROBLOX_${Math.random().toString(36).substr(2, 8).toUpperCase()})`, delay: 1500 },
    { text: `Bypassed anti-cheat v${Math.floor(Math.random() * 5) + 1}.x`, delay: 2000 },
    { text: "Injector ready (API v3.2.1)", delay: 2500 },
    { text: "Decrypted 99+ premium scripts", delay: 1800 },
    { text: "Unlock sequence complete", delay: 1000 },
  ]

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

  // Optimized notification system with 10-second interval
  const showNewNotification = useCallback(() => {
    const randomUsername = robloxUsernames[Math.floor(Math.random() * robloxUsernames.length)]
    const newNotification = {
      id: Date.now(),
      username: randomUsername,
      message: "UNLOCKED PREMIUM SCRIPTS PACK",
    }

    setCurrentNotification(newNotification)

    // Play success sound with error handling
    if (successSoundRef.current) {
      successSoundRef.current.currentTime = 0
      const playPromise = successSoundRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle autoplay restrictions
        })
      }
    }

    // Clear previous timer to prevent memory leaks
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current)
    }

    // Auto-hide notification after 6 seconds
    notificationTimerRef.current = setTimeout(() => {
      setCurrentNotification(null)

      // Wait 4 seconds before showing the next notification (total 10 seconds)
      notificationTimerRef.current = setTimeout(() => {
        showNewNotification()
      }, 4000)
    }, 6000)
  }, [])

  // Show notifications after user submits name - optimized
  useEffect(() => {
    if (nameSubmitted && !showUnlockProcess) {
      // Show first notification after a short delay
      const timer = setTimeout(() => {
        showNewNotification()
      }, 1000)

      return () => {
        clearTimeout(timer)
        if (notificationTimerRef.current) {
          clearTimeout(notificationTimerRef.current)
        }
      }
    }
  }, [nameSubmitted, showUnlockProcess, showNewNotification])

  // Handle name submission with optimized transition
  const handleNameSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (name.trim()) {
        setIsLoading(true)

        // Add a small delay for smoother transition
        setTimeout(() => {
          setNameSubmitted(true)
          simulateUnlock()
        }, 600)
      }
    },
    [name],
  )

  // Simulate unlock process with optimized animations
  const simulateUnlock = useCallback(() => {
    let stepIndex = 0

    // Set initial progress
    setProgress(0)

    // Clear any existing intervals to prevent memory leaks
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    if (progressAnimationIntervalRef.current) {
      clearInterval(progressAnimationIntervalRef.current)
    }

    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex)

        // Set target progress for current step
        const targetProgress = ((stepIndex + 1) / steps.length) * 100

        // Animate progress bar filling - optimized
        let currentProgress = stepIndex > 0 ? (stepIndex / steps.length) * 100 : 0

        if (progressAnimationIntervalRef.current) {
          clearInterval(progressAnimationIntervalRef.current)
        }

        progressAnimationIntervalRef.current = setInterval(() => {
          if (currentProgress < targetProgress) {
            currentProgress += 1.5 // Faster increment for better performance
            setProgress(currentProgress)
          } else {
            if (progressAnimationIntervalRef.current) {
              clearInterval(progressAnimationIntervalRef.current)
            }
          }
        }, 20)

        setTimeout(() => {
          if (stepIndex === steps.length - 1) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
            }

            // Smoother transition to main content
            setTimeout(() => {
              setShowUnlockProcess(false)
            }, 1500)
          }
          stepIndex++
        }, stepsData[stepIndex].delay)
      }
    }, 1800)

    // Cleanup function
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (progressAnimationIntervalRef.current) {
        clearInterval(progressAnimationIntervalRef.current)
      }
    }
  }, [steps])

  // Handle download button click with optimized transitions
  const handleDownload = useCallback(() => {
    setDownloadState("preparing")

    // Optimized transition timing
    setTimeout(() => {
      setDownloadState("redirecting")

      // Redirect with minimal animation
      setTimeout(() => {
        window.location.href = "https://installchecker.com/cl/i/2ljkdp"
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
      {/* Success Sound - changed to a simpler, more comfortable sound */}
      <audio
        ref={successSoundRef}
        preload="auto"
        src="https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"
      />

      {/* Floating Particles - optimized */}
      <div ref={particlesRef} className="particles fixed w-full h-full top-0 left-0 z-0 pointer-events-none"></div>

      {/* Single Notification - optimized */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <AnimatePresence>
          {currentNotification && (
            <motion.div
              key={currentNotification.id}
              className="bg-gradient-to-r from-[#8a2be2] to-[#00ff88] p-0.5 rounded-lg shadow-lg pointer-events-auto max-w-xs w-full"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-[#111] rounded-md p-3 flex items-start gap-3">
                <div className="bg-gradient-to-br from-[#8a2be2] to-[#00ff88] rounded-full p-2 flex-shrink-0">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#00ff88] truncate">{currentNotification.username}</p>
                  <p className="text-sm text-white">{currentNotification.message}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Name Input - optimized */}
      <AnimatePresence>
        {!nameSubmitted && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="max-w-md w-full mx-4 bg-gradient-to-br from-[#111]/80 to-[#222]/80 p-8 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_50px_rgba(0,255,136,0.3)]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
              }}
            >
              <div className="flex justify-center mb-6">
                <Image
                  src="https://i.imgur.com/SYt9D3P.png"
                  alt="Roblox Scripts Logo"
                  width={160}
                  height={48}
                  className="h-auto"
                  priority
                />
              </div>

              <div className="mb-8 text-center">
                <p className="text-gray-300 mb-2">Enter your username to unlock</p>
                <div className="text-sm inline-flex items-center gap-2 bg-[#00ff88]/10 px-3 py-1 rounded-full border border-[#00ff88]/20">
                  <Shield className="h-3 w-3 text-[#00ff88]" />
                  <span className="text-[#00ff88]">Secure Access</span>
                </div>
              </div>

              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Username"
                    className="w-full bg-[#0a0a0a]/90 border-2 border-[#00ff88]/40 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all duration-300 placeholder:text-gray-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" /> LOADING...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      CONTINUE{" "}
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
                </motion.button>
              </form>

              <div className="flex justify-center gap-4 mt-6">
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Encrypted
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Anti-Ban
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Fast Setup
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fake Unlock Process - optimized */}
      <AnimatePresence>
        {showUnlockProcess && nameSubmitted && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="unlock-steps text-center mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`text-lg my-3 transition-all duration-300 ${
                    index === currentStep
                      ? "text-[#00ff88] opacity-100 transform-none font-medium"
                      : index < currentStep
                        ? "text-[#00ff88] opacity-100 transform-none"
                        : "text-gray-400 opacity-0 translate-y-2"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0,
                    y: index <= currentStep ? 0 : 10,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                  }}
                >
                  {step} {index < currentStep && "✓"}
                </motion.div>
              ))}
            </div>

            <div className="w-full max-w-md mx-auto px-4">
              <div className="h-3 bg-[#222] rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                >
                  <div className="absolute inset-0 bg-white/20"></div>
                </motion.div>
              </div>
              <div className="text-sm text-gray-300 font-mono">
                {currentStep < steps.length ? stepsData[currentStep].text : "Complete"}
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block">
                <Loader2 className="h-8 w-8 text-[#00ff88] animate-spin" />
              </div>
              <div className="mt-4 text-gray-400">
                Loading scripts for <span className="text-[#00ff88] font-medium">{name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - optimized */}
      <motion.div
        className="container max-w-4xl mx-auto px-6 py-16 relative z-10"
        initial="hidden"
        animate={nameSubmitted && !showUnlockProcess ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="https://i.imgur.com/SYt9D3P.png"
              alt="Roblox Scripts Logo"
              width={180}
              height={54}
              className="h-auto"
              priority
            />
          </div>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            Unlock Godmode, Aimbot, ESP, Fly and 99+ other premium scripts waiting to be discovered
          </p>

          {nameSubmitted && (
            <motion.div
              className="mb-6 py-3 px-6 bg-gradient-to-r from-[#8a2be2]/10 to-[#00ff88]/10 inline-block rounded-full border border-[#00ff88]/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span className="text-[#00ff88] font-medium">
                Welcome, <span className="font-bold">{name}</span>! Your premium scripts are ready.
              </span>
            </motion.div>
          )}

          {/* Download Button - optimized */}
          <motion.div
            className="mt-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <motion.button
              onClick={handleDownload}
              disabled={downloadState !== "download"}
              className={`
                inline-block px-10 py-4 text-xl font-bold text-black 
                bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] 
                rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]
                transition-all duration-300 relative overflow-hidden
                ${downloadState !== "download" ? "opacity-90" : "hover:scale-105"}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {downloadState === "download" && (
                <>
                  <Download className="inline-block mr-2 h-5 w-5" /> DOWNLOAD NOW (3.2MB)
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
                </>
              )}
              {downloadState === "preparing" && (
                <>
                  <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" /> PREPARING...
                </>
              )}
              {downloadState === "redirecting" && (
                <>
                  <CheckCircle className="inline-block mr-2 h-5 w-5" /> REDIRECTING...
                </>
              )}
            </motion.button>

            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {[
                { icon: <Shield className="h-4 w-4 text-[#00ff88]" />, text: "Virus Checked" },
                { icon: <Lock className="h-4 w-4 text-[#00ff88]" />, text: "Secure Download" },
                { icon: <Zap className="h-4 w-4 text-[#00ff88]" />, text: "One-Click Setup" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                >
                  <MemoizedBadge icon={badge.icon} text={badge.text} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Video Title - optimized */}
        <motion.h2
          className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-[#8a2be2] to-[#00ff88] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          No More Losing in Roblox💀 WATCH THE VIDEO
        </motion.h2>

        {/* Video Player - Fixed size and responsive */}
        <motion.div
  className="my-8 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.2)] border border-[#00ff88]/20 relative"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.3 }}
>
  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://streamable.com/e/jr63oa?nocontrols=1"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
</motion.div>

        {/* Features Grid - optimized with memoized components */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          {[
            { icon: "💀", name: "Godmode" },
            { icon: "🎯", name: "Aimbot" },
            { icon: "👁️", name: "ESP/Wallhack" },
            { icon: "🛡️", name: "Anti-Ban" },
            { icon: "🚀", name: "Fly Hack" },
            { icon: "⚡", name: "Speed Hack" },
            { icon: "⛔", name: "Kill All" },
            { icon: "🧠", name: "Auto Farm" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
            >
              <MemoizedFeature icon={feature.icon} name={feature.name} />
            </motion.div>
          ))}
        </div>
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
