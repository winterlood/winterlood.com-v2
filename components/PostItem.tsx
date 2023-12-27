import classNames from "classnames/bind";
import Image, { ImageProps } from "next/image";
import style from "./PostItem.module.scss";
import Link from "next/link";
import { POST } from "@/contentlayer/generated";
import { getImageBase64DataURL } from "util/image-optimize";

const cx = classNames.bind(style);

export default async function PostItem(props: POST) {
  const {
    _raw: { flattenedPath },
    title,
    subtitle,
    date,
    thumbnail,
    tags,
  } = props;

  const blurImage = await getImageBase64DataURL(thumbnail!);

  const imageProps: ImageProps = {
    src: thumbnail as string,
    alt: title,
    placeholder: "blur",
    blurDataURL: blurImage,
  };
  return (
    <Link href={`/${flattenedPath}`}>
      <div className={cx("container")}>
        <div className={cx("container_inner")}>
          <div className={"mobile " + cx("thumbnail")}>
            {thumbnail && <Image {...imageProps} width={60} height={60} alt={title} />}
          </div>
          <div className={cx("info")}>
            <h3 className={cx("title")}>{title}</h3>
            <div className={cx("subtitle")}>{subtitle}</div>
            <div className={cx("createTime")}>{new Date(date).toLocaleDateString()}</div>
            <div className={"desktop " + cx("tag_wrapper")}>
              {tags?.map((tag: any) => (
                <div key={`${flattenedPath}-${tag}`} className={cx("tag")}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className={"desktop " + cx("thumbnail")}>
            {thumbnail && <Image {...imageProps} width={112} height={112} alt={title} />}
          </div>
        </div>
      </div>
    </Link>
  );
}
