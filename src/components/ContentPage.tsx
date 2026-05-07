import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export interface ContentBlock {
  heading: string;
  body: string[];
  image?: string;
  bullets?: string[];
}

interface Props {
  title: string;
  eyebrow: string;
  blurb: string;
  heroImage: string;
  intro?: string;
  blocks: ContentBlock[];
}

export const ContentPage = ({ title, eyebrow, blurb, heroImage, intro, blocks }: Props) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <>
      <Helmet>
        <title>{title} · Konjit Ethiopia</title>
        <meta name="description" content={blurb} />
      </Helmet>

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

      {intro && (
        <section className="container-page py-12">
          <p className="max-w-3xl text-lg text-foreground/80 leading-relaxed">{intro}</p>
        </section>
      )}

      <section className="container-page pb-20 space-y-16">
        {blocks.map((b, i) => {
          const flip = isRTL ? i % 2 === 1 : i % 2 === 0;
          return (
            <article key={i} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {b.image && (
                <div className={`relative overflow-hidden rounded-[2rem] shadow-elevated min-h-[280px] ${i % 2 ? "curve-card-bl" : "curve-card-tr"} ${flip ? "" : "md:order-2"}`}>
                  <img src={b.image} alt={b.heading} loading="lazy" className="h-full w-full object-cover absolute inset-0" />
                </div>
              )}
              <div className={!b.image ? "md:col-span-2" : ""}>
                <h2 className="font-display text-3xl md:text-4xl text-primary">{b.heading}</h2>
                <div className="mt-4 space-y-3 text-foreground/80 leading-relaxed">
                  {b.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                {b.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {b.bullets.map((bl, j) => (
                      <li key={j} className="text-sm text-foreground/75 ps-4 relative before:content-['•'] before:absolute before:start-0 before:text-secondary before:font-bold">{bl}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};
