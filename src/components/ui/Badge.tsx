import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "teal" | "blue" | "amber" | "rose" | "dark" | "slate";
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "emerald",
  icon,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    teal: "bg-teal-50 text-teal-800 border-teal-200/80",
    blue: "bg-blue-50 text-blue-700 border-blue-200/80",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    rose: "bg-rose-50 text-rose-700 border-rose-200/80",
    dark: "bg-[#042F2E] text-emerald-300 border-emerald-500/30",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest font-mono shadow-2xs backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
