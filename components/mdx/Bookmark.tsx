"use client";
import { Bookmark } from "types";

export default function Bookmark({
  title,
  url,
  description,
  thumbnail,
  sitename,
  favicon,
}: Bookmark) {
  if (!title) {
    return (
      <p>
        <a href={url} target="_blank">
          {url}
        </a>
      </p>
    );
  }

  return (
    <a className={"bookmark_container"} href={url} target="_blank">
      <div className={"info_col"}>
        <div className={"title"}>
          {favicon ? <img className="favicon" src={favicon} /> : "🔗"} {title || url}
        </div>
        {description && <div className={"description"}>{description}</div>}
      </div>
      {thumbnail && (
        <div className={"thumbnail_col"}>
          <img src={thumbnail} alt={`${title}링크의 썸네일 이미지`} />
        </div>
      )}
    </a>
  );
}
