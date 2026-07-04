import HeroSection from "../components/dashboard/HeroSection";
import KPICards from "../components/dashboard/KPICards";
import AIInsights from "../components/dashboard/AIInsights";
import TrafficTrend from "../components/dashboard/TrafficTrend";
import Heatmap from "../components/dashboard/Heatmap";
import QuickActions from "../components/dashboard/QuickActions";
import RecentPredictions from "../components/dashboard/RecentPredictions";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <KPICards />
      <AIInsights />
      <TrafficTrend />
      <Heatmap />
      <QuickActions />
      <RecentPredictions />
    </div>
  );
}