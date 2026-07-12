import { ArrowRight } from "lucide-react";

const PREDICTIONS = [
  {
    id: "nh-53",
    location: "NH-53",
    congestion: "High",
    confidence: "94%",
    time: "2 min ago",
    status: "Active",
  },
  {
    id: "city-center",
    location: "City Center",
    congestion: "Moderate",
    confidence: "89%",
    time: "8 min ago",
    status: "Active",
  },
  {
    id: "airport-road",
    location: "Airport Road",
    congestion: "Low",
    confidence: "97%",
    time: "15 min ago",
    status: "Stable",
  },
  {
    id: "ring-road",
    location: "Ring Road",
    congestion: "Heavy",
    confidence: "91%",
    time: "24 min ago",
    status: "Active",
  },
];

const CONGESTION_STYLES = {
  Low: "text-emerald-400",
  Moderate: "text-amber-400",
  Heavy: "text-orange-400",
  High: "text-rose-400",
};

const STATUS_STYLES = {
  Active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Stable: "text-sky-400 bg-sky-500/10 border-sky-500/25",
  Warning: "text-amber-400 bg-amber-500/10 border-amber-500/25",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Active;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${style}`}
    >
      {status}
    </span>
  );
}

export default function RecentPredictions() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-7 text-neutral-100">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-50">
          Recent Predictions
        </h2>
        <button
          type="button"
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="hidden md:block overflow-hidden rounded-xl border border-neutral-800/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950/40">
              {["Location", "Congestion", "Confidence", "Time", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left font-medium text-neutral-500 text-xs uppercase tracking-wide px-4 py-2.5"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {PREDICTIONS.map((row, i) => (
              <tr
                key={row.id}
                className={`transition-colors hover:bg-neutral-800/40 ${
                  i !== PREDICTIONS.length - 1
                    ? "border-b border-neutral-800/60"
                    : ""
                }`}
              >
                <td className="px-4 py-3 text-neutral-200 font-medium">
                  {row.location}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    CONGESTION_STYLES[row.congestion] || "text-neutral-300"
                  }`}
                >
                  {row.congestion}
                </td>
                <td className="px-4 py-3 text-neutral-300">
                  {row.confidence}
                </td>
                <td className="px-4 py-3 text-neutral-500">{row.time}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-2.5">
        {PREDICTIONS.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 px-4 py-3.5 transition-colors hover:bg-neutral-800/40"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-neutral-100">
                {row.location}
              </p>
              <StatusBadge status={row.status} />
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span
                className={`font-medium ${
                  CONGESTION_STYLES[row.congestion] || "text-neutral-300"
                }`}
              >
                {row.congestion} congestion
              </span>
              <span>{row.confidence} confidence</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-600">{row.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
