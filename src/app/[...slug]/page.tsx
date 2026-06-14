import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { AdBanner } from "@/components/AdSense";
import Script from "next/script";

const BLOG_POSTS = [
  {
    slug: "13-months-of-sunshine",
    title: "Why Ethiopia Has 13 Months of Sunshine",
    excerpt: "Inside the Ge'ez calendar and what it means for travellers.",
    date: "2025-09-15",
    author: "Konijet Ethiopia",
    content: `# Why Ethiopia Has 13 Months of Sunshine

Ethiopia follows an ancient calendar system that most of the world has forgotten. Based on the Coptic calendar, used by the Ethiopian Orthodox Church, it has 12 months of 30 days each—and a final 13th month of just 5 or 6 days.

## The Ge'ez Calendar in Daily Life

For visitors, the calendar creates memorable moments. The Ethiopian New Year, **Enkutatash**, falls on September 11 (or 12 in leap years), when the rainy season ends and wildflowers bloom across the highlands.

> "In Ethiopia, time moves differently. We count seven years behind the Gregorian calendar, but the real difference is in the rhythm of life."

## Why It Matters for Travellers

Understanding the Ethiopian calendar helps you plan:

- **September–March**: Dry season, ideal for trekking and festivals
- **January**: Festival season (Genna, Timkat)
- **September**: Enkutatash celebrations and the start of the postcard-perfect dry season

## A Living Heritage

Unlike the Gregorian calendar, which was imposed top-down by papal decree, the Ethiopian calendar is a **living tradition**. It governs everything from church holidays to coffee harvests.`,
  },
  {
    slug: "coffee-origin-story",
    title: "The Origin of Coffee — A Kaldi Tale",
    excerpt: "Tracing the bean from a goatherd in Kaffa to the world's cups.",
    date: "2025-08-22",
    author: "Konijet Ethiopia",
    content: `# The Origin of Coffee — A Kaldi Tale

Walk into any Ethiopian home, and within minutes, the host will be washing green coffee beans over a charcoal stove. The smoke carries across the room, and the aroma tells you that **you're in the birthplace of coffee**.

## The Legend of Kaldi

Legend says that a goatherd named Kaldi, wandering the forests of **Kaffa** in the 9th century, noticed his goats dancing after eating bright red berries from a bush. Curious, Kaldi tried the berries himself and felt a surge of energy.

## Coffee at Source

Ethiopia remains one of the most genetically diverse coffee-growing regions on Earth. Wild Arabica still grows in the cloud forests of **Jimma and Kaffa**.

### What You'll Experience on a Coffee Origin Tour

- **Walk through wild coffee forests** with the farmers who know every tree
- **Harvest, wash, and roast** your own batch of Ethiopian coffee
- **Sit for a traditional three-round coffee ceremony** conducted by a local family
- **Taste single-origin varieties**: Yirgacheffe, Sidamo, Harrar, and Guji

> "In Ethiopia, coffee is not just a drink. It's a ritual, a conversation, and an invitation."

## The Ceremony

The Ethiopian coffee ceremony is one of the most important social rituals in the country. Green beans are washed, roasted in front of guests, ground by hand with a mortar and pestle, and brewed in a traditional **jebena** clay pot. Three rounds are served: the first is **abol** (strongest), the second **tona** (medium), and the third **baraka** (blessing).`,
  },
  {
    slug: "lalibela-pilgrim-guide",
    title: "A Pilgrim's Guide to Lalibela",
    excerpt: "How to experience the rock-hewn churches respectfully.",
    date: "2025-07-10",
    author: "Konijet Ethiopia",
    content: `# A Pilgrim's Guide to Lalibela

Lalibela is not a place you simply visit. It is a place you **enter**. Carved from living rock in the 12th and 13th centuries, the 11 churches of Lalibela were designed as a "New Jerusalem" for pilgrims who could no longer travel to the Holy Land.

## The Churches: An Overview

The churches are divided into two main groups, connected by passages and tunnels:

### Northern Group
- **Bete Medhane Alem**: The largest monolithic church in the world
- **Bete Maryam**: Richly decorated with early frescoes
- **Bete Meskel and Bete Denagel**: Smaller but equally moving

### Southern Group
- **Bete Giyorgis (St. George's)**: The iconic cross-shaped church, carved from the top down
- **Bete Gabriel-Rufael and Bete Merkorios**: Connected by a narrow passage

## Essential Etiquette

When visiting Lalibela, remember that these are **active places of worship**:

1. **Dress modestly**: Cover shoulders and knees. White is preferred, especially during festivals.
2. **Remove shoes** before entering any church.
3. **Ask permission before photographing** worshippers or ceremonies.
4. **Silence your phone** and speak quietly.
5. **Don't touch frescoes** or rock surfaces unnecessarily.

## When to Visit

- **January (Genna / Ethiopian Christmas)**: Thousands of pilgrims in white robes create an unforgettable atmosphere.
- **Timkat (January 19)**: Processions and baptisms make for spectacular photography.
- **October–March**: Dry season with clear skies and comfortable temperatures.

## Practical Tips

- **Fly into Lalibela** from Addis Ababa (Ethiopian Airlines operates daily).
- **Stay at least two nights** to experience both sunrise and sunset at the churches.
- **Hire a local guide** — they know the hidden passages and can explain the symbolism of each church.
- **Bring a torch** (flashlight) for exploring tunnels.

> "Lalibela is not a museum. It is a living sanctuary, and the faith that carved it is the faith that sustains it."`,
  },
];

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}

function markdownToHtml(markdown: string): string {
  let html = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html
    .replace(/^#{1}\s+(.+)$/gm, `<h1 class="font-display text-4xl text-primary mt-10 mb-4">$1</h1>`)
    .replace(/^#{2}\s+(.+)$/gm, `<h2 class="font-display text-2xl text-primary mt-8 mb-3">$1</h2>`)
    .replace(/^#{3}\s+(.+)$/gm, `<h3 class="font-display text-xl text-primary mt-6 mb-2">$1</h3>`)
    .replace(/^#{4,6}\s+(.+)$/gm, `<h4 class="font-display text-lg text-primary mt-5 mb-2">$1</h4>`);

  html = html.replace(/^\*\s+(.+)$/gm, `<li class="ml-5 list-disc mb-1">$1</li>`);
  const listDiscRegex = /(<li class="ml-5 list-disc mb-1">.*?<\/li>\s*)+/g;
  html = html.replace(listDiscRegex, (match) => `<ul class="mb-4 list-none">\n${match}</ul>`);

  html = html.replace(/^\d+\.\s+(.+)$/gm, `<li class="ml-5 list-decimal mb-1">$1</li>`);
  const listDecimalRegex = /(<li class="ml-5 list-decimal mb-1">.*?<\/li>\s*)+/g;
  html = html.replace(listDecimalRegex, (match) => `<ol class="mb-4 list-none">\n${match}</ol>`);

  html = html.replace(/^>(.+)$/gm, `<blockquote class="border-l-4 border-secondary pl-4 italic text-muted-foreground my-6">$1</blockquote>`);

  html = html.replace(/\*\*\*(.+?)\*\*\*/g, `<strong><em>$1</em></strong>`);
  html = html.replace(/\*\*(.+?)\*\*/g, `<strong>$1</strong>`);
  html = html.replace(/\*(.+?)\*/g, `<em>$1</em>`);

  const lines = html.split("\n");
  let processed = "";
  let inParagraph = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "" || /^<[a-z]+|^<\//i.test(trimmed)) {
      if (inParagraph) {
        processed += "</p>\n";
        inParagraph = false;
      }
      if (trimmed !== "") {
        processed += trimmed + "\n";
      }
    } else {
      if (!inParagraph) {
        processed += `<p class="mb-4 leading-relaxed">`;
        inParagraph = true;
      }
      processed += trimmed + " ";
    }
  }
  if (inParagraph) processed += "</p>\n";

  html = processed;
  html = html.replace(/\n/g, "");
  html = html.replace(/<\/p>\s*<p/g, "</p><p");

  return html;
}

function getPosts(): BlogPost[] {
  return BLOG_POSTS.map(post => ({ ...post }));
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: ["blog", post.slug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const postSlug = slug[slug.length - 1];
  const post = BLOG_POSTS.find((p) => p.slug === postSlug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Konijet Ethiopia Blog`,
    description: post.excerpt,
  };
}

export default async function CatchAllSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  // Handle /blog/[slug]
  if (slug.length === 2 && slug[0] === "blog") {
    return handleBlogPost(slug[1]);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

function handleBlogPost(slug: string) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  const htmlContent = markdownToHtml(post.content);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775298130218510"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <article className="container-page py-16 max-w-3xl">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-smooth mb-6 inline-block">
          ← Back to Blog
        </Link>
        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </header>
        <AdBanner slot="4783671292" className="my-8" />
        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-h1:text-primary prose-h2:text-primary prose-h3:text-primary prose-p:text-foreground/90 prose-a:text-secondary hover:prose-a:text-secondary/80 prose-blockquote:border-secondary prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}
