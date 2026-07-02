"use client";

import { usePlayerStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@/components/icons";
import type { CatalogItem } from "@/lib/types";

export default function PodcastList({ items }: { items: CatalogItem[] }) {
  const setCurrentItem = usePlayerStore((s) => s.setCurrentItem);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const currentItem = usePlayerStore((s) => s.currentItem);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  function play(item: CatalogItem) {
    setQueue(items);
    setCurrentItem(item);
  }

  const shows = Array.from(new Set(items.map((i) => i.creator)));

  return (
    <>
      {shows.map((show) => {
        const episodes = items.filter((i) => i.creator === show);
        return (
          <section key={show} className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="h-10 w-10 flex-shrink-0 rounded-full bg-surface-3 bg-cover bg-center"
                style={{ backgroundImage: `url(${episodes[0].coverArt})` }}
              />
              <h2 className="text-xl font-bold text-text-primary">{show}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {episodes.map((item) => {
                const isActive = currentItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => play(item)}
                    className="group cursor-pointer text-left"
                  >
                    <div className="relative mb-3">
                      <div
                        className="aspect-square w-full rounded-full bg-surface-3 bg-cover bg-center transition-colors group-hover:brightness-75"
                        style={{ backgroundImage: `url(${item.coverArt})` }}
                      />
                      <div className="absolute bottom-1 right-1 translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand shadow-lg">
                          <PlayIcon size={14} className="translate-x-0.5 text-black" />
                        </div>
                      </div>
                    </div>
                    <p className={`truncate text-sm font-medium ${isActive && isPlaying ? "text-brand" : "text-text-primary"}`}>
                      {item.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-text-secondary">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {formatDuration(item.durationSec)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
