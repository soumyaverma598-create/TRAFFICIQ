import { useEffect, useState } from "react";

import HeroSection from "../components/dashboard/HeroSection";
import KPICards from "../components/dashboard/KPICards";
import AIInsights from "../components/dashboard/AIInsights";
import TrafficTrend from "../components/dashboard/TrafficTrend";
import Heatmap from "../components/dashboard/Heatmap";
import QuickActions from "../components/dashboard/QuickActions";
import RecentPredictions from "../components/dashboard/RecentPredictions";

import { getDashboardData } from "../services/dashboardService";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardData();

        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <HeroSection hero={dashboardData?.hero} />
      <KPICards kpis={dashboardData?.kpis} />
      <AIInsights insights={dashboardData?.insights} />
      <TrafficTrend data={dashboardData?.trafficTrend} />
      <Heatmap heatmap={dashboardData?.heatmap} />
      <QuickActions />
      <RecentPredictions />
    </div>
  );
}