import { Activity, Clock, AlertTriangle, Route } from "lucide-react";
import KPICard from "./KPICard";

// Static placeholder metrics — replace with live data once the
// predictions/analytics service layer is wired in.
const KPI_DATA = [
  {
    icon: Activity,
    title: "Congestion Index",
    value: "68%",
    trend: "+4.2%",
    trendDirection: "up",
    description: "Above weekly average across monitored zones",
  },
  {
    icon: Clock,
    title: "Avg Travel Time",
    value: "24 min",
    trend: "+2 min",
    trendDirection: "up",
    description: "City-wide average across peak corridors",
  },
  {
    icon: AlertTriangle,
    title: "Accident Probability",
    value: "12%",
    trend: "-1.8%",
    trendDirection: "down",
    description: "Lower risk than same time last week",
  },
  {
    icon: Route,
    title: "Segments Monitored",
    value: "42",
    trend: "Stable",
    trendDirection: "neutral",
    description: "All sensors reporting normally",
  },
];

/**
 * KPICards
 *
 * Responsive grid wrapper around KPICard. Add or edit metrics in
 * KPI_DATA — layout and card styling need no changes.
 */
export default function KPICards() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_DATA.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </section>
  );
}
