function DataStreamAccent() {
  const paths = ["M 0 30 C 20 10, 40 10, 60 0", "M 10 50 C 30 40, 50 30, 70 20"];

  return (
    <svg
      viewBox="0 0 80 60"
      className="pointer-events-none absolute right-3 top-3 h-14 w-16 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#818CF8" strokeWidth="1" className="dm-dash-flow" opacity="0.7" />
          <circle r="1.6" fill="#22D3EE">
            <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export default function FeatureCard({ icon: Icon, title, description, index = 0, visible = false }) {
  return (
    <div
      className={`dm-reveal dm-card-hover dm-gradient-border dm-glass-panel delay-${index + 1} group relative overflow-hidden rounded-2xl p-7 ${
        visible ? "dm-visible" : ""
      }`}
    >
      <DataStreamAccent />

      <div className="dm-float-sm flex flex-col items-start" style={{ animationDelay: `${index * 0.4}s` }}>
        <div className="dm-icon-idle mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] transition-colors duration-300 group-hover:bg-indigo-400/15">
          <Icon
            size={22}
            className="text-indigo-300 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            strokeWidth={2}
          />
        </div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
      </div>
    </div>
  );
}