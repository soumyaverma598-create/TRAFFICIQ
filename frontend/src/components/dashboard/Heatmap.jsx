import { useState } from "react";
import {
  Info,
  ChevronDown,
  Layers,
  Brain,
  Navigation,
  MousePointerClick,
} from "lucide-react";
import RaipurMap from "./RaipurMap";

const ICONS = {
  layers: Layers,
  brain: Brain,
  navigation: Navigation,
  pointer: MousePointerClick,
};

export default function Heatmap({ heatmap }) {
  const [timeMode, setTimeMode] = useState(
    heatmap?.selectedTimeMode ?? "Current"
  );
  const [timeModeOpen, setTimeModeOpen] = useState(false);
  const [dateRange, setDateRange] = useState(
    heatmap?.selectedDateRange ?? "Today"
  );
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const timeModes = heatmap?.timeModes ?? [];
  const dateRanges = heatmap?.dateRanges ?? [];
  const legend = heatmap?.legend ?? [];
  const futureCapabilities = heatmap?.futureCapabilities ?? [];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-7 text-neutral-100">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
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

        <div className="flex flex-wrap items-center gap-2">
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

          <div className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs sm:text-sm text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950/40 h-64 sm:h-80">
        <RaipurMap />
      </div>

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

      <div className="mt-6 rounded-lg border border-neutral-800/80 bg-neutral-900/30 px-4 py-3.5">
        <p className="text-[11px] sm:text-xs font-medium text-neutral-500 mb-2">
          Future capabilities
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {futureCapabilities.map((item) => {
            const Icon = ICONS[item.icon] ?? Layers;

            return (
              <li
                key={item.label}
                className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400"
              >
                <Icon className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
