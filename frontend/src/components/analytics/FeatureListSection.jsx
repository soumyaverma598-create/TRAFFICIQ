import SectionHeading from "./SectionHeading";
import { featureList } from "../../data/datasetInfo";

export default function FeatureListSection() {
  return (
    <section>
      <SectionHeading
        title="Feature List"
        description="Inputs the model uses to produce a congestion prediction."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {featureList.map((feature) => (
          <div
            key={feature}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-center transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-0.5 hover:border-[var(--color-text-secondary)]/40"
          >
            <p className="text-[13px] font-medium text-[var(--color-text-primary)]">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}