import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog-posts";
import { SiteLayout } from "@/components/SiteLayout";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AdBanner } from "@/components/AdSense";
import Script from "next/script";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Allow dynamic slug resolution so new .mdx blog posts pushed by the n8n
// workflow are server-rendered on first request instead of 404'ing.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Konijet Ethiopia Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <SiteLayout>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775298130218510"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <article className="container-page py-16 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>
        {post.coverImage ? (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
        <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          {post.date ? (
            <span>{new Date(post.date).toLocaleDateString()}</span>
          ) : null}
        </div>
        <AdBanner slot="4783671292" className="my-8" />
        <div className="mt-8 max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </SiteLayout>
  );
}
