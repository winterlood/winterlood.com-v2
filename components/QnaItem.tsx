import classNames from "classnames/bind";
import style from "./QnaItem.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import { QNA } from "@/contentlayer/generated";

const cx = classNames.bind(style);

export default function QnaItem(props: QNA) {
  const {
    _raw: { flattenedPath },
    title,
    subtitle,
    date,
    tags,
  } = props;

  return (
    <Link href={`/${flattenedPath}`}>
      <div className={cx("container")}>
        <div className={cx("container_inner")}>
          <Icon type={"QUESTION"} />
          <div className={cx("info")}>
            <h3 className={cx("title")}>{title}</h3>
            <div className={cx("subtitle")}>{subtitle}</div>
            <div className={cx("createTime")}>{new Date(date).toLocaleDateString()}</div>
            {tags && (
              <div className={"desktop " + cx("tag_wrapper")}>
                {tags.map((tag: any) => (
                  <div key={`${flattenedPath}-${tag}`} className={cx("tag")}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
