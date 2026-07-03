import { TriangleAlert, CloudRain, Route, ArrowRight } from "lucide-react";

// Reusable insight data — render logic stays untouched as items
// are added, removed, or reordered.
const INSIGHTS = [
  {
    icon: TriangleAlert,
    iconColor: "text-[var(--color-warning)]",
    iconBg: "bg-[var(--color-warning)]/10",
    title: "Peak congestion expected",
    detail: "Between 5:30 PM and 7 PM",
  },
  {
    icon: CloudRain,
    iconColor: "text-[var(--color-accent)]",
    iconBg: "bg-[var(--color-accent)]/10",
    title: "Rain may increase travel time",
    detail: "Estimated +12%",
  },
  {
    icon: Route,
    iconColor: "text-[var(--color-danger)]",
    iconBg: "bg-[var(--color-danger)]/10",
    title: "NH-53 slowdown detected",
    detail: "Recommend alternate routes",
  },
];

/**
 * AIInsights
 *
 * Self-contained insights panel. Pages compose this alongside
 * HeroSection / KPICards / charts, which live in their own files.
 */
export default function AIInsights() {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 lg:px-7 lg:py-7">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-[17px] font-semibold tracking-tight text-[var(--color-text-primary)]">
          AI Insights
        </h2>
        <span className="text-[12px] text-[var(--color-text-secondary)]">
          Generated 12 seconds ago
        </span>
      </div>

      {/* Insight cards */}
      <div className="mt-5 flex flex-col gap-3">
        {INSIGHTS.map(({ icon: Icon, iconColor, iconBg, title, detail }) => (
          <div
            key={title}
            className="group flex items-center gap-3.5 rounded-xl border border-[var(--color-border)]/70 px-4 py-3.5 transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-text-secondary)]/40 hover:bg-[var(--color-surface-elevated)]/50"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.75} />
            </span>

            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-[var(--color-text-primary)]">
                {title}
              </p>
              <p className="mt-0.5 text-[12.5px] text-[var(--color-text-secondary)]">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-text-secondary)]/40 hover:bg-[var(--color-surface-elevated)]/60">
        Explore Full Analysis
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-tactile)] group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </button>
    </section>
  );
}
