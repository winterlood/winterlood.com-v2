import { allPOSTs, allQNAs } from "@/contentlayer/generated";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const routes = ["/about", "/post", "/qna", "/work"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  try {
    const posts = allPOSTs.map((page) => ({
      url: `${BASE_URL}/${encodeURI(page._raw.flattenedPath)}`,
      lastModified: new Date(page.date).toISOString(),
    }));

    const qnas = allQNAs.map((page) => ({
      url: `${BASE_URL}/${encodeURI(page._raw.flattenedPath)}`,
      lastModified: new Date(page.date).toISOString(),
    }));

    const res = [...routes, ...posts, ...qnas].sort(
      (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
    return res;
  } catch (e) {
    console.error(e);
    return routes;
  }
  return routes;
}
