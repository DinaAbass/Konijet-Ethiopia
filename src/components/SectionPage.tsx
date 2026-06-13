"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getDestinations, type Destination } from "@/lib/appwrite";

interface Props {
  title: string;
  eyebrow: string;
  blurb: string;
  heroImage: string;
}

export const SectionPage = ({ title, eyebrow, blurb, heroImage }: Props) => {
  const [dests, setDests] = useState<Destination[]>([]);
  useEffect(() => { getDestinations().then(setDests); }, []);
  return (
    <>
      <Head>
        <title>{title} · Konijet Ethiopia</title>
        <meta name="description" content={blurb} />
      </Head>
      <section className="container-page pt-6">
        <div className="relative overflow-hidden rounded-[2.5rem] curve-card-tr">
          <img src={heroImage} alt={title} className="h-[48vh] min-h-[360px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-10 text-primary-foreground">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">{eyebrow}</span>
              <h1 className="mt-4 font-display text-4xl md:text-6xl text-balance">{title}</h1>
              <p className="mt-3 max-w-2xl text-lg text-primary-foreground/90">{blurb}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dests.map((d, i) => (
            <Link key={d.id} href="/explore" className={`group relative overflow-hidden rounded-[2rem] shadow-soft transition-smooth hover:shadow-elevated ${i % 2 ? "curve-card-bl" : "curve-card-tr"}`}>
              <img src={d.image} alt={d.name} loading="lazy" className="h-72 w-full object-cover transition-smooth group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-hero" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                <span className="text-xs uppercase tracking-widest text-secondary">{d.region}</span>
                <h3 className="font-display text-2xl mt-1">{d.name}</h3>
                <p className="text-sm text-primary-foreground/85 line-clamp-2 mt-1">{d.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
