"use client";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
  blurDataURL?: string;
  src?: string;
  captionText: string;
}
export default function NImage({ width, height, blurDataURL, src, captionText }: Props) {
  if (!src) {
    return null;
  }
  return (
    <div className="n_image">
      <Image
        alt={""}
        src={src!}
        layout="responsive"
        width={width as number}
        height={height as number}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className="image_caption">{captionText}</div>
    </div>
  );
}
