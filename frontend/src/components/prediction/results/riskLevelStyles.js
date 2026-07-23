// Single source of truth for how each risk level is colored across the
// results section (circular score, badge) so they never drift apart.
// Falls back to a neutral style for any unrecognized value instead of
// breaking the UI.

const RISK_STYLES = {
  "very low": {
    label: "Very Low",
    dot: "🟢",
    text: "text-[var(--color-success)]",
    bg: "bg-[var(--color-success)]/10",
    border: "border-[var(--color-success)]/20",
    stroke: "var(--color-success)",
  },
  low: {
    label: "Low",
    dot: "🟢",
    text: "text-[var(--color-success)]",
    bg: "bg-[var(--color-success)]/10",
    border: "border-[var(--color-success)]/20",
    stroke: "var(--color-success)",
  },
  moderate: {
    label: "Moderate",
    dot: "🟡",
    text: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    stroke: "#f59e0b",
  },
  high: {
    label: "High",
    dot: "🟠",
    text: "text-orange-600",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    stroke: "#f97316",
  },
  severe: {
    label: "Severe",
    dot: "🔴",
    text: "text-[var(--color-danger)]",
    bg: "bg-[var(--color-danger)]/10",
    border: "border-[var(--color-danger)]/20",
    stroke: "var(--color-danger)",
  },
  "very high": {
    label: "Very High",
    dot: "🔴",
    text: "text-[var(--color-danger)]",
    bg: "bg-[var(--color-danger)]/10",
    border: "border-[var(--color-danger)]/20",
    stroke: "var(--color-danger)",
  },
};

const FALLBACK_STYLE = {
  label: "Unknown",
  dot: "⚪",
  text: "text-[var(--color-text-secondary)]",
  bg: "bg-[var(--color-text-secondary)]/10",
  border: "border-[var(--color-text-secondary)]/20",
  stroke: "var(--color-text-secondary)",
};

export function getRiskStyles(riskLevel) {
  if (!riskLevel) return FALLBACK_STYLE;
  return RISK_STYLES[riskLevel.toLowerCase()] ?? FALLBACK_STYLE;
}