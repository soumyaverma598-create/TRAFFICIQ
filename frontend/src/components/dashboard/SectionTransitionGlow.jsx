// Soft blended seam between two dark sections — a wide, blurred radial
// glow straddling the top edge (mix of Hero palette colors) plus a
// faint hairline separator. Replaces a hard section-to-section color
// cut with a continuous gradient blend, so the page reads as one
// scrolling surface rather than stacked panels.

export default function SectionTransitionGlow({
  colorFrom = "rgba(79,70,229,0.22)",
  colorTo = "rgba(34,211,238,0.12)",
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-40 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="dm-glow-pulse absolute left-1/2 top-0 h-72 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(ellipse at center, ${colorFrom} 0%, ${colorTo} 40%, transparent 72%)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}