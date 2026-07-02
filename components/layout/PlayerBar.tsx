"use client";

import { useRef, useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  ShuffleIcon,
  RepeatIcon,
  VolumeIcon,
  HeartIcon,
} from "@/components/icons";

export default function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef(false);
  const hookTriggeredRef = useRef(false);

  const currentItem = usePlayerStore((s) => s.currentItem);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const volume = usePlayerStore((s) => s.volume);
  const discoveryMode = usePlayerStore((s) => s.discoveryMode);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const playNext = usePlayerStore((s) => s.playNext);
  const playPrev = usePlayerStore((s) => s.playPrev);
  const setDiscoveryMode = usePlayerStore((s) => s.setDiscoveryMode);

  const [showHookBanner, setShowHookBanner] = useState(false);

  // Register audio event listeners once on mount
  useEffect(() => {
    const audio = audioRef.current!;
    audio.volume = 0.8;

    const onTimeUpdate = () => {
      if (!isSeekingRef.current) setCurrentTime(audio.currentTime);
    };
    const onDurationChange = () => {
      setDuration(isFinite(audio.duration) ? audio.duration : 0);
    };
    const onEnded = () => playNext();
    const onError = () => {
      const src = audio.getAttribute("src");
      if (src) console.warn("[Resonance] Audio unavailable:", src);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [setCurrentTime, setDuration, playNext]);

  // Load + auto-play when track changes; reset hook state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentItem) return;
    hookTriggeredRef.current = false;
    setShowHookBanner(false);
    audio.src = currentItem.audioSrc;
    audio.play().catch(() =>
      console.warn("[Resonance] Cannot play:", currentItem.audioSrc)
    );
  }, [currentItem?.id]);

  // Sync play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentItem) return;
    if (isPlaying) {
      audio.play().catch(() => console.warn("[Resonance] Playback blocked."));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // playPrev restart: if store seeked to 0 via playPrev, apply to audio
  useEffect(() => {
    if (currentTime === 0 && audioRef.current && audioRef.current.currentTime > 0) {
      audioRef.current.currentTime = 0;
    }
  }, [currentTime]);

  // Hook mechanic: pause at 30s when in discovery hook mode
  useEffect(() => {
    if (
      discoveryMode === "hook" &&
      currentTime >= 30 &&
      isPlaying &&
      !hookTriggeredRef.current
    ) {
      hookTriggeredRef.current = true;
      if (audioRef.current) audioRef.current.pause();
      togglePlay();
      setShowHookBanner(true);
    }
  }, [currentTime, discoveryMode, isPlaying, togglePlay]);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hook-to-depth banner — floats above the player bar.
          On mobile: account for PlayerBar (64px) + BottomNav (~56px). */}
      {showHookBanner && (
        <div className="fixed inset-x-0 bottom-[124px] z-50 flex items-center justify-between border-t border-[#F2994A]/30 bg-surface-base/95 px-4 py-3 backdrop-blur md:bottom-[90px] md:px-6">
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Worth going deeper?
            </p>
            <p className="text-xs text-text-secondary">{currentItem?.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowHookBanner(false);
                setDiscoveryMode(null);
              }}
              className="text-xs text-text-muted transition-colors hover:text-text-primary"
            >
              Skip
            </button>
            <button
              onClick={() => {
                setShowHookBanner(false);
                setDiscoveryMode("depth");
                togglePlay();
              }}
              className="rounded-full bg-[#F2994A] px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-[#e8883a]"
            >
              Listen in Full
            </button>
          </div>
        </div>
      )}

      {/* Player bar — compact on mobile, full on md+ */}
      <footer className="flex h-16 flex-shrink-0 items-center border-t border-surface-3 bg-surface-2 px-3 md:h-[90px] md:justify-between md:px-4">
        <audio ref={audioRef} preload="metadata" />

        {/* Track info — flex-1 on mobile, fixed 30% on desktop */}
        <div className="flex flex-1 items-center gap-2 md:w-[30%] md:flex-none md:gap-3">
          <div
            className="h-10 w-10 flex-shrink-0 rounded bg-surface-3 bg-cover bg-center md:h-14 md:w-14"
            style={
              currentItem
                ? { backgroundImage: `url(${currentItem.coverArt})` }
                : undefined
            }
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-primary">
              {currentItem?.title ?? "Nothing playing"}
            </p>
            <p className="truncate text-xs text-text-secondary">
              {currentItem?.creator ?? "—"}
            </p>
          </div>
          {/* Heart — desktop only */}
          <button
            aria-label="Like"
            className="ml-2 hidden flex-shrink-0 text-text-muted transition-colors hover:text-text-primary md:block"
          >
            <HeartIcon size={18} />
          </button>
        </div>

        {/* Mobile-only: play / pause button */}
        <div className="flex items-center pr-1 md:hidden">
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            disabled={!currentItem}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary text-surface-base transition-transform hover:scale-105 disabled:opacity-40"
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
        </div>

        {/* Desktop center: controls + seekbar */}
        <div className="hidden w-[40%] flex-col items-center gap-2 md:flex">
          <div className="flex items-center gap-5">
            <button
              aria-label="Shuffle"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              <ShuffleIcon size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={playPrev}
              disabled={!currentItem}
              className="text-text-secondary transition-colors hover:text-text-primary disabled:opacity-40"
            >
              <SkipBackIcon size={20} />
            </button>
            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              disabled={!currentItem}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-surface-base transition-transform hover:scale-105 disabled:opacity-40"
            >
              {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            </button>
            <button
              aria-label="Next"
              onClick={playNext}
              disabled={!currentItem}
              className="text-text-secondary transition-colors hover:text-text-primary disabled:opacity-40"
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

          {/* Seekbar */}
          <div className="flex w-full max-w-[420px] items-center gap-2">
            <span className="w-10 text-right text-xs tabular-nums text-text-muted">
              {formatDuration(Math.floor(currentTime))}
            </span>
            <input
              type="range"
              className="seek-bar flex-1"
              min={0}
              max={Math.floor(duration) || 100}
              step={1}
              value={Math.floor(currentTime)}
              style={
                { "--progress-pct": `${progressPct}%` } as React.CSSProperties
              }
              onMouseDown={() => {
                isSeekingRef.current = true;
              }}
              onChange={(e) => {
                seek(Number(e.target.value));
              }}
              onMouseUp={(e) => {
                const t = Number(e.currentTarget.value);
                if (audioRef.current) audioRef.current.currentTime = t;
                isSeekingRef.current = false;
              }}
            />
            <span className="w-10 text-xs tabular-nums text-text-muted">
              {duration ? formatDuration(Math.floor(duration)) : "--:--"}
            </span>
          </div>
        </div>

        {/* Desktop right: volume */}
        <div className="hidden w-[30%] items-center justify-end gap-2 md:flex">
          <button
            aria-label="Volume"
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <VolumeIcon size={18} />
          </button>
          <input
            type="range"
            className="volume-bar w-24"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            style={
              { "--progress-pct": `${volume * 100}%` } as React.CSSProperties
            }
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </footer>
    </>
  );
}
