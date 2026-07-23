import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  { label: "Initializing AI Model...", percent: 15 },
  { label: "Analyzing Traffic Data...", percent: 45 },
  { label: "Running Congestion Prediction...", percent: 75 },
  { label: "Generating Insights...", percent: 95 },
];

function Block({ className }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 ${className}`}
    />
  );
}

function PulsingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function PredictionLoader({ phase = 0 }) {
  const current = PHASES[Math.min(phase, PHASES.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--color-accent)]/10 to-transparent"
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-sm font-medium text-[var(--color-text-primary)]"
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
          <PulsingDots />
        </div>

        <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60"
            animate={{ width: `${current.percent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Block className="h-64" />
        <div className="flex flex-col gap-4">
          <Block className="h-24" />
          <Block className="h-28" />
        </div>
        <Block className="h-24" />
      </div>
      <div className="flex justify-center">
        <Block className="h-6 w-40" />
      </div>
    </motion.div>
  );
}