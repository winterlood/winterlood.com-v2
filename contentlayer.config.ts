import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { rehypeCloudniaryImage } from "@winterlood/rehype-cloudinary-image";

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `page/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/content/${post._raw.flattenedPath}` },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `post/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    subtitle: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    thumbnail: { type: "string", required: false },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/content/${post._raw.flattenedPath}` },
  },
}));

export const Qna = defineDocumentType(() => ({
  name: "Qna",
  filePathPattern: `qna/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    subtitle: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/content/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Page, Post, Qna],
  mdx: {
    rehypePlugins: [[rehypeCloudniaryImage]],
  },
});
