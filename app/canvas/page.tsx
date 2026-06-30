import { getBySegment, formatDuration } from "@/lib/catalog";

const TAG_LABELS: Record<string, string> = {
  focus: "Focus",
  energy: "Energy",
  motivate: "Motivate",
  calm: "Calm",
  "wind-down": "Wind Down",
};

const TAG_COLORS: Record<string, string> = {
  focus: "bg-blue-900/70 text-blue-200",
  energy: "bg-orange-900/70 text-orange-200",
  motivate: "bg-yellow-900/70 text-yellow-200",
  calm: "bg-teal-900/70 text-teal-200",
  "wind-down": "bg-purple-900/70 text-purple-200",
};

export default async function CanvasPage() {
  const items = await getBySegment("canvas");
  const stateItems = items.filter((item) => item.tags && item.tags.length > 0);
  const composedItems = items.filter(
    (item) => !item.tags || item.tags.length === 0
  );

  return (
    <div className="min-h-full bg-gradient-to-b from-[#4a0820] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#E8115B]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Canvas</h1>
        <p className="mt-2 text-text-secondary">
          Cognitive states and composed soundscapes
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-text-primary">
          Cognitive States
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stateItems.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-surface-3 bg-cover bg-center transition-colors hover:bg-surface-4"
              style={{
                aspectRatio: "16/9",
                backgroundImage: `url(${item.coverArt})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mb-1.5 flex flex-wrap gap-1">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TAG_COLORS[tag] ?? "bg-surface-4 text-text-secondary"}`}
                    >
                      {TAG_LABELS[tag] ?? tag}
                    </span>
                  ))}
                </div>
                <p className="truncate text-sm font-bold text-white">
                  {item.title}
                </p>
                <p className="text-xs text-white/60">
                  {formatDuration(item.durationSec)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-text-primary">Composed</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {composedItems.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-surface-3 bg-cover bg-center transition-colors hover:bg-surface-4"
              style={{
                aspectRatio: "16/9",
                backgroundImage: `url(${item.coverArt})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="truncate text-sm font-bold text-white">
                  {item.title}
                </p>
                <p className="text-xs text-white/60">
                  {item.creator} · {formatDuration(item.durationSec)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
