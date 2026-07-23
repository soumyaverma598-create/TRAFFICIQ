import { useRef, useState } from "react";
import SectionTransitionGlow from "./SectionTransitionGlow";
import { useInView } from "../../hooks/useInView";

const technologies = [
  "React",
  "Vite",
  "Tailwind CSS",
  "FastAPI",
  "Python",
  "XGBoost",
  "Scikit-learn",
  "Leaflet",
];

function MagneticPill({ children, index }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    setOffset({ x: relX * 0.25, y: relY * 0.25 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.15s ease-out" }}
    >
      <span
        className="dm-pill-float dm-chip-dark relative inline-flex cursor-default items-center rounded-full px-5 py-2 text-sm font-medium text-white/85"
        style={{ "--dur": `${5 + (index % 3)}s`, "--delay": `${(index * 0.3) % 3}s` }}
      >
        {children}
      </span>
    </span>
  );
}

export default function TechStackSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#111827]">
      <SectionTransitionGlow
        colorFrom="rgba(192,132,252,0.18)"
        colorTo="rgba(129,140,248,0.14)"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Technology stack
          </h2>
          <p className="mt-3 text-base text-white/55">
            Built entirely on open, freely available tools.
          </p>
        </div>

        <div
          className={`dm-reveal relative flex flex-wrap items-center justify-center gap-4 overflow-hidden py-2 ${
            inView ? "dm-visible" : ""
          }`}
        >
          <div
            className="dm-pill-beam pointer-events-none absolute inset-y-0 left-0 w-1/4"
            style={{
              background:
                "linear-gradient(90deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.25) 50%, rgba(129,140,248,0) 100%)",
            }}
            aria-hidden="true"
          />
          {technologies.map((tech, index) => (
            <MagneticPill key={tech} index={index}>
              {tech}
            </MagneticPill>
          ))}
        </div>
      </div>
    </section>
  );
}