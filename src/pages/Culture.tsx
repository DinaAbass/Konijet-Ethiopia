import { ContentPage } from "@/components/ContentPage";
import { useTranslation } from "react-i18next";
import hero from "@/assets/culture-coffee.jpg";
import lalibela from "@/assets/dest-lalibela.jpg";
import axum from "@/assets/dest-axum.jpg";
import omo from "@/assets/dest-omo.jpg";
import danakil from "@/assets/dest-danakil.jpg";
import simien from "@/assets/hero-ethiopia.jpg";
import bale from "@/assets/dest-bale.jpg";

const Culture = () => {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("culture.title", "Highlights of Ethiopia")}
      eyebrow={t("culture.eyebrow", "Living heritage")}
      blurb={t("culture.blurb", "Ancient faith, vibrant tribes and the rhythm of 80+ languages.")}
      heroImage={hero}
      intro={t("culture.intro", "Ethiopia is a nation of incredible destinations — high mountains, deep valleys and a very long, layered history. Each place tells a different story, and together they form one of Africa's most distinctive cultural journeys.")}
      blocks={[
        { heading: t("culture.b1.h", "Lalibela – Churches Cut from Stone"), body: [t("culture.b1.p", "In Lalibela, whole churches were carved straight out of the living rock. These ancient sanctuaries are still active places of worship — walking through them is quiet, peaceful and feels like stepping into another world.")], image: lalibela },
        { heading: t("culture.b2.h", "Gondar – Ancient Castles"), body: [t("culture.b2.p", "Often called Africa's Camelot, Gondar is home to the Fasil Ghebbi fortress, where royal stone castles still stand tall. The history here is rich and regal, capturing the imagination of every visitor.")], image: axum },
        { heading: t("culture.b3.h", "Axum – Spiritual Heritage"), body: [t("culture.b3.p", "Axum's towering stelae and ancient stone monuments mark the heart of Ethiopian Orthodox Christianity and the legendary home of the Ark of the Covenant.")], image: axum },
        { heading: t("culture.b4.h", "Simien Mountains – Roof of Africa"), body: [t("culture.b4.p", "Jagged peaks, dramatic escarpments and troops of gelada baboons — the Simien Mountains are nature's true masterpiece in northern Ethiopia.")], image: simien },
        { heading: t("culture.b5.h", "Danakil Depression – Otherworldly Landscape"), body: [t("culture.b5.p", "One of the hottest places on Earth, Danakil features bright yellow sulfur springs, vast salt flats and active volcanoes. The land feels lunar — strange, beautiful and unforgettable.")], image: danakil },
        { heading: t("culture.b6.h", "Omo Valley – Ancient Cultures"), body: [t("culture.b6.p", "The Omo Valley is home to tribes with rich, living traditions — body painting, lip plates, bull-jumping ceremonies — practiced daily by people who have shaped this landscape for centuries.")], image: omo },
        { heading: t("culture.b7.h", "Harar – Walled City of Saints"), body: [t("culture.b7.p", "A maze of alleyways and over 80 mosques, Harar ends each day with the famous hyena feeding ritual outside its ancient walls.")], image: bale },
        { heading: t("culture.b8.h", "Why Travel With Konjit"), body: [t("culture.b8.p", "With Konjit Ethiopia, you get more than a trip — you get a real story. We help you find the true heart of this land, one friendly face and stunning view at a time.")] },
      ]}
    />
  );
};

export default Culture;
