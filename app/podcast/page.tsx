import { getBySegment } from "@/lib/catalog";
import PodcastList from "@/components/ui/PodcastList";

export default async function PodcastPage() {
  const items = await getBySegment("podcast");
  const showCount = new Set(items.map((i) => i.creator)).size;

  return (
    <div className="min-h-full bg-gradient-to-b from-[#2e1a4a] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#8D67AB]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Podcast</h1>
        <p className="mt-2 text-text-secondary">
          {showCount} {showCount === 1 ? "show" : "shows"} · {items.length}{" "}
          {items.length === 1 ? "episode" : "episodes"}
        </p>
      </header>

      <PodcastList items={items} />
    </div>
  );
}
