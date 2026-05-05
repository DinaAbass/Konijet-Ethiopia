import { Helmet } from "react-helmet-async";
const posts = [
  { slug: "13-months-of-sunshine", title: "Why Ethiopia has 13 months of sunshine", excerpt: "Inside the Ge'ez calendar and what it means for travellers." },
  { slug: "coffee-origin-story", title: "The origin of coffee — a Kaldi tale", excerpt: "Tracing the bean from a goatherd in Kaffa to the world's cups." },
  { slug: "lalibela-pilgrim-guide", title: "A pilgrim's guide to Lalibela", excerpt: "How to experience the rock-hewn churches respectfully." },
];
const Blog = () => (
  <>
    <Helmet><title>Blog · Konijet Ethiopia</title></Helmet>
    <section className="container-page py-16">
      <span className="text-xs uppercase tracking-widest text-secondary font-bold">Stories</span>
      <h1 className="font-display text-5xl text-primary mt-2">Field notes from Ethiopia</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {posts.map(p => (
          <article key={p.slug} className="rounded-[2rem] curve-card-tr bg-card border border-border p-6 shadow-soft transition-smooth hover:shadow-elevated">
            <h2 className="font-display text-2xl text-primary leading-snug">{p.title}</h2>
            <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
            <span className="mt-5 inline-block text-secondary font-semibold">Read article →</span>
          </article>
        ))}
      </div>
    </section>
  </>
);
export default Blog;
