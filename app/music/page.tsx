import { getBySegment, formatDuration } from "@/lib/catalog";

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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div
                className="mb-3 aspect-square w-full rounded-md bg-surface-3 bg-cover bg-center transition-colors group-hover:bg-surface-4"
                style={{ backgroundImage: `url(${item.coverArt})` }}
              />
              <p className="truncate text-sm font-medium text-text-primary">
                {item.title}
              </p>
              <p className="truncate text-xs text-text-secondary">
                {item.creator} · {formatDuration(item.durationSec)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
