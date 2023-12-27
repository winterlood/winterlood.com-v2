import { OpenGraphScraperOptions } from "open-graph-scraper/dist/lib/types";
import ogs from "open-graph-scraper";

export async function fetchOpenGraph(url: string) {
  const options: OpenGraphScraperOptions = {
    url,
  };

  const res = await ogs(options);
  if (res.error) {
    return {
      url,
    };
  } else {
    const {
      ogTitle: title,
      ogDescription: description,
      ogSiteName: sitename,
      ogImage,
      favicon,
    } = res.result;
    let thumbnail = Array.isArray(ogImage) ? ogImage[0]?.url : undefined;
    return {
      url,
      title,
      thumbnail,
      description,
      sitename,
      favicon,
    };
  }
}
