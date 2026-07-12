import { Activity, Clock, AlertTriangle, Route } from "lucide-react";
import KPICard from "./KPICard";

export default function KPICards({ kpis }) {
  const KPI_DATA = [
    {
      icon: Activity,
      title: "Congestion Index",
      value: `${kpis?.congestion ?? "--"}%`,
      trend: "+4.2%",
      trendDirection: "up",
      description: "Above weekly average across monitored zones",
    },
    {
      icon: Clock,
      title: "Avg Travel Time",
      value: `${kpis?.travelTime ?? "--"} min`,
      trend: "+2 min",
      trendDirection: "up",
      description: "City-wide average across peak corridors",
    },
    {
      icon: AlertTriangle,
      title: "Accident Probability",
      value: `${kpis?.accidentProbability ?? "--"}%`,
      trend: "-1.8%",
      trendDirection: "down",
      description: "Lower risk than same time last week",
    },
    {
      icon: Route,
      title: "Segments Monitored",
      value: `${kpis?.segments ?? "--"}`,
      trend: "Stable",
      trendDirection: "neutral",
      description: "All sensors reporting normally",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_DATA.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </section>
  );
}
