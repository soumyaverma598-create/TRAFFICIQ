import { Map, BrainCircuit, Server, Workflow } from "lucide-react";
import FeatureCard from "./FeatureCard";
import SectionGridBackdrop from "./SectionGridBackdrop";
import SectionTransitionGlow from "./SectionTransitionGlow";
import AmbientParticles from "./AmbientParticles";
import { useInView } from "../../hooks/useInView";

const features = [
  {
    icon: Map,
    title: "Interactive Traffic Map",
    description: "A Leaflet-based map of Raipur for picking exact prediction locations.",
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning Prediction",
    description: "An XGBoost model trained on traffic-engineering-based congestion scoring.",
  },
  {
    icon: Server,
    title: "FastAPI Backend",
    description: "A Python API that validates input, runs inference, and returns results fast.",
  },
  {
    icon: Workflow,
    title: "Real-Time Prediction Workflow",
    description: "From location to forecast in one continuous flow, no page reloads.",
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0F111A]">
      <SectionTransitionGlow
        colorFrom="rgba(34,211,238,0.2)"
        colorTo="rgba(192,132,252,0.12)"
      />
      <SectionGridBackdrop
        opacity={0.08}
        range={6}
        origin={{ x: 600, y: 20 }}
        tileW={100}
        tileH={50}
        color="#6366F1"
      />
      <AmbientParticles />
      <div
        className="dm-glow-pulse pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0) 70%)" }}
      />
      <div
        className="dm-glow-pulse pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0) 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Key features
          </h2>
          <p className="mt-3 text-base text-white/55">
            What TrafficIQ actually does, end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} visible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}