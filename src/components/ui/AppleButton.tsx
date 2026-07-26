import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface AppleButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function AppleButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  ...props
}: AppleButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 select-none";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-semibold tracking-wider",
    md: "px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase",
    lg: "px-7 py-3.5 text-sm sm:text-base font-bold tracking-wider uppercase",
  };

  const variantClasses = {
    primary:
      "bg-[#0F766E] hover:bg-[#0D645E] text-white shadow-md hover:shadow-lg shadow-teal-900/10 hover:shadow-teal-900/20 border border-teal-600/30",
    secondary:
      "bg-[#10B981] hover:bg-[#059669] text-white shadow-md hover:shadow-lg shadow-emerald-500/20 border border-emerald-400/30",
    dark: "bg-[#042F2E] hover:bg-[#064e4b] text-emerald-300 border border-emerald-500/30 shadow-xl",
    outline:
      "bg-white/60 hover:bg-white/90 text-slate-800 border border-slate-300/80 shadow-xs hover:border-emerald-500/50 backdrop-blur-md",
    ghost:
      "bg-transparent hover:bg-slate-100/80 text-slate-700 hover:text-slate-900",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icon && iconPosition === "left" ? (
        <span className="mr-2 flex items-center">{icon}</span>
      ) : null}

      <span>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2 flex items-center">{icon}</span>
      )}
    </motion.button>
  );
}
