import type { Metadata } from "next";
import { getBySegment } from "@/lib/catalog";
import DiscoverPanel from "@/components/discover/DiscoverPanel";

export const metadata: Metadata = {
  title: "Discover — Resonance",
};

export default async function DiscoverPage() {
  const items = await getBySegment("discover");
  return <DiscoverPanel items={items} />;
}
