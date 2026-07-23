import InfoCard from "./InfoCard";
import SectionHeading from "./SectionHeading";
import { modelInfo } from "../../data/datasetInfo";

export default function ModelInfoSection() {
  return (
    <section>
      <SectionHeading
        title="Model Information"
        description="The algorithm and stack used to serve predictions."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modelInfo.map((item) => (
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