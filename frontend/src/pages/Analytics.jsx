import DatasetOverviewSection from "../components/analytics/DatasetOverviewSection";
import FeatureListSection from "../components/analytics/FeatureListSection";
import FeatureImportanceSection from "../components/analytics/FeatureImportanceSection";
import DatasetStatsSection from "../components/analytics/DatasetStatsSection";
import ModelInfoSection from "../components/analytics/ModelInfoSection";

export default function Analytics() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">
          Analytics
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          A look at the dataset and model powering TrafficIQ's predictions.
        </p>
      </div>

      <DatasetOverviewSection />
      <FeatureListSection />
      <FeatureImportanceSection />
      <DatasetStatsSection />
      <ModelInfoSection />
    </div>
  );
}