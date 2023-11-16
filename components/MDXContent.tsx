"use client";
import { MDXComponents, MDXContent } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image, { ImageProps } from "next/image";

const MDXComponents = {
  img: async (props: React.HTMLProps<HTMLImageElement> & { blurDataURL: string }) => {
    const { src, height, width } = props;

    return (
      <Image
        alt={""}
        src={src!}
        layout="responsive"
        height={height as number}
        width={width as number}
        placeholder="blur"
        blurDataURL={props.blurDataURL}
      />
    );
  },
  p: (props: React.HTMLProps<HTMLParagraphElement>) => {
    return <div className="my-6" {...props} />;
  },
  Card: () => {
    return <div>Card</div>;
  },
};

interface Props {
  code: string;
}

export default function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code);
  return (
    <div className={"markdown-body"}>
      <Component components={MDXComponents as unknown as MDXComponents} />
    </div>
  );
}
