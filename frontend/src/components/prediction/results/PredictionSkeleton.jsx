import { motion } from "framer-motion";

function Block({ className }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 ${className}`}
    />
  );
}

export default function PredictionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
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