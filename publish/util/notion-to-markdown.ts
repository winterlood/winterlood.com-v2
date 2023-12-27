import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { uploadImageToCloudinary } from "./cloudinary";
import { fetchOpenGraph } from "./fetch-open-graph";
import { getImageBase64DataURL, getImageDimensions } from "util/image-optimize";

class NotionToMarkdownClient {
  private client: NotionToMarkdown;
  private imageUploadPath: string;
  public thumbnail: string = "";

  constructor({
    contentType,
    contentSlug,
  }: {
    contentType: string;
    contentSlug: string;
  }) {
    this.imageUploadPath = `blog/${contentType}/${contentSlug}`;
    this.client = new NotionToMarkdown({
      notionClient: new Client({
        auth: process.env.NOTION_SECRET_KEY,
      }),
    });

    this.setBookmarkTransformer();
    this.setImageTransformer();
    this.setEmptyTransformer();
    this.setVideoTransformer();
    this.setCalloutTransformer();
  }

  setCalloutTransformer() {
    this.client.setCustomTransformer("callout", async (block: any) => {
      return false;
    });
  }

  setVideoTransformer() {
    this.client.setCustomTransformer("video", async (block: any) => {
      const src = block?.video?.external?.url;
      return `<Video src={\"${src}\"}/>`;
    });
  }

  setEmptyTransformer() {
    this.client.setCustomTransformer("paragraph", async (block: any) => {
      if (block?.paragraph?.rich_text?.length === 0) {
        return `<Blank/>`;
      }
      return false;
    });
  }

  setBookmarkTransformer() {
    this.client.setCustomTransformer("bookmark", async (block: any) => {
      try {
        const bookmarkUrl = block.bookmark.url;
        const og = await fetchOpenGraph(bookmarkUrl);
        return `<Bookmark ${Object.keys(og)
          .filter((key) => og[key as keyof typeof og])
          .map(
            (key) =>
              `${key}={\`${og[key as keyof typeof og]
                ?.toString()
                .replace(/\r?\n|\r/g, "")}\`}`
          )
          .join(" ")
          .replaceAll("\n", "")}/>`;
      } catch (e) {
        return "";
      }
    });
  }

  setImageTransformer() {
    this.client.setCustomTransformer("image", async (block: any) => {
      if (block.image.type === "file") {
        const {
          image: {
            file: { url },
            caption,
          },
        } = block;
        const uploadedImageUrl = await uploadImageToCloudinary({
          imgSrc: url,
          imageUploadPath: this.imageUploadPath,
        });
        if (!this.thumbnail && uploadedImageUrl) {
          this.thumbnail = uploadedImageUrl;
        }
        if (!uploadedImageUrl) {
          return "";
        }

        console.log(`\t> 이미지 업로드 : ${uploadedImageUrl}`);
        const blurDataURL = await getImageBase64DataURL(uploadedImageUrl);
        const { width, height } = await getImageDimensions(uploadedImageUrl);

        const captionText = caption
          .map((c: any) => c.plain_text)
          .join(" ")
          .replaceAll("\n", "");

        return `<NImage width={${width}} height={${height}} blurDataURL={"${blurDataURL}"} src={\`${uploadedImageUrl}\`} captionText={"${captionText}"} />`;
      } else {
        const {
          image: {
            external: { url },
            caption,
          },
        } = block;

        const captionText = caption.map((c: any) => c.plain_text).join(" ");

        let res = `![${captionText}](${url})`;
        if (captionText) res += `_${captionText}_`;
        return res;
      }
    });
  }

  async convertMarkdown(contentId: string) {
    const mdblocks = await this.client.pageToMarkdown(contentId);
    const mdString = this.client.toMarkdownString(mdblocks).parent;
    return mdString;
  }
}

export default NotionToMarkdownClient;
