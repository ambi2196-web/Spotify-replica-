import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";
import type { CatalogItem } from "./types";

const loadCatalog = cache(async (): Promise<CatalogItem[]> => {
  const filePath = path.join(process.cwd(), "public", "data", "catalog.json");
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as CatalogItem[];
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

export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
