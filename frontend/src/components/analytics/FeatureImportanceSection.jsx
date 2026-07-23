import SectionHeading from "./SectionHeading";
import { featureImportance } from "../../data/datasetInfo";

export default function FeatureImportanceSection() {
  const maxImportance = Math.max(...featureImportance.map((f) => f.importance));

  return (
    <section>
      <SectionHeading
        title="Feature Importance"
        description="Relative influence of each feature on the model's predictions (static visualization)."
      />

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6">
        <div className="space-y-4">
          {featureImportance.map((item) => (
            <div key={item.feature}>
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <span className="font-medium text-[var(--color-text-primary)]">
                  {item.feature}
                </span>
                <span className="text-[var(--color-text-secondary)]">
                  {item.importance}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)]"
                  style={{
                    width: `${(item.importance / maxImportance) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}