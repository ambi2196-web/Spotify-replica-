"use client";

import { useRef, useEffect } from "react";
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

  const currentItem = usePlayerStore((s) => s.currentItem);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);
  const volume = usePlayerStore((s) => s.volume);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const playNext = usePlayerStore((s) => s.playNext);
  const playPrev = usePlayerStore((s) => s.playPrev);

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

  // Load + auto-play when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentItem) return;
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

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="flex h-[90px] flex-shrink-0 items-center justify-between border-t border-surface-3 bg-surface-2 px-4">
      <audio ref={audioRef} preload="metadata" />

      {/* Left: track info */}
      <div className="flex w-[30%] items-center gap-3">
        <div
          className="h-14 w-14 flex-shrink-0 rounded bg-surface-3 bg-cover bg-center"
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
        <button
          aria-label="Like"
          className="ml-2 flex-shrink-0 text-text-muted transition-colors hover:text-text-primary"
        >
          <HeartIcon size={18} />
        </button>
      </div>

      {/* Center: controls + seekbar */}
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

      {/* Right: volume */}
      <div className="flex w-[30%] items-center justify-end gap-2">
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
  );
}
