import NextLink from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}

export default function Link({ children, href }: Props) {
  return (
    <NextLink target="_blank" href={href!}>
      {children}
    </NextLink>
  );
}
