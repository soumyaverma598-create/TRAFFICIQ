import { motion } from "framer-motion";
import { getRiskStyles } from "./riskLevelStyles";

export default function RiskBadge({ riskLevel }) {
  const { text, bg, border, dot, label } = getRiskStyles(riskLevel);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium backdrop-blur-sm ${bg} ${text} ${border}`}
    >
      <span aria-hidden="true" className="text-xs">
        {dot}
      </span>
      {label}
    </motion.span>
  );
}