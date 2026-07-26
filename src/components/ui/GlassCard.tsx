import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  dark = false,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-[24px] transition-all duration-300 ${
        dark
          ? "bg-[#042F2E]/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl text-white"
          : "bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/30 text-slate-900"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
