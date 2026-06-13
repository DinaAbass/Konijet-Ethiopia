export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "13-months-of-sunshine",
    title: "Why Ethiopia Has 13 Months of Sunshine",
    excerpt: "Inside the Ge'ez calendar and what it means for travellers.",
    date: "2025-09-15",
    author: "Konijet Ethiopia",
    coverImage: "https://res.cloudinary.com/demo/image/upload/v1628105004/sample.jpg",
  },
  {
    slug: "coffee-origin-story",
    title: "The Origin of Coffee — A Kaldi Tale",
    excerpt: "Tracing the bean from a goatherd in Kaffa to the world's cups.",
    date: "2025-08-22",
    author: "Konijet Ethiopia",
    coverImage: "https://res.cloudinary.com/demo/image/upload/v1628105004/coffee.jpg",
  },
  {
    slug: "lalibela-pilgrim-guide",
    title: "A Pilgrim's Guide to Lalibela",
    excerpt: "How to experience the rock-hewn churches respectfully.",
    date: "2025-07-10",
    author: "Konijet Ethiopia",
    coverImage: "https://res.cloudinary.com/demo/image/upload/v1628105004/lalibela.jpg",
  },
];

export function getBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
