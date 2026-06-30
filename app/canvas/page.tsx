export default function CanvasPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#4a0820] to-surface-1 px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#E8115B]">
          Segment
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Canvas</h1>
        <p className="mt-2 text-text-secondary">
          Visual soundscapes and animated artwork will appear here.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-surface-3 transition-colors hover:bg-surface-4"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs text-text-muted">Canvas placeholder</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
