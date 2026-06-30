import { getBySegment, formatDuration } from "@/lib/catalog";

const CATEGORY_LABELS: Record<string, string> = {
  "daily-brief": "Daily Brief",
  science: "Science",
  politics: "Politics",
  history: "History",
  culture: "Culture",
};

const CATEGORY_ORDER = [
  "daily-brief",
  "science",
  "politics",
  "history",
  "culture",
];

export default async function DiscoverPage() {
  const items = await getBySegment("discover");

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    items: items.filter((item) => item.tags?.includes(cat)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-full bg-gradient-to-b from-[#0a2a5a] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#0D72EA]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Discover</h1>
        <p className="mt-2 text-text-secondary">
          {items.length} episodes across {byCategory.length} categories
        </p>
      </header>

      {byCategory.map(({ key, label, items: catItems }) => (
        <section key={key} className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-text-primary">{label}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {catItems.map((item) => (
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
      ))}
    </div>
  );
}
