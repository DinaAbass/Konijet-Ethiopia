import { ContentPage } from "@/components/ContentPage";
import { useTranslation } from "react-i18next";
import hero from "@/assets/hero-ethiopia.jpg";
import lalibela from "@/assets/dest-lalibela.jpg";
import axum from "@/assets/dest-axum.jpg";
import omo from "@/assets/dest-omo.jpg";
import danakil from "@/assets/dest-danakil.jpg";
import bale from "@/assets/dest-bale.jpg";
import city from "@/assets/cat-city.jpg";

const Destinations = () => {
  const { t } = useTranslation();
  return (
    <ContentPage
      title={t("dest.title", "Ethiopia Travel Guide")}
      eyebrow={t("dest.eyebrow", "Where to go")}
      blurb={t("dest.blurb", "Practical tips and vivid destinations across one extraordinary country.")}
      heroImage={hero}
      intro={t("dest.intro", "Ethiopia is a land of contrasts — UNESCO sites, vibrant cultures, dramatic landscapes and unforgettable rituals. From the highlands of the north to the tribal heartlands of the south, here is everything you need to plan your journey.")}
      blocks={[
        {
          heading: t("dest.addis.h", "Addis Ababa – The Gateway"),
          body: [t("dest.addis.p", "Perched at 2,355m, Addis Ababa offers mild weather year-round and blends modern skyscrapers with deep tradition — coffee ceremonies, lively nightlife and the heart of African diplomacy.")],
          bullets: [
            t("dest.addis.b1", "National Museum — home to 'Lucy', the famous fossil"),
            t("dest.addis.b2", "Holy Trinity Cathedral — neo-baroque masterpiece"),
            t("dest.addis.b3", "Mount Entoto — panoramic views and historic churches"),
            t("dest.addis.b4", "Merkato — Africa's largest open-air market"),
            t("dest.addis.b5", "Best time: September to March"),
          ],
          image: city,
        },
        {
          heading: t("dest.lalibela.h", "Lalibela – The Rock-Hewn Churches"),
          body: [t("dest.lalibela.p", "Ethiopia's spiritual centre, famed for 12th-century churches carved from living stone. Pilgrims arrive in flowing white robes — most magical at sunrise during Genna and Timkat festivals.")],
          bullets: [
            t("dest.lalibela.b1", "Bete Giyorgis (St. George's) — iconic cross-shaped church"),
            t("dest.lalibela.b2", "Asheton Maryam Monastery — sweeping mountain views"),
            t("dest.lalibela.b3", "Best time: January for Genna; October–March for dry weather"),
          ],
          image: lalibela,
        },
        {
          heading: t("dest.axum.h", "Axum – Ancient Kingdom"),
          body: [t("dest.axum.p", "The legendary seat of the Queen of Sheba and the birthplace of Ethiopian Christianity. Towering stelae, royal tombs and the sacred Church of St. Mary of Zion.")],
          image: axum,
        },
        {
          heading: t("dest.omo.h", "Omo Valley – Tribal Heartland"),
          body: [t("dest.omo.p", "A living museum of cultural diversity — Mursi lip plates, Hamar bull-jumping, Karo body painting. Always ask permission before photographing and respect tribal traditions.")],
          image: omo,
        },
        {
          heading: t("dest.danakil.h", "Danakil Depression – Extreme Adventure"),
          body: [t("dest.danakil.p", "Surreal salt flats, lava flows and neon sulfur springs. Erta Ale's lava lake glows red at night and Dallol's pools fluoresce yellow and green — accessible only by 4WD convoy with experienced guides.")],
          image: danakil,
        },
        {
          heading: t("dest.bale.h", "Bale Mountains – Wildlife Paradise"),
          body: [t("dest.bale.p", "Alpine meadows, the Harenna cloud forest and the world's rarest canid — the Ethiopian wolf — on the Sanetti Plateau.")],
          image: bale,
        },
      ]}
    />
  );
};

export default Destinations;
