import { notFound, redirect } from "next/navigation";
import PostItem from "@/components/PostItem";
import QnaItem from "@/components/QnaItem";
import { Metadata } from "next";
import { getMetaTag } from "util/metatag";
import { getAllPosts, getPost } from "util/mdx";
import MdxRenderer from "@/components/MdxRenderer";
import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  params: { category: string };
};

const allowCategories = ["about", "post", "qna", "work"];

export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  if (!allowCategories.includes(category)) {
    redirect("/about");
  }

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
      const post = await getPost(`content/page/${category}.mdx`);
    }
    case "post":
    case "qna": {
      const posts = await getAllPosts(`content/${category}`);
      console.log(posts.map((it) => it.frontmatter.title));
      return posts.map((post, idx) => <div key={idx}>{post.frontmatter.title}</div>);
    }
    default: {
      notFound();
    }
  }

  // if (category === "about" || category === "work") {
  //   const { recordMap } = await fetchPage(upperCaseCategory);
  //   return <NotionRenderer recordMap={recordMap} />;
  // }

  // if (upperCaseCategory === "POST" || upperCaseCategory === "QNA") {
  //   const pages = await fetchPages(upperCaseCategory);
  //   return pages.map((page) => {
  //     return upperCaseCategory === "POST" ? (
  //       <PostItem key={page.id} {...page} />
  //     ) : (
  //       <QnaItem key={page.id} {...page} />
  //     );
  //   });
  // }

  // notFound();
}
