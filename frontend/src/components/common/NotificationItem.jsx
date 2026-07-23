import { AlertTriangle, Car, Sparkles, CloudRain, Clock, TrendingUp } from "lucide-react";

const iconByType = {
  congestion: AlertTriangle,
  accident: Car,
  prediction: Sparkles,
  weather: CloudRain,
  peak: Clock,
  flow: TrendingUp,
};

function formatTimestamp(iso) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function NotificationItem({ notification, onMarkRead }) {
  const Icon = iconByType[notification.type] || Sparkles;

  return (
    <button
      onClick={() => onMarkRead(notification.id)}
      className={[
        "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ease-[var(--ease-tactile)]",
        notification.read
          ? "hover:bg-[var(--color-surface-elevated)]/60"
          : "bg-[var(--color-surface-elevated)]/40 hover:bg-[var(--color-surface-elevated)]/70",
      ].join(" ")}
    >
      <div
        className={[
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          notification.read
            ? "border-[var(--color-border)] text-[var(--color-text-secondary)]"
            : "border-[var(--color-accent)]/40 text-[var(--color-accent)]",
        ].join(" ")}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13px] font-medium text-[var(--color-text-primary)]">
            {notification.title}
          </span>
          {!notification.read && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-[12px] text-[var(--color-text-secondary)]">
          {notification.message}
        </p>
        <span className="mt-1 block text-[10.5px] text-[var(--color-text-secondary)]/70">
          {formatTimestamp(notification.timestamp)}
        </span>
      </div>
    </button>
  );
}