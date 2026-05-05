import { Helmet } from "react-helmet-async";
const StaticPage = ({ title, body }: { title: string; body: string }) => (
  <>
    <Helmet><title>{title} · Konijet Ethiopia</title></Helmet>
    <section className="container-page py-16 max-w-3xl">
      <h1 className="font-display text-5xl text-primary">{title}</h1>
      <p className="mt-6 text-foreground/80 leading-relaxed whitespace-pre-line">{body}</p>
    </section>
  </>
);
export const About = () => <StaticPage title="About Konijet" body="Konijet Ethiopia is a locally-owned tour operator headquartered in Addis Ababa. We design intimate, respectful journeys that put Ethiopian hosts, guides and storytellers at the heart of every trip. Our team brings together historians, naturalists and chefs to craft experiences you'll remember for life." />;
export const Privacy = () => <StaticPage title="Privacy Policy" body="We collect only the information necessary to plan your trip — your name, contact details, and travel preferences. We never sell your data. You can request deletion at any time by emailing hello@konijet-ethiopia.com." />;
export const Terms = () => <StaticPage title="Terms of Service" body="By booking with Konijet Ethiopia you agree to our deposit, cancellation and refund policies. Itineraries may change due to weather, road conditions or local events; we'll always work with you to find the best alternative." />;
