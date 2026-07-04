import React from "react";
import { Sparkles, BarChart3, FileText, Map, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    id: "new-prediction",
    icon: Sparkles,
    title: "New Prediction",
    description: "Run a new AI traffic prediction",
    tooltip: "Generate a fresh traffic prediction using the latest data.",
    primary: true,
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Explore traffic analytics",
    tooltip: "View congestion trends and historical insights.",
  },
  {
    id: "generate-report",
    icon: FileText,
    title: "Generate Report",
    description: "Export AI traffic report",
    tooltip: "Create a downloadable AI-generated report.",
  },
  {
    id: "open-live-map",
    icon: Map,
    title: "Open Live Map",
    description: "View interactive traffic map",
    tooltip: "Open the live traffic visualization.",
  },
];

/**
 * QuickActions
 * Premium quick-actions grid for the TRAFFICIQ dashboard. Purely
 * presentational — wire up onClick handlers per action id when ready.
 */
export default function QuickActions() {
  return (
    <div className="w-full max-w-3xl mx-auto text-neutral-100">
      <style>{`
        @keyframes qa-fade-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .qa-card {
          animation: qa-fade-in 0.4s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .qa-card {
            animation: none;
          }
        }
      `}</style>

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-50">
          Quick Actions
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500">
          Frequently used AI operations
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {ACTIONS.map(({ id, icon: Icon, title, description, tooltip, primary }, i) => (
          <button
            key={id}
            type="button"
            title={tooltip}
            style={{ animationDelay: `${i * 70}ms` }}
            className={`qa-card group relative flex items-start gap-3.5 h-full text-left rounded-2xl border px-4 py-4 sm:px-5 sm:py-4.5 transition-all duration-200 ease-out
              hover:-translate-y-0.5 active:scale-95 active:duration-100
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
              ${
                primary
                  ? "border-sky-500/40 bg-neutral-900/60 hover:border-sky-400/60"
                  : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
              }`}
          >
            <div
              className={`shrink-0 rounded-xl border p-2.5 transition-colors duration-200 ${
                primary
                  ? "border-sky-500/30 bg-sky-500/10 text-sky-400 group-hover:text-sky-300"
                  : "border-neutral-800 bg-neutral-900/60 text-neutral-400 group-hover:text-neutral-200"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base font-medium text-neutral-100">
                  {title}
                </p>
                {primary && (
                  <span className="text-[10px] uppercase tracking-wide text-sky-400/90 border border-sky-500/30 rounded-full px-1.5 py-0.5">
                    Primary
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 truncate">
                {description}
              </p>
            </div>

            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-neutral-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
