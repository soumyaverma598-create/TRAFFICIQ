import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroCityBackground from "./HeroCityBackground";
import HeroAtmosphere from "./HeroAtmosphere";
import CursorGrid from "./CursorGrid";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#05060A] md:min-h-[760px]">
      <HeroCityBackground />
      <HeroAtmosphere />

      {/* Interactive cursor-lit grid — subtle, desktop only, sits above the
          city/atmosphere art but under the vignette so it stays understated */}
      <div className="pointer-events-auto absolute inset-0 z-[1] hidden sm:block">
        <CursorGrid
          cellSize={84}
          color="#818CF8"
          radius={170}
          falloff="smooth"
          holdTime={260}
          fadeDuration={650}
          lineWidth={1}
          maxOpacity={0.45}
          fillOpacity={0}
          gridOpacity={0.02}
          cellRadius={2}
          clickPulse
          pulseSpeed={480}
        />
      </div>

      {/* Atmospheric vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 900px 640px at 50% 46%, rgba(5,6,10,0.78) 0%, rgba(5,6,10,0.55) 38%, rgba(5,6,10,0.15) 62%, rgba(5,6,10,0) 78%)",
        }}
      />

      {/* Updated bottom fade (dark -> dark section) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,6,10,0) 0%, #0B0F17 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-28">
        <span className="dm-hero-text-in delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-white/80 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#818CF8] shadow-[0_0_8px_2px_rgba(129,140,248,0.7)]" />
          Machine learning, applied to city traffic
        </span>

        <h1 className="dm-hero-text-in delay-2 dm-title-glow text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          TrafficIQ
        </h1>

        <p className="dm-hero-text-in delay-3 mt-4 bg-gradient-to-r from-indigo-300 via-violet-200 to-cyan-300 bg-clip-text text-lg font-medium text-transparent sm:text-xl">
          AI-Powered Traffic Intelligence Platform
        </p>

        <p className="dm-hero-text-in delay-4 mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/65 sm:text-lg">
          TrafficIQ predicts road congestion before you hit the road. Pick a
          location, describe current conditions, and a trained machine
          learning model estimates how congested it will be — turning
          scattered signals like weather, signal status, and past patterns
          into one clear forecast.
        </p>

        <Link
          to="/predictions"
          className="dm-hero-text-in delay-5 group relative z-10 mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-7 py-3.5 text-base font-medium text-white shadow-[0_8px_30px_-6px_rgba(99,102,241,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-6px_rgba(99,102,241,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#818CF8]"
        >
          Start Prediction
          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
