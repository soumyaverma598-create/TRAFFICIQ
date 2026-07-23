import { makeProjector, buildGridLines } from "../../utils/isometricGrid";

// Lightweight, low-opacity isometric grid used as a shared background
// texture across sections below the Hero. Same projection math as the
// Hero's city scene; color/opacity are tuned per section for a dark
// backdrop so it reads as a quiet echo of the Hero, not a copy.
export default function SectionGridBackdrop({
  className = "",
  opacity = 0.12,
  color = "#6366F1",
  range = 6,
  origin = { x: 600, y: 40 },
  tileW = 100,
  tileH = 50,
}) {
  const project = makeProjector(origin, tileW, tileH);
  const lines = buildGridLines(project, range);

  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1" opacity={opacity}>
        {lines.map((line) => (
          <line key={line.key} x1={line.x} y1={line.y} x2={line.x2} y2={line.y2} />
        ))}
      </g>
    </svg>
  );
}