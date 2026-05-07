import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const en = {
  nav: { destinations: "Destinations", tours: "Tours", culture: "Culture", experience: "Experience", planning: "Planning", explore: "Explore", blog: "Blog", contact: "Contact" },
  hero: {
    eyebrow: "Discover Ethiopia",
    title: "The cradle of humanity, the roof of Africa.",
    subtitle: "From rock-hewn churches to volcanic salt flats — craft your journey through 13 months of sunshine.",
    ctaPrimary: "Explore packages",
    ctaSecondary: "Watch the film",
  },
  sections: { topThings: "Top things to do this week", whatsHappening: "What's happening now", throughEyes: "Experience Ethiopia through the eyes of locals", findThings: "Find things to do", planAhead: "Plan ahead", signUp: "Sign up to Konjit news" },
  packages: { from: "from", days: "days", viewAll: "View all packages", bookNow: "Book now" },
  footer: { tagline: "Tourism, the Ethiopian way.", rights: "All rights reserved.", explore: "Explore", company: "Company", about: "About", privacy: "Privacy", terms: "Terms" },
  contact: { title: "Get in touch", name: "Your name", email: "Email address", phone: "Phone (optional)", message: "Tell us about your dream trip", submit: "Send message", sending: "Sending...", success: "Message sent — we'll be in touch within 24 hours." },
  whatsapp: { tooltip: "Chat with us on WhatsApp" },
  tour: {
    available: "Available", from: "From", perPerson: "per person", exploreTrip: "Explore Trip",
    bookNow: "Book Now", similar: "See similar trips", duration: "Duration", region: "Region", status: "Status",
    payNow: "Pay now", payNowDesc: "and secure your trip", bestPrice: "Best price", bestPriceDesc: "guarantee on every booking",
    haveQuestion: "Have a question? Contact us",
  },
  booking: {
    title: "Book your trip", name: "Name", email: "Email", phone: "Phone", details: "Enquiry details",
    send: "Send", sending: "Sending...",
    success: "Booking received! We'll contact you within 24 hours.",
    error: "Something went wrong. Please try WhatsApp or email directly.",
  },
  newsletter: {
    title: "Sign up to Konjit news",
    subtitle: "Quarterly stories from Ethiopia's trails, festivals and food, with exclusive package launches.",
    subscribe: "Subscribe", sending: "Sending…",
    success: "You're subscribed! Check your email for a welcome message.",
    error: "Signup failed. Please try again.",
  },
};

const am = {
  nav: { destinations: "መዳረሻዎች", tours: "ጉብኝቶች", culture: "ባህል", experience: "ተሞክሮ", planning: "እቅድ", explore: "አስስ", blog: "ብሎግ", contact: "አግኙን" },
  hero: { eyebrow: "ኢትዮጵያን ያግኙ", title: "የሰው ዘር መገኛ፣ የአፍሪካ ጣራ።", subtitle: "ከድንጋይ ቤተ ክርስቲያኖች እስከ የእሳተ ገሞራ ጨው ሜዳዎች።", ctaPrimary: "ጥቅሎችን ይመልከቱ", ctaSecondary: "ፊልሙን ይመልከቱ" },
  sections: { topThings: "በዚህ ሳምንት የሚሠሩ ምርጥ ነገሮች", whatsHappening: "አሁን እየሆነ ያለው", throughEyes: "ኢትዮጵያን በነዋሪዎች ዓይን", findThings: "ነገሮችን ያግኙ", planAhead: "አስቀድመው ያቅዱ", signUp: "ለኮንጅት ዜናዎች ይመዝገቡ" },
  packages: { from: "ጀምሮ", days: "ቀናት", viewAll: "ሁሉንም", bookNow: "አሁን ያስይዙ" },
  footer: { tagline: "ቱሪዝም በኢትዮጵያ መንገድ።", rights: "መብቱ የተጠበቀ ነው።", explore: "አስስ", company: "ኩባንያ", about: "ስለ እኛ", privacy: "ግላዊነት", terms: "ውሎች" },
  contact: { title: "ያግኙን", name: "ስምዎ", email: "ኢሜይል", phone: "ስልክ", message: "ስለ ሕልም ጉዞዎ ይንገሩን", submit: "ላክ", sending: "በመላክ ላይ...", success: "መልዕክቱ ተልኳል።" },
  whatsapp: { tooltip: "በዋትስአፕ ያግኙን" },
  tour: { available: "ይገኛል", from: "ጀምሮ", perPerson: "በሰው", exploreTrip: "ጉዞውን ያስሱ", bookNow: "አሁን ያስይዙ", similar: "ተመሳሳይ ጉዞዎች", duration: "ጊዜ", region: "ክልል", status: "ሁኔታ", payNow: "አሁን ይክፈሉ", payNowDesc: "ጉዞዎን ያረጋግጡ", bestPrice: "ምርጥ ዋጋ", bestPriceDesc: "በእያንዳንዱ ቦታ ማስያዣ ዋስትና", haveQuestion: "ጥያቄ አለዎት? ያግኙን" },
  booking: { title: "ጉዞዎን ያስይዙ", name: "ስም", email: "ኢሜይል", phone: "ስልክ", details: "ዝርዝሮች", send: "ላክ", sending: "በመላክ ላይ...", success: "ጥያቄዎ ደርሷል። በ24 ሰዓት ውስጥ እናገኝዎታለን።", error: "ችግር ተፈጥሯል። እባክዎ በዋትስአፕ ወይም ኢሜይል ያግኙን።" },
  newsletter: { title: "ለኮንጅት ዜናዎች ይመዝገቡ", subtitle: "ከኢትዮጵያ የሚመጡ ታሪኮች።", subscribe: "ይመዝገቡ", sending: "በመላክ ላይ…", success: "ተመዝግበዋል!", error: "ምዝገባ አልተሳካም።" },
};

const ar = {
  nav: { destinations: "الوجهات", tours: "الجولات", culture: "الثقافة", experience: "التجربة", planning: "التخطيط", explore: "استكشف", blog: "المدونة", contact: "تواصل" },
  hero: { eyebrow: "اكتشف إثيوبيا", title: "مهد البشرية، سقف أفريقيا.", subtitle: "من الكنائس المنحوتة في الصخر إلى السهول الملحية البركانية.", ctaPrimary: "استكشف الباقات", ctaSecondary: "شاهد الفيلم" },
  sections: { topThings: "أبرز الأنشطة هذا الأسبوع", whatsHappening: "ما يحدث الآن", throughEyes: "اختبر إثيوبيا بعيون أهلها", findThings: "اكتشف ما يمكنك فعله", planAhead: "خطط مسبقاً", signUp: "اشترك في نشرة كونجيت" },
  packages: { from: "ابتداءً من", days: "أيام", viewAll: "عرض الكل", bookNow: "احجز الآن" },
  footer: { tagline: "السياحة على الطريقة الإثيوبية.", rights: "جميع الحقوق محفوظة.", explore: "استكشف", company: "الشركة", about: "من نحن", privacy: "الخصوصية", terms: "الشروط" },
  contact: { title: "تواصل معنا", name: "اسمك", email: "البريد الإلكتروني", phone: "الهاتف", message: "أخبرنا عن رحلة أحلامك", submit: "أرسل الرسالة", sending: "جاري الإرسال...", success: "تم إرسال الرسالة. سنتواصل معك خلال 24 ساعة." },
  whatsapp: { tooltip: "تحدث معنا عبر واتساب" },
  tour: { available: "متاح", from: "ابتداءً من", perPerson: "للشخص", exploreTrip: "استكشف الرحلة", bookNow: "احجز الآن", similar: "رحلات مشابهة", duration: "المدة", region: "المنطقة", status: "الحالة", payNow: "ادفع الآن", payNowDesc: "وأمّن رحلتك", bestPrice: "أفضل سعر", bestPriceDesc: "مضمون لكل حجز", haveQuestion: "لديك سؤال؟ تواصل معنا" },
  booking: { title: "احجز رحلتك", name: "الاسم", email: "البريد الإلكتروني", phone: "الهاتف", details: "تفاصيل الاستفسار", send: "إرسال", sending: "جاري الإرسال...", success: "تم استلام الحجز! سنتواصل معك خلال 24 ساعة.", error: "حدث خطأ. يرجى التواصل عبر واتساب أو البريد." },
  newsletter: { title: "اشترك في نشرة كونجيت", subtitle: "قصص فصلية من دروب إثيوبيا ومهرجاناتها وطعامها.", subscribe: "اشترك", sending: "جاري الإرسال…", success: "تم اشتراكك! تحقق من بريدك.", error: "فشل التسجيل. حاول مرة أخرى." },
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
    resources: { en: { translation: en }, am: { translation: am }, ar: { translation: ar } },
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
