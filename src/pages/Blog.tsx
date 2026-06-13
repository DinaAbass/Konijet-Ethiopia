"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getBlogPosts } from "@/lib/blog";
import { SiteLayout } from "@/components/SiteLayout";
import { AdBanner } from "@/components/AdSense";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage?: string;
}

const Blog = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const posts = getBlogPosts();
    setPosts(posts);
  }, []);

  return (
    <SiteLayout>
      <section className="container-page py-16">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold">{t("blog.eyebrow")}</span>
        <h1 className="font-display text-5xl text-primary mt-2">{t("blog.title")}</h1>
        <AdBanner slot="4783671292" className="my-8" />
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {posts.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-[2rem] curve-card-tr bg-card border border-border overflow-hidden shadow-soft transition-smooth hover:shadow-elevated"
            >
              {p.coverImage ? (
                <div className="relative w-full h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className={p.coverImage ? "p-6" : "p-6"}>
                <h2 className="font-display text-2xl text-primary leading-snug">{p.title}</h2>
                <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-block text-secondary font-semibold">
                  {t("blog.readArticle")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};
export default Blog;
