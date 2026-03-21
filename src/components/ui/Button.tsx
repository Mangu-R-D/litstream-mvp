import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";
  const styles: Record<Variant, string> = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  return <button className={`${base} ${styles[variant]} ${className}`.trim()} {...props} />;
}
