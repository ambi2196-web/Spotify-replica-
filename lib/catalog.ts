// Data-access module — stub for Phase 0.
// Phase 1+ will populate these with real track/episode/artwork data
// sourced from public/data/*.json and public/audio/*.

export type Segment = "music" | "podcast" | "canvas" | "discover";

export type Track = {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
  durationSeconds: number;
  segment: Segment;
};

export type Episode = {
  id: string;
  title: string;
  show: string;
  coverArt: string;
  audioSrc: string;
  durationSeconds: number;
};

export async function getTracks(_segment?: Segment): Promise<Track[]> {
  return [];
}

export async function getEpisodes(): Promise<Episode[]> {
  return [];
}
