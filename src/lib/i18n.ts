import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: { destinations: "Destinations", tours: "Tours", culture: "Culture", experience: "Experience", planning: "Planning", explore: "Explore", blog: "Blog", contact: "Contact" },
      hero: {
        eyebrow: "Discover Ethiopia",
        title: "The cradle of humanity, the roof of Africa.",
        subtitle: "From rock-hewn churches to volcanic salt flats — craft your journey through 13 months of sunshine.",
        ctaPrimary: "Explore packages",
        ctaSecondary: "Watch the film",
      },
      sections: {
        topThings: "Top things to do this week",
        whatsHappening: "What's happening now",
        throughEyes: "Experience Ethiopia through the eyes of locals",
        findThings: "Find things to do",
        planAhead: "Plan ahead",
        signUp: "Sign up to Konijet news",
      },
      packages: { from: "from", days: "days", viewAll: "View all packages", bookNow: "Book now" },
      footer: { tagline: "Tourism, the Ethiopian way.", rights: "All rights reserved." },
      contact: { title: "Get in touch", name: "Your name", email: "Email address", message: "Tell us about your dream trip", submit: "Send message", success: "Message sent — we'll be in touch soon." },
    },
  },
  am: {
    translation: {
      nav: { destinations: "መዳረሻዎች", tours: "ጉብኝቶች", culture: "ባህል", experience: "ተሞክሮ", planning: "እቅድ", explore: "አስስ", blog: "ብሎግ", contact: "አግኙን" },
      hero: {
        eyebrow: "ኢትዮጵያን ያግኙ",
        title: "የሰው ዘር መገኛ፣ የአፍሪካ ጣራ።",
        subtitle: "ከድንጋይ ቤተ ክርስቲያኖች እስከ የእሳተ ገሞራ ጨው ሜዳዎች — በ13 ወራት ፀሐይ ጉዞዎን ይቀርጹ።",
        ctaPrimary: "ጥቅሎችን ይመልከቱ",
        ctaSecondary: "ፊልሙን ይመልከቱ",
      },
      sections: { topThings: "በዚህ ሳምንት የሚሠሩ ምርጥ ነገሮች", whatsHappening: "አሁን እየሆነ ያለው", throughEyes: "ኢትዮጵያን በነዋሪዎች ዓይን ይመልከቱ", findThings: "ነገሮችን ያግኙ", planAhead: "አስቀድመው ያቅዱ", signUp: "ለኮኒጄት ዜናዎች ይመዝገቡ" },
      packages: { from: "ጀምሮ", days: "ቀናት", viewAll: "ሁሉንም ይመልከቱ", bookNow: "አሁን ያስይዙ" },
      footer: { tagline: "ቱሪዝም በኢትዮጵያ መንገድ።", rights: "መብቱ የተጠበቀ ነው።" },
      contact: { title: "ያግኙን", name: "ስምዎ", email: "ኢሜይል", message: "ስለ ሕልም ጉዞዎ ይንገሩን", submit: "መልዕክት ላክ", success: "መልዕክቱ ተልኳል።" },
    },
  },
  ar: {
    translation: {
      nav: { destinations: "الوجهات", tours: "الجولات", culture: "الثقافة", experience: "التجربة", planning: "التخطيط", explore: "استكشف", blog: "المدونة", contact: "تواصل" },
      hero: {
        eyebrow: "اكتشف إثيوبيا",
        title: "مهد البشرية، سقف أفريقيا.",
        subtitle: "من الكنائس المنحوتة في الصخر إلى السهول الملحية البركانية — صمم رحلتك عبر 13 شهراً من الشمس.",
        ctaPrimary: "استكشف الباقات",
        ctaSecondary: "شاهد الفيلم",
      },
      sections: { topThings: "أبرز الأنشطة هذا الأسبوع", whatsHappening: "ما يحدث الآن", throughEyes: "اختبر إثيوبيا بعيون أهلها", findThings: "اكتشف ما يمكنك فعله", planAhead: "خطط مسبقاً", signUp: "اشترك في نشرة كونيجيت" },
      packages: { from: "ابتداءً من", days: "أيام", viewAll: "عرض كل الباقات", bookNow: "احجز الآن" },
      footer: { tagline: "السياحة على الطريقة الإثيوبية.", rights: "جميع الحقوق محفوظة." },
      contact: { title: "تواصل معنا", name: "اسمك", email: "البريد الإلكتروني", message: "أخبرنا عن رحلة أحلامك", submit: "أرسل الرسالة", success: "تم إرسال الرسالة." },
    },
  },
};

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "am", label: "አማርኛ", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS.map(l => l.code),
    interpolation: { escapeValue: false },
  });

const applyDir = (lng: string) => {
  const meta = SUPPORTED_LANGS.find(l => l.code === lng);
  document.documentElement.dir = meta?.dir ?? "ltr";
  document.documentElement.lang = lng;
};
applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
