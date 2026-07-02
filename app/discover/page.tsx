import { getBySegment } from "@/lib/catalog";
import DiscoverPanel from "@/components/discover/DiscoverPanel";

export default async function DiscoverPage() {
  const items = await getBySegment("discover");
  return <DiscoverPanel items={items} />;
}
