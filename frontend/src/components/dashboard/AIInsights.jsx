import { TriangleAlert, CloudRain, Route, ArrowRight } from "lucide-react";
const ICONS = {
  warning: TriangleAlert,
  weather: CloudRain,
  route: Route,
};

export default function AIInsights({ insights }) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 lg:px-7 lg:py-7">

      <div className="flex items-baseline justify-between">
        <h2 className="text-[17px] font-semibold tracking-tight text-[var(--color-text-primary)]">
          AI Insights
        </h2>
        <span className="text-[12px] text-[var(--color-text-secondary)]">
          Generated 12 seconds ago
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {(insights ?? []).map((item) => {
          const Icon = ICONS[item.icon] ?? TriangleAlert;
          return (
            <div
              key={item.title}
              className="group flex items-center gap-3.5 rounded-xl border border-[var(--color-border)]/70 px-4 py-3.5 transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:border-[var(--color-text-secondary)]/40 hover:bg-[var(--color-surface-elevated)]/50"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon
                  className={`h-4 w-4 ${item.iconColor}`}
                  strokeWidth={1.75}
                />
              </span>

              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-[var(--color-text-primary)]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[var(--color-text-secondary)]">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

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