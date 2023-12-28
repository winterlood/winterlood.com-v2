import { POST, QNA, allPOSTs, allQNAs } from "@/contentlayer/generated";
import { notFound, redirect } from "next/navigation";

export function getPageBySlug({ category, slug }: { category: string; slug: string }) {
  const pages = category === "post" ? allPOSTs : allQNAs;

  const pageFromPath = (pages as any[]).find(
    (page: POST | QNA) => page._raw.flattenedPath === `${category}/${decodeURI(slug)}`
  );
  if (pageFromPath) return pageFromPath;

  const pageFromID: POST | QNA = (pages as any[]).find(
    (page: POST | QNA) => page.id === slug
  );
  if (pageFromID) redirect(`/${encodeURI(pageFromID._raw.flattenedPath)}`);

  notFound();
}
