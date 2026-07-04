import React, { useState } from "react";
import {
  Info,
  ChevronDown,
  Map,
  Radio,
  Layers,
  Brain,
  Navigation,
  MousePointerClick,
} from "lucide-react";

/**
 * Heatmap
 * Traffic Density Map card. The map area is a static, premium placeholder
 * built entirely with Tailwind — designed so it can later be swapped for
 * a real MapLibre instance without touching the surrounding layout.
 */
export default function Heatmap() {
  const [timeMode, setTimeMode] = useState("Current");
  const [timeModeOpen, setTimeModeOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Today");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const timeModes = ["Current", "Forecast", "Historical"];
  const dateRanges = ["Today", "Last 24h"];

  const legend = [
    { label: "Low", range: "< 500", tone: "bg-emerald-500" },
    { label: "Moderate", range: "500–1500", tone: "bg-amber-400" },
    { label: "Heavy", range: "1500–3000", tone: "bg-orange-500" },
    { label: "Severe", range: "> 3000", tone: "bg-rose-500" },
  ];

  const futureCapabilities = [
    { label: "Live road overlays", icon: Layers },
    { label: "AI congestion prediction", icon: Brain },
    { label: "Route recommendations", icon: Navigation },
    { label: "Clickable road segments", icon: MousePointerClick },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-7 text-neutral-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        {/* Left: title + info */}
        <div className="flex items-center gap-2 relative">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-50">
            Traffic Density Map
          </h2>
          <button
            type="button"
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
            onClick={() => setInfoOpen((o) => !o)}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            aria-label="Traffic density info"
          >
            <Info className="h-4 w-4" />
          </button>

          {infoOpen && (
            <div className="absolute left-0 top-7 z-20 w-64 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-xs text-neutral-400 shadow-lg shadow-black/40">
              Traffic density is calculated using predicted traffic flow,
              vehicle count and average speed.
            </div>
          )}
        </div>

        {/* Right: controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time mode dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTimeModeOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs sm:text-sm text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 transition-colors"
            >
              {timeMode}
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-500 transition-transform ${
                  timeModeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {timeModeOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-lg border border-neutral-800 bg-neutral-900 py-1 shadow-lg shadow-black/30 z-10">
                {timeModes.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setTimeMode(opt);
                      setTimeModeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                      opt === timeMode
                        ? "text-neutral-100"
                        : "text-neutral-400 hover:text-neutral-100"
                    } hover:bg-neutral-800/60`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date range dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDateRangeOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs sm:text-sm text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 transition-colors"
            >
              {dateRange}
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-500 transition-transform ${
                  dateRangeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dateRangeOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg border border-neutral-800 bg-neutral-900 py-1 shadow-lg shadow-black/30 z-10">
                {dateRanges.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setDateRange(opt);
                      setDateRangeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                      opt === dateRange
                        ? "text-neutral-100"
                        : "text-neutral-400 hover:text-neutral-100"
                    } hover:bg-neutral-800/60`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auto refresh indicator */}
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs sm:text-sm text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950/40 h-64 sm:h-80">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative h-full w-full flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
            <Map className="h-6 w-6 text-neutral-400" />
          </div>
          <p className="text-sm sm:text-base font-medium text-neutral-200">
            Interactive Traffic Map
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xs">
            Map layer will display live congestion, predictions and AI
            analysis.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
          {legend.map(({ label, tone }) => (
            <div
              key={label}
              className="flex-1 flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2 hover:border-neutral-700 hover:bg-neutral-900/70 transition-colors"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
              <span className="text-xs sm:text-sm text-neutral-300">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-neutral-800/80 bg-neutral-950/30 px-4 py-3">
          <p className="text-[11px] sm:text-xs font-medium text-neutral-400 mb-2">
            Traffic Volume (vehicles/hour)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
            {legend.map(({ label, range }) => (
              <div
                key={label}
                className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500"
              >
                <span>{label}</span>
                <span className="text-neutral-400">{range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-6 rounded-lg border border-neutral-800/80 bg-neutral-900/30 px-4 py-3.5">
        <p className="text-[11px] sm:text-xs font-medium text-neutral-500 mb-2">
          Future capabilities
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {futureCapabilities.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400"
            >
              <Icon className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
