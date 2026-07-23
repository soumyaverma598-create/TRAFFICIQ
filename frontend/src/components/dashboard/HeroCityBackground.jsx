// Isometric "AI-scanned city" scene rendered as a single inline SVG.
// Geometry is computed once at module load via the shared projector
// from utils/isometricGrid — not per render. All motion classes
// (dm-*) come from src/styles/dashboardMotion.css.

import { makeProjector, pathFromWaypoints, buildGridLines, pointStr } from "../../utils/isometricGrid";

const ORIGIN = { x: 600, y: 250 };
const TILE_W = 92;
const TILE_H = 46;
const RANGE = 7;
const project = makeProjector(ORIGIN, TILE_W, TILE_H);

const gridLines = buildGridLines(project, RANGE);

const BUILDING_DEFS = [
  { i: -6, j: -2, h: 46 },
  { i: -5, j: -4, h: 64 },
  { i: -3, j: -6, h: 34 },
  { i: 4, j: 1, h: 50 },
  { i: 5, j: 3, h: 36 },
  { i: 2, j: 5, h: 58 },
  { i: -6, j: 3, h: 28 },
  { i: 5, j: -5, h: 42 },
  { i: -1, j: -7, h: 24 },
  { i: 6, j: -1, h: 30 },
];

function buildingEdges({ i, j, h }) {
  const N = project(i, j);
  const E = project(i + 1, j);
  const S = project(i + 1, j + 1);
  const W = project(i, j + 1);
  const lift = (p) => ({ x: p.x, y: p.y - h });

  return {
    verticals: [N, E, S, W].map((p) => `M ${pointStr(p)} L ${pointStr(lift(p))}`),
    top: `M ${[N, E, S, W].map((p) => pointStr(lift(p))).join(" L ")} Z`,
  };
}

const buildings = BUILDING_DEFS.map((def, index) => ({
  key: `building-${index}`,
  ...buildingEdges(def),
}));

const flowPaths = [
  {
    key: "flow-1",
    color: "#22D3EE",
    d: pathFromWaypoints(project, [
      { i: -7, j: 2 }, { i: -4, j: 2 }, { i: -4, j: -1 },
      { i: -1, j: -1 }, { i: -1, j: 2 }, { i: 3, j: 2 }, { i: 3, j: 6 },
    ]),
  },
  {
    key: "flow-2",
    color: "#818CF8",
    d: pathFromWaypoints(project, [
      { i: 7, j: -3 }, { i: 3, j: -3 }, { i: 3, j: 0 },
      { i: -1, j: 0 }, { i: -1, j: -4 },
    ]),
  },
  {
    key: "flow-3",
    color: "#C084FC",
    d: pathFromWaypoints(project, [
      { i: -6, j: -5 }, { i: -2, j: -5 }, { i: -2, j: -2 }, { i: 1, j: -2 },
    ]),
  },
  {
    key: "flow-4",
    color: "#34D399",
    d: pathFromWaypoints(project, [
      { i: 6, j: 4 }, { i: 2, j: 4 }, { i: 2, j: 1 }, { i: -2, j: 1 }, { i: -2, j: 4 },
    ]),
  },
];

const INTERSECTION_DEFS = [
  { i: -4, j: 2 }, { i: -1, j: 2 }, { i: 3, j: 2 },
  { i: 3, j: -3 }, { i: -1, j: -4 }, { i: -2, j: -2 },
  { i: 2, j: 1 }, { i: -2, j: 1 },
];

const intersections = INTERSECTION_DEFS.map((def, index) => ({
  key: `node-${index}`,
  ...project(def.i, def.j),
  delay: (index * 0.5) % 4,
}));

const DATA_NODE_DEFS = [
  { i: -5, j: 0, dur: 7.4 },
  { i: 4, j: -1, dur: 6.8 },
  { i: 0, j: -6, dur: 8.1 },
  { i: -3, j: 5, dur: 7.0 },
  { i: 6, j: 1, dur: 6.4 },
];

const dataNodes = DATA_NODE_DEFS.map((def, index) => ({
  key: `data-node-${index}`,
  ...project(def.i, def.j),
  dur: def.dur,
  delay: (index * 0.8) % 3,
}));

const hotspot = project(-2.5, 4);

export default function HeroCityBackground() {
  return (
    <div className="dm-hero-fade-in pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <filter id="hero-glow-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <radialGradient id="hero-hotspot-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="dm-camera-rig">
          <g stroke="#38415A" strokeWidth="1" opacity="0.55">
            {gridLines.map((line) => (
              <line key={line.key} x1={line.x} y1={line.y} x2={line.x2} y2={line.y2} />
            ))}
          </g>

          <g stroke="#5B6B99" strokeWidth="1" fill="none" opacity="0.6">
            {buildings.map((b) => (
              <g key={b.key}>
                <path d={b.top} />
                {b.verticals.map((v, i) => (
                  <path key={i} d={v} />
                ))}
              </g>
            ))}
          </g>

          {flowPaths.map((flow) => (
            <g key={flow.key}>
              <path
                d={flow.d}
                fill="none"
                stroke={flow.color}
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#hero-glow-blur)"
                className="dm-glow-pulse"
              />
              <path
                d={flow.d}
                fill="none"
                stroke={flow.color}
                strokeWidth="1.75"
                strokeLinecap="round"
                opacity="0.9"
                className="dm-dash-flow"
              />
              <g className="hero-motion-sensitive">
                <circle r="4" fill={flow.color} filter="url(#hero-glow-blur)">
                  <animateMotion dur="6s" begin="0s" repeatCount="indefinite" path={flow.d} />
                </circle>
                <circle r="3" fill={flow.color} filter="url(#hero-glow-blur)" opacity="0.8">
                  <animateMotion dur="6s" begin="3s" repeatCount="indefinite" path={flow.d} />
                </circle>
              </g>
            </g>
          ))}

          <g className="hero-motion-sensitive">
            {intersections.map((node) => (
              <circle
                key={node.key}
                cx={node.x}
                cy={node.y}
                r="3"
                fill="none"
                stroke="#A5B4FC"
                strokeWidth="1.5"
                className="dm-node-pulse"
                style={{ animationDelay: `${node.delay}s` }}
              />
            ))}
          </g>

          <g className="hidden sm:block">
            {dataNodes.map((node) => (
              <g
                key={node.key}
                className="dm-data-node"
                style={{ "--dur": `${node.dur}s`, "--delay": `${node.delay}s` }}
              >
                <circle cx={node.x} cy={node.y} r="9" fill="none" stroke="#67E8F9" strokeWidth="1" opacity="0.7" />
                <circle cx={node.x} cy={node.y} r="2.5" fill="#67E8F9" filter="url(#hero-glow-blur)" />
              </g>
            ))}
          </g>

          <circle
            className="dm-hotspot hero-motion-sensitive hidden sm:block"
            cx={hotspot.x}
            cy={hotspot.y}
            r="38"
            fill="url(#hero-hotspot-gradient)"
          />
        </g>
      </svg>
    </div>
  );
}