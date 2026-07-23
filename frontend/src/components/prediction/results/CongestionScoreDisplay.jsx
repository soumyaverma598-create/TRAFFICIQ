import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { getRiskStyles } from "./riskLevelStyles";

const RADIUS = 70;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CongestionScoreDisplay({ overallCongestion, riskLevel }) {
  const target = Math.max(0, Math.min(100, Number(overallCongestion) || 0));
  const { text, stroke, label } = getRiskStyles(riskLevel);

  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, target, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target]);

  const offset = CIRCUMFERENCE * (1 - displayValue / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-sm"
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke={stroke}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke 0.3s ease" }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold tabular-nums text-[var(--color-text-primary)]">
            {displayValue}%
          </span>
        </div>
      </div>

      <p className={`mt-4 text-sm font-semibold tracking-wide ${text}`}>
        {label} Congestion
      </p>
    </motion.div>
  );
}