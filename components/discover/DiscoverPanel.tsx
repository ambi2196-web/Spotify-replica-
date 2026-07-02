"use client";

import { useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@/components/icons";
import type { CatalogItem } from "@/lib/types";

const CATEGORIES = [
  { key: "daily-brief", label: "Daily Brief" },
  { key: "science", label: "Science" },
  { key: "politics", label: "Politics" },
  { key: "history", label: "History" },
  { key: "culture", label: "Culture" },
  { key: "technology", label: "Technology" },
  { key: "economics", label: "Economics" },
] as const;

export default function DiscoverPanel({ items }: { items: CatalogItem[] }) {
  const setCurrentItem = usePlayerStore((s) => s.setCurrentItem);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const setDiscoveryMode = usePlayerStore((s) => s.setDiscoveryMode);
  const currentItem = usePlayerStore((s) => s.currentItem);
  const discoveryMode = usePlayerStore((s) => s.discoveryMode);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const filteredItems = activeCategory
    ? items.filter((i) => i.tags?.includes(activeCategory))
    : items;

  function toggleCategory(key: string) {
    setActiveCategory((prev) => (prev === key ? null : key));
  }

  function playPreview(item: CatalogItem) {
    setQueue(items);
    setCurrentItem(item);   // resets discoveryMode → null via store
    setDiscoveryMode("hook"); // then set hook mode
  }

  function goDeeper(item: CatalogItem) {
    setExpandedIds((prev) => new Set([...prev, item.id]));
    setQueue(items);
    setCurrentItem(item);    // resets discoveryMode → null
    setDiscoveryMode("depth"); // then depth mode
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-[#1a0f00] to-surface-1 px-6 py-10">
      {/* Header */}
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#F2994A]">
          Discover
        </p>
        <h1 className="text-5xl font-bold leading-none text-text-primary">
          Today
        </h1>
        <p className="mt-3 text-text-secondary">
          {items.length} {items.length === 1 ? "story" : "stories"} · 30
          seconds in. Stay if it's worth it.
        </p>
      </header>

      {/* Category filter pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, label }) => {
          const hasItems = items.some((i) => i.tags?.includes(key));
          return (
            <button
              key={key}
              onClick={() => hasItems && toggleCategory(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === key
                  ? "bg-[#F2994A] font-semibold text-black"
                  : hasItems
                  ? "bg-surface-3 text-text-secondary hover:bg-surface-4 hover:text-text-primary"
                  : "cursor-default bg-surface-2 text-text-muted opacity-40"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Featured story cards */}
      <div className="flex flex-col gap-4">
        {filteredItems.length === 0 ? (
          <p className="text-sm text-text-muted">
            No stories in this category yet.
          </p>
        ) : (
          filteredItems.map((item) => {
            const isActive = currentItem?.id === item.id;
            const isExpanded = expandedIds.has(item.id);
            const primaryTag = item.tags?.[0];
            const categoryLabel =
              CATEGORIES.find((c) => c.key === primaryTag)?.label ?? primaryTag;

            return (
              <article
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-surface-2 transition-all ${
                  isActive ? "border-[#F2994A]/40" : "border-surface-3"
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Cover art */}
                  <div
                    className="h-48 flex-shrink-0 bg-surface-3 bg-cover bg-center sm:h-auto sm:w-56"
                    style={{ backgroundImage: `url(${item.coverArt})` }}
                  />

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Category + preview badge */}
                    <div className="mb-2 flex items-start justify-between gap-2">
                      {categoryLabel && (
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F2994A]">
                          {categoryLabel}
                        </span>
                      )}
                      <span className="flex-shrink-0 rounded-full border border-[#F2994A]/40 px-2.5 py-0.5 text-[10px] font-semibold text-[#F2994A]">
                        0:30 preview
                      </span>
                    </div>

                    {/* Title & creator */}
                    <h3 className="mb-1 text-xl font-bold leading-snug text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mb-3 text-sm text-text-secondary">
                      {item.creator}
                    </p>

                    {/* Description */}
                    <p
                      className={`mb-4 text-sm text-text-secondary ${
                        !isExpanded ? "line-clamp-2 flex-1" : ""
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mb-4">
                        <p className="mb-4 text-xs text-text-muted">
                          Full episode · {formatDuration(item.durationSec)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Subscribe", "Support", "Save"].map((action) => (
                            <button
                              key={action}
                              className="rounded-full border border-surface-4 px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-[#F2994A]/50 hover:text-[#F2994A]"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => playPreview(item)}
                        className="flex items-center gap-2 rounded-full bg-[#F2994A] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#e8883a]"
                      >
                        <PlayIcon size={14} className="translate-x-0.5" />
                        Play Preview
                      </button>
                      {!isExpanded && (
                        <button
                          onClick={() => goDeeper(item)}
                          className="text-sm font-medium text-[#F2994A] transition-colors hover:text-[#e8883a]"
                        >
                          Go Deeper →
                        </button>
                      )}
                      {isActive && discoveryMode === "depth" && (
                        <span className="text-xs text-text-muted">
                          Playing in full
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
