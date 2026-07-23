// Ambient glow blobs + AI-scan sweep. Uses the shared dm-* classes
// from dashboardMotion.css instead of its own inline keyframes.

export default function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="dm-blob-a absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 70%)" }}
      />
      <div
        className="dm-blob-b absolute -bottom-32 -right-16 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 70%)" }}
      />
      <div
        className="dm-scan-beam absolute inset-y-0 left-0 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, rgba(165,180,252,0) 0%, rgba(165,180,252,0.16) 45%, rgba(103,232,249,0.16) 55%, rgba(103,232,249,0) 100%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}