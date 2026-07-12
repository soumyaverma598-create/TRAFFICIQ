import { useEffect, useState } from "react";

import { getPredictionData } from "../services/predictionService";

export default function Predictions() {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const data = await getPredictionData();

        setPredictionData(data);
      } catch (error) {
        console.error("Failed to fetch prediction:", error);
        setError("Failed to load prediction data.");
      } finally {
        setLoading(false);
      }
    }

    fetchPrediction();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Predictions</h1>

      {loading && (
        <p className="text-sm text-[var(--color-text-secondary)]">
          Loading prediction data...
        </p>
      )}

      {error && (
        <p className="text-sm font-medium text-[var(--color-danger)]">
          {error}
        </p>
      )}

      {predictionData && !loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">Overall Congestion</p>
            <p className="mt-2 text-3xl font-bold">{predictionData.overallCongestion}%</p>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">Risk Level</p>
            <p className="mt-2 text-3xl font-bold">{predictionData.riskLevel}</p>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">Confidence</p>
            <p className="mt-2 text-3xl font-bold">{predictionData.confidence}%</p>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:col-span-2">
            <p className="text-sm text-[var(--color-text-secondary)]">Recommended Action</p>
            <p className="mt-2 text-xl font-semibold">{predictionData.recommendedAction}</p>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm text-[var(--color-text-secondary)]">Last Updated</p>
            <p className="mt-2 text-xl font-semibold">{predictionData.lastUpdated}</p>
          </div>
        </div>
      )}
    </div>
  );
}
