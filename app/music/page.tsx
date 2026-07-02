import type { Metadata } from "next";
import { getBySegment } from "@/lib/catalog";
import MusicGrid from "@/components/ui/MusicGrid";

export const metadata: Metadata = {
  title: "Music — Resonance",
};

export default async function MusicPage() {
  const items = await getBySegment("music");

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1a4a2a] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Music</h1>
        <p className="mt-2 text-text-secondary">
          {items.length} tracks in your library
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-text-primary">
          Your Library
        </h2>
        <MusicGrid items={items} />
      </section>
    </div>
  );
}
