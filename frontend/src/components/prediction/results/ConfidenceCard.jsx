import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

export default function ConfidenceCard({ confidence }) {
  const percentage = Math.max(0, Math.min(100, Number(confidence) || 0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Gauge className="h-4 w-4" aria-hidden="true" />
          Confidence
        </div>
        <p className="text-lg font-semibold tabular-nums text-[var(--color-text-primary)]">
          {percentage}%
        </p>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full bg-[var(--color-accent)]"
        />
      </div>
    </motion.div>
  );
}