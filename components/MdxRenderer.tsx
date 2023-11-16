"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  source: MDXRemoteSerializeResult;
}

const MdxComponents = {
  /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 style={{ color: "#FFF676" }} {...props} />
  ),
  /** Card component */
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      style={{
        background: "#333",
        borderRadius: "0.25rem",
        padding: "0.5rem 1rem",
      }}
      {...props}
    />
  ),
};

export default function MdxRenderer(props: Props) {
  return <MDXRemote {...props.source} components={MdxComponents} />;
}
