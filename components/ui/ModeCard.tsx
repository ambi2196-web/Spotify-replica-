import Link from "next/link";
import type { ReactNode } from "react";

type ModeCardProps = {
  href: string;
  title: string;
  tagline: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
};

export default function ModeCard({
  href,
  title,
  tagline,
  icon,
  gradientFrom,
  gradientTo,
}: ModeCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        minHeight: "200px",
      }}
    >
      {/* Background noise texture overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-white">
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10 mt-auto">
        <h2 className="mb-1 text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm font-medium text-white/75">{tagline}</p>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </Link>
  );
}
