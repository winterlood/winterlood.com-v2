export type Theme = "light" | "dark";

export type PageCategory = "post" | "qna" | "work";

export type PageProperties = {
  title: string;
  subtitle: string;
  slug: string;
  tags: string[];
  createTime: string;
};

export interface Bookmark {
  title?: string;
  thumbnail?: string;
  url?: string;
  description?: string;
  sitename?: string;
  favicon?: string;
}
