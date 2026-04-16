"use client";

export default function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1 — the primary ellipse that drifts across */}
      <div className="gradient-mesh-a absolute inset-0" />
      {/* Layer 2 — the secondary ellipse that drifts in counter-phase */}
      <div className="gradient-mesh-b absolute inset-0" />
    </div>
  );
}
