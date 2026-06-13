const cheberaChurchura = "/img/tours/4-days-chebera-churchura.jpg";
const baleMountains = "/img/tours/3-days-bale-mountains.jpg";
const ertaAleDanakil = "/img/tours/3-days-erta-ale-danakil.jpg";
const danakilLalibela = "/img/tours/7-day-danakil-gheralta, 6-days-danakil-lalibela.avif";
const danakilGheralta = "/img/tours/7-day-danakil-gheralta.jpg";
const danakilLalibelaOmo = "/img/tours/10-day-danakil-lalibela-omo.jpg";
const grandCulturalWildlife = "/img/tours/16-days-grand-cultural-wildlife.jpg";
const birdWatching = "/img/tours/16-days-bird-watching.jpg";
const awashSafari2 = "/img/tours/awash-safari2.jpg";
const foodTourAddis = "/img/tours/food-tour-addis.jpg";
const debreZeyit = "/img/tours/debre-zeyit-day-trip.webp";
const ethiopianCooking = "/img/tours/ethiopian-cooking-class.png";
const addisNightlife = "/img/tours/addis-nightlife-pub-crawl.webp";
const wenchiLake = "/img/tours/wenchi-crater-lake.jpg";
const debreLibanos = "/img/tours/debre-libanos-portuguese-bridge.jpg";
const halfDayAddis = "/img/tours/addis-ababa-city-tours.webp";
const addisSurrounding = "/img/tours/addis-surrounding.webp";
const fullDayAddis = "/img/tours/full-day-addis.jpg";
const addisFoodTasting = "/img/tours/addis-food-tasting.jpg";
const coffeeHeritage = "/img/tours/ethiopian-coffee-heritage-day.avif";
const yirgalemCoffee = "/img/tours/3-day-yirgalem-coffee.jpg";
const sidamaYirgacheffe = "/img/tours/6-day-sidama-yirgacheffe.webp";
const danakilLalibelaOmo14 = "/img/tours/14-days-danakil-lalibela-omo.jpg";
const historicalCulturalOmo = "/img/tours/15-days-historical-cultural-omo.jpg";
const historicalCultural = "/img/tours/21-days-historical-cultural.jpg";
const southOmoGroup = "/img/tours/3-day-south-omo-group.jpg";
const omoCultural = "/img/tours/4-day-omo-cultural.jpg";
const omoTribes = "/img/tours/8-day-omo-tribes.png";
const omoTribes2 = "/img/tours/10-day-omo-tribes-2.jpg";
const southOmo1 = "/img/tours/12-day-south-omo-1.jpg";
const genna = "/img/tours/8-day-genna.jpg";
const temeket = "/img/tours/8-day-temeket.jpg";
const meskel = "/img/tours/7-day-meskel.jpg";
const tiyaAdadi = "/img/tours/tiya-adadi-mariam.jpg";
const lalibela2Day = "/img/tours/2-day-lalibela.avif";
const awashHarar = "/img/tours/5-days-awash-harar.webp";
const northernClassic = "/img/tours/6-days-northern-classic.jpg";
const lalibelaOmo = "/img/tours/7-days-lalibela-omo.jpg";
const culturalTour = "/img/tours/14-days-cultural-tour.jpg";
const historicalTour3 = "/img/tours/historical-tour-iii.jpg";
const historicalTour2 = "/img/tours/historical-tour-ii.jpg";
const historicalTour1 = "/img/tours/historical-tour-i.jpg";
const historicalHarar = "/img/tours/historical-harar.jpg";
const awashParkHarar = "/img/tours/5-days-awash-park-harar.webp";
const tigrayTrekking = "/img/tours/3-day-tigray-trekking.jpg";
const baleTrekking = "/img/tours/8-days-bale-trekking.jpg";
const simienTrekking = "/img/tours/9-days-simien-trekking.webp";
const rockTigray = "/img/tours/4-days-rock-tigray.jpg";

export type TourCategory = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type Tour = {
  slug: string;
  title: string;
  categories: string[];
  durationDays: number;
  durationLabel: string;
  priceUSD: number;
  oldPriceUSD?: number;
  available: boolean;
  rating: number;
  region: string;
  lat: number;
  lng: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  itinerary: { day: string; title: string; details: string }[];
  includes: string[];
  excludes: string[];
};

export const CATEGORIES: TourCategory[] = [
  { slug: "adventure-safari", name: "Adventure & Safari Tours", blurb: "Wildlife, volcanoes, salt flats and big African landscapes.", image: "/img/cat-adventure.jpg" },
  { slug: "birding", name: "Birding Tours", blurb: "Track endemic species across the Rift Valley and highlands.", image: "/img/cat-birding.jpg" },
  { slug: "city-day-trips", name: "Addis Ababa City Tours & Day Trips", blurb: "Markets, museums, food and crater-lake escapes from the capital.", image: "/img/cat-city.webp" },
  { slug: "coffee", name: "Coffee Tour", blurb: "Walk the birthplace of coffee from cherry to cup.", image: "/img/cat-coffee.jpg" },
  { slug: "combined", name: "Combined Tours", blurb: "Multi-region grand circuits — north, south and east in one journey.", image: "/img/cat-combined.jpg" },
  { slug: "cultural", name: "Cultural Tours", blurb: "Meet the peoples of the Omo Valley and beyond, with respect.", image: "/img/cat-cultural.jpg" },
  { slug: "festival", name: "Festival Tours", blurb: "Genna, Timkat and Meskel — Ethiopia's living religious festivals.", image: "/img/cat-festival.jpg" },
  { slug: "historical", name: "Historical Tours", blurb: "Lalibela, Axum, Gondar — 3000 years of layered history.", image: "/img/cat-historical.jpg" },
  { slug: "trekking", name: "Trekking Tours", blurb: "Simien, Bale and Tigray — high-altitude trails and rock churches.", image: "/img/cat-trekking.jpg" },
];

const baseItinerary = (days: number, place: string) =>
  Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    title: i === 0 ? `Arrival & welcome in ${place}` : i === days - 1 ? "Return & departure" : `Exploring ${place}`,
    details: i === 0
      ? `Met at the airport, transfer to your hotel and a relaxed welcome briefing with your guide. Evening traditional dinner with cultural music.`
      : i === days - 1
        ? `Final breakfast, optional last-minute shopping, transfer to the airport for your onward flight.`
        : `A full day of guided exploration, scenic drives and authentic local encounters in and around ${place}. All entry fees and a hot lunch included.`,
  }));

const baseIncludes = [
  "All ground transport in a private 4x4 vehicle",
  "English-speaking professional local guide",
  "Accommodation on a twin-share basis",
  "All breakfasts and lunches as per itinerary",
  "All entrance fees and local guides",
  "Bottled water throughout the trip",
];
const baseExcludes = [
  "International flights",
  "Ethiopia entry visa",
  "Travel insurance",
  "Personal expenses, drinks and tips",
];

export const TOURS: Tour[] = [
  // Adventure & Safari
  { slug: "4-days-chebera-churchura", title: "4 Days Chebera-Churchura National Park Wildlife Safari", categories: ["adventure-safari"], durationDays: 4, durationLabel: "4 Days", priceUSD: 920, available: true, rating: 4.96, region: "SNNPR", lat: 6.95, lng: 36.85, image: cheberaChurchura, shortDescription: "Track elephants, buffalo and rare forest wildlife in one of Ethiopia's most untouched parks.", longDescription: "Chebera-Churchura National Park is one of Ethiopia's best-kept wildlife secrets — a vast wilderness of dense forest, open savannah and winding river valleys sheltering one of the country's largest elephant populations. Over four days you will game-drive through pristine landscapes, walk alongside armed park rangers and fall asleep beneath skies unmarred by light pollution.", highlights: ["Elephant herds at the Omo river basin", "Buffalo and bushbuck game drives", "Walking safari with park rangers", "Birding on the Zigna river"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Hosanna – Chebera-Churchura", details: "Depart Addis Ababa early for the drive southwest to Hosanna, then continue into the park. Check into camp and enjoy an afternoon orientation drive through the savannah, watching for elephant, buffalo and warthog." },
    { day: "Day 2", title: "Full-Day Game Drive & Walking Safari", details: "Full day inside the park. Morning game drive along the Omo river basin for elephant sightings. After lunch, join armed rangers on a guided walking safari through the forest understorey. Evening campfire and star-gazing." },
    { day: "Day 3", title: "Birding on Zigna River & Afternoon Drive", details: "Early morning birding walk along the Zigna River targeting forest specialists. Afternoon game drive across open grasslands for bushbuck, waterbuck and raptors. Final camp dinner under the stars." },
    { day: "Day 4", title: "Dawn Drive & Return to Addis Ababa", details: "Last sunrise drive for elephant at the waterhole. Depart mid-morning and drive back to Addis Ababa, arriving by early evening." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "3-days-bale-mountains", title: "3 Days Bale Mountains Tour from Addis Ababa", categories: ["adventure-safari"], durationDays: 3, durationLabel: "3 Days", priceUSD: 690, available: true, rating: 4.96, region: "Oromia", lat: 6.83, lng: 39.75, image: baleMountains, shortDescription: "A fast escape from Addis to the Sanetti Plateau in search of the rare Ethiopian wolf.", longDescription: "The Bale Mountains are an Afroalpine wonderland — giant lobelias, the highest all-weather road in Africa, and the world's densest population of the endangered Ethiopian wolf. This compact three-day escape is perfect for travellers short on time but unwilling to compromise on wildlife.", highlights: ["Sanetti Plateau high-altitude drive", "Ethiopian wolf tracking", "Harenna ancient cloud forest", "Endemic mountain nyala"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Goba – Bale Mountains", details: "Morning drive southeast to Goba, gateway to the Bale Mountains. Afternoon introduction drive through the web valley with mountain nyala and warthog. Check into lodge and briefing on the Ethiopian wolf." },
    { day: "Day 2", title: "Sanetti Plateau & Ethiopian Wolf Tracking", details: "Early ascent to the Sanetti Plateau (4,000m+), the roof of Ethiopia. Track Ethiopian wolf packs across the moorland. Drive through the Harenna forest on the southern escarpment, spotting colobus monkeys and forest birds." },
    { day: "Day 3", title: "Dawn Wolf Watch & Return to Addis", details: "Dawn walk on the plateau for optimal wolf activity before breakfast. Depart Goba and drive back to Addis Ababa, arriving by early evening." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "3-days-erta-ale-danakil", title: "3 Days Erta Ale Volcano & Danakil Depression Tour - Dallol, Salt Flats & Lava Lake", categories: ["adventure-safari"], durationDays: 3, durationLabel: "3 days", priceUSD: 1190, available: true, rating: 4.96, region: "Afar", lat: 13.6, lng: 40.67, image: ertaAleDanakil, shortDescription: "Camp beside an active lava lake and walk Dallol's neon sulfur springs — the lowest place on Earth.", longDescription: "A bucket-list expedition into the hottest, lowest, and most extraordinary landscape on Earth: the Danakil Depression. At night, Erta Ale's lava lake illuminates the sky in molten red. By day, Dallol's mineral pools shimmer in shades of yellow and green, while camel caravans silently cross the salt flats — a scene unchanged for thousands of years.", highlights: ["Erta Ale active lava lake night camp", "Dallol sulfur springs and mineral pools", "Lake Asale salt flat crossing", "Afar salt-caravan encounter"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Semera – Afar Desert Camp", details: "Fly or drive to Semera in the Afar Region. Meet your Afar guides and 4x4 convoy. Afternoon drive across the desert to your camp near the Erta Ale volcano base. Briefing on the night ascent." },
    { day: "Day 2", title: "Erta Ale Lava Lake – Dallol Crater", details: "Pre-dawn summit of Erta Ale to witness the glowing lava lake at sunrise. Descend and drive north to the Dallol hydrothermal field — one of Earth's most alien landscapes. Walk the neon-colored mineral terraces and salt formations. Camp in the desert." },
    { day: "Day 3", title: "Lake Asale Salt Flats – Return to Addis", details: "Morning walk across the white expanse of Lake Asale, observing Afar salt miners at work. Drive to Semera and fly or drive back to Addis Ababa, arriving by evening." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "6-days-danakil-lalibela", title: "6 Days / 5 Nights – Danakil Depression & Lalibela Highlights Tour", categories: ["adventure-safari", "historical"], durationDays: 6, durationLabel: "6 Days / 5 Nights", priceUSD: 1780, available: true, rating: 4.96, region: "Afar / Amhara", lat: 12.03, lng: 39.05, image: danakilLalibela, shortDescription: "Pair the otherworldly Danakil with the rock-hewn churches of Lalibela in one extraordinary trip.", longDescription: "Two of Ethiopia's most iconic experiences united in one journey: the fire-and-brimstone Danakil Depression and the medieval rock-hewn churches of Lalibela. From lava lakes glowing in the night to 12th-century cathedrals carved by hand from solid rock, this tour spans 800 years of Earth's most dramatic contrasts.", highlights: ["Erta Ale lava lake night camp", "Dallol mineral landscape", "All 11 Lalibela churches", "Asheton Maryam mountain monastery"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Semera – Danakil", details: "Fly to Semera. Join your Afar escort convoy and drive into the Danakil Depression. Desert camp at Erta Ale base." },
    { day: "Day 2", title: "Erta Ale Lava Lake & Dallol", details: "Night ascent to Erta Ale's active lava lake. Dawn descent and drive to the Dallol hydrothermal field — neon sulfur springs and salt formations. Return to camp." },
    { day: "Day 3", title: "Lake Asale & Flight to Lalibela", details: "Morning at Lake Asale salt flats. Drive to Semera and fly to Lalibela. Afternoon rest and orientation walk in the town." },
    { day: "Day 4", title: "Lalibela – Northern Church Group", details: "Full guided tour of the northern cluster: Bete Medhane Alem, Bete Maryam, Bete Meskel and Bete Denagel. Afternoon at Bete Giyorgis (St George's) — Lalibela's most iconic church." },
    { day: "Day 5", title: "Lalibela – Southern Group & Asheton Maryam", details: "Morning visit to the southeastern churches. Afternoon mule or hike up to Asheton Maryam monastery for panoramic highland views." },
    { day: "Day 6", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly back to Addis Ababa. Transfer to hotel or airport." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "7-day-danakil-gheralta", title: "7-Day Adventure: Danakil Depression & Gheralta Churches", categories: ["adventure-safari", "historical"], durationDays: 7, durationLabel: "7-Days", priceUSD: 1990, available: true, rating: 4.96, region: "Afar / Tigray", lat: 13.95, lng: 39.16, image: danakilGheralta, shortDescription: "Lava lakes, salt caravans and the sky-high rock churches of the Gheralta cliffs.", longDescription: "The Danakil's volcanic fury meets Tigray's ancient spirituality in this spectacular seven-day adventure. After camping beside an active lava lake and walking through alien sulfur fields, you ascend the Gheralta sandstone massif to reach monasteries that have clung to cliff faces since the 6th century.", highlights: ["Erta Ale lava lake & Dallol", "Abuna Yemata Guh cliff climb", "Maryam Korkor monastery frescoes", "Hawzen plateau villages"], itinerary: [
    { day: "Day 1", title: "Addis – Mekelle – Danakil Camp", details: "Fly to Mekelle. Drive southeast into the Afar lowlands to your desert camp at the Erta Ale base." },
    { day: "Day 2", title: "Erta Ale Lava Lake", details: "Ascend Erta Ale by moonlight. Witness the living lava lake at its most dramatic. Descend at dawn." },
    { day: "Day 3", title: "Dallol & Lake Asale", details: "Drive to the Dallol hydrothermal crater — Earth's most colourful landscape. Walk the salt flats of Lake Asale. Return to Mekelle." },
    { day: "Day 4", title: "Mekelle – Hawzen – Gheralta", details: "Drive west to Hawzen, base for the Gheralta churches. Afternoon acclimatisation walk with views across the sandstone massif." },
    { day: "Day 5", title: "Abuna Yemata Guh Climb", details: "The signature day: climb the near-vertical rock face to Abuna Yemata Guh, a 6th-century church perched on an eagle's shelf. The views and ancient frescoes are breathtaking." },
    { day: "Day 6", title: "Maryam Korkor & Daniel Korkor", details: "Trek to Maryam Korkor for its magnificent 17th-century frescoes and the smaller adjacent church of Daniel Korkor with its sheer cliff panorama." },
    { day: "Day 7", title: "Return to Addis Ababa", details: "Morning at leisure in Hawzen. Drive or fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "10-day-danakil-lalibela-omo", title: "10-Day Tour: Danakil Depression, Lalibela & Omo Valley Culture", categories: ["adventure-safari", "cultural", "combined"], durationDays: 10, durationLabel: "10 Days", priceUSD: 2890, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: danakilLalibelaOmo, shortDescription: "North to south — volcanoes, churches and the tribes of the Omo Valley.", longDescription: "A grand traverse of Ethiopia's wildest landscapes and oldest cultures, from the Afar lowlands to the painted faces of the Lower Omo.", highlights: ["Erta Ale lava lake", "Lalibela churches", "Hamar bull-jumping", "Mursi, Karo and Dassanech villages"], itinerary: baseItinerary(10, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },
  { slug: "16-days-grand-cultural-wildlife", title: "16 Days Ethiopia Grand Cultural, Wildlife & Community Experience Tour", categories: ["adventure-safari", "combined", "cultural", "historical"], durationDays: 16, durationLabel: "16-Days", priceUSD: 4290, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: grandCulturalWildlife, shortDescription: "The complete Ethiopia: history, wildlife, festivals and community-based tourism.", longDescription: "Two weeks across every major region with a focus on community-based stays — your money goes directly to the people you meet.", highlights: ["Northern historic circuit", "Bale Mountains wildlife", "Omo Valley cultural visits", "Community-run lodges"], itinerary: baseItinerary(16, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },

  // Birding
  { slug: "16-days-bird-watching", title: "16 Days Bird Watching Tour", categories: ["birding"], durationDays: 16, durationLabel: "16 Days", priceUSD: 4180, available: true, rating: 4.96, region: "Multi-region", lat: 7.06, lng: 38.47, image: birdWatching, shortDescription: "Track Ethiopia's 19 endemics from the Rift Valley lakes to the Bale highlands.", longDescription: "Ethiopia is one of the world's top birding destinations with 19 endemic species found nowhere else on Earth. This 16-day expedition with an expert ornithologist covers the Rift Valley lakes, Bale Mountains, Negele grasslands and the Harenna forest, targeting every endemic and hundreds of Afrotropical specialities.", highlights: ["All 19 Ethiopian endemic species", "Awash NP & Rift Valley lakes", "Bale Mountains Afroalpine zone", "Negele plains & Harenna forest"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Awash NP", details: "Drive to Awash National Park. Afternoon birding for Ostrich, Somali Bee-eater, Eastern Chanting Goshawk and Vulturine Guineafowl." },
    { day: "Day 2", title: "Awash – Ziway", details: "Dawn birding at Awash gorge for Heuglin's Bustard. Drive to Lake Ziway for pelicans, African Fish Eagle and the endemic Rouget's Rail." },
    { day: "Day 3", title: "Ziway – Awassa", details: "Birding at Abiata-Shalla lakes. Continue to Awassa — the endemic Ethiopian Cisticola and White-cheeked Turaco at the fish market." },
    { day: "Day 4", title: "Awassa – Yabelo", details: "Drive to Yabelo via Arero. Target Stresemann's Bush Crow and White-tailed Swallow, two of Africa's rarest endemics. Both found only near Yabelo." },
    { day: "Day 5", title: "Yabelo – Negele", details: "Negele grasslands: Salvadori's Seedeater, Sidamo Lark (endemic), Juba Weaver and Prince Ruspoli's Turaco in the nearby juniper forest." },
    { day: "Day 6", title: "Negele – Dolo Mena", details: "Harenna forest: Abyssinian Woodpecker, Ethiopian Oriole and the forest-endemic Yellow-fronted Parrot." },
    { day: "Day 7", title: "Bale Mountains – Dinsho", details: "Drive into the Bale Mountains. Birding at Dinsho woodland for Spot-breasted Plover and Abyssinian Longclaw." },
    { day: "Day 8", title: "Sanetti Plateau", details: "Afroalpine birding: Ethiopian Wolf (mammal bonus), Blue-winged Goose, Wattled Ibis, Rouget's Rail and Spot-breasted Plover." },
    { day: "Day 9", title: "Bale – Addis Ababa", details: "Morning birding along the Dinsho river. Return drive to Addis Ababa. Afternoon rest." },
    { day: "Day 10", title: "Addis – Debre Libanos", details: "Jemma Valley: African Swallow-tailed Kite, Bruce's Green Pigeon and endemic Harwood's Francolin." },
    { day: "Day 11", title: "Jemma Valley", details: "Full day birding: White-backed Black Tit, Rüppell's Black Chat and Banded Barbet in the highland scrub." },
    { day: "Day 12", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Lake Tana boat trip: the endemic Blue-winged Goose, African Pygmy Kingfisher and Reed Cormorant." },
    { day: "Day 13", title: "Lake Tana monasteries", details: "Morning boat to island monasteries. Afternoon birding at Bahir Dar wetlands for Hamerkop, African Jacana and Black Crake." },
    { day: "Day 14", title: "Bahir Dar – Gondar", details: "Drive to Gondar. Birding at Angereb reservoir for Yellow-billed Duck and White-winged Flufftail habitat." },
    { day: "Day 15", title: "Simien foothills", details: "Day trip towards Simien for Gelada baboon plains birds: Thick-billed Raven, Red-breasted Wheatear and Wattled Crane." },
    { day: "Day 16", title: "Gondar – Addis Ababa", details: "Final morning birding. Fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },

  // City & Day Trips
  { slug: "2-day-awash-safari", title: "2-Day Awash National Park Safari from Addis Ababa", categories: ["city-day-trips"], durationDays: 2, durationLabel: "2 Days", priceUSD: 399, oldPriceUSD: 499, available: true, rating: 4.96, region: "Afar", lat: 8.84, lng: 40.0, image: awashSafari2, shortDescription: "Discover the wildlife and hot springs of Awash National Park on a quick 2-day escape from Addis Ababa.", longDescription: "Leave the hustle of the city behind for the untamed beauty of Awash National Park. This two-day journey takes you through the dramatic landscapes of the Rift Valley, where you can spot diverse wildlife such as Beisa oryx and baboons. Unwind in the soothing natural hot springs of Doho Lodge as the sun sets over the volcanic terrain.", highlights: ["Afternoon safari in Awash National Park", "Rejuvenating soak in Doho Lodge hot springs", "Morning wildlife safari across Ali Dege Plains", "Scenic drive through Rift Valley landscapes"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Awash National Park – Doho Lodge", details: "Depart Addis Ababa for a scenic journey east into the Rift Valley. Upon arrival at Awash National Park, enjoy an afternoon game drive to spot oryx, gazelles, and varied birdlife. Check into Doho Lodge and spend the evening relaxing in natural hot spring pools." },
    { day: "Day 2", title: "Ali Dege Plains – Addis Ababa", details: "Begin the day with an early safari across the Ali Dege Plains for optimal wildlife viewing. After a leisurely lunch, begin the return journey to Addis Ababa, arriving by late afternoon." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "food-tour-addis", title: "Half Day Group Tour – Food Tour in Addis Ababa", categories: ["city-day-trips"], durationDays: 1, durationLabel: "Half day", priceUSD: 75, oldPriceUSD: 85, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: foodTourAddis, shortDescription: "A sensory walking tour through the flavors and culinary traditions of Addis Ababa.", longDescription: "Savor the authentic taste of Ethiopia on this half-day culinary exploration. We'll guide you through hidden local gems and bustling markets, offering insights into the spices, techniques, and stories behind our world-famous cuisine. From baking your own injera to a traditional coffee ceremony, this is a deep dive into the heart of Ethiopian food culture.", highlights: ["Guided walking tour of local culinary hotspots", "Hands-on injera baking experience", "Visit to a vibrant vegetable and fruit market", "Traditional Ethiopian coffee ceremony", "Tastings of local delicacies and unlimited drinks"], itinerary: [
    { day: "Half Day", title: "Flavors of the Capital", details: "Meet your guide for a walking journey through the vibrant streets of Addis. Visit a local market to see fresh seasonal produce before heading to a traditional eatery to learn the art of injera baking. Enjoy a series of tastings at curated local restaurants, ranging from street food to classic dishes, and conclude with a traditional coffee ceremony." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "debre-zeyit-day-trip", title: "Debre Zeyit (Bishoftu) Relaxing Day Trip", categories: ["city-day-trips"], durationDays: 1, durationLabel: "8 Hours", priceUSD: 95, available: true, rating: 4.96, region: "Oromia", lat: 8.75, lng: 38.99, image: debreZeyit, shortDescription: "Escape to the tranquil volcanic crater lakes of Bishoftu for a relaxing day of nature and scenery.", longDescription: "Just an hour from the capital, Bishoftu (Debre Zeyit) offers a peaceful retreat centered around its seven stunning crater lakes. Spend your day enjoying breathtaking views, lakeside walks, and a delicious lunch overlooking the water. It's the perfect way to reconnect with nature without traveling far from Addis Ababa.", highlights: ["Panoramic views of multiple crater lakes", "Relaxing lakeside lunch at a resort", "Optional boat rides and bird watching", "Scenic drive through the Oromo highlands"], itinerary: [
    { day: "Day Trip", title: "Addis Ababa – Bishoftu – Addis Ababa", details: "Depart Addis for the short drive to Bishoftu. Spend the day exploring the different crater lakes, including Lake Hora and Lake Bishoftu. Enjoy a leisurely lunch at a lakeside resort with stunning views. In the afternoon, take a relaxed walk or enjoy optional lake activities before returning to Addis Ababa in the evening." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "ethiopian-cooking-class", title: "Ethiopian Cooking Class: Flavors of Ethiopia", categories: ["city-day-trips"], durationDays: 1, durationLabel: "3 Hours", priceUSD: 65, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: ethiopianCooking, shortDescription: "Master the art of Ethiopian cuisine with a hands-on cooking class led by local experts.", longDescription: "Bring the flavors of Ethiopia back to your own kitchen. This interactive class takes you from the market to the stove, teaching you the secrets of creating classic dishes like doro wat and perfectly fermented injera. Learn about our unique spices and the cultural significance of communal dining in a warm, welcoming environment.", highlights: ["Hands-on cooking instruction from a local chef", "Learn to prepare injera and traditional wats", "Insight into Ethiopian spices and ingredients", "Enjoy the meal you've prepared in a communal feast"], itinerary: [
    { day: "3 Hours", title: "Culinary Masterclass", details: "Start with a brief introduction to Ethiopian spices and ingredients. Under the guidance of a local cook, learn the step-by-step process of preparing a traditional multi-dish meal. From the slow-simmering of stews to the pouring of injera, you'll be involved in every stage. Finally, sit down to enjoy your handmade feast with your hosts." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "addis-nightlife-pub-crawl", title: "Addis Ababa Nightlife Tour & Pub Crawl", categories: ["city-day-trips"], durationDays: 1, durationLabel: "5 Hours", priceUSD: 55, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: addisNightlife, shortDescription: "Experience the vibrant energy of Addis Ababa after dark with a guided nightlife tour.", longDescription: "Discover why Addis Ababa is known for its legendary nightlife. Our local hosts will take you beyond the tourist paths to the city's best jazz clubs, traditional 'Azmari' bets, and modern lounges. Experience the infectious rhythm of Ethiopian music, sample local craft beers, and dance the night away in the capital's most exciting venues.", highlights: ["Guided crawl through 3-4 curated nightlife venues", "Experience live Ethio-jazz and traditional music", "Welcome drinks and local craft beer tastings", "Insights into the city's modern and traditional social scenes"], itinerary: [
    { day: "5 Hours", title: "Addis After Dark", details: "Meet your host in the evening to begin your exploration. Visit a traditional Azmari bet for live folk music and improvisation. Continue to a celebrated jazz lounge to hear the sounds of modern Addis. End the night at a vibrant rooftop bar or club, experiencing the full spectrum of the city's evening entertainment." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "wenchi-crater-lake", title: "Day Trip to Wenchi Crater Lake", categories: ["city-day-trips"], durationDays: 1, durationLabel: "9 Hours", priceUSD: 130, oldPriceUSD: 160, available: true, rating: 4.96, region: "Oromia", lat: 8.81, lng: 37.88, image: wenchiLake, shortDescription: "Hike or ride through the breathtaking volcanic landscapes of Wenchi Crater Lake.", longDescription: "Journey west to one of Ethiopia's most picturesque natural wonders. Wenchi Crater Lake is nestled within a vast caldera, surrounded by lush forests, hot springs, and traditional farmsteads. Whether you choose to hike, ride a horse, or boat across the turquoise waters to an ancient island monastery, Wenchi offers an unforgettable day of mountain air and stunning scenery.", highlights: ["Scenic mountain drive through highland farmlands", "Hiking or horseback riding to the crater rim", "Boat trip to the 14th-century Cherkos monastery", "Picnic lunch with panoramic lake views"], itinerary: [
    { day: "Day Trip", title: "Addis Ababa – Wenchi – Addis Ababa", details: "Early departure from Addis Ababa for a scenic 3-hour drive west. Upon arrival at the crater rim, enjoy breathtaking views before descending to the lake by foot or horse. Take a boat to the island monastery of Kirkos. After a traditional lunch and some time to enjoy the hot springs or forest walks, begin the drive back to the capital." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "debre-libanos-portuguese-bridge", title: "Day Trip to Debre Libanos Monastery & Portuguese Bridge", categories: ["city-day-trips"], durationDays: 1, durationLabel: "8 Hours", priceUSD: 120, available: true, rating: 4.96, region: "Oromia", lat: 9.71, lng: 38.85, image: debreLibanos, shortDescription: "Visit a historic 13th-century monastery and witness the dramatic Jemma River Gorge.", longDescription: "A day trip north from Addis takes you to the sacred site of Debre Libanos, one of Ethiopia's most significant monastic centers. Nearby, the 'Portuguese Bridge' offers a staggering viewpoint over the Jemma River Gorge, where you can often spot endemic gelada baboons roaming the cliff edges. It's a perfect combination of spiritual history and dramatic natural beauty.", highlights: ["Visit the historic Debre Libanos monastery and museum", "Walk across the 16th-century 'Portuguese Bridge'", "Stunning views of the 1,000-meter deep Jemma Gorge", "Wildlife spotting including endemic gelada baboons"], itinerary: [
    { day: "Day Trip", title: "Addis Ababa – Debre Libanos – Addis Ababa", details: "Drive north across the Sululta plain to the edge of the Jemma Gorge. Explore the modern church and ancient cave monastery of Debre Libanos. A short walk leads to the historic bridge with its spectacular gorge views and resident baboon troops. After lunch at a scenic overlook, return to Addis Ababa in the late afternoon." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "half-day-addis-city", title: "A Half Day Addis Ababa City Tour", categories: ["city-day-trips"], durationDays: 1, durationLabel: "5 Hours", priceUSD: 45, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: halfDayAddis, shortDescription: "A whirlwind tour of the capital's essential landmarks and historical treasures.", longDescription: "Perfect for those with limited time, this half-day tour covers the absolute highlights of Addis Ababa. Meet 'Lucy' at the National Museum, take in the panoramic city views from Mount Entoto, and experience the vibrant energy of the Merkato—Africa's largest open-air market. It's a curated introduction to the history, culture, and daily life of Ethiopia's capital.", highlights: ["Visit the National Museum and the world-famous 'Lucy' fossil", "Panoramic views of Addis from the Entoto Mountain lookout", "Exploration of the bustling Merkato market", "Visit to the historic Holy Trinity Cathedral"], itinerary: [
    { day: "5 Hours", title: "The Capital's Highlights", details: "Start your tour at the National Museum for a dive into human origins and Ethiopian history. Drive up to Mount Entoto for a fresh perspective of the city below. Visit the grand Holy Trinity Cathedral, the final resting place of Emperor Haile Selassie, and conclude with a guided walk through the fascinating organized chaos of the Merkato." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "addis-surrounding", title: "Addis Ababa City Tours & Surrounding", categories: ["city-day-trips"], durationDays: 7, durationLabel: "7 Days", priceUSD: 980, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: addisSurrounding, shortDescription: "A full week using Addis as your base — day trips in every direction without repacking.", longDescription: "The perfect solution for travellers who prefer one comfortable base. Sleep in Addis each night and explore a completely different region every day — crater lakes, gelada gorges, Rift Valley wildlife, ancient churches and more — all within a half-day's drive.", highlights: ["Wenchi volcanic crater lake", "Debre Libanos & Jemma gorge geladas", "Awash National Park safari day", "Tiya UNESCO stelae & Adadi Mariam rock church"], itinerary: [
    { day: "Day 1", title: "Addis Ababa City Tour", details: "Full-day Addis highlights: National Museum (Lucy), Mount Entoto, Holy Trinity Cathedral and Merkato." },
    { day: "Day 2", title: "Wenchi Crater Lake", details: "Drive west to the Wenchi caldera. Hike or ride to the lake, boat to Kirkos island monastery, picnic lunch by the water." },
    { day: "Day 3", title: "Debre Libanos & Portuguese Bridge", details: "Drive north to Debre Libanos monastery and the Jemma River Gorge viewpoint. Spot gelada baboons on the cliff edges." },
    { day: "Day 4", title: "Awash National Park Safari", details: "Drive east into the Rift Valley for a full-day Awash safari: oryx, gazelle, baboon, and the spectacular Awash Falls. Evening at Doho hot springs." },
    { day: "Day 5", title: "Tiya Stelae & Adadi Mariam", details: "Drive south to the UNESCO Tiya stelae field and the rock-hewn church of Adadi Mariam, southernmost of the Zagwe-era churches." },
    { day: "Day 6", title: "Debre Zeyit Crater Lakes", details: "Relaxed day trip east to Bishoftu's volcanic crater lakes. Lakeside lunch, optional boat ride, bird watching." },
    { day: "Day 7", title: "Ethiopian Coffee & Cooking Day", details: "Morning coffee-heritage walking tour in Addis. Afternoon hands-on cooking class preparing injera, doro wat and more. Farewell feast." }
  ], includes: baseIncludes, excludes: baseExcludes },
  {
    slug: "explore-addis-ababa-city-tours",
    title: "3 Days Explore Addis Ababa City & Surroundings Tour",
    categories: ["city-day-trips"],
    durationDays: 3,
    durationLabel: "3 Days",
    priceUSD: 290,
    oldPriceUSD: 350,
    available: true,
    rating: 4.96,
    region: "Addis Ababa / Oromia",
    lat: 9.03,
    lng: 38.74,
    image: addisSurrounding,
    shortDescription: "Explore the historical, cultural, natural, and modern highlights of the Ethiopian capital and nearby crater lakes and gorges.",
    longDescription: "A comprehensive three-day experience designed for travelers who want to dive deep into the fascinating layers of Addis Ababa and its dramatic surroundings. From the world-famous fossil of 'Lucy' at the National Museum and the busy pathways of the Merkato, to the tranquil volcanic crater lakes of Bishoftu and the breathtaking depths of the Jemma River Gorge at Debre Libanos — this tour showcases the best of history, nature, and community-based culture within a short drive from the capital.",
    highlights: [
      "Full guided tour of Addis Ababa's museums, churches, and Merkato",
      "Relaxing day-trip to the stunning crater lakes of Bishoftu (Debre Zeit)",
      "Breathtaking gorge views and gelada baboon spotting at Debre Libanos",
      "Hands-on traditional coffee ceremony and cultural dinner experience"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Full-Day Addis Ababa City Tour",
        details: "Explore the capital's absolute highlights: meet 'Lucy' at the National Museum, admire the architecture at Holy Trinity Cathedral, visit the Ethnological Museum in Haile Selassie's former palace, browse the colorful Merkato market, enjoy sweeping city views from Mount Entoto, and conclude with a traditional coffee ceremony and cultural dinner."
      },
      {
        day: "Day 2",
        title: "Day Trip to Bishoftu Crater Lakes",
        details: "Escape to Debre Zeit (Bishoftu) to enjoy the peaceful crater lakes Hora, Babogaya, and Bishoftu. Enjoy a lakeside lunch at a resort, optional boat rides, and spot some of the area's 200+ bird species before returning to Addis."
      },
      {
        day: "Day 3",
        title: "Day Trip to Debre Libanos Monastery & Jemma Gorge",
        details: "Journey north to visit the sacred 13th-century Debre Libanos cave monastery and museum. Hike to the historic Portuguese Bridge to marvel at the 1,000-meter deep Jemma River Gorge and spot resident gelada baboons and birds of prey before returning to the capital."
      }
    ],
    includes: [
      "All entrance fees to museums, churches, and monasteries",
      "Private air-conditioned transportation throughout the 3 days",
      "Professional English-speaking local guide",
      "Daily bottled mineral water and hot lunch overlooking scenic spots",
      "Hands-on coffee ceremony experience"
    ],
    excludes: baseExcludes
  },
  { slug: "full-day-addis", title: "Full-Day Addis Ababa City Tour", categories: ["city-day-trips"], durationDays: 1, durationLabel: "8 Hours", priceUSD: 80, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: fullDayAddis, shortDescription: "A comprehensive deep dive into the history, culture, and vibrant life of Addis Ababa.", longDescription: "Experience the full story of Addis Ababa on this immersive full-day tour. From the imperial history of Haile Selassie's palace to the poignant Red Terror Martyrs' Memorial, you'll explore the many layers of Ethiopia's complex past. Enjoy a traditional multi-course lunch, visit the city's most important museums and cathedrals, and end your day with the ritual of a traditional coffee ceremony.", highlights: ["Comprehensive visits to the National and Ethnological Museums", "Traditional Ethiopian lunch with cultural music", "Guided tour of the Red Terror Martyrs' Memorial Museum", "Visit to St. George's Cathedral and Holy Trinity Cathedral", "Authentic Ethiopian coffee ceremony experience"], itinerary: [
    { day: "8 Hours", title: "The Heart of Ethiopia", details: "Morning visits to the National Museum and the Ethnological Museum, housed in the former palace. After a traditional lunch, explore the spiritual heritage at St. George's Cathedral and the Holy Trinity Cathedral. Learn about the city's modern history at the Red Terror Memorial before concluding the day with a relaxing coffee ceremony." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "addis-food-tasting", title: "Addis Ababa Food Tasting Tour", categories: ["city-day-trips"], durationDays: 1, durationLabel: "4 Hours", priceUSD: 60, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: addisFoodTasting, shortDescription: "A curated tasting journey through the diverse culinary landscape of Addis Ababa.", longDescription: "Ethiopian cuisine is as diverse as its people. This tour focuses on the flavors themselves, taking you through different neighborhoods to sample the best of regional specialties. From spicy tibs and vegan fasting platters to the unique honey wine known as 'tej', this is a journey of taste that culminates in a masterfully brewed cup of Ethiopian coffee.", highlights: ["Guided tasting sessions at local neighborhood favorites", "Sample a wide variety of traditional stews and snacks", "Taste traditional 'tej' honey wine in an authentic setting", "Expert insights into Ethiopian food traditions and etiquette"], itinerary: [
    { day: "4 Hours", title: "A Journey of Taste", details: "Begin your tasting journey with a selection of popular street snacks. Visit a neighborhood specialist to sample a classic 'Beyaynetu' (vegan platter) or 'Tibs' (sautéed meat). Discover the unique flavor of honey wine at a local tej house, and finish with a curated coffee experience, learning about the bean's journey from forest to cup." }
  ], includes: baseIncludes, excludes: baseExcludes },

  // Coffee
  { slug: "ethiopian-coffee-heritage-day", title: "Delve into Ethiopian Coffee Heritage & Urban Culture in a Single Day", categories: ["coffee", "city-day-trips"], durationDays: 1, durationLabel: "1 Day", priceUSD: 90, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: coffeeHeritage, shortDescription: "From bean to ceremony — the complete story of Ethiopian coffee in a single extraordinary day.", longDescription: "Ethiopia is the birthplace of coffee, and nowhere tells that story better than Addis Ababa. In this immersive day tour, you will move through the city's coffee landscape chronologically — from the ancient forest tradition to the modern third-wave specialty scene — meeting roasters, baristas and a local family who will share the ceremony as it has been practiced for centuries.", highlights: ["Tomoca Coffee — Addis' oldest roastery since 1953", "Specialty micro-roastery cupping session", "Traditional buna ceremony in a local family home", "Guided specialty café crawl in Piazza & Bole"], itinerary: [
    { day: "Morning", title: "Tomoca & the Old Quarter", details: "Begin at Tomoca Coffee in the Piazza, roasting since 1953. Learn the history of Ethiopian coffee and taste the house blend. Walk to a nearby wholesale roaster to see green beans and the city's wholesale trade." },
    { day: "Midday", title: "Specialty Micro-Roastery Cupping", details: "Visit a third-wave specialty micro-roastery for a formal cupping session guided by a Q-grader. Compare Yirgacheffe, Sidama and Guji origins side by side — taste the terroir in every cup." },
    { day: "Afternoon", title: "Traditional Buna Ceremony", details: "Arrive at a local family home in a traditional neighbourhood. Sit for a three-round Ethiopian coffee ceremony — freshly roasted, ground by mortar, brewed in a clay jebena, served with popcorn and incense. The spiritual heart of Ethiopian coffee culture." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "3-day-yirgalem-coffee", title: "3-Day Yirgalem Coffee Tour", categories: ["coffee"], durationDays: 3, durationLabel: "3 Days", priceUSD: 590, available: true, rating: 4.96, region: "Sidama", lat: 6.75, lng: 38.40, image: yirgalemCoffee, shortDescription: "Stay on a working coffee farm in Sidama and walk the cherry-to-cup process yourself.", longDescription: "Yirgalem sits at the heart of Sidama's coffee belt. Stay three nights at the award-winning Aregash eco-lodge, walk through shade-grown forest gardens, visit a wet-processing washing station, and join a Q-grader cupping session with the cooperative that farms the land beneath your feet.", highlights: ["Aregash eco-lodge forest stay", "Guided coffee farm walk with a local farmer", "Wet-processing washing station tour", "Cupping session with licensed Q-grader"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Yirgalem – Aregash Lodge", details: "Drive south to Yirgalem in the Sidama Zone. Check into Aregash eco-lodge, set within a working coffee forest. Evening welcome dinner and introduction to Sidama coffee culture." },
    { day: "Day 2", title: "Coffee Farm Walk & Washing Station", details: "Morning walk through shade-grown coffee gardens with a local smallholder farmer. Learn to identify cherry-ripe coffee and observe the hand-picking process. Afternoon visit to a wet-processing washing station to see fermentation and drying on raised beds." },
    { day: "Day 3", title: "Q-Grader Cupping & Return to Addis", details: "Morning cupping session with a licensed Q-grader at the cooperative, comparing multiple Sidama micro-lots. Farewell buna ceremony with the lodge family. Drive back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "6-day-sidama-yirgacheffe", title: "6-Day Sidama & Yirgacheffe Coffee & Culture Tour from Addis Ababa", categories: ["coffee"], durationDays: 6, durationLabel: "6 days", priceUSD: 1290, available: true, rating: 4.96, region: "Sidama / SNNPR", lat: 6.16, lng: 38.20, image: sidamaYirgacheffe, shortDescription: "The two most famous coffee origins on Earth, back to back — with the living cultures behind them.", longDescription: "The names Yirgacheffe and Sidama appear on specialty coffee bags in every café from Tokyo to New York. This six-day journey takes you behind those names to meet the farmers, cooperative managers and washing-station operators who produce the world's most prized coffees — and to understand the Gedeo and Sidama cultures in which coffee is not just an export, but a way of life.", highlights: ["Yirgacheffe washing stations & sun-dried naturals", "Sidama forest garden farm walks", "Cooperative meeting with cooperative managers", "Local family homestay in a coffee village"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Awassa", details: "Drive south along the Rift Valley to Awassa. Evening lakeside walk and introduction to Ethiopian coffee history over dinner." },
    { day: "Day 2", title: "Awassa – Yirgacheffe", details: "Drive into the Gedeo highland to Yirgacheffe. Visit a sun-dried (natural) processing station and walk through the dense shade-grown coffee gardens with a cooperative agronomist." },
    { day: "Day 3", title: "Yirgacheffe Washing Stations & Cooperative", details: "Full day at Yirgacheffe washing stations. Observe the washed processing chain from cherry intake to fermentation tanks to raised drying beds. Afternoon meeting with cooperative leadership on fair-trade certification and farmer premiums." },
    { day: "Day 4", title: "Yirgacheffe – Yirgalem – Sidama", details: "Drive north to Yirgalem in Sidama. Check into eco-lodge. Evening ceremony and introduction to Sidama coffee culture and the Sidama Nation's UNESCO-recognized coffee traditions." },
    { day: "Day 5", title: "Sidama Farm Walk & Local Family Stay", details: "Morning farm walk with a smallholder family. Afternoon cupping session comparing Sidama and Yirgacheffe micro-lots side by side. Optional overnight in a local family compound." },
    { day: "Day 6", title: "Return to Addis Ababa", details: "Final morning buna ceremony with the host family. Purchase single-origin coffee direct from the cooperative. Drive back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },

  // Combined
  { slug: "14-days-danakil-lalibela-omo", title: "14 Days Ethiopia Tour – Danakil Depression, Lalibela and Omo Valley Cultural Experience", categories: ["combined", "adventure-safari", "cultural", "historical"], durationDays: 14, durationLabel: "14-Days", priceUSD: 3890, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: danakilLalibelaOmo14, shortDescription: "Two weeks of Ethiopia's three signature experiences in one ambitious trip.", longDescription: "Volcanoes, churches and tribes — the three things Ethiopia does better than anywhere else, in a single 14-day journey.", highlights: ["Danakil expedition", "All Lalibela churches", "Hamar bull-jumping", "Mursi villages"], itinerary: baseItinerary(14, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },
  { slug: "15-days-historical-cultural-omo", title: "15 days Historical, Cultural and Omo Valley Tour", categories: ["combined", "cultural", "historical"], durationDays: 15, durationLabel: "15 Days", priceUSD: 4090, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: historicalCulturalOmo, shortDescription: "Northern history meets southern cultures over fifteen unhurried days.", longDescription: "Pace yourself across the great northern circuit and the Lower Omo — the perfect single-trip introduction to Ethiopia.", highlights: ["Axum & Lalibela", "Gondar castles", "Omo Valley tribes", "Lake Awassa"], itinerary: baseItinerary(15, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },
  { slug: "21-days-historical-cultural", title: "21 Days Historical & Cultural Tour", categories: ["combined", "cultural", "historical"], durationDays: 21, durationLabel: "21 days", priceUSD: 5790, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: historicalCultural, shortDescription: "Three weeks. Every UNESCO site. Every major culture. The full Ethiopia.", longDescription: "The flagship grand tour — every major historical site, every major cultural region, with time to actually breathe at each.", highlights: ["9 UNESCO sites", "Northern + Southern circuits", "Bale Mountains", "Omo Valley"], itinerary: baseItinerary(21, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },

  // Cultural
  { slug: "3-day-south-omo-group", title: "3 Day Guided Group Tour of South Omo, Ethiopia", categories: ["cultural"], durationDays: 3, durationLabel: "3 days", priceUSD: 690, available: true, rating: 4.96, region: "SNNPR", lat: 5.5, lng: 36.0, image: southOmoGroup, shortDescription: "A short, ethical group tour to meet the Hamar and Karo communities of the Lower Omo Valley.", longDescription: "A respectful, small-group introduction to Ethiopia's most diverse cultural zone. Your guide has personal relationships with the families you'll meet — ensuring authentic encounters built on trust, not tourism.", highlights: ["Hamar village visit & traditional ceremony", "Karo cliff-side village and body-painting", "Key Afer Thursday market", "Traditional Omo Valley lunch"], itinerary: [
    { day: "Day 1", title: "Fly to Jinka – Mago National Park – Mursi Village", details: "Fly from Addis to Jinka. Drive into Mago National Park and visit a Mursi village to meet one of the world's last communities to maintain lip-plate traditions. Return to Jinka for overnight." },
    { day: "Day 2", title: "Hamar Village & Key Afer Market", details: "Morning visit to a Hamar village to learn about their cattle-herding culture, ochre body art and beaded jewellery. Afternoon at the Key Afer weekly market where six tribes trade side by side. Drive south towards Turmi." },
    { day: "Day 3", title: "Karo Village & Return to Addis", details: "Early visit to a Karo village on the Omo riverbank — the smallest tribe in the valley, known for elaborate body-painting using chalk and ochre. Return to Jinka and fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "4-day-omo-cultural", title: "4-Day Omo Valley Cultural Tour from Addis Ababa", categories: ["cultural"], durationDays: 4, durationLabel: "4 Days / 3 Nights", priceUSD: 990, available: true, rating: 4.96, region: "SNNPR", lat: 5.5, lng: 36.0, image: omoCultural, shortDescription: "The classic short Omo loop — Mursi, Hamar and Karo in four extraordinary days.", longDescription: "Fly south to Jinka and spend four days in Ethiopia's most culturally diverse corner. Community-vetted village visits ensure your presence benefits the families directly.", highlights: ["Mursi lip-plate village in Mago NP", "Hamar bull-jumping ceremony (if scheduled)", "Karo body-painted village on the Omo", "Dassanech tribe boat crossing"], itinerary: [
    { day: "Day 1", title: "Addis – Jinka – Mago NP – Mursi", details: "Morning flight to Jinka. Drive into Mago National Park and visit a Mursi village. Evening at lodge in Jinka." },
    { day: "Day 2", title: "Hamar Villages & Key Afer Market", details: "Full day in Hamar country: morning village visit for coffee and culture, afternoon at Key Afer market with Hamar, Banna, Ari and Dassanech traders. Drive to Turmi." },
    { day: "Day 3", title: "Hamar Bull-Jumping (if running) & Karo Village", details: "If a bull-jumping ceremony is scheduled, attend as respectful guests. Otherwise visit a Karo village on the Omo River cliff and cross by boat to the Dassanech." },
    { day: "Day 4", title: "Turmi – Jinka – Addis Ababa", details: "Morning at leisure or optional Hamar market. Drive to Jinka and fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "8-day-omo-tribes", title: "8 Days Cultural Tour to Omo Valley Tribes", categories: ["cultural"], durationDays: 8, durationLabel: "8 Days", priceUSD: 1890, available: true, rating: 4.96, region: "SNNPR", lat: 5.5, lng: 36.0, image: omoTribes, shortDescription: "Eight days, eight tribal communities — the most thorough Omo Valley cultural tour we offer.", longDescription: "The Omo Valley contains more distinct ethnic groups per square kilometre than almost anywhere on Earth. This 8-day journey visits the Mursi, Hamar, Karo, Dassanech, Nyangatom, Banna, Ari and Tsemay — each with its own language, cosmology and art form.", highlights: ["Eight tribal communities visited", "Hamar bull-jumping ceremony", "Dassanech boat crossing", "Karo & Nyangatom Omo riverbank"], itinerary: [
    { day: "Day 1", title: "Addis – Arba Minch", details: "Fly to Arba Minch. Boat on Lake Chamo for hippo and Nile crocodile. Overnight at lake-view lodge." },
    { day: "Day 2", title: "Arba Minch – Konso – Jinka", details: "Visit Konso UNESCO walled village. Drive south to Jinka via the Weito lowlands, passing Ari and Banna communities." },
    { day: "Day 3", title: "Jinka – Mago NP – Mursi Village", details: "Enter Mago National Park to visit a Mursi village. The Mursi are the last people in Africa to maintain the lip-plate tradition among women." },
    { day: "Day 4", title: "Hamar Villages & Key Afer Market", details: "Full day in Hamar territory. Morning village visit to learn cattle culture and ochre art. Afternoon at Key Afer weekly market." },
    { day: "Day 5", title: "Hamar Bull-Jumping Ceremony", details: "Attend a Hamar bull-jumping initiation ceremony (the Ukuli Bula) if one is scheduled — a transformative, once-in-a-lifetime experience. Otherwise, extended Hamar village visits." },
    { day: "Day 6", title: "Turmi – Karo – Dassanech", details: "Morning Karo village on the Omo River cliff. Afternoon boat crossing to visit the Dassanech — semi-nomadic agropastoralists at the river delta." },
    { day: "Day 7", title: "Nyangatom & Omorate", details: "Cross to the western bank to visit the Nyangatom (Bume) people, known for their elaborate beaded collars and scarification. Afternoon at Omorate market." },
    { day: "Day 8", title: "Jinka – Addis Ababa", details: "Drive back to Jinka. Fly to Addis Ababa. Transfer to hotel or onward connection." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "10-day-omo-tribes-2", title: "10 Days Cultural Tour to Omo Valley Tribes II", categories: ["cultural"], durationDays: 10, durationLabel: "10 Days", priceUSD: 2390, available: true, rating: 4.96, region: "SNNPR", lat: 5.5, lng: 36.0, image: omoTribes2, shortDescription: "An extended Omo loop with extra time at every village and three markets.", longDescription: "More days, slower pace, three weekly markets and overnight stays in two villages.", highlights: ["Three weekly markets", "Two village overnights", "Dassanech boat crossing", "Konso terraces"], itinerary: baseItinerary(10, "Omo Valley"), includes: baseIncludes, excludes: baseExcludes },
  { slug: "12-day-south-omo-1", title: "12 Days Cultural Tour to South-Omo Valley Tribes I", categories: ["cultural"], durationDays: 12, durationLabel: "12 days", priceUSD: 2890, available: true, rating: 4.96, region: "SNNPR", lat: 5.5, lng: 36.0, image: southOmo1, shortDescription: "The complete South Omo immersion with Konso, Arba Minch and the Rift lakes.", longDescription: "Twelve days covering every accessible tribe plus the Konso UNESCO landscape and the Nechisar lakes.", highlights: ["All major tribes", "Konso UNESCO terraces", "Arba Minch lakes", "Crocodile market"], itinerary: baseItinerary(12, "South Omo"), includes: baseIncludes, excludes: baseExcludes },

  // Festival
  { slug: "8-day-genna", title: "8 Day Ethiopian Christmas (Genna) tour", categories: ["festival"], durationDays: 8, durationLabel: "8 Days", priceUSD: 1980, available: true, rating: 4.96, region: "Lalibela / Amhara", lat: 12.03, lng: 39.05, image: genna, shortDescription: "Spend Ethiopian Christmas (Jan 7) in Lalibela with thousands of pilgrims and ancient all-night chanting.", longDescription: "Ethiopian Genna is Christmas as it was a thousand years ago. White-robed pilgrims fill the rock-cut courtyards, priests chant through the night, and dawn mass at Bete Maryam is unlike anything else on Earth. This 8-day tour places you in the heart of Lalibela for the festival, with the full northern circuit before and after.", highlights: ["Genna eve vigil at Lalibela churches", "Dawn mass at Bete Maryam on Jan 7", "Pilgrim processions with crosses and candles", "All 11 Lalibela rock-hewn churches"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – Bahir Dar", details: "Fly to Bahir Dar. Lake Tana boat trip to Ura Kidane Mihret monastery. Evening at lake-view hotel." },
    { day: "Day 2", title: "Bahir Dar – Gondar", details: "Drive to Gondar. Visit Fasilides Castle compound and Debre Berhan Selassie church — the finest painted interior in Ethiopia." },
    { day: "Day 3", title: "Gondar – Lalibela", details: "Fly to Lalibela. Afternoon visit to the eastern church cluster. Briefing on the Genna festival programme." },
    { day: "Day 4", title: "Lalibela – Northern Church Group", details: "Full guided visit to the northern church cluster. Atmosphere building as pilgrims begin arriving from all over Ethiopia." },
    { day: "Day 5", title: "Genna Eve Vigil", details: "The extraordinary all-night vigil begins. Priests in full regalia chant liturgy by candlelight in the rock-cut courtyards. Join respectfully as thousands of white-robed pilgrims gather." },
    { day: "Day 6", title: "Genna Day – Ethiopian Christmas (Jan 7)", details: "Dawn mass at Bete Maryam. Processions with ancient Tabot arks circle the churches. The Patriarch leads the blessing. A once-in-a-lifetime morning." },
    { day: "Day 7", title: "Asheton Maryam & Rest", details: "Hike or mule ride to Asheton Maryam monastery above Lalibela. Afternoon rest and reflection." },
    { day: "Day 8", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "8-day-temeket", title: "8 Day Epiphany (Timkat) tour", categories: ["festival"], durationDays: 8, durationLabel: "8 days", priceUSD: 1980, available: true, rating: 4.96, region: "Gondar / Amhara", lat: 12.6, lng: 37.47, image: temeket, shortDescription: "Ethiopia's most spectacular festival — colourful umbrellas, Tabot processions and a mass blessing in Fasilides' royal pool.", longDescription: "Timkat (Epiphany, Jan 19) is Ethiopia's most visually magnificent festival. In Gondar, the Tabot arks are carried from every church in the city to the royal pool of Fasilides, followed by thousands of white-robed faithful. The blessing and immersion at dawn is one of Africa's great spectacles.", highlights: ["Timkat eve Tabot procession through Gondar", "Fasilides pool blessing and immersion", "Gondar Castle compound", "Debre Berhan Selassie painted church"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Afternoon boat on Lake Tana to island monasteries. Overnight lakeside." },
    { day: "Day 2", title: "Blue Nile Falls & Bahir Dar", details: "Morning visit to the Blue Nile Falls (Tis Abay). Afternoon market and lakeside walk." },
    { day: "Day 3", title: "Bahir Dar – Gondar", details: "Drive to Gondar. Visit Fasilides compound. Timkat eve atmosphere building as pilgrims converge on the city." },
    { day: "Day 4", title: "Timkat Eve – Tabot Procession", details: "The Tabot arks of every Gondar church are carried in procession to Fasilides pool, accompanied by chanting priests, colorful velvet umbrellas and tens of thousands of worshippers." },
    { day: "Day 5", title: "Timkat Day – Fasilides Pool Blessing", details: "Dawn liturgy beside the royal pool. The Patriarch blesses the water, the faithful plunge in — a re-enactment of Christ's baptism in the Jordan. An overwhelming sensory experience." },
    { day: "Day 6", title: "Gondar – Lalibela", details: "Fly to Lalibela. Afternoon northern church cluster visit." },
    { day: "Day 7", title: "All Lalibela Churches", details: "Full day: all 11 rock-hewn churches with expert guide. Sunset at Bete Giyorgis." },
    { day: "Day 8", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "7-day-meskel", title: "7 Day The Finding of the True Cross (Meskel) tour", categories: ["festival"], durationDays: 7, durationLabel: "7 Days", priceUSD: 1690, available: true, rating: 4.96, region: "Addis Ababa", lat: 9.03, lng: 38.74, image: meskel, shortDescription: "Watch the giant Demera bonfire light up Meskel Square on Sept 27 — one of Africa's largest religious gatherings.", longDescription: "Meskel (the Finding of the True Cross, Sept 27) is one of Ethiopia's most visually spectacular festivals. A giant bonfire — the Demera — is lit in Meskel Square as the Patriarch leads hundreds of thousands in prayer. The tour pairs this extraordinary Addis event with a Gondar and Axum extension.", highlights: ["Demera bonfire ceremony at Meskel Square", "Patriarch's blessing and procession", "Gondar Meskel celebrations at Fasilides", "Axum – the Ark of the Covenant city"], itinerary: [
    { day: "Day 1", title: "Addis Ababa – City Tour", details: "Half-day city tour: National Museum, Holy Trinity Cathedral and orientation walk around Meskel Square ahead of the festival." },
    { day: "Day 2", title: "Gondar", details: "Fly to Gondar. Fasilides Castle compound and Debre Berhan Selassie church. Meskel Eve processions in Gondar." },
    { day: "Day 3", title: "Axum", details: "Fly to Axum. Stelae field, St Mary of Zion church complex (home to the Ark of the Covenant), Queen of Sheba's palace and bath." },
    { day: "Day 4", title: "Axum – Addis Ababa", details: "Morning at Axum museum. Fly to Addis Ababa. Afternoon preparation for the Meskel festival." },
    { day: "Day 5", title: "Meskel Eve – Demera Bonfire", details: "Join the procession to Meskel Square. The Demera bonfire — stacked with yellow Meskel daisies and candles — is lit at dusk. Hundreds of thousands gather. The direction of the falling bonfire is read as prophecy." },
    { day: "Day 6", title: "Meskel Day", details: "Dawn service at Holy Trinity Cathedral. Afternoon free for Addis Ababa exploration or souvenir shopping." },
    { day: "Day 7", title: "Departure", details: "Transfer to Bole International Airport for onward journey." }
  ], includes: baseIncludes, excludes: baseExcludes },

  // Historical
  { slug: "tiya-adadi-mariam", title: "Day Trip to Tiya & Adadi Mariam Church", categories: ["historical", "city-day-trips"], durationDays: 1, durationLabel: "7 Hours", priceUSD: 110, available: true, rating: 4.96, region: "Oromia", lat: 8.43, lng: 38.61, image: tiyaAdadi, shortDescription: "Explore ancient mysteries at the Tiya stelae field and the rock-hewn church of Adadi Mariam.", longDescription: "Travel south from Addis Ababa to uncover Ethiopia's ancient past. Visit the UNESCO World Heritage site of Tiya, home to mysterious carved stelae marking medieval burial sites. Continue to Adadi Mariam, the southernmost of the Zagwe-era rock-hewn churches, and explore the prehistoric archaeological site of Melka Kunture. It's a day of fascinating discoveries just outside the modern capital.", highlights: ["Explore the mysterious carved stelae of Tiya (UNESCO)", "Visit the hand-carved rock church of Adadi Mariam", "Discover prehistoric history at the Melka Kunture site", "Scenic drive through the southern highland landscapes"], itinerary: [
    { day: "Day Trip", title: "Addis Ababa – Tiya – Adadi Mariam – Addis Ababa", details: "Depart Addis for a drive south through the scenic Oromia countryside. Visit the prehistoric site of Melka Kunture before arriving at the Tiya stelae field to learn about its mysterious origins. Continue to the rock-hewn church of Adadi Mariam, carved directly into the mountain. After a local lunch and exploring the surrounding area, return to Addis Ababa in the late afternoon." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "2-day-lalibela", title: "2-Day Lalibela Tour | Rock-Hewn Churches of Ethiopia", categories: ["historical"], durationDays: 2, durationLabel: "2 Days", priceUSD: 590, available: true, rating: 4.96, region: "Amhara", lat: 12.03, lng: 39.05, image: lalibela2Day, shortDescription: "All 11 rock-hewn churches over a fast, intense weekend with an Orthodox scholar guide.", longDescription: "Lalibela is one of humanity's greatest architectural achievements — 11 churches carved from solid volcanic rock in the 12th century. This compact two-day visit covers every church with an Orthodox scholar guide who brings the liturgy and iconography to life.", highlights: ["Bete Medhane Alem – the world's largest rock-hewn church", "Bete Maryam with original medieval frescoes", "Bete Giyorgis at sunrise (St George's)", "Bete Golgotha – King Lalibela's tomb"], itinerary: [
    { day: "Day 1", title: "Addis – Lalibela – Northern Churches", details: "Morning flight to Lalibela. Afternoon guided tour of the northern church cluster: Bete Medhane Alem, Bete Maryam, Bete Meskel and Bete Denagel. Sunset at the entrance trench with pilgrims arriving for evening prayers." },
    { day: "Day 2", title: "Southern Churches – Bete Giyorgis – Addis", details: "Early morning at Bete Giyorgis (St George's) — the most iconic image of Ethiopia — before the tour groups arrive. Visit the southeastern cluster: Bete Amanuel, Bete Abba Libanos and Bete Merkorios. Optional mule ride to Asheton Maryam before afternoon flight to Addis." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "5-days-awash-harar", title: "5 Days Awash National Park and Harar tour", categories: ["historical", "trekking"], durationDays: 5, durationLabel: "5 Days", priceUSD: 1190, available: true, rating: 4.96, region: "Afar / Harari", lat: 9.31, lng: 42.13, image: awashHarar, shortDescription: "Awash safari, Awash gorge walking and a night in the ancient walled city of Harar with the hyena man.", longDescription: "An eastern Ethiopia loop that combines the wildlife of Awash National Park with the extraordinary medieval city of Harar — Africa's fourth holiest Islamic city and home to the unique tradition of feeding wild hyenas by hand at night.", highlights: ["Awash NP safari: oryx, baboon & flamingo", "Awash gorge and Filwoha hot springs walk", "Harar Jugol UNESCO walled city", "The famous Harar hyena feeding ritual"], itinerary: [
    { day: "Day 1", title: "Addis – Awash NP", details: "Drive east to Awash National Park. Afternoon game drive: Beisa oryx, Soemmerring's gazelle, warthog and flamingo at Beseka Lake. Overnight at Awash lodge." },
    { day: "Day 2", title: "Awash Falls & Gorge Walk", details: "Morning walk along the Awash River gorge to the spectacular falls. Continue east to Filwoha hot springs in the Yangudi Rassa plains. Overnight in Awash town." },
    { day: "Day 3", title: "Awash – Dire Dawa – Harar", details: "Drive east across the Rift Valley escarpment to Dire Dawa. Continue up to Harar. Afternoon orientation walk through the Jugol (old city)." },
    { day: "Day 4", title: "Harar City & Hyena Feeding", details: "Full day in Harar: Arthur Rimbaud House, Harari cultural museum, spice and coffee markets, and the 99 mosques of the old city. Evening: attend the wild hyena feeding ritual outside the Fallana Gate." },
    { day: "Day 5", title: "Harar – Dire Dawa – Addis Ababa", details: "Morning at leisure in the old city. Fly from Dire Dawa back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "6-days-northern-classic", title: "6 Days Northern Ethiopia Tour - Classic Historic Route", categories: ["historical"], durationDays: 6, durationLabel: "6 Days", priceUSD: 1490, available: true, rating: 4.96, region: "Northern", lat: 12.6, lng: 37.47, image: northernClassic, shortDescription: "The classic flying circuit — Bahir Dar, Gondar, Axum, Lalibela in six efficient days.", longDescription: "Six days, four flights, the entire Christian historical north. Ethiopia's greatest hits, done efficiently without sacrificing depth.", highlights: ["Lake Tana island monasteries", "Gondar Royal Enclosure castles", "Axum stelae & Ark of the Covenant church", "All 11 Lalibela rock-hewn churches"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Boat on Lake Tana to Ura Kidane Mihret and Kebran Gabriel monasteries. Evening lakeside." },
    { day: "Day 2", title: "Blue Nile Falls – Gondar", details: "Morning at the Blue Nile Falls. Drive to Gondar. Afternoon at Fasilides Castle compound and Debre Berhan Selassie church." },
    { day: "Day 3", title: "Gondar – Axum", details: "Fly to Axum. Ancient stelae field, St Mary of Zion churches, Queen of Sheba's palace, Ezana inscriptions and the Axum museum." },
    { day: "Day 4", title: "Axum – Lalibela", details: "Fly to Lalibela. Afternoon guided tour of northern church cluster." },
    { day: "Day 5", title: "Lalibela – All Churches", details: "Full day: southeastern cluster, Bete Giyorgis and optional Asheton Maryam mule ride." },
    { day: "Day 6", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "7-days-lalibela-omo", title: "7 Days Lalibela and Omo Valley Tour Itinerary", categories: ["historical", "cultural"], durationDays: 7, durationLabel: "7 Days", priceUSD: 1890, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: lalibelaOmo, shortDescription: "Lalibela's medieval churches and the Omo Valley's living cultures in one high-impact week.", longDescription: "A perfectly balanced week combining two of Ethiopia's most extraordinary worlds: the 12th-century rock-hewn churches of the Christian highlands and the vividly painted faces of the Lower Omo.", highlights: ["All 11 Lalibela rock-hewn churches", "Mursi lip-plate village in Mago NP", "Hamar village and Key Afer market", "Karo body-painted community"], itinerary: [
    { day: "Day 1", title: "Addis – Lalibela", details: "Morning flight to Lalibela. Afternoon northern church cluster tour." },
    { day: "Day 2", title: "Lalibela – All Churches", details: "Southeastern cluster, Bete Giyorgis and Asheton Maryam." },
    { day: "Day 3", title: "Lalibela – Addis – Jinka", details: "Morning at leisure. Fly to Addis, connect to Jinka. Afternoon orientation in the Omo lowlands." },
    { day: "Day 4", title: "Mago NP – Mursi Village", details: "Drive into Mago National Park for a Mursi village visit." },
    { day: "Day 5", title: "Hamar Village & Key Afer Market", details: "Hamar village morning. Key Afer weekly market afternoon." },
    { day: "Day 6", title: "Karo Village & Turmi", details: "Karo village on the Omo River cliff. Afternoon at Turmi." },
    { day: "Day 7", title: "Return to Addis Ababa", details: "Drive to Jinka. Fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "14-days-cultural-tour", title: "14 Days Ethiopia Cultural Tour", categories: ["historical", "cultural"], durationDays: 14, durationLabel: "14 Days", priceUSD: 3690, available: true, rating: 4.96, region: "Multi-region", lat: 9.0, lng: 39.0, image: culturalTour, shortDescription: "A full two weeks of Ethiopian history and living culture, top to bottom.", longDescription: "A relaxed-pace fortnight covering northern history and southern cultures with time to absorb each.", highlights: ["Northern circuit", "Omo Valley loop", "Coffee origin day", "Two weekly markets"], itinerary: baseItinerary(14, "Ethiopia"), includes: baseIncludes, excludes: baseExcludes },
  { slug: "historical-tour-iii", title: "Historical Tour III", categories: ["historical"], durationDays: 8, durationLabel: "8 Days", priceUSD: 1890, available: true, rating: 4.96, region: "Northern", lat: 13.49, lng: 39.47, image: historicalTour3, shortDescription: "Northern historic circuit plus the sky-high monasteries of Tigray's Gheralta massif.", longDescription: "An expanded northern circuit that adds Tigray's clifftop rock churches to the classic Bahir Dar, Gondar, Axum, Lalibela loop.", highlights: ["Bahir Dar lake monasteries", "Gondar castles", "Axum stelae", "Gheralta: Abuna Yemata Guh & Maryam Korkor"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Boat on Lake Tana to monastery islands." },
    { day: "Day 2", title: "Blue Nile Falls & Gondar", details: "Blue Nile Falls, then drive to Gondar. Fasilides compound and Debre Berhan Selassie church." },
    { day: "Day 3", title: "Gondar – Axum", details: "Fly to Axum. Full Axum day: stelae, St Mary of Zion, Queen of Sheba's palace." },
    { day: "Day 4", title: "Axum – Gheralta", details: "Drive east to Hawzen. Afternoon acclimatisation walk on the Gheralta plateau." },
    { day: "Day 5", title: "Abuna Yemata Guh Climb", details: "Climb the near-vertical cliff face to the 6th-century Abuna Yemata Guh church. Breathtaking views and ancient frescoes." },
    { day: "Day 6", title: "Maryam Korkor & Lalibela", details: "Trek to Maryam Korkor. Fly to Lalibela. Afternoon northern church cluster." },
    { day: "Day 7", title: "All Lalibela Churches", details: "Southeastern cluster, Bete Giyorgis, optional Asheton Maryam." },
    { day: "Day 8", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "historical-tour-ii", title: "Historical Tour II", categories: ["historical"], durationDays: 12, durationLabel: "12 Days", priceUSD: 2890, available: true, rating: 4.96, region: "Northern", lat: 13.49, lng: 39.47, image: historicalTour2, shortDescription: "An unhurried 12-day deep dive into the Christian highlands — two nights in every major city.", longDescription: "The same great northern circuit, with two-night stays in each city so you can absorb rather than rush, plus Simien Mountains and Gheralta extensions.", highlights: ["2 nights each in Bahir Dar, Gondar, Axum & Lalibela", "Simien Mountains escarpment day", "Gheralta cliff churches", "Lake Tana full boat day"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Full boat day on Lake Tana visiting four island monasteries." },
    { day: "Day 2", title: "Blue Nile Falls", details: "Morning at Tis Abay falls. Afternoon at leisure in Bahir Dar." },
    { day: "Day 3", title: "Bahir Dar – Gondar", details: "Drive to Gondar. Fasilides compound afternoon." },
    { day: "Day 4", title: "Gondar", details: "Debre Berhan Selassie, Kuskam palace ruins and Simien day-trip briefing." },
    { day: "Day 5", title: "Simien Mountains Day", details: "Drive to Simien escarpment at Sankaber. Gelada baboon encounter and Imet Gogo viewpoint. Return to Gondar." },
    { day: "Day 6", title: "Gondar – Axum", details: "Fly to Axum. Stelae field, St Mary of Zion, museum." },
    { day: "Day 7", title: "Axum – Gheralta", details: "Drive to Hawzen. Gheralta plateau walk." },
    { day: "Day 8", title: "Gheralta Churches", details: "Abuna Yemata Guh climb and Maryam Korkor trek." },
    { day: "Day 9", title: "Gheralta – Lalibela", details: "Fly to Lalibela. Northern church cluster." },
    { day: "Day 10", title: "All Lalibela Churches", details: "Southeastern cluster and Bete Giyorgis." },
    { day: "Day 11", title: "Asheton Maryam", details: "Mule ride to Asheton Maryam highland monastery. Panoramic views." },
    { day: "Day 12", title: "Lalibela – Addis Ababa", details: "Fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "historical-tour-i", title: "Historical Tour I", categories: ["historical"], durationDays: 10, durationLabel: "10 days", priceUSD: 2390, available: true, rating: 4.96, region: "Northern", lat: 12.6, lng: 37.47, image: historicalTour1, shortDescription: "Ten days, the entire historic north — the most popular circuit for first-time Ethiopia visitors.", longDescription: "Long enough to see everything properly, short enough to fit a regular holiday. The most popular northern circuit we run.", highlights: ["Bahir Dar & Lake Tana monasteries", "Gondar castles & Simien overlook", "Axum stelae & Queen of Sheba", "All 11 Lalibela churches"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Lake Tana boat to island monasteries. Lakeside dinner." },
    { day: "Day 2", title: "Blue Nile Falls & Bahir Dar", details: "Morning at the Blue Nile Falls. Afternoon relaxed city walk and market." },
    { day: "Day 3", title: "Bahir Dar – Gondar", details: "Drive to Gondar. Fasilides Royal Enclosure and Debre Berhan Selassie church." },
    { day: "Day 4", title: "Gondar – Simien Overlook", details: "Morning drive to the Simien escarpment at Sankaber. Gelada baboon troops and plateau-edge views. Return to Gondar." },
    { day: "Day 5", title: "Gondar – Axum", details: "Fly to Axum. Afternoon stelae field and St Mary of Zion churches." },
    { day: "Day 6", title: "Axum – Lalibela", details: "Morning Axum museum and Queen of Sheba's palace. Fly to Lalibela." },
    { day: "Day 7", title: "Lalibela Northern Churches", details: "Bete Medhane Alem, Bete Maryam, Bete Meskel and Bete Denagel." },
    { day: "Day 8", title: "Lalibela Southeastern Churches & Bete Giyorgis", details: "Bete Amanuel, Bete Abba Libanos, Bete Merkorios and iconic Bete Giyorgis." },
    { day: "Day 9", title: "Asheton Maryam & Leisure", details: "Morning mule or hike to Asheton Maryam. Afternoon at leisure." },
    { day: "Day 10", title: "Lalibela – Addis Ababa", details: "Morning at leisure. Fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "historical-harar", title: "Historical Tour & Harar", categories: ["historical"], durationDays: 13, durationLabel: "13 days", priceUSD: 3290, available: true, rating: 4.96, region: "Multi-region", lat: 9.31, lng: 42.13, image: historicalHarar, shortDescription: "The full northern circuit plus the walled Islamic city of Harar and Awash National Park.", longDescription: "The complete Ethiopian Christian highland circuit combined with Harar — Africa's fourth holiest Islamic city — for a journey through two of the country's great religious civilisations.", highlights: ["Full northern historic circuit", "Harar Jugol UNESCO walled city", "Wild hyena feeding ritual", "Awash National Park safari"], itinerary: [
    { day: "Day 1", title: "Addis – Bahir Dar", details: "Fly to Bahir Dar. Boat on Lake Tana." },
    { day: "Day 2", title: "Blue Nile Falls & Gondar", details: "Blue Nile Falls, drive to Gondar. Fasilides and Debre Berhan." },
    { day: "Day 3", title: "Gondar – Simien Day", details: "Simien escarpment and gelada baboons." },
    { day: "Day 4", title: "Gondar – Axum", details: "Fly to Axum. Stelae, St Mary of Zion." },
    { day: "Day 5", title: "Axum – Lalibela", details: "Axum museum, fly to Lalibela." },
    { day: "Day 6", title: "Lalibela – Northern Churches", details: "Full northern cluster tour." },
    { day: "Day 7", title: "Lalibela – Southeastern & Bete Giyorgis", details: "Southeastern cluster and Bete Giyorgis." },
    { day: "Day 8", title: "Lalibela – Addis Ababa", details: "Fly to Addis. Transfer to hotel." },
    { day: "Day 9", title: "Addis – Awash NP", details: "Drive east. Awash afternoon game drive: oryx, gazelle." },
    { day: "Day 10", title: "Awash – Harar", details: "Awash gorge walk, Filwoha hot springs. Drive to Harar via Dire Dawa." },
    { day: "Day 11", title: "Harar City Day", details: "Jugol old city, Rimbaud House, spice markets and 99 mosques." },
    { day: "Day 12", title: "Hyena Feeding & Harar Markets", details: "Morning Harar markets. Evening wild hyena feeding ritual at Fallana Gate." },
    { day: "Day 13", title: "Dire Dawa – Addis Ababa", details: "Fly from Dire Dawa to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },

  // Trekking
  { slug: "5-days-awash-park-harar", title: "5 Days Awash National Park and Harar tour (Trek)", categories: ["trekking", "historical"], durationDays: 5, durationLabel: "5 Days", priceUSD: 1190, available: true, rating: 4.96, region: "Afar / Harari", lat: 9.31, lng: 42.13, image: awashParkHarar, shortDescription: "Light gorge trekking through Awash, then on to the medieval Islamic city of Harar.", longDescription: "An eastern Ethiopia circuit combining the wildlife and dramatic gorge scenery of Awash National Park with trekking to Filwoha hot springs, followed by two days in the UNESCO walled city of Harar.", highlights: ["Awash gorge and waterfall walk", "Filwoha hot springs trek", "Harar Jugol walled city", "Wild hyena feeding ritual"], itinerary: [
    { day: "Day 1", title: "Addis – Awash NP", details: "Drive east to Awash National Park. Afternoon game drive on the Illala Sala plains: Beisa oryx, Soemmerring's gazelle and flamingo on Lake Beseka." },
    { day: "Day 2", title: "Awash Gorge Trek & Falls", details: "Morning walk along the Awash River gorge to the spectacular falls. Trek section through acacia woodland following the escarpment rim. Afternoon drive towards Filwoha." },
    { day: "Day 3", title: "Filwoha Hot Springs & Harar", details: "Trek to Filwoha thermal springs set in a palm oasis — a surreal highland pool in the Afar lowlands. Continue east by road to Harar." },
    { day: "Day 4", title: "Harar City & Hyena Feeding", details: "Full day inside the Jugol: Rimbaud House, the 99 mosques, Harari weaving workshops, spice market. Evening wild hyena feeding ritual." },
    { day: "Day 5", title: "Harar – Dire Dawa – Addis", details: "Morning stroll in the old city. Drive to Dire Dawa for the return flight to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "3-day-tigray-trekking", title: "3-Day Tigray Trekking & Community-Based Tour", categories: ["trekking"], durationDays: 3, durationLabel: "3 Days", priceUSD: 590, available: true, rating: 4.96, region: "Tigray", lat: 13.95, lng: 39.16, image: tigrayTrekking, shortDescription: "Walk the Tigray plateau village-to-village, sleeping in TESFA community lodges with local families.", longDescription: "A low-impact, high-reward community trek. Three days of walking between villages with overnights in community-built stone lodges at the escarpment edge, sharing meals with local Tigrinya families.", highlights: ["Escarpment-edge panoramas over the Tigray plains", "Community lodge stays with local families", "Two ancient rock-hewn churches en route", "Ethiopian highlands wildlife: klipspringer & lammergeier"], itinerary: [
    { day: "Day 1", title: "Axum – Gheralta – First Village Lodge", details: "Fly to Axum. Drive east to the Gheralta base. Begin the plateau walk to the first TESFA community lodge. Sunset views from the escarpment edge." },
    { day: "Day 2", title: "Plateau Trek – Cliff Church – Second Lodge", details: "Morning walk to a Tigray cliff church (guide dependent on accessibility). Lunch at a community lodge. Afternoon trek to the second village for an overnight with a local family." },
    { day: "Day 3", title: "Final Village – Descent – Hawzen", details: "Final plateau section and descent back to the road. Drive to Hawzen for lunch. Fly from Mekele to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "8-days-bale-trekking", title: "8 days Bale Mountain Trekking tour", categories: ["trekking"], durationDays: 8, durationLabel: "8 Days", priceUSD: 1890, available: true, rating: 4.96, region: "Oromia", lat: 6.83, lng: 39.75, image: baleTrekking, shortDescription: "Eight days trekking the Sanetti Plateau above 4,000m — the highest road in Africa, patrolled by Ethiopian wolves.", longDescription: "Bale Mountains National Park is Africa's finest high-altitude wilderness. The Sanetti Plateau hosts the world's densest population of Ethiopian wolves alongside mountain nyala and giant lobelia forests. This 8-day trek crosses the plateau and descends through the Harenna cloud forest.", highlights: ["Ethiopian wolf tracking at close range", "Sanetti Plateau crossing at 4,000m+", "Harenna cloud forest descent", "Mountain nyala and lammergeier"], itinerary: [
    { day: "Day 1", title: "Addis – Dinsho", details: "Drive south to Dinsho. Afternoon walk in Dinsho woodlands: mountain nyala and warthog at close range." },
    { day: "Day 2", title: "Dinsho – Gaysay – Camp 1", details: "Game walk on Gaysay floodplains. Begin ascent to the afroalpine zone. First camp." },
    { day: "Day 3", title: "Sanetti Plateau Ascent", details: "Trek onto the Sanetti Plateau. Giant lobelia, afroalpine meadow and first Ethiopian wolf sightings." },
    { day: "Day 4", title: "Wolf Country – Tulu Dimtu", details: "Full plateau day tracking Ethiopian wolves. Tulu Dimtu (4,377m) summit." },
    { day: "Day 5", title: "Sanetti – Web Valley", details: "Descend into the Web Valley. Camp by the river." },
    { day: "Day 6", title: "Harenna Forest", details: "Trek through Harenna cloud forest: Hagenia trees, colobus monkey, honey badger." },
    { day: "Day 7", title: "Harenna – Goba", details: "Final forest section. Drive to Goba for comfortable overnight." },
    { day: "Day 8", title: "Goba – Addis Ababa", details: "Drive or fly back to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "9-days-simien-trekking", title: "9 days Trekking in the Simien Mountains National Park tour", categories: ["trekking"], durationDays: 9, durationLabel: "9 Days", priceUSD: 2090, available: true, rating: 4.96, region: "Amhara", lat: 13.18, lng: 38.07, image: simienTrekking, shortDescription: "The full Simien traverse — Sankaber to Chenek to Ras Dashen (4,543m), Ethiopia's highest peak.", longDescription: "The Simien Mountains are a UNESCO World Heritage Site and Africa's premier trekking destination. The escarpment drops 1,500m in basalt cliffs. On the plateau roam gelada baboon troops of 200+, Walia ibex on cliff edges, and lammergeier vultures on the updrafts.", highlights: ["Gelada baboon troops of 200+ individuals", "Walia ibex on sheer cliff edges", "Ras Dashen summit — Ethiopia's highest peak", "Imet Gogo panorama above the Great Rift"], itinerary: [
    { day: "Day 1", title: "Addis – Gondar – Debark", details: "Fly to Gondar. Drive to Debark for trek permit and overnight." },
    { day: "Day 2", title: "Debark – Sankaber", details: "Trek begins. First gelada baboon encounters near Sankaber camp." },
    { day: "Day 3", title: "Sankaber – Geech", details: "Plateau traverse through giant heather. Walia ibex on cliff faces." },
    { day: "Day 4", title: "Geech – Imet Gogo – Chenek", details: "Morning hike to Imet Gogo (3,926m). Descend to Chenek where geladas graze at arm's length." },
    { day: "Day 5", title: "Chenek – Ambiko", details: "Remote Simien plateau. Walia ibex encounters on high ledges." },
    { day: "Day 6", title: "Ras Dashen Summit", details: "Pre-dawn start for Ras Dashen (4,543m) — Ethiopia's highest peak, fourth-highest in Africa." },
    { day: "Day 7", title: "Ambiko – Chenek", details: "Return trek via alternative ridge trail. Wildlife photography afternoon." },
    { day: "Day 8", title: "Chenek – Debark", details: "Trek down. Hot shower and celebration dinner in Debark." },
    { day: "Day 9", title: "Debark – Gondar – Addis Ababa", details: "Drive to Gondar. Optional Fasilides stop. Fly to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
  { slug: "4-days-rock-tigray", title: "4 Days Group Tour -The Rock Hewn Church of Tigray", categories: ["trekking"], durationDays: 4, durationLabel: "4 days", priceUSD: 890, available: true, rating: 4.96, region: "Tigray", lat: 13.95, lng: 39.16, image: rockTigray, shortDescription: "Four days trekking to Tigray's most spectacular cliff churches — Abuna Yemata Guh, Maryam Korkor and Yeha.", longDescription: "An extended Tigray trek connecting the Gheralta cliff churches with the pre-Aksumite temple of Yeha (700 BC) and the accessible cave church of Wukro Cherkos.", highlights: ["Abuna Yemata Guh barefoot cliff climb", "Maryam Korkor Aksumite frescoes", "Yeha temple — 700 BC pre-Aksumite", "Wukro Cherkos cave church"], itinerary: [
    { day: "Day 1", title: "Axum – Yeha – Gheralta", details: "Fly to Axum. Visit Yeha temple (700 BC). Drive east to Gheralta plateau." },
    { day: "Day 2", title: "Abuna Yemata Guh & Daniel Korkor", details: "Barefoot scramble up the sandstone chimney to Abuna Yemata Guh. Afternoon walk to Daniel Korkor viewpoint." },
    { day: "Day 3", title: "Maryam Korkor & Wukro Cherkos", details: "Trek to Maryam Korkor. Drive south to the accessible Wukro Cherkos cave church." },
    { day: "Day 4", title: "Wukro – Mekele – Addis Ababa", details: "Morning at leisure. Fly from Mekele to Addis Ababa." }
  ], includes: baseIncludes, excludes: baseExcludes },
];

export const getCategory = (slug: string) => CATEGORIES.find(c => c.slug === slug);
export const getTour = (slug: string) => TOURS.find(t => t.slug === slug);
export const toursByCategory = (slug: string) => TOURS.filter(t => t.categories.includes(slug));
export const searchTours = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return TOURS;
  return TOURS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.region.toLowerCase().includes(q) ||
    t.shortDescription.toLowerCase().includes(q) ||
    t.categories.some(c => c.includes(q)),
  );
};
