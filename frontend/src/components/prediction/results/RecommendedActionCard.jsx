import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function RecommendedActionCard({ recommendedAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
        <Lightbulb className="h-4.5 w-4.5 text-[var(--color-accent)]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-secondary)]">Recommended Action</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--color-text-primary)]">
          {recommendedAction || "No recommendation available."}
        </p>
      </div>
    </motion.div>
  );
}