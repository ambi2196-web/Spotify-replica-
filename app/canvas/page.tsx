import type { Metadata } from "next";
import { getBySegment } from "@/lib/catalog";
import CanvasPanel from "@/components/canvas/CanvasPanel";

export const metadata: Metadata = {
  title: "Canvas — Resonance",
};

export default async function CanvasPage() {
  const items = await getBySegment("canvas");
  return <CanvasPanel items={items} />;
}
