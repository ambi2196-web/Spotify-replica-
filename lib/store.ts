"use client";

import { create } from "zustand";
import type { CatalogItem } from "./types";

interface PlayerState {
  currentItem: CatalogItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: CatalogItem[];
  volume: number;

  setCurrentItem: (item: CatalogItem) => void;
  togglePlay: () => void;
  setQueue: (items: CatalogItem[]) => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;
  playNext: () => void;
  playPrev: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentItem: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  volume: 0.8,

  setCurrentItem: (item) =>
    set({ currentItem: item, isPlaying: true, currentTime: 0, duration: 0 }),

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setQueue: (items) => set({ queue: items }),

  seek: (time) => set({ currentTime: time }),

  setVolume: (v) => set({ volume: v }),

  setCurrentTime: (t) => set({ currentTime: t }),

  setDuration: (d) => set({ duration: d }),

  playNext: () => {
    const { queue, currentItem } = get();
    const idx = queue.findIndex((q) => q.id === currentItem?.id);
    if (idx >= 0 && idx < queue.length - 1) {
      set({ currentItem: queue[idx + 1], isPlaying: true, currentTime: 0, duration: 0 });
    } else {
      set({ isPlaying: false });
    }
  },

  playPrev: () => {
    const { queue, currentItem, currentTime } = get();
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    const idx = queue.findIndex((q) => q.id === currentItem?.id);
    if (idx > 0) {
      set({ currentItem: queue[idx - 1], isPlaying: true, currentTime: 0, duration: 0 });
    }
  },
}));
