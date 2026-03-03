import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const HEADING_LINK_ANCHOR = "anchor-heading-link";

const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: {
        className: [HEADING_LINK_ANCHOR],
      },
    },
  ],
  [
    rehypePrettyCode,
    {
      theme: "github-dark",
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
        node.properties.className = ["line"];
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className?.push("line--highlighted");
      },
    },
  ],
];

const remarkPlugins = [remarkGfm, remarkMath];

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

function extractHeadings(raw: string) {
  const slugger = new GithubSlugger();
  const regXHeader = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  return Array.from(raw.matchAll(regXHeader)).map(({ groups }) => {
    const flag = groups?.flag;
    const content = groups?.content;
    return {
      heading: flag?.length,
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    };
  });
}

export const tagOptions = [
  "technology",
  "productivity",
  "business",
  "remote work",
  "starter",
  "development",
  "docs",
  "freelancing",
  "opinion",
  "jamstack",
  "frontend",
  "development",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "gatsby",
  "tailwindcss",
];

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    publishedDate: z.string(),
    lastUpdatedDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
    series: z
      .object({
        title: z.string(),
        order: z.number(),
      })
      .optional(),
    author: z
      .object({
        name: z.string(),
        image: z.string().optional(),
      })
      .optional(),
    status: z.enum(["draft", "published"]),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins,
      rehypePlugins: rehypePlugins as any,
    });

    const slugger = new GithubSlugger();
    const tagSlugs = document.tags ? document.tags.map((tag) => slugger.slug(tag)) : null;

    return {
      ...document,
      body,
      slug: document._meta.fileName.replace(/\.mdx$/, ""),
      readTimeMinutes: calculateReadingTime(document.content),
      headings: extractHeadings(document.content),
      tagSlugs,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: `posts/${document._meta.path}`,
      },
    };
  },
});

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    lastUpdatedDate: z.string().optional(),
    status: z.enum(["draft", "published"]),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins,
      rehypePlugins: rehypePlugins as any,
    });

    return {
      ...document,
      body,
      slug: document._meta.fileName.replace(/\.mdx$/, ""),
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: `pages/${document._meta.path}`,
      },
    };
  },
});

export default defineConfig({
  collections: [posts, pages],
});
