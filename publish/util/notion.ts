import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { PageProperties } from "types";

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

function extractProperty(page: PageObjectResponse): PageProperties {
  const res = {} as any;
  const properties = page.properties;
  Object.keys(page.properties).forEach((key) => {
    const prop = properties[key];
    if (key === "title" && prop.type === "title") {
      res[key] = prop.title?.map((t) => t.plain_text).join(" ");
    } else if (key === "subtitle" && prop.type === "rich_text") {
      res[key] = prop.rich_text?.map((r) => r.plain_text).join(" ");
    } else if (key === "slug" && prop.type === "rich_text") {
      res[key] = prop.rich_text?.map((r) => r.plain_text).join(" ");
    } else if (key === "tags" && prop.type === "multi_select") {
      res[key] = prop.multi_select.map((tag) => tag.name);
    } else if (key === "createTime" && prop.type === "created_time") {
      const createdTimeDate = new Date(prop.created_time);
      const year = createdTimeDate.getFullYear();
      const month = (createdTimeDate.getMonth() + 1).toString().padStart(2, "0");
      const day = createdTimeDate.getDate().toString().padStart(2, "0");
      res[key] = `${year}-${month}-${day}`;
    }
  });
  return res;
}

export async function fetchPageProperties({ contentId }: { contentId: string }) {
  const page = (await notion.pages.retrieve({
    page_id: contentId,
  })) as PageObjectResponse;

  const properties = extractProperty(page);
  return properties;
}

const databaseIdMap: Record<string, string> = {
  post: process.env.NOTION_POST_DB_ID!,
  qna: process.env.NOTION_QNA_DB_ID!,
};
export async function fetchPagesFromDatabase(type: string) {
  try {
    const res = await notion.databases.query({
      database_id: databaseIdMap[type],
    });
    const pages = res.results;
    return pages;
  } catch (err) {
    throw new Error("DB로부터 페이지를 불러오지 못했습니다");
  }
}
