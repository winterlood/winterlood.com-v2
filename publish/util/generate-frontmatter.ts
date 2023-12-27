import { PageProperties } from "types";

export function generateFrontMatter({
  contentId,
  contentType,
  properties,
  thumbnail,
}: {
  contentId: string;
  contentType: string;
  properties: PageProperties;
  thumbnail: string;
}) {
  const { title, subtitle, tags, createTime } = properties;
  let res = "";
  res += "---";
  res += `\nid: ${contentId}`;
  res += `\ntype: ${contentType.toUpperCase()}`;
  res += `\ntitle: ${title}`;
  if (contentType === "post" || contentType === "qna") {
    res += `\ndate: ${createTime}`;
    if (subtitle) res += `\nsubtitle: ${subtitle}`;
    if (thumbnail) res += `\nthumbnail: ${thumbnail}`;
    if (Array.isArray(tags) && tags.length > 0)
      res += `\ntags: \n${tags.map((tag) => ` - ${tag}`).join("\n")}`;
  }
  res += `\n---`;
  return res;
}
