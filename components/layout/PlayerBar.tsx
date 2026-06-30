"use client";

import {
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  ShuffleIcon,
  RepeatIcon,
  VolumeIcon,
  HeartIcon,
} from "@/components/icons";

export default function PlayerBar() {
  return (
    <footer className="flex h-[90px] flex-shrink-0 items-center justify-between border-t border-surface-3 bg-surface-2 px-4">
      {/* Left — track info */}
      <div className="flex w-[30%] items-center gap-3">
        <div className="h-14 w-14 flex-shrink-0 rounded bg-surface-3" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text-primary">
            Nothing playing
          </p>
          <p className="truncate text-xs text-text-secondary">—</p>
        </div>
        <button
          aria-label="Like"
          className="ml-2 flex-shrink-0 text-text-muted transition-colors hover:text-text-primary"
        >
          <HeartIcon size={18} />
        </button>
      </div>

      {/* Center — controls */}
      <div className="flex w-[40%] flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button
            aria-label="Shuffle"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <ShuffleIcon size={18} />
          </button>
          <button
            aria-label="Previous"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <SkipBackIcon size={20} />
          </button>
          <button
            aria-label="Play"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-surface-base transition-transform hover:scale-105"
          >
            <PlayIcon size={18} />
          </button>
          <button
            aria-label="Next"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <SkipForwardIcon size={20} />
          </button>
          <button
            aria-label="Repeat"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <RepeatIcon size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex w-full max-w-[420px] items-center gap-2">
          <span className="w-10 text-right text-xs tabular-nums text-text-muted">
            0:00
          </span>
          <div className="group relative flex-1">
            <div className="h-1 overflow-hidden rounded-full bg-surface-4">
              <div className="h-full w-0 rounded-full bg-text-primary transition-[width] group-hover:bg-brand" />
            </div>
          </div>
          <span className="w-10 text-xs tabular-nums text-text-muted">
            0:00
          </span>
        </div>
      </div>

      {/* Right — volume */}
      <div className="flex w-[30%] items-center justify-end gap-2">
        <button
          aria-label="Volume"
          className="text-text-secondary transition-colors hover:text-text-primary"
        >
          <VolumeIcon size={18} />
        </button>
        <div className="group relative w-24">
          <div className="h-1 overflow-hidden rounded-full bg-surface-4">
            <div className="h-full w-2/3 rounded-full bg-text-secondary transition-colors group-hover:bg-brand" />
          </div>
        </div>
      </div>
    </footer>
  );
}
