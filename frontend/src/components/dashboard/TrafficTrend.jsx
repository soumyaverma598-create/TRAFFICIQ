import { useState } from "react";
import { ChevronDown, ArrowUp, Gauge, ArrowDown } from "lucide-react";

export default function TrafficTrend({ data }) {
  const [rangeOpen, setRangeOpen] = useState(false);
  const range = data?.range ?? "Last 24 Hours";
  const points = data?.points?.length ? data.points : [0];

  const width = 720;
  const height = 220;
  const padX = 8;
  const padTop = 12;
  const padBottom = 28;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;

  const stepX = (width - padX * 2) / (points.length - 1 || 1);
  const coords = points.map((v, i) => {
    const x = padX + i * stepX;
    const y =
      padTop + (height - padTop - padBottom) * (1 - (v - min) / span);
    return [x, y];
  });

  const linePath = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");

  const areaPath =
    `${linePath} ` +
    `L ${coords[coords.length - 1][0].toFixed(2)} ${(height - padBottom).toFixed(2)} ` +
    `L ${coords[0][0].toFixed(2)} ${(height - padBottom).toFixed(2)} Z`;

  const peakIndex = points.indexOf(max);
  const peakPoint = coords[peakIndex];

  const hourLabels =
    data?.labels ?? ["12AM", "6AM", "12PM", "6PM", "11PM"];

  const metrics = [
    {
      label: "Peak Traffic",
      value: data?.peakTraffic ?? "--",
      icon: ArrowUp,
      tone: "text-emerald-400",
    },
    {
      label: "Average Speed",
      value: data?.averageSpeed ?? "--",
      icon: Gauge,
      tone: "text-neutral-300",
    },
    {
      label: "Lowest Traffic",
      value: data?.lowestTraffic ?? "--",
      icon: ArrowDown,
      tone: "text-rose-400",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-7 text-neutral-100">

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-50">
            Traffic Trend
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Vehicle flow across all monitored intersections
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setRangeOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs sm:text-sm text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 transition-colors"
          >
            {range}
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-500 transition-transform ${
                rangeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {rangeOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-800 bg-neutral-900 py-1 shadow-lg shadow-black/30 z-10">
              {["Last 24 Hours", "Last 7 Days", "Last 30 Days"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRangeOpen(false)}
                  className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                    opt === range
                      ? "text-neutral-100"
                      : "text-neutral-400 hover:text-neutral-100"
                  } hover:bg-neutral-800/60`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/40 p-4 sm:p-5">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 sm:h-56"
          preserveAspectRatio="none"
        >

          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0}
              x2={width}
              y1={padTop + (height - padTop - padBottom) * f}
              y2={padTop + (height - padTop - padBottom) * f}
              stroke="currentColor"
              className="text-neutral-800"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}

          <line
            x1={0}
            x2={width}
            y1={height - padBottom}
            y2={height - padBottom}
            stroke="currentColor"
            className="text-neutral-800"
            strokeWidth="1"
          />

          <path d={areaPath} fill="currentColor" className="text-sky-500/10" />

          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            className="text-sky-400"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx={peakPoint[0]}
            cy={peakPoint[1]}
            r="4"
            fill="currentColor"
            className="text-sky-400"
          />
          <circle
            cx={peakPoint[0]}
            cy={peakPoint[1]}
            r="8"
            fill="currentColor"
            className="text-sky-400/15"
          />
        </svg>

        <div className="mt-2 flex justify-between text-[10px] sm:text-xs text-neutral-600 px-1">
          {hourLabels.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3.5 flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-[11px] sm:text-xs text-neutral-500">
                {label}
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-neutral-50">
                {value}
              </p>
            </div>
            <div className="shrink-0 rounded-lg border border-neutral-800 p-2">
              <Icon className={`h-4 w-4 ${tone}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
