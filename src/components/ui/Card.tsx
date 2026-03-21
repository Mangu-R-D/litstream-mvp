export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}>{children}</div>;
}
