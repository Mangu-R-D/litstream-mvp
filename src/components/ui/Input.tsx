import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none ring-slate-300 focus:ring-2 ${className}`.trim()}
      {...props}
    />
  );
}
