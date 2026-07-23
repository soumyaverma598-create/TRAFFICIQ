// Static metadata describing the dataset and model behind TrafficIQ's
// predictions. Nothing here is fetched — it documents the training setup
// for the Analytics / Dataset Overview page. Values marked "(demo value)"
// are placeholders until real training metrics are recorded and swapped in.
// Icons live alongside the data so every card's icon comes from one source.

import {
  Database,
  Hash,
  Layers,
  Target,
  Cpu,
  GitBranch,
  Table,
  Columns,
  AlertTriangle,
  Binary,
  SlidersHorizontal,
  Gauge,
  BarChart3,
  Code2,
  Server,
} from "lucide-react";

export const datasetOverview = [
  { label: "Dataset Name", value: "Raipur Synthetic Traffic Dataset", icon: Database },
  { label: "Number of Samples", value: "12,000 (demo value)", icon: Hash },
  { label: "Number of Features", value: "10", icon: Layers },
  { label: "Prediction Target", value: "Congestion Score (0–100)", icon: Target },
  { label: "ML Algorithm Used", value: "XGBoost Regressor", icon: Cpu },
  { label: "Problem Type", value: "Regression", icon: GitBranch },
];

export const featureList = [
  "Traffic Volume",
  "Cars",
  "Bikes",
  "Trucks",
  "Average Vehicle Speed",
  "Signal Status",
  "Weather",
  "Accident Reported",
  "Location",
  "Time Features",
];

// Relative importance, 0–100. Hardcoded for a static horizontal-bar
// visualization only — not read from the trained model.
export const featureImportance = [
  { feature: "Traffic Volume", importance: 92 },
  { feature: "Average Speed", importance: 78 },
  { feature: "Cars", importance: 64 },
  { feature: "Bikes", importance: 50 },
  { feature: "Weather", importance: 38 },
  { feature: "Signal Status", importance: 30 },
  { feature: "Accident Reported", importance: 22 },
  { feature: "Location", importance: 14 },
];

export const datasetStatistics = [
  { label: "Rows", value: "12,000 (demo value)", icon: Table },
  { label: "Columns", value: "10", icon: Columns },
  { label: "Missing Values", value: "None (cleaned dataset)", icon: AlertTriangle },
  { label: "Encoding Used", value: "One-Hot Encoding", icon: Binary },
  { label: "Scaling Used", value: "None (not required for tree models)", icon: SlidersHorizontal },
  { label: "Train/Test Split", value: "80% / 20% (demo value)", icon: GitBranch },
];

export const modelInfo = [
  { label: "Algorithm", value: "XGBoost", icon: Cpu },
  { label: "Evaluation Metric (MAE)", value: "4.8 (demo value)", icon: Gauge },
  { label: "Evaluation Metric (RMSE)", value: "6.3 (demo value)", icon: BarChart3 },
  { label: "Training Framework", value: "Scikit-learn", icon: Code2 },
  { label: "Backend", value: "FastAPI", icon: Server },
  { label: "Frontend", value: "React + Tailwind CSS", icon: Layers },
];