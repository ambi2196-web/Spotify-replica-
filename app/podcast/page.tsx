import { getBySegment, formatDuration } from "@/lib/catalog";

export default async function PodcastPage() {
  const items = await getBySegment("podcast");

  const shows = Array.from(new Set(items.map((item) => item.creator)));

  return (
    <div className="min-h-full bg-gradient-to-b from-[#2e1a4a] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#8D67AB]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Podcast</h1>
        <p className="mt-2 text-text-secondary">
          {shows.length} shows · {items.length} episodes
        </p>
      </header>

      {shows.map((show) => {
        const episodes = items.filter((item) => item.creator === show);
        const showArt = episodes[0].coverArt;
        return (
          <section key={show} className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-10 w-10 flex-shrink-0 rounded-full bg-surface-3 bg-cover bg-center"
                style={{ backgroundImage: `url(${showArt})` }}
              />
              <h2 className="text-xl font-bold text-text-primary">{show}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {episodes.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div
                    className="mb-3 aspect-square w-full rounded-full bg-surface-3 bg-cover bg-center transition-colors group-hover:bg-surface-4"
                    style={{ backgroundImage: `url(${item.coverArt})` }}
                  />
                  <p className="truncate text-sm font-medium text-text-primary">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {formatDuration(item.durationSec)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
