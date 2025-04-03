import style from "./page.module.scss";
import classNames from "classnames/bind";
import { PageCategory } from "types";
import MDXContent from "@/components/mdx/MDXContent";
import { getPageBySlug } from "../get-page-by-slug";
import {
  allPOSTs,
  allQNAs,
  type POST,
  type QNA,
} from "@/contentlayer/generated";
import BackButton from "./_components/back-button";
import ViewCounter from "./_components/view-counter";

const cx = classNames.bind(style);

type Props = {
  params: { category: PageCategory; id: string };
};

export function generateStaticParams(): Props["params"][] {
  return [
    ...allQNAs.map((qna) => ({
      category: "qna" as PageCategory,
      id: qna.id,
    })),
    ...allPOSTs.map((post) => ({
      category: "post" as PageCategory,
      id: post.id,
    })),
  ];
}

async function hashPath(path: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(path);

  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export const revalidate = 3;

export default async function Page({ params }: Props) {
  const { category, id } = params;
  const page: POST | QNA = getPageBySlug({ category, slug: id });
  const pageSlug = page._raw.flattenedPath.split("/")[1];
  // const hashedPath = await hashPath(`${params.category}/${pageSlug}`);
  const hashedPath = encodeURI(`${params.category}/${pageSlug}`);

  return (
    <div className={cx("container")}>
      <section className={cx("header")}>
        <BackButton category={category} />
        <h1 className={cx("title")}>{page.title}</h1>
        <div className={cx("subtitle")}>{page.subtitle}</div>
        <div className={cx("date")}>
          {/* <span>
            <ViewCounter hashedPath={hashedPath} />
          </span>
          <div className={cx("sep")}></div> */}
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
