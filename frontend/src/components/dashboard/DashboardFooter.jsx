import SectionTransitionGlow from "./SectionTransitionGlow";

export default function DashboardFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0B0F17]">
      <SectionTransitionGlow
        colorFrom="rgba(129,140,248,0.16)"
        colorTo="rgba(34,211,238,0.1)"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 text-center">
        <p className="text-base font-semibold tracking-tight text-white">
          TrafficIQ
        </p>
        <p className="mt-1 text-sm text-white/50">
          Built using React, FastAPI and Machine Learning.
        </p>
      </div>
    </footer>
  );
}