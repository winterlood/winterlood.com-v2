import "dotenv/config";
import { getContentNotionID } from "./util/get-content-notion-id";
import { deleteExistCloudinaryAssets } from "./util/cloudinary";
import { generateFrontMatter } from "./util/generate-frontmatter";
import NotionToMarkdownClient from "./util/notion-to-markdown";
import fs from "fs";
import { fetchPageProperties, fetchPagesFromDatabase } from "./util/notion";

async function publishPage({
  contentId,
  contentType,
}: {
  contentId: string;
  contentType: string;
}) {
  // 2. 노션 페이지 불러오기 & 프로퍼티 추출하기
  console.log("- [2] Notion Page 불러오기");
  const properties = await fetchPageProperties({ contentId });
  const contentSlug = properties.slug ?? properties.title;

  // 3.cloudinary 폴더 체크 -> 삭제
  console.log("- [3] Cloudinary 폴더 초기화");
  await deleteExistCloudinaryAssets({ contentType, contentSlug });

  // 4. 노션 페이지 마크다운 변환
  console.log("- [4] 마크다운 변환");
  const notionToMarkdownClient = new NotionToMarkdownClient({
    contentType,
    contentSlug,
  });
  const mdString = await notionToMarkdownClient.convertMarkdown(contentId);

  // 4. Frontmatter 생성
  console.log("- [5] Frontmatter 추출");
  const frontMatter = generateFrontMatter({
    contentId,
    contentType,
    properties,
    thumbnail: notionToMarkdownClient.thumbnail,
  });

  // 6. 게시글 저장
  console.log("- [6] 게시글 저장");
  const resultMdString = `${frontMatter}\n\n${mdString}`;

  fs.writeFileSync(`content/${contentType}/${contentSlug}.mdx`, resultMdString, "utf8");
  console.log(`✅ [${contentType}/${contentSlug}] 컨텐츠 저장 완료`);
}

async function main() {
  // 1. id, type 불러오기
  console.log("- [1] ID, Type 불러오기");
  const { contentType, contentId } = getContentNotionID();
  console.log(`\t> TYPE : ${contentType}`);
  console.log(`\t> ID : ${contentId}`);

  if (contentType !== "db") {
    publishPage({ contentId, contentType });
  } else {
    const dbType = contentId;
    const pages = await fetchPagesFromDatabase(dbType);

    const pageLength = pages.length;
    let idx = 0;
    for await (const page of pages) {
      idx++;
      console.log(`[${idx}/${pageLength}] - ${dbType}-${page.id} 페이지 변환 시작`);
      await publishPage({ contentType: dbType, contentId: page.id });
    }
  }
}

main();
