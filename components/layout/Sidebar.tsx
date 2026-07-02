"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ResonanceLogoIcon,
  HomeIcon,
  MusicIcon,
  MicIcon,
  BrushIcon,
  CompassIcon,
} from "@/components/icons";

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/music", label: "Music", Icon: MusicIcon },
  { href: "/podcast", label: "Podcast", Icon: MicIcon },
  { href: "/canvas", label: "Canvas", Icon: BrushIcon },
  { href: "/discover", label: "Discover", Icon: CompassIcon },
] as const;

// Each segment's accent color when active
const SEGMENT_ACCENT: Record<string, string> = {
  "/": "#1DB954",
  "/music": "#1DB954",
  "/podcast": "#2D9CDB",
  "/canvas": "#9B59B6",
  "/discover": "#F2994A",
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-shrink-0 flex-col bg-surface-base overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-7">
        <ResonanceLogoIcon size={28} className="text-brand" />
        <span className="text-xl font-bold tracking-tight text-text-primary">
          Resonance
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const accentColor = active ? (SEGMENT_ACCENT[href] ?? "#1DB954") : undefined;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon
                size={22}
                style={accentColor ? { color: accentColor } : undefined}
                className={active ? undefined : "text-current"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-6 my-4 border-t border-surface-3" />

      {/* Library placeholder */}
      <div className="px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
          Your Library
        </p>
        <p className="text-sm text-text-muted">
          Sign in to see your saved content.
        </p>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />
    </aside>
  );
}
