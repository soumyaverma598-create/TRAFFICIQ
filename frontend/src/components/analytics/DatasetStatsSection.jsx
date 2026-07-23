import InfoCard from "./InfoCard";
import SectionHeading from "./SectionHeading";
import { datasetStatistics } from "../../data/datasetInfo";

export default function DatasetStatsSection() {
  return (
    <section>
      <SectionHeading
        title="Dataset Statistics"
        description="How the training data was structured and prepared."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {datasetStatistics.map((item) => (
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
