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
      className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl p-5 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:min-h-[300px] md:p-6"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
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
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-white md:h-12 md:w-12">
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10 mt-auto">
        <h2 className="mb-1 text-xl font-bold text-white md:text-2xl">{title}</h2>
        <p className="text-xs font-medium text-white/75 md:text-sm">{tagline}</p>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </Link>
  );
}
