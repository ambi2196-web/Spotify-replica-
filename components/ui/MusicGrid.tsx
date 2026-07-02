"use client";

import { usePlayerStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@/components/icons";
import type { CatalogItem } from "@/lib/types";

export default function MusicGrid({ items }: { items: CatalogItem[] }) {
  const setCurrentItem = usePlayerStore((s) => s.setCurrentItem);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const currentItem = usePlayerStore((s) => s.currentItem);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  function play(item: CatalogItem) {
    setQueue(items);
    setCurrentItem(item);
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => {
        const isActive = currentItem?.id === item.id;
        return (
          <button
            key={item.id}
            onClick={() => play(item)}
            className="group cursor-pointer text-left"
          >
            <div className="relative mb-3">
              <div
                className="aspect-square w-full rounded-md bg-surface-3 bg-cover bg-center transition-colors group-hover:brightness-75"
                style={{ backgroundImage: `url(${item.coverArt})` }}
              />
              <div className="absolute bottom-2 right-2 translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand shadow-lg">
                  <PlayIcon size={16} className="translate-x-0.5 text-black" />
                </div>
              </div>
              {isActive && (
                <div className="absolute inset-0 flex items-end justify-end rounded-md p-2">
                  <span className="flex gap-0.5 items-end h-4">
                    <span className={`w-0.5 rounded-full bg-brand ${isPlaying ? "animate-[equalizer-a_0.8s_ease-in-out_infinite]" : "h-1"}`} style={{ height: isPlaying ? undefined : "4px" }} />
                    <span className={`w-0.5 rounded-full bg-brand ${isPlaying ? "animate-[equalizer-b_0.8s_ease-in-out_infinite]" : "h-1"}`} style={{ height: isPlaying ? undefined : "4px" }} />
                    <span className={`w-0.5 rounded-full bg-brand ${isPlaying ? "animate-[equalizer-c_0.8s_ease-in-out_infinite]" : "h-1"}`} style={{ height: isPlaying ? undefined : "4px" }} />
                  </span>
                </div>
              )}
            </div>
            <p className={`truncate text-sm font-medium ${isActive ? "text-brand" : "text-text-primary"}`}>
              {item.title}
            </p>
            <p className="truncate text-xs text-text-secondary">
              {item.creator} · {formatDuration(item.durationSec)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
