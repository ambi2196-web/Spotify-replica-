import type { Metadata } from "next";
import Link from "next/link";
import { getAllItems } from "@/lib/catalog";
import type { CatalogItem } from "@/lib/types";
import ModeCard from "@/components/ui/ModeCard";
import TimeGreeting from "@/components/ui/TimeGreeting";
import { MusicIcon, MicIcon, BrushIcon, CompassIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resonance — A Spotify Product Thesis",
};

const modes = [
  {
    href: "/music",
    title: "Music",
    tagline: "Your library, your mood",
    icon: <MusicIcon size={24} />,
    gradientFrom: "#1DB954",
    gradientTo: "#0a5c2a",
  },
  {
    href: "/podcast",
    title: "Podcast",
    tagline: "Ideas worth hearing",
    icon: <MicIcon size={24} />,
    gradientFrom: "#2D9CDB",
    gradientTo: "#0e4a73",
  },
  {
    href: "/canvas",
    title: "Canvas",
    tagline: "Audio built for your state — or made by you",
    icon: <BrushIcon size={24} />,
    gradientFrom: "#9B59B6",
    gradientTo: "#5a2d7a",
  },
  {
    href: "/discover",
    title: "Discover",
    tagline: "30 seconds in. Stay if it's worth it.",
    icon: <CompassIcon size={24} />,
    gradientFrom: "#F2994A",
    gradientTo: "#8a4010",
  },
] as const;

const SEGMENT_COLOR: Record<string, string> = {
  music: "#1DB954",
  podcast: "#2D9CDB",
  canvas: "#9B59B6",
  discover: "#F2994A",
};

// IDs to show in each home section — one per segment for variety
const RECENT_IDS = ["m1", "m3", "p1", "p2", "c4", "d1"];
const FEATURED_IDS = ["c5", "d3", "p3"];

export default async function GatewayPage() {
  const allItems = await getAllItems();

  const recentItems = RECENT_IDS
    .map((id) => allItems.find((i) => i.id === id))
    .filter((i): i is CatalogItem => i !== undefined);

  const featuredItems = FEATURED_IDS
    .map((id) => allItems.find((i) => i.id === id))
    .filter((i): i is CatalogItem => i !== undefined);

  return (
    <div className="min-h-full bg-gradient-to-b from-surface-3 to-surface-1 px-5 py-8 md:px-8 md:py-12">
      {/* Header */}
      <header className="mb-8 md:mb-10">
        <TimeGreeting />
        <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
          What are you in the mood for?
        </h1>
        <p className="mt-3 max-w-xl text-sm italic text-text-muted">
          A product strategy thesis for Spotify's audio future — built to prove
          that platform-owned audio is the only durable margin lever.
        </p>
      </header>

      {/* Segment cards */}
      <section className="mb-10 md:mb-14">
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {modes.map((mode) => (
            <ModeCard key={mode.href} {...mode} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="mb-10 md:mb-14">
        <h2 className="mb-4 text-xl font-bold text-text-primary md:mb-6 md:text-2xl">
          Recently Played
        </h2>
        {/* Horizontal shelf — bleeds to screen edge on mobile */}
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {recentItems.map((item) => (
            <Link
              key={item.id}
              href={`/${item.segment}`}
              className="flex min-w-[190px] flex-shrink-0 items-center gap-3 rounded-lg bg-surface-2 p-3 transition-colors hover:bg-surface-3 md:min-w-[200px]"
            >
              <div
                className="h-12 w-12 flex-shrink-0 rounded-md bg-surface-3 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.coverArt})` }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {item.title}
                </p>
                <p className="truncate text-xs text-text-secondary">
                  {item.creator}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-text-primary md:mb-6 md:text-2xl">
          Made for You
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href={`/${item.segment}`}
              className="group overflow-hidden rounded-xl bg-surface-2 transition-colors hover:bg-surface-3"
            >
              <div
                className="aspect-video w-full bg-cover bg-center bg-surface-3"
                style={{ backgroundImage: `url(${item.coverArt})` }}
              />
              <div className="p-4">
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: SEGMENT_COLOR[item.segment] }}
                >
                  {item.segment}
                </p>
                <h3 className="mb-1 text-sm font-bold leading-snug text-text-primary">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-xs text-text-secondary">
                  {item.description ?? item.creator}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
