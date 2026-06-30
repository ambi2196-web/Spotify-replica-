export interface CatalogItem {
  id: string;
  segment: "music" | "podcast" | "canvas" | "discover";
  title: string;
  creator: string;
  coverArt: string;
  audioSrc: string;
  durationSec: number;
  tags?: string[];
  hookSrc?: string;
  description?: string;
}
