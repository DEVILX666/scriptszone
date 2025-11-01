"use client"
import { getTranslation } from "@/lib/country-translator"

interface ProgressBarProps {
  completed: number
  total: number
  language?: string
}

export function ProgressBar({ completed, total, language = "en" }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="w-full max-w-sm space-y-3">
      {/* Progress Bar Container */}
      <div className="flex items-center gap-4">
        {/* Circular Progress Indicator */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="8" />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(139, 92, 246, 1)"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.5s ease" }}
              transform="rotate(-90 50 50)"
            />
            {/* Center check icon or number */}
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="32"
              fontWeight="bold"
              fill="rgba(139, 92, 246, 1)"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {completed}
            </text>
          </svg>
        </div>

        {/* Progress Text */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {getTranslation(language, "tasks_completed")}
            <span className="text-primary ml-1 font-bold">{completed}</span>
            <span className="text-muted-foreground font-normal"> / {total}</span>
          </p>
        </div>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
