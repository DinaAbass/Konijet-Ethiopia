import Script from "next/script";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-posts";
import { SiteLayout } from "@/components/SiteLayout";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <SiteLayout>
      <Script
        id="blog-adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775298130218510"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <section className="container-page py-16">
        <span className="text-xs uppercase tracking-widest text-secondary font-bold">
          Blog
        </span>
        <h1 className="font-display text-5xl text-primary mt-2">
          Stories from Ethiopia
        </h1>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {posts.map((p) => (
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
              <div className="p-6">
                <h2 className="font-display text-2xl text-primary leading-snug">
                  {p.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-block text-secondary font-semibold">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
