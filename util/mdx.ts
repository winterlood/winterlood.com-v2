import fs from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

interface FrontMatter {
  title: string;
  subTitle: string;
  date: string;
  thumbnailURL: string;
}

interface Post<T> {
  serialized: MDXRemoteSerializeResult;
  frontmatter: T;
}

export async function getPost(filePath: string): Promise<Post<FrontMatter>> {
  console.log(filePath);

  const readPath = path.join(process.cwd(), filePath);
  console.log(readPath);
  const file = fs.readFileSync(readPath, "utf8");

  const serialized = await serialize(file, {
    parseFrontmatter: true,
  });

  // TODO: 향후 Type-Safety를 위해 Zod-Matter로 변경 예정
  const frontmatter = serialized.frontmatter as unknown as FrontMatter;

  return {
    frontmatter,
    serialized,
  };
}

export async function getAllPosts(dirPath: string): Promise<Post<FrontMatter>[]> {
  const readPath = path.join(process.cwd(), dirPath);
  console.log(readPath);
  let files = await fs.readdirSync(readPath, "utf8");
  files = files.filter((it) => it.split(".")[1] === "mdx");

  const posts: Post<FrontMatter>[] = [];

  for await (const file of files) {
    const { frontmatter, serialized } = await getPost(`${dirPath}/${file}`);
    posts.push({
      frontmatter,
      serialized,
    });
  }

  return posts;
}
