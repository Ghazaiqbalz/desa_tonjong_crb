import React from "react";
import Badge from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  className = "",
  icon,
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl space-y-3 ${
        centered ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div className={centered ? "flex justify-center" : "flex justify-start"}>
          <Badge variant="emerald" icon={icon}>
            {eyebrow}
          </Badge>
        </div>
      )}

      <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>

      <div
        className={`h-1 w-16 rounded-full bg-gradient-to-r from-[#0F766E] to-[#10B981] ${
          centered ? "mx-auto" : ""
        }`}
      />

      {description && (
        <p className="font-sans text-sm sm:text-base text-[#64748B] leading-relaxed pt-1 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
