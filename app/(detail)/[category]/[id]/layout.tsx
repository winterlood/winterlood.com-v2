import { Metadata } from "next";
import { ReactNode } from "react";
import type { PageCategory } from "types";
import { getMetaTag } from "util/metatag";
import { POST, QNA } from "@/contentlayer/generated";
import { getPageBySlug } from "../get-page-by-slug";

type Props = {
  children: ReactNode;
  params: { category: PageCategory; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, id } = params;
  const page: POST | QNA = getPageBySlug({ category, slug: id });

  const title = `${category === "qna" ? "Q. " : ""}${page.title} - Winterlood`;
  const description = `${page.title} - ${page.subtitle}`;

  return getMetaTag({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${category}/${id}`,
    title,
    description,
    ogImageUrl: page.thumbnail,
    ogImageTitle: `${category === "qna" ? "Q. " : ""}${page.title}`,
  });
}

export default async function Layout({ children }: Props) {
  return <div>{children}</div>;
}
