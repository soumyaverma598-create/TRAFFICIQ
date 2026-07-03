import HeroSection from "../components/dashboard/HeroSection";
import KPICards from "../components/dashboard/KPICards";
import AIInsights from "../components/dashboard/AIInsights";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <KPICards />
      <AIInsights />
    </div>
  );
}