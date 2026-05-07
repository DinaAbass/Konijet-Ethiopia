import { ContentPage } from "@/components/ContentPage";
import { useTranslation } from "react-i18next";
import hero from "@/assets/dest-bale.jpg";
import city from "@/assets/cat-city.jpg";
import simien from "@/assets/hero-ethiopia.jpg";
import coffee from "@/assets/culture-coffee.jpg";

const Planning = () => {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("plan.title", "Plan your trip")}
      eyebrow={t("plan.eyebrow", "Practical guide")}
      blurb={t("plan.blurb", "Everything you need: arrival, visas, packing, weather and money.")}
      heroImage={hero}
      blocks={[
        {
          heading: t("plan.arrival.h", "Getting Here"),
          body: [t("plan.arrival.p", "Addis Ababa Bole International Airport (ADD) is Ethiopia's main gateway and one of Africa's leading aviation hubs — just 6 km from the city centre, with 15–20 minute transfers to most major hotels.")],
          bullets: [
            t("plan.arrival.b1", "Ethiopian Airlines connects 130+ international destinations"),
            t("plan.arrival.b2", "Other carriers: Emirates, Turkish, Qatar, Lufthansa, FlyDubai, EgyptAir"),
            t("plan.arrival.b3", "Domestic flights cover Lalibela, Gondar, Axum, Bahir Dar, Arba Minch, Jinka, Mekele"),
            t("plan.arrival.b4", "On arrival, your Konjit guide will meet you at arrivals with a name sign"),
          ],
          image: city,
        },
        {
          heading: t("plan.visa.h", "Visa & Entry"),
          body: [t("plan.visa.p", "Most international travellers can obtain an Ethiopian visa via e-Visa (recommended) at evisa.gov.et, or visa-on-arrival at Bole International Airport. Your passport must be valid for at least six months from entry.")],
        },
        {
          heading: t("plan.day.h", "Daily Schedule"),
          body: [t("plan.day.p", "Most days involve 8–9 hours on the go — sights, lunch breaks, photo stops and drive time. A few days extend to 10+ hours. Days generally start between 7:30–8:30 and finish around 16:00–17:00.")],
        },
        {
          heading: t("plan.transport.h", "Transport"),
          body: [t("plan.transport.p", "We use a private bus charter for the northern loop (Addis to Lalibela), domestic flights as stated in the itinerary, and air-conditioned 4WD Land Cruisers for off-road sections.")],
        },
        {
          heading: t("plan.weather.h", "Weather & Clothing"),
          body: [
            t("plan.weather.p1", "Expect sunshine most days. The north stays comfortably warm; the south can reach 30°C+. Nights in the highlands can be cold — bring a jacket and light thermals."),
            t("plan.weather.p2", "The Danakil Depression is one of the hottest places on Earth. Trips run October–February, but daytime temperatures can still reach 40°C."),
            t("plan.weather.p3", "Dress is conservative. Comfortable walking shoes with ankle support are strongly recommended, plus a hat and sunscreen."),
          ],
          image: simien,
        },
        {
          heading: t("plan.money.h", "Money & Exchange"),
          body: [t("plan.money.p", "Local currency is the Ethiopian Birr (ETB). Credit cards are accepted in major hotels but limited elsewhere. ATMs are available in major towns. Bring USD, EUR or GBP cash in high-denomination notes (post-1999, undamaged).")],
        },
        {
          heading: t("plan.food.h", "Food"),
          body: [t("plan.food.p", "The national dish is injera — a circular fermented teff pancake — served with spiced meats, vegetables and sauces seasoned with berbere. Vegetarians should try 'fasting food', a colourful spread of salads and vegetable stews.")],
          image: coffee,
        },
        {
          heading: t("plan.stay.h", "Where You'll Stay"),
          body: [t("plan.stay.p", "Konjit Ethiopia carefully selects high-quality hotels, resorts and eco-lodges across the country. In Addis we partner with Sheraton, Hyatt Regency, Ethiopian Skylight, Hilton, Radisson Blu and Golden Tulip. In remote regions, accommodation is simpler but always clean and welcoming.")],
        },
      ]}
    />
  );
};

export default Planning;
