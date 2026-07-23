import { motion } from "framer-motion";
import CongestionScoreDisplay from "./CongestionScoreDisplay";
import RiskBadge from "./RiskBadge";
import ConfidenceCard from "./ConfidenceCard";
import RecommendedActionCard from "./RecommendedActionCard";
import LastUpdatedFooter from "./LastUpdatedFooter";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function PredictionResults({ predictionData }) {
  if (!predictionData) return null;

  const {
    overallCongestion,
    riskLevel,
    confidence,
    recommendedAction,
    lastUpdated,
  } = predictionData;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <motion.div variants={item}>
          <CongestionScoreDisplay
            overallCongestion={overallCongestion}
            riskLevel={riskLevel}
          />
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-sm">
            <p className="text-sm text-[var(--color-text-secondary)]">Risk Level</p>
            <div className="mt-3">
              <RiskBadge riskLevel={riskLevel} />
            </div>
          </div>

          <ConfidenceCard confidence={confidence} />
        </motion.div>

        <motion.div variants={item}>
          <RecommendedActionCard recommendedAction={recommendedAction} />
        </motion.div>
      </div>

      <motion.div variants={item}>
        <LastUpdatedFooter lastUpdated={lastUpdated} />
      </motion.div>
    </motion.div>
  );
}