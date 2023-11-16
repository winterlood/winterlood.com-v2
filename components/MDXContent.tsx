"use client";
import { MDXComponents, MDXContent } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import { getBlurImage } from "util/get-blur-image";

const MDXComponents = {
  img: async (props: React.HTMLProps<HTMLImageElement> & { blurDataURL: string }) => {
    if (!props) return null;

    const { src, height, width } = props;

    if (!height && !width) {
      return <img src={src} />;
    }

    const blurDataURL = await getBlurImage(src!);

    return (
      <Image
        alt={""}
        src={src!}
        layout="responsive"
        height={height as number}
        width={width as number}
        placeholder="blur"
        blurDataURL={blurDataURL}
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
