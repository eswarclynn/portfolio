"use client";

export default function LogoEPC({
  size = 20,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontSize: size,
        fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
        fontWeight: 700,
        letterSpacing: "0.15em",
        color,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      <span style={{ color: "var(--muted)" }}>&lt;</span>
      <span style={{ color: "var(--accent)" }}>EPC</span>
      <span style={{ color: "var(--muted)" }}>/&gt;</span>
    </span>
  );
}
