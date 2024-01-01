"use client";
import { MDXComponents, MDXContent } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Bookmark from "./Bookmark";
import NImage from "./NImage";
import Codeblock from "./CodeBlock";
import Blank from "./Blank";
import Video from "./Video";
import Link from "./Link";

const MDXComponents: MDXComponents = {
  a: Link,
  code: Codeblock as any,
  Video,
  Blank,
  NImage,
  Bookmark,
};

interface Props {
  code: string;
}

export default function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code);
  return (
    <div className={"prose"}>
      <Component components={MDXComponents as unknown as MDXComponents} />
    </div>
  );
}
