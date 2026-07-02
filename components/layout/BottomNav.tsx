"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MusicIcon,
  MicIcon,
  BrushIcon,
  CompassIcon,
} from "@/components/icons";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon, accent: "#1DB954" },
  { href: "/music", label: "Music", Icon: MusicIcon, accent: "#1DB954" },
  { href: "/podcast", label: "Podcast", Icon: MicIcon, accent: "#2D9CDB" },
  { href: "/canvas", label: "Canvas", Icon: BrushIcon, accent: "#9B59B6" },
  { href: "/discover", label: "Discover", Icon: CompassIcon, accent: "#F2994A" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:hidden flex-shrink-0 border-t border-surface-3 bg-surface-2">
      {NAV_ITEMS.map(({ href, label, Icon, accent }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-[10px] font-medium transition-colors"
            style={{ color: active ? accent : "var(--text-muted)" }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
