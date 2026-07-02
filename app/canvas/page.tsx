import { getBySegment } from "@/lib/catalog";
import CanvasPanel from "@/components/canvas/CanvasPanel";

export default async function CanvasPage() {
  const items = await getBySegment("canvas");
  return <CanvasPanel items={items} />;
}
