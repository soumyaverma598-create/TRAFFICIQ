import "../styles/dashboardMotion.css";
import HeroSection from "../components/dashboard/HeroSection";
import HowItWorksSection from "../components/dashboard/HowItWorksSection";
import FeaturesSection from "../components/dashboard/FeaturesSection";
import TechStackSection from "../components/dashboard/TechStackSection";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#05060A]">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TechStackSection />
      <DashboardFooter />
    </div>
  );
}