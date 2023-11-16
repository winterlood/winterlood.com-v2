import { getMetaTag } from "util/metatag";
import { allPages, allPosts, allQnas } from "@/contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { useMDXComponent } from "next-contentlayer/hooks";
import PostItem from "@/components/PostItem";
import QnaItem from "@/components/QnaItem";

type Props = {
  params: { category: string };
};

export async function generateStaticParams() {
  const slugs = ["about", "post", "qna", "work"];
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  const fixedTitle = "이정환 블로그";
  let title = "";
  if (category === "about") title = `${fixedTitle}`;
  else if (category === "post") title = `Posts - ${fixedTitle}`;
  else if (category === "qna") title = `Q&A - ${fixedTitle}`;
  else if (category === "work") title = `Works - ${fixedTitle}`;

  return getMetaTag({
    url: `${process.env.BASE_URL}/${category}`,
    title,
    ogImageTitle: "무엇이든 쉽게 설명할 방법은 있다",
  });
}

export default async function Page({ params: { category } }: Props) {
  switch (category) {
    case "about":
    case "work": {
      const page = allPages.find((page) => page._id === `page/${category}.mdx`);
      if (!page) notFound();
      return <MDXContent code={page!.body.code} />;
    }
    case "post": {
      return allPosts.map((post) => <PostItem key={post._raw.flattenedPath} {...post} />);
    }
    case "qna": {
      return allQnas.map((qna) => <QnaItem key={qna._raw.flattenedPath} {...qna} />);
    }
    default: {
      notFound();
    }
  }
}
