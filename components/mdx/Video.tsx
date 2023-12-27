"use client";
import Youtube from "react-youtube";

interface Props {
  src?: string;
}
function getVideoId(src: string) {
  if (src.includes("https://www.youtube.com")) {
    return src.split("?v=")[1];
  } else if (src.includes("https://youtu.be")) {
    return src.split("youtu.be/")[1];
  }
  return false;
}

export default function Video({ src }: Props) {
  if (!src) return null;

  const videoId = getVideoId(src);
  if (!videoId) return null;
  return (
    <Youtube
      videoId={videoId}
      style={{
        aspectRatio: "auto 9/6",
      }}
      opts={{
        width: "100%",
      }}
    />
  );
}
