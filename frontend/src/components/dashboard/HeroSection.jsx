import { Sparkles, Route, Clock, Gauge } from "lucide-react";

/**
 * HeroSection
 *
 * Top-of-dashboard greeting + system status. Self-contained —
 * pages compose this above KPI cards / charts / insights, which
 * live in their own components.
 */
export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px] lg:gap-6">
      {/* Left — greeting & overview */}
      <div className="flex flex-col justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-8 lg:px-9 lg:py-10">
        <p className="text-[13px] font-medium tracking-wide text-[var(--color-accent)]">
          AI TRAFFIC INTELLIGENCE PLATFORM
        </p>

        <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-[var(--color-text-primary)] lg:text-[32px]">
          Good Morning, Soumya <span className="inline-block">👋</span>
        </h1>

        <p className="mt-1.5 text-[15px] text-[var(--color-text-secondary)]">
          Welcome back to TRAFFICIQ
        </p>

        <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
          Traffic conditions remain stable. Rain expected after 5 PM. Peak
          congestion predicted between 5:30 PM and 7 PM.
        </p>

        <div className="mt-7">
          <button
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-[13.5px] font-medium tracking-wide text-[#0B0D10] transition-all duration-200 ease-[var(--ease-tactile)] hover:-translate-y-[1px] hover:brightness-110 active:translate-y-0"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            Generate Prediction
          </button>
        </div>
      </div>

      {/* Right — glass status panel */}
      <div className="rounded-2xl border border-[var(--color-border)]/70 bg-[var(--color-surface)]/60 px-6 py-6 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </span>
          <span className="text-[13.5px] font-medium text-[var(--color-text-primary)]">
            AI Engine Online
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <StatusRow
            icon={Route}
            label="Monitoring"
            value="42 Road Segments"
          />
          <StatusRow icon={Clock} label="Updated" value="12 sec ago" />
          <StatusRow icon={Gauge} label="AI Confidence" value="96.4%" />
        </div>
      </div>
    </section>
  );
}

function StatusRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors duration-200 ease-[var(--ease-tactile)] hover:bg-[var(--color-surface-elevated)]/50">
      <div className="flex items-center gap-2.5 text-[13px] text-[var(--color-text-secondary)]">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
        {label}
      </div>
      <span className="text-[13px] font-medium text-[var(--color-text-primary)]">
        {value}
      </span>
    </div>
  );
}
