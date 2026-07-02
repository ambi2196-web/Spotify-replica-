import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import type { CatalogItem } from "./types";

export { formatDuration } from "./utils";

const loadCatalog = cache(async (): Promise<CatalogItem[]> => {
  const filePath = path.join(process.cwd(), "public", "data", "catalog.json");
  const raw = await readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as { items: CatalogItem[] };
  return parsed.items;
});

export async function getAllItems(): Promise<CatalogItem[]> {
  return loadCatalog();
}

export async function getBySegment(
  segment: CatalogItem["segment"]
): Promise<CatalogItem[]> {
  const items = await loadCatalog();
  return items.filter((item) => item.segment === segment);
}

export async function getById(id: string): Promise<CatalogItem | undefined> {
  const items = await loadCatalog();
  return items.find((item) => item.id === id);
}

export async function getByTag(tag: string): Promise<CatalogItem[]> {
  const items = await loadCatalog();
  return items.filter((item) => item.tags?.includes(tag));
}
