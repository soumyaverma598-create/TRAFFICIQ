// Static label/value card for facts that don't have a trend or history —
// dataset metadata, model metrics, stack info. Shares KPICard's visual
// language (border, radius, hover lift, type scale) but intentionally
// drops the trend badge and sparkline, since those imply time-series data
// this page never has.

export default function InfoCard({ title, value, description, icon: Icon }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-0.5 hover:border-[var(--color-text-secondary)]/40">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            <Icon className="h-4 w-4 text-[var(--color-text-secondary)]" strokeWidth={1.75} />
          </span>
        )}
        <span className="text-[13px] font-medium tracking-wide text-[var(--color-text-secondary)]">
          {title}
        </span>
      </div>

      <div className="mt-5">
        <span className="text-[20px] font-semibold leading-snug tracking-tight text-[var(--color-text-primary)]">
          {value}
        </span>
      </div>

      {description && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}