import style from "./page.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageCategory } from "types";
import MDXContent from "@/components/mdx/MDXContent";
import PageViewCounter from "@/components/(detail)/PageViewCounter";
import { getPageBySlug } from "../get-page-by-slug";
import type { POST, QNA } from "@/contentlayer/generated";

const cx = classNames.bind(style);

type Props = {
  params: { category: PageCategory; id: string };
};

export default async function Page({ params }: Props) {
  const { category, id } = params;
  const page: POST | QNA = getPageBySlug({ category, slug: id });

  const pageNotionId = page.id;
  const pageSlug = page._raw.flattenedPath.split("/")[1];

  return (
    <div className={cx("container")}>
      <section className={cx("header")}>
        <Link href={`/${category}`}>
          <div className={cx("back")}>
            <Icon type="BACK" />
            <div>전체 {category === "post" ? "포스트" : "QNA"}</div>
          </div>
        </Link>
        <h1 className={cx("title")}>{page.title}</h1>
        <div className={cx("subtitle")}>{page.subtitle}</div>
        <div className={cx("date")}>
          <span>
            <PageViewCounter
              pageCategory={category}
              pageNotionId={pageNotionId}
              pageSlug={pageSlug}
            />
          </span>
          <div className={cx("sep")}></div>
          <span>{new Date(page.date).toLocaleDateString()} 작성</span>
        </div>
        <div className={cx("date")}></div>
        <div className={cx("tag_wrapper")}></div>
      </section>
      <article className={cx("article")}>
        <MDXContent code={page!.body.code} />
      </article>
    </div>
  );
}
