import { MapPin, ClipboardList, Cpu, BarChart3 } from "lucide-react";
import SectionGridBackdrop from "./SectionGridBackdrop";
import SectionTransitionGlow from "./SectionTransitionGlow";
import { useInView } from "../../hooks/useInView";

const steps = [
  {
    icon: MapPin,
    title: "Select Location",
    description: "Choose a point on the Raipur map you want a forecast for.",
  },
  {
    icon: ClipboardList,
    title: "Enter Traffic Conditions",
    description: "Add weather, signal status, and accident details for that moment.",
  },
  {
    icon: Cpu,
    title: "AI Predicts Congestion",
    description: "An XGBoost model scores expected congestion from your inputs.",
  },
  {
    icon: BarChart3,
    title: "View Results",
    description: "Get a clear, explained congestion forecast instantly.",
  },
];

const STEP_X = [80, 380, 680, 980];
const PIPELINE_Y = 60;
const pipelinePath = `M ${STEP_X[0]} ${PIPELINE_Y} L ${STEP_X[1]} ${PIPELINE_Y} L ${STEP_X[2]} ${PIPELINE_Y} L ${STEP_X[3]} ${PIPELINE_Y}`;

function PipelineBackdrop() {
  return (
    <svg
      viewBox="0 0 1160 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-10 hidden h-24 w-full md:block"
      aria-hidden="true"
    >
      <defs>
        <filter id="how-glow-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path
        d={pipelinePath}
        fill="none"
        stroke="#818CF8"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#how-glow-blur)"
        className="dm-glow-pulse"
        opacity="0.6"
      />
      <path
        d={pipelinePath}
        fill="none"
        stroke="#A5B4FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="dm-pipeline-line"
      />
      <circle r="4" fill="#22D3EE" filter="url(#how-glow-blur)">
        <animateMotion dur="5s" repeatCount="indefinite" path={pipelinePath} />
      </circle>

      {STEP_X.map((x, index) => (
        <circle
          key={index}
          cx={x}
          cy={PIPELINE_Y}
          r="3"
          fill="none"
          stroke="#818CF8"
          strokeWidth="1.5"
          className="dm-node-pulse"
          style={{ animationDelay: `${index * 0.6}s` }}
        />
      ))}
    </svg>
  );
}

export default function HowItWorksSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0B0F17]">
      <SectionTransitionGlow
        colorFrom="rgba(129,140,248,0.28)"
        colorTo="rgba(34,211,238,0.14)"
      />
      <SectionGridBackdrop
        opacity={0.1}
        range={5}
        origin={{ x: 580, y: 40 }}
        tileW={110}
        tileH={55}
        color="#6366F1"
      />
      <PipelineBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-base text-white/55">
            Four steps from a location on the map to a congestion forecast.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`dm-reveal dm-card-hover dm-gradient-border dm-glass-panel delay-${index + 1} group flex flex-col items-center rounded-2xl p-7 text-center ${
                inView ? "dm-visible" : ""
              }`}
            >
              <div className="dm-icon-idle mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] transition-colors duration-300 group-hover:bg-indigo-400/15">
                <step.icon
                  size={22}
                  className="text-indigo-300 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}