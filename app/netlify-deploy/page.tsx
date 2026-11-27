import { Metadata } from "next";
import { getMetaTag } from "util/metatag";
import Guide from "./Guide";

export const metadata: Metadata = getMetaTag({
  url: `${process.env.BASE_URL}/netlify-deploy`,
  title: "Netlify로 내 웹 페이지 배포하기 - 이정환 블로그",
  description: "폴더를 올리고, 누구나 볼 수 있게 공개하고, 주소 이름을 바꾸는 과정을 최신 Netlify 화면으로 안내합니다.",
  ogImageTitle: "Netlify로 내 웹 페이지 배포하기",
});

export default function Page() {
  return <Guide />;
}
