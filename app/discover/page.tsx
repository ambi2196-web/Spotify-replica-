export default function DiscoverPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#0a2a5a] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#0D72EA]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Discover</h1>
        <p className="mt-2 text-text-secondary">
          Recommendations and new releases will appear here.
        </p>
      </header>

      {["Recommended for You", "New Releases", "Trending Now"].map((shelf) => (
        <section key={shelf} className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-text-primary">{shelf}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="mb-3 aspect-square w-full rounded-md bg-surface-3 transition-colors group-hover:bg-surface-4" />
                <p className="truncate text-sm font-medium text-text-primary">
                  — — —
                </p>
                <p className="truncate text-xs text-text-secondary">— — —</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
