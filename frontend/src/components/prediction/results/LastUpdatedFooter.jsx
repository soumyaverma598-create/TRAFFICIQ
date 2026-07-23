import { Clock } from "lucide-react";

export default function LastUpdatedFooter({ lastUpdated }) {
  if (!lastUpdated) return null;

  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-1 text-xs text-[var(--color-text-secondary)] backdrop-blur-sm">
        <Clock className="h-3 w-3" aria-hidden="true" />
        Last updated {lastUpdated}
      </span>
    </div>
  );
}