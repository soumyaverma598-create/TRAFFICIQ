import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TREND_STYLES = {
  up: {
    icon: TrendingUp,
    text: "text-[var(--color-success)]",
    bg: "bg-[var(--color-success)]/10",
  },
  down: {
    icon: TrendingDown,
    text: "text-[var(--color-danger)]",
    bg: "bg-[var(--color-danger)]/10",
  },
  neutral: {
    icon: Minus,
    text: "text-[var(--color-text-secondary)]",
    bg: "bg-[var(--color-text-secondary)]/10",
  },
};
const SPARKLINE_BARS = [4, 7, 5, 9, 6, 10, 8, 12, 9, 14];

export default function KPICard({
  title,
  value,
  trend,
  trendDirection = "neutral",
  description,
  icon: Icon,
}) {
  const { icon: TrendIcon, text: trendText, bg: trendBg } =
    TREND_STYLES[trendDirection] ?? TREND_STYLES.neutral;
  const maxBar = Math.max(...SPARKLINE_BARS);

  return (
    <div className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-0.5 hover:border-[var(--color-text-secondary)]/40">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <Icon className="h-4 w-4 text-[var(--color-text-secondary)]" strokeWidth={1.75} />
            </span>
          )}
          <span className="text-[13px] font-medium tracking-wide text-[var(--color-text-secondary)]">
            {title}
          </span>
        </div>

        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-medium ${trendBg} ${trendText}`}
          >
            <TrendIcon className="h-3 w-3" strokeWidth={2} />
            {trend}
          </span>
        )}
      </div>

      <div className="mt-5">
        <span className="text-[30px] font-semibold tracking-tight text-[var(--color-text-primary)]">
          {value}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        {description && (
          <p className="text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}

        <div className="flex h-6 shrink-0 items-end gap-[3px]" aria-hidden="true">
          {SPARKLINE_BARS.map((h, i) => (
            <div
              key={i}
              style={{ height: `${(h / maxBar) * 100}%` }}
              className="w-[3px] rounded-full bg-[var(--color-border)] transition-colors duration-200 ease-[var(--ease-tactile)] group-hover:bg-[var(--color-accent)]/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
