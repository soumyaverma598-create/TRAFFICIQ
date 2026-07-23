import InfoCard from "./InfoCard";
import SectionHeading from "./SectionHeading";
import { datasetOverview } from "../../data/datasetInfo";

export default function DatasetOverviewSection() {
  return (
    <section>
      <SectionHeading
        title="Dataset Overview"
        description="What the model behind TrafficIQ's predictions was trained on."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {datasetOverview.map((item) => (
          <InfoCard
            key={item.label}
            title={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}