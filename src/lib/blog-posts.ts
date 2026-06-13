import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage?: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(text: string) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/.exec(text);
  if (!match) return { meta: {} as Record<string, string>, body: text };
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
      meta[key] = value;
    }
  });
  return { meta, body: match[2].trim() };
}

function fileToPost(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);
  const slug = meta.slug || path.basename(filePath, path.extname(filePath));
  return {
    slug,
    title: meta.title || slug,
    excerpt: meta.excerpt || "",
    date: meta.date || "",
    author: meta.author || "Konijet Ethiopia",
    coverImage: meta.coverImage,
    content: body,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => fileToPost(path.join(BLOG_DIR, f)))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const files = fs.readdirSync(BLOG_DIR);
  const file = files.find(
    (f) => f.endsWith(".mdx") && path.basename(f, ".mdx") === slug
  );
  if (!file) return null;
  return fileToPost(path.join(BLOG_DIR, file));
}
