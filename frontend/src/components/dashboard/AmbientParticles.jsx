// A small field of slowly drifting light particles used as an ambient
// "AI working behind the scenes" texture. Positions are fixed at module
// load (not random per render) so the layout never shifts on re-render.

const PARTICLE_DEFS = [
  { x: 8, y: 15, color: "#818CF8", dur: 7.2 },
  { x: 22, y: 68, color: "#22D3EE", dur: 8.4 },
  { x: 38, y: 30, color: "#C084FC", dur: 6.6 },
  { x: 55, y: 78, color: "#818CF8", dur: 7.8 },
  { x: 70, y: 22, color: "#22D3EE", dur: 6.9 },
  { x: 85, y: 60, color: "#C084FC", dur: 7.5 },
  { x: 94, y: 12, color: "#818CF8", dur: 8.1 },
  { x: 15, y: 88, color: "#22D3EE", dur: 7.0 },
];

export default function AmbientParticles({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {PARTICLE_DEFS.map((p, index) => (
        <span
          key={index}
          className="dm-data-node absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            boxShadow: `0 0 10px 2px ${p.color}`,
            "--dur": `${p.dur}s`,
            "--delay": `${(index * 0.5) % 3}s`,
          }}
        />
      ))}
    </div>
  );
}