"use client";

export default function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`animate-gradient-x bg-clip-text text-transparent font-bold ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #8b5cf6, #c084fc, #e879f9, #c084fc, #8b5cf6)",
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </span>
  );
}
