"use client";

import { useState, useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { PlayIcon } from "@/components/icons";
import type { CatalogItem } from "@/lib/types";

const CANVAS_STATES = [
  { key: "focus", label: "Focus" },
  { key: "energy", label: "Energy" },
  { key: "calm", label: "Calm" },
  { key: "wind-down", label: "Wind Down" },
] as const;

type CanvasStateKey = (typeof CANVAS_STATES)[number]["key"];

const MELODIES = ["Cinematic", "Electronic", "Acoustic", "Ambient"] as const;
const VOICES = ["Aria", "Nova", "Echo", "Orion"] as const;

function deriveTitle(prompt: string): string {
  const trimmed = prompt.trim().split(/\s+/).slice(0, 6).join(" ");
  return trimmed.length > 34 ? trimmed.slice(0, 34) + "…" : trimmed;
}

function pickBaseItem(
  melody: string,
  state: CanvasStateKey,
  items: CatalogItem[]
): CatalogItem {
  const byState = items.find((i) => i.tags?.includes(state));
  if (byState) return byState;
  if (melody === "Acoustic" || melody === "Ambient") {
    return items.find((i) => i.tags?.includes("calm")) ?? items[0];
  }
  return items.find((i) => i.tags?.includes("wind-down")) ?? items[0];
}

interface GenJob {
  prompt: string;
  melody: string;
  state: CanvasStateKey;
}

export default function CanvasPanel({ items }: { items: CatalogItem[] }) {
  const setCurrentItem = usePlayerStore((s) => s.setCurrentItem);
  const setQueue = usePlayerStore((s) => s.setQueue);
  const currentItem = usePlayerStore((s) => s.currentItem);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  // Default to first state that actually has catalog items
  const defaultState: CanvasStateKey =
    CANVAS_STATES.find((s) => items.some((i) => i.tags?.includes(s.key)))
      ?.key ?? "focus";

  const [selectedState, setSelectedState] = useState<CanvasStateKey>(defaultState);
  const [prompt, setPrompt] = useState("");
  const [melody, setMelody] = useState<(typeof MELODIES)[number]>("Cinematic");
  const [tempo, setTempo] = useState(50);
  const [voice, setVoice] = useState<(typeof VOICES)[number]>("Aria");
  const [genJob, setGenJob] = useState<GenJob | null>(null);
  const [result, setResult] = useState<CatalogItem | null>(null);

  // Refs keep items/selectedState stable in the timer callback without re-running the effect
  const itemsRef = useRef(items);
  const selectedStateRef = useRef(selectedState);
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { selectedStateRef.current = selectedState; }, [selectedState]);

  // 3-second fake generation timer
  useEffect(() => {
    if (!genJob) return;
    const t = setTimeout(() => {
      const base = pickBaseItem(genJob.melody, genJob.state, itemsRef.current);
      const generated: CatalogItem = {
        ...base,
        id: `gen-${Date.now()}`,
        title: deriveTitle(genJob.prompt) || "Untitled Composition",
        creator: "Canvas AI",
        durationSec: 204,
      };
      setResult(generated);
      setGenJob(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [genJob]);

  const filteredItems = items.filter((i) => i.tags?.includes(selectedState));

  function playItem(item: CatalogItem) {
    setQueue(filteredItems.length > 0 ? filteredItems : items);
    setCurrentItem(item);
  }

  function playGenerated() {
    if (!result) return;
    setQueue([result]);
    setCurrentItem(result);
  }

  function handleGenerate() {
    if (!prompt.trim() || genJob !== null) return;
    setResult(null);
    setGenJob({ prompt, melody, state: selectedState });
  }

  const tempoLabel = tempo < 33 ? "Slow" : tempo < 66 ? "Medium" : "Fast";

  return (
    <div className="min-h-full bg-gradient-to-b from-[#160d2b] to-surface-1 px-6 py-10">
      {/* Header */}
      <header className="mb-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#9B59B6]">
          Canvas
        </p>
        <h1 className="text-4xl font-bold text-text-primary">
          Your State, Your Sound
        </h1>
        <p className="mt-2 text-text-secondary">
          Audio built for how you feel — or made by you.
        </p>
      </header>

      {/* Section 1: Cognitive State Selector */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          What's your state right now?
        </h2>

        {/* State pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CANVAS_STATES.map(({ key, label }) => {
            const hasItems = items.some((i) => i.tags?.includes(key));
            return (
              <button
                key={key}
                onClick={() => hasItems && setSelectedState(key)}
                disabled={!hasItems}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  selectedState === key
                    ? "bg-[#9B59B6] text-white shadow-lg shadow-[#9B59B6]/25"
                    : hasItems
                    ? "bg-surface-3 text-text-secondary hover:bg-surface-4 hover:text-text-primary"
                    : "bg-surface-2 text-text-muted opacity-40 cursor-not-allowed"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Filtered track cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const isActive = currentItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-surface-3 bg-cover bg-center"
                  style={{
                    aspectRatio: "16/9",
                    backgroundImage: `url(${item.coverArt})`,
                  }}
                  onClick={() => playItem(item)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9B59B6] shadow-xl">
                      <PlayIcon size={20} className="translate-x-0.5 text-white" />
                    </div>
                  </div>

                  {/* Active equalizer indicator */}
                  {isActive && (
                    <div className="absolute right-3 top-3 flex items-end gap-0.5">
                      <span
                        className="w-0.5 rounded-full bg-[#9B59B6]"
                        style={{
                          height: "10px",
                          animation: isPlaying
                            ? "equalizer-a 0.7s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                      <span
                        className="w-0.5 rounded-full bg-[#9B59B6]"
                        style={{
                          height: "14px",
                          animation: isPlaying
                            ? "equalizer-b 0.7s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                      <span
                        className="w-0.5 rounded-full bg-[#9B59B6]"
                        style={{
                          height: "8px",
                          animation: isPlaying
                            ? "equalizer-c 0.7s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                    </div>
                  )}

                  {/* Track info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className={`truncate text-sm font-bold ${
                        isActive ? "text-[#c987e8]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-white/60">
                      {formatDuration(item.durationSec)}
                      {item.description ? ` · ${item.description}` : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            No{" "}
            {CANVAS_STATES.find((s) => s.key === selectedState)?.label.toLowerCase()}{" "}
            tracks available yet.
          </p>
        )}
      </section>

      {/* Section 2: Composition Engine */}
      <section>
        <div className="rounded-2xl border border-[#9B59B6]/20 bg-surface-2 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Create Your Own
            </h2>
            <p className="mt-1 text-sm text-[#9B59B6]">
              Canvas creates royalty-clean original audio — no label, no publisher claim.
            </p>
          </div>

          {/* Prompt textarea */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your lyrics or describe your audio…"
            rows={3}
            className="mb-5 w-full resize-none rounded-xl border border-surface-4 bg-surface-3 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-[#9B59B6]/60 focus:outline-none transition-colors"
          />

          {/* Controls row */}
          <div className="mb-5 flex flex-wrap gap-5">
            {/* Melody */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Melody
              </label>
              <select
                value={melody}
                onChange={(e) =>
                  setMelody(e.target.value as (typeof MELODIES)[number])
                }
                className="rounded-lg border border-surface-4 bg-surface-3 px-3 py-2 text-sm text-text-primary focus:border-[#9B59B6]/60 focus:outline-none"
              >
                {MELODIES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Tempo */}
            <div className="flex min-w-[160px] flex-1 flex-col gap-1.5">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Tempo
                </label>
                <span className="text-[10px] font-medium text-[#9B59B6]">
                  {tempoLabel}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="seek-bar"
                style={
                  { "--progress-pct": `${tempo}%` } as React.CSSProperties
                }
              />
              <div className="flex justify-between text-[10px] text-text-muted">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            {/* Voice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Voice
              </label>
              <select
                value={voice}
                onChange={(e) =>
                  setVoice(e.target.value as (typeof VOICES)[number])
                }
                className="rounded-lg border border-surface-4 bg-surface-3 px-3 py-2 text-sm text-text-primary focus:border-[#9B59B6]/60 focus:outline-none"
              >
                {VOICES.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || genJob !== null}
            className="mb-4 rounded-full bg-[#9B59B6] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#9B59B6]/25 transition-all hover:bg-[#8e44ad] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate Track →
          </button>

          {/* Loading animation */}
          {genJob !== null && (
            <div className="flex items-end gap-1.5 py-3">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-[#9B59B6]"
                  style={{
                    height: `${10 + Math.round(Math.abs(Math.sin(i * 0.9)) * 18)}px`,
                    animation: `${["equalizer-a", "equalizer-b", "equalizer-c"][i % 3]} 0.6s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
              <span className="ml-2 text-sm text-text-secondary">
                Composing…
              </span>
            </div>
          )}

          {/* Generated result card */}
          {result && genJob === null && (
            <div className="mt-1 flex items-center gap-4 rounded-xl border border-[#9B59B6]/30 bg-surface-3 p-4">
              <div
                className="h-14 w-14 flex-shrink-0 rounded-lg bg-surface-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${result.coverArt})` }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {result.title}
                </p>
                <p className="text-xs text-text-secondary">
                  Canvas AI · {formatDuration(result.durationSec)}
                </p>
              </div>
              <button
                onClick={playGenerated}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#9B59B6] text-white transition-colors hover:bg-[#8e44ad]"
              >
                <PlayIcon size={16} className="translate-x-0.5" />
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-5 text-[11px] text-text-muted">
            Canvas-generated audio is AI-composed and entirely royalty-free. No
            third-party rights apply.
          </p>
        </div>
      </section>
    </div>
  );
}
