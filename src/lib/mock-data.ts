export type Business = {
  id: string;
  name: string;
  handle: string;
  category: string;
  logo: string; // emoji
  color: string; // hex for logo bg
  verified: boolean;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  followers: number;
  description: string;
  images: string[];
  cover: string;
  hours: string;
  openNow: boolean;
};

export type Product = {
  id: string;
  businessId: string;
  name: string;
  price: number;
  image: string;
  kind: "product" | "service";
  rating: number;
  tag?: string;
};

// Curated Unsplash photos (source URLs, no key needed)
const img = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const IMAGES: Record<string, string[]> = {
  shoes: [
    "photo-1542291026-7eec264c27ff",
    "photo-1552346154-21d32810aba3",
    "photo-1600185365483-26d7a4cc7519",
  ],
  cafe: [
    "photo-1445116572660-236099ec97a0",
    "photo-1509042239860-f550ce710b93",
    "photo-1495474472287-4d71bcdd2085",
  ],
  bakery: [
    "photo-1509440159596-0249088772ff",
    "photo-1517686469429-8bdb88b9f907",
    "photo-1568254183919-78a4f43a2877",
  ],
  fashion: [
    "photo-1490481651871-ab68de25d43d",
    "photo-1483985988355-763728e1935b",
    "photo-1441984904996-e0b6ba687e04",
  ],
  baby: [
    "photo-1522771930-78848d9293e8",
    "photo-1519689680058-324335c77eba",
    "photo-1544126592-807ade215a0b",
  ],
  barber: [
    "photo-1503951914875-452162b0f3f1",
    "photo-1585747860715-2ba37e788b70",
    "photo-1622286342621-4bd786c2447c",
  ],
  flowers: [
    "photo-1487530811176-3780de880c2d",
    "photo-1508610048659-a06b669e3321",
    "photo-1520763185298-1b434c919102",
  ],
  tech: [
    "photo-1517336714731-489689fd1ca8",
    "photo-1498049794561-7780e7231661",
    "photo-1593642632559-0c6d3fc62b89",
  ],
  gym: [
    "photo-1534438327276-14e5300c3a48",
    "photo-1571019613454-1cb2f99b2d8b",
    "photo-1526506118085-60ce8714f8c5",
  ],
  restaurant: [
    "photo-1517248135467-4c7edcad34c4",
    "photo-1414235077428-338989a2e8c0",
    "photo-1552566626-52f8b828add9",
  ],
  jewelry: [
    "photo-1515562141207-7a88fb7ce338",
    "photo-1611652022419-a9419f74343d",
    "photo-1573408301185-9146fe634ad0",
  ],
  bookstore: [
    "photo-1521056787327-165eb2a35fdc",
    "photo-1524578271613-d550eacf6090",
    "photo-1533327325824-76bc4e62d560",
  ],
  pet: [
    "photo-1583337130417-3346a1be7dee",
    "photo-1548199973-03cce0bbc87b",
    "photo-1601758228041-f3b2795255f1",
  ],
  bike: [
    "photo-1485965120184-e220f721d03e",
    "photo-1571068316344-75bc76f77890",
    "photo-1502744688674-c619d1586c9e",
  ],
  art: [
    "photo-1513475382585-d06e58bcb0e0",
    "photo-1499781350541-7783f6c6a0c8",
    "photo-1547891654-e66ed7ebb968",
  ],
  spa: [
    "photo-1544161515-4ab6ce6db874",
    "photo-1540555700478-4be289fbecef",
    "photo-1600334129128-685c5582fd35",
  ],
  wine: [
    "photo-1510812431401-41d2bd2722f3",
    "photo-1553361371-9b22f78e8b1d",
    "photo-1506377247377-2a5b3b417ebb",
  ],
  grocery: [
    "photo-1542838132-92c53300491e",
    "photo-1506617564039-2f3b650b7010",
    "photo-1573246123716-6b1782bfc499",
  ],
  auto: [
    "photo-1492144534655-ae79c964c9d7",
    "photo-1503376780353-7e6692767b70",
    "photo-1552519507-da3b142c6e3d",
  ],
  fitness: [
    "photo-1517836357463-d25dfeac3438",
    "photo-1550345332-09e3ac987658",
    "photo-1518611012118-696072aa579a",
  ],
  electronics2: [
    "photo-1468495244123-6c6c332eeece",
    "photo-1531297484001-80022131f5a1",
    "photo-1519389950473-47ba0277781c",
  ],
  furniture: [
    "photo-1555041469-a586c61ea9bc",
    "photo-1567538096630-e0c55bd6374c",
    "photo-1586023492125-27b2c045efd7",
  ],
  cars: [
    "photo-1503376780353-7e6692767b70",
    "photo-1552519507-da3b142c6e3d",
    "photo-1494905998402-395d579af36f",
  ],
  phones: [
    "photo-1511707171634-5f897ff02aa9",
    "photo-1592286927505-1def25115481",
    "photo-1580910051074-3eb694886505",
  ],
  realestate: [
    "photo-1600596542815-ffad4c1539a9",
    "photo-1600585154340-be6161a56a0c",
    "photo-1600607687939-ce8a6c25118c",
  ],
  supermarket: [
    "photo-1578916171728-46686eac8d58",
    "photo-1601599963565-b7f49deb45c5",
    "photo-1550989460-0adf9ea622e2",
  ],
  beauty: [
    "photo-1522337194846-6b58bcaa5f16",
    "photo-1560066984-138dadb4c035",
    "photo-1512496015851-a90fb38ba796",
  ],
  healthcare: [
    "photo-1519494026892-80bbd2d6fd0d",
    "photo-1587854692152-cbe660dbde88",
    "photo-1538108149393-fbbd81895907",
  ],
  pharmacy: [
    "photo-1587854692152-cbe660dbde88",
    "photo-1631549916768-4119b2e5f926",
    "photo-1587854680352-936b22b91030",
  ],
  hotel: [
    "photo-1566073771259-6a8506099945",
    "photo-1551882547-ff40c63fe5fa",
    "photo-1611892440504-42a792e24d32",
  ],
  mechanic: [
    "photo-1530046339160-ce3e530c7d2f",
    "photo-1620294270595-72e97b8bdf24",
    "photo-1493238792000-8113da705763",
  ],
  photography: [
    "photo-1516035069371-29a1b244cc32",
    "photo-1502920917128-1aa500764cbd",
    "photo-1554048612-b6a482bc67e5",
  ],
  education: [
    "photo-1503676260728-1c00da094a0b",
    "photo-1523240795612-9a054b0db644",
    "photo-1522202176988-66273c2fd55f",
  ],
  cleaning: [
    "photo-1581578731548-c64695cc6952",
    "photo-1563453392212-326f5e854473",
    "photo-1527515637462-cff94eecc1ac",
  ],
  repairs: [
    "photo-1581092160562-40aa08e78837",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1518770660439-4636190af475",
  ],
  construction: [
    "photo-1503387762-592deb58ef4e",
    "photo-1541888946425-d81bb19240f5",
    "photo-1590644365607-1c5a94867d09",
  ],
};
const pack = (key: keyof typeof IMAGES) => IMAGES[key].map((i) => img(i));

const HOURS_STANDARD = "Mon–Sat · 9:00 AM – 8:00 PM";
const HOURS_LATE = "Daily · 11:00 AM – 11:00 PM";
const HOURS_EARLY = "Daily · 6:00 AM – 6:00 PM";
const HOURS_24 = "Open 24 hours";
const HOURS_WEEKDAY = "Mon–Fri · 8:00 AM – 6:00 PM";
const HOURS_WEEKEND_CLOSED = "Mon–Sat · 10:00 AM – 7:00 PM · Closed Sundays";

export const BUSINESSES: Business[] = [
  // Fashion
  { id: "sole", name: "Sole Society", handle: "@solesociety", category: "Shoes", logo: "👟", color: "#111827", verified: true, location: "Brooklyn, NY", distance: "0.4 mi", rating: 4.9, reviews: 1284, followers: 18400, description: "Handcrafted sneakers made in small batches. Free 30-day returns.", images: pack("shoes"), cover: pack("shoes")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "north", name: "North Atelier", handle: "@northatelier", category: "Fashion", logo: "🧥", color: "#1f2937", verified: true, location: "Los Angeles, CA", distance: "2.3 mi", rating: 4.7, reviews: 566, followers: 9200, description: "Minimalist ready-to-wear, ethically produced.", images: pack("fashion"), cover: pack("fashion")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "denim", name: "Denim & Co.", handle: "@denimandco", category: "Fashion", logo: "👖", color: "#1e3a8a", verified: true, location: "Austin, TX", distance: "1.6 mi", rating: 4.6, reviews: 348, followers: 5100, description: "Raw and selvedge denim, tailored on-site.", images: pack("fashion"), cover: pack("fashion")[1], hours: HOURS_STANDARD, openNow: true },
  { id: "veil", name: "Veil Bridal", handle: "@veilbridal", category: "Fashion", logo: "👰", color: "#be185d", verified: true, location: "Charleston, SC", distance: "3.4 mi", rating: 4.9, reviews: 221, followers: 7600, description: "Custom bridal gowns and alterations by appointment.", images: pack("fashion"), cover: pack("fashion")[2], hours: HOURS_WEEKEND_CLOSED, openNow: false },
  // Restaurants
  { id: "casa", name: "Casa Verde", handle: "@casaverde", category: "Restaurant", logo: "🌿", color: "#166534", verified: true, location: "Brooklyn, NY", distance: "0.7 mi", rating: 4.9, reviews: 2871, followers: 24100, description: "Plant-forward Mexican cooking with a natural wine list.", images: pack("restaurant"), cover: pack("restaurant")[0], hours: HOURS_LATE, openNow: true },
  { id: "ember", name: "Ember Grill House", handle: "@embergrill", category: "Restaurant", logo: "🔥", color: "#9a3412", verified: true, location: "Dallas, TX", distance: "1.9 mi", rating: 4.7, reviews: 1543, followers: 11800, description: "Wood-fired steaks and seasonal sides.", images: pack("restaurant"), cover: pack("restaurant")[1], hours: HOURS_LATE, openNow: true },
  { id: "noodle", name: "Golden Noodle Bar", handle: "@goldennoodle", category: "Restaurant", logo: "🍜", color: "#b45309", verified: true, location: "San Francisco, CA", distance: "0.9 mi", rating: 4.8, reviews: 1980, followers: 14300, description: "Hand-pulled noodles and slow-simmered broths daily.", images: pack("restaurant"), cover: pack("restaurant")[2], hours: HOURS_LATE, openNow: true },
  { id: "brew", name: "Brew & Bloom", handle: "@brewbloom", category: "Cafe", logo: "☕️", color: "#7c4a2b", verified: true, location: "Portland, OR", distance: "0.8 mi", rating: 4.8, reviews: 942, followers: 8700, description: "Single-origin coffee and seasonal florals under one roof.", images: pack("cafe"), cover: pack("cafe")[0], hours: HOURS_EARLY, openNow: true },
  { id: "loaf", name: "Loaf Bakery", handle: "@loafbakery", category: "Bakery", logo: "🥐", color: "#c98a3d", verified: true, location: "Austin, TX", distance: "1.1 mi", rating: 4.9, reviews: 2033, followers: 15600, description: "Sourdough, pastries and cakes baked before sunrise.", images: pack("bakery"), cover: pack("bakery")[0], hours: HOURS_EARLY, openNow: true },
  // Electronics
  { id: "circuit", name: "Circuit Lab", handle: "@circuitlab", category: "Electronics", logo: "🔌", color: "#2563eb", verified: true, location: "Denver, CO", distance: "3.2 mi", rating: 4.6, reviews: 388, followers: 4200, description: "Repairs and gear for phones, tablets and laptops.", images: pack("tech"), cover: pack("tech")[0], hours: HOURS_WEEKDAY, openNow: true },
  { id: "voltix", name: "Voltix Electronics", handle: "@voltix", category: "Electronics", logo: "📺", color: "#0369a1", verified: true, location: "Chicago, IL", distance: "2.1 mi", rating: 4.5, reviews: 612, followers: 6800, description: "TVs, audio systems and smart home installs.", images: pack("electronics2"), cover: pack("electronics2")[0], hours: HOURS_STANDARD, openNow: true },
  // Furniture
  { id: "oakmill", name: "Oak & Mill Furniture", handle: "@oakmill", category: "Furniture", logo: "🛋️", color: "#78350f", verified: true, location: "Grand Rapids, MI", distance: "4.0 mi", rating: 4.8, reviews: 447, followers: 5300, description: "Solid-wood furniture built to order.", images: pack("furniture"), cover: pack("furniture")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "loft", name: "Loft Living Co.", handle: "@loftliving", category: "Furniture", logo: "🪑", color: "#57534e", verified: true, location: "Brooklyn, NY", distance: "1.3 mi", rating: 4.6, reviews: 289, followers: 3900, description: "Modern furniture and space planning for small apartments.", images: pack("furniture"), cover: pack("furniture")[1], hours: HOURS_STANDARD, openNow: true },
  // Cars
  { id: "driveway", name: "Driveway Motors", handle: "@drivewaymotors", category: "Cars", logo: "🚙", color: "#1e40af", verified: true, location: "Houston, TX", distance: "5.5 mi", rating: 4.7, reviews: 754, followers: 9100, description: "Certified pre-owned vehicles with 90-day warranty.", images: pack("cars"), cover: pack("cars")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "drive", name: "Drive Detail", handle: "@drivedetail", category: "Auto", logo: "🚗", color: "#1e40af", verified: true, location: "Houston, TX", distance: "6.1 mi", rating: 4.8, reviews: 322, followers: 3300, description: "Mobile detailing and ceramic coating.", images: pack("auto"), cover: pack("auto")[0], hours: HOURS_STANDARD, openNow: true },
  // Phones
  { id: "mobilehub", name: "MobileHub", handle: "@mobilehub", category: "Phones", logo: "📱", color: "#7c3aed", verified: true, location: "Atlanta, GA", distance: "1.2 mi", rating: 4.6, reviews: 891, followers: 7400, description: "Unlocked phones, trade-ins and same-day screen repair.", images: pack("phones"), cover: pack("phones")[0], hours: HOURS_STANDARD, openNow: true },
  // Real Estate
  { id: "harbor", name: "Harbor Realty Group", handle: "@harborrealty", category: "Real Estate", logo: "🏠", color: "#0f766e", verified: true, location: "Miami, FL", distance: "2.8 mi", rating: 4.9, reviews: 512, followers: 12600, description: "Residential sales and rentals across South Florida.", images: pack("realestate"), cover: pack("realestate")[0], hours: HOURS_WEEKDAY, openNow: true },
  { id: "keystone", name: "Keystone Homes", handle: "@keystonehomes", category: "Real Estate", logo: "🏡", color: "#065f46", verified: true, location: "Denver, CO", distance: "3.6 mi", rating: 4.8, reviews: 366, followers: 8100, description: "New construction and custom home builds.", images: pack("realestate"), cover: pack("realestate")[1], hours: HOURS_WEEKDAY, openNow: false },
  // Supermarkets
  { id: "green", name: "Greenline Market", handle: "@greenline", category: "Supermarket", logo: "🥬", color: "#15803d", verified: true, location: "Philadelphia, PA", distance: "0.2 mi", rating: 4.7, reviews: 1560, followers: 10200, description: "Neighborhood grocer stocking local farms.", images: pack("supermarket"), cover: pack("supermarket")[0], hours: HOURS_24, openNow: true },
  { id: "harvestrow", name: "Harvest Row Grocers", handle: "@harvestrow", category: "Supermarket", logo: "🛒", color: "#166534", verified: true, location: "Minneapolis, MN", distance: "1.0 mi", rating: 4.6, reviews: 987, followers: 6300, description: "Farm-to-table groceries and weekly CSA boxes.", images: pack("grocery"), cover: pack("grocery")[1], hours: HOURS_EARLY, openNow: true },
  // Beauty
  { id: "glow", name: "Glow Beauty Bar", handle: "@glowbeauty", category: "Beauty", logo: "💄", color: "#db2777", verified: true, location: "Los Angeles, CA", distance: "1.7 mi", rating: 4.8, reviews: 1123, followers: 16200, description: "Lashes, brows, and skincare with clean product lines.", images: pack("beauty"), cover: pack("beauty")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "sharp", name: "Sharp & Co.", handle: "@sharpco", category: "Barber", logo: "💈", color: "#0f172a", verified: true, location: "Chicago, IL", distance: "0.3 mi", rating: 4.9, reviews: 1420, followers: 13500, description: "Classic cuts, hot towels, and no wait times.", images: pack("barber"), cover: pack("barber")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "still", name: "Still Spa", handle: "@stillspa", category: "Spa", logo: "🧖", color: "#0e7490", verified: true, location: "Scottsdale, AZ", distance: "5.4 mi", rating: 4.9, reviews: 1188, followers: 9800, description: "Massage, facials and quiet.", images: pack("spa"), cover: pack("spa")[0], hours: HOURS_WEEKEND_CLOSED, openNow: true },
  // Healthcare
  { id: "wellpoint", name: "Wellpoint Family Clinic", handle: "@wellpoint", category: "Healthcare", logo: "🩺", color: "#0284c7", verified: true, location: "Seattle, WA", distance: "1.4 mi", rating: 4.9, reviews: 645, followers: 5900, description: "Same-week primary care appointments, walk-ins welcome.", images: pack("healthcare"), cover: pack("healthcare")[0], hours: HOURS_WEEKDAY, openNow: true },
  { id: "brightsmile", name: "Bright Smile Dental", handle: "@brightsmile", category: "Healthcare", logo: "🦷", color: "#0891b2", verified: true, location: "San Diego, CA", distance: "2.0 mi", rating: 4.8, reviews: 823, followers: 4700, description: "General and cosmetic dentistry, painless cleanings.", images: pack("healthcare"), cover: pack("healthcare")[1], hours: HOURS_WEEKDAY, openNow: true },
  // Pharmacies
  { id: "corner", name: "Corner Pharmacy", handle: "@cornerpharmacy", category: "Pharmacy", logo: "💊", color: "#059669", verified: true, location: "Boston, MA", distance: "0.5 mi", rating: 4.7, reviews: 512, followers: 3100, description: "Prescriptions filled fast, free delivery within 2 miles.", images: pack("pharmacy"), cover: pack("pharmacy")[0], hours: HOURS_24, openNow: true },
  // Hotels
  { id: "meridian", name: "The Meridian Hotel", handle: "@meridianhotel", category: "Hotel", logo: "🏨", color: "#1e293b", verified: true, location: "New York, NY", distance: "4.4 mi", rating: 4.8, reviews: 3210, followers: 28900, description: "Boutique rooms in the heart of the city, rooftop bar included.", images: pack("hotel"), cover: pack("hotel")[0], hours: HOURS_24, openNow: true },
  { id: "driftwood", name: "Driftwood Inn", handle: "@driftwoodinn", category: "Hotel", logo: "🛏️", color: "#0e7490", verified: true, location: "San Diego, CA", distance: "6.2 mi", rating: 4.7, reviews: 1450, followers: 9600, description: "Beachfront rooms with private balconies.", images: pack("hotel"), cover: pack("hotel")[1], hours: HOURS_24, openNow: true },
  // Mechanics
  { id: "torque", name: "Torque Auto Repair", handle: "@torqueauto", category: "Mechanic", logo: "🔧", color: "#7c2d12", verified: true, location: "Detroit, MI", distance: "2.6 mi", rating: 4.8, reviews: 934, followers: 4400, description: "Full-service repair, diagnostics and state inspections.", images: pack("mechanic"), cover: pack("mechanic")[0], hours: HOURS_WEEKDAY, openNow: true },
  // Photography
  { id: "lumina", name: "Lumina Photo Studio", handle: "@luminaphoto", category: "Photography", logo: "📷", color: "#334155", verified: true, location: "Nashville, TN", distance: "1.8 mi", rating: 4.9, reviews: 401, followers: 11300, description: "Portrait, wedding and product photography.", images: pack("photography"), cover: pack("photography")[0], hours: HOURS_WEEKDAY, openNow: false },
  // Education
  { id: "brightpath", name: "Bright Path Tutoring", handle: "@brightpath", category: "Education", logo: "🎓", color: "#4338ca", verified: true, location: "Columbus, OH", distance: "1.5 mi", rating: 4.9, reviews: 288, followers: 3600, description: "1-on-1 tutoring for K-12 and test prep.", images: pack("education"), cover: pack("education")[0], hours: HOURS_WEEKDAY, openNow: true },
  { id: "codeforge", name: "CodeForge Academy", handle: "@codeforge", category: "Education", logo: "💻", color: "#1d4ed8", verified: true, location: "Remote / Austin, TX", distance: "2.2 mi", rating: 4.8, reviews: 512, followers: 8900, description: "12-week coding bootcamps, job placement support.", images: pack("education"), cover: pack("education")[1], hours: HOURS_WEEKDAY, openNow: true },
  // Services / Cleaning / Repairs / Construction
  { id: "sparkle", name: "Sparkle Home Cleaning", handle: "@sparklehome", category: "Cleaning", logo: "🧽", color: "#0d9488", verified: true, location: "Phoenix, AZ", distance: "3.1 mi", rating: 4.7, reviews: 677, followers: 3200, description: "Recurring and deep-clean service, background-checked staff.", images: pack("cleaning"), cover: pack("cleaning")[0], hours: HOURS_WEEKDAY, openNow: true },
  { id: "fixit", name: "FixIt Handyman Co.", handle: "@fixithandyman", category: "Repairs", logo: "🛠️", color: "#92400e", verified: true, location: "Cleveland, OH", distance: "1.0 mi", rating: 4.6, reviews: 389, followers: 2100, description: "General repairs, mounting, and small renovations.", images: pack("repairs"), cover: pack("repairs")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "solidground", name: "Solid Ground Construction", handle: "@solidground", category: "Construction", logo: "🏗️", color: "#a16207", verified: true, location: "Raleigh, NC", distance: "4.7 mi", rating: 4.8, reviews: 214, followers: 2800, description: "Additions, remodels, and ground-up builds.", images: pack("construction"), cover: pack("construction")[0], hours: HOURS_WEEKDAY, openNow: true },
  // Baby & kids, misc lifestyle
  { id: "tiny", name: "Tiny Bloom", handle: "@tinybloom", category: "Baby & Kids", logo: "🍼", color: "#f472b6", verified: true, location: "Seattle, WA", distance: "0.6 mi", rating: 4.8, reviews: 812, followers: 7100, description: "Organic baby clothes and gentle skincare.", images: pack("baby"), cover: pack("baby")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "petal", name: "Petal Studio", handle: "@petalstudio", category: "Florist", logo: "🌸", color: "#db2777", verified: true, location: "San Francisco, CA", distance: "1.5 mi", rating: 4.9, reviews: 671, followers: 6400, description: "Same-day bouquets and event installations.", images: pack("flowers"), cover: pack("flowers")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "iron", name: "Iron & Oak Gym", handle: "@ironoak", category: "Gym", logo: "🏋️", color: "#111827", verified: true, location: "Miami, FL", distance: "0.9 mi", rating: 4.8, reviews: 1104, followers: 9500, description: "24/7 strength gym with personal coaching.", images: pack("gym"), cover: pack("gym")[0], hours: HOURS_24, openNow: true },
  { id: "lumen", name: "Lumen Jewelry", handle: "@lumen", category: "Jewelry", logo: "💎", color: "#0ea5e9", verified: true, location: "New York, NY", distance: "4.1 mi", rating: 4.9, reviews: 512, followers: 8300, description: "Recycled gold, ethically sourced stones.", images: pack("jewelry"), cover: pack("jewelry")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "margin", name: "Margin Books", handle: "@marginbooks", category: "Bookstore", logo: "📚", color: "#7c2d12", verified: true, location: "Boston, MA", distance: "1.8 mi", rating: 4.9, reviews: 634, followers: 5200, description: "Independent bookstore with weekly readings.", images: pack("bookstore"), cover: pack("bookstore")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "paws", name: "Paws & Co.", handle: "@pawsco", category: "Pet", logo: "🐾", color: "#b45309", verified: true, location: "Nashville, TN", distance: "0.5 mi", rating: 4.8, reviews: 921, followers: 6900, description: "Grooming, treats and everything for your best friend.", images: pack("pet"), cover: pack("pet")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "spin", name: "Spin Cycles", handle: "@spincycles", category: "Bike Shop", logo: "🚲", color: "#0f766e", verified: true, location: "Minneapolis, MN", distance: "2.7 mi", rating: 4.7, reviews: 402, followers: 3700, description: "Tune-ups, custom builds, and gravel gear.", images: pack("bike"), cover: pack("bike")[0], hours: HOURS_STANDARD, openNow: true },
  { id: "hue", name: "Hue Studio", handle: "@huestudio", category: "Art & Prints", logo: "🎨", color: "#7c3aed", verified: true, location: "San Diego, CA", distance: "3.0 mi", rating: 4.8, reviews: 289, followers: 4600, description: "Original artwork and limited-edition prints.", images: pack("art"), cover: pack("art")[0], hours: HOURS_STANDARD, openNow: false },
  { id: "cellar", name: "Cellar & Co.", handle: "@cellar", category: "Wine", logo: "🍷", color: "#7f1d1d", verified: true, location: "Napa, CA", distance: "8.2 mi", rating: 4.8, reviews: 741, followers: 7200, description: "Curated natural wines with weekly tastings.", images: pack("wine"), cover: pack("wine")[0], hours: HOURS_LATE, openNow: true },
  { id: "pulse", name: "Pulse Fitness", handle: "@pulse", category: "Fitness Studio", logo: "💪", color: "#b91c1c", verified: true, location: "Atlanta, GA", distance: "1.4 mi", rating: 4.8, reviews: 894, followers: 8100, description: "HIIT and pilates classes daily.", images: pack("fitness"), cover: pack("fitness")[0], hours: HOURS_STANDARD, openNow: true },
];

const PRODUCT_NAMES: Record<string, string[]> = {
  Shoes: ["Runner 01", "Court Classic", "Trail Pro", "Studio Slip-on", "Weekend Sneaker"],
  Cafe: ["Single Origin 12oz", "Cold Brew Bottle", "Ceramic Mug", "House Blend", "Chemex Kit"],
  Bakery: ["Country Sourdough", "Almond Croissant", "Cardamom Bun", "Chocolate Babka", "Lemon Tart"],
  Fashion: ["Wool Coat", "Silk Shirt", "Wide Trouser", "Merino Tee", "Rain Shell"],
  "Baby & Kids": ["Organic Onesie", "Bamboo Blanket", "Wooden Rattle", "Tiny Hoodie", "Bib Set"],
  Barber: ["Signature Cut", "Beard Trim", "Hot Towel Shave", "Kid Cut", "Color"],
  Florist: ["Petal Bouquet", "Weekly Subscription", "Wedding Package", "Table Arrangement", "Dried Bunch"],
  Electronics: ["Screen Repair", "Battery Swap", "USB-C Cable", "Wireless Buds", "Fast Charger"],
  Gym: ["Day Pass", "Monthly Membership", "PT Session", "Group Class", "Nutrition Plan"],
  Restaurant: ["Chef's Tasting", "Weekend Brunch", "Private Dining", "Cocktail Class", "Delivery Kit"],
  Jewelry: ["Signet Ring", "Chain Necklace", "Pearl Studs", "Bangle", "Custom Engraving"],
  Bookstore: ["Staff Pick", "Signed First Edition", "Book Club Pass", "Journal", "Gift Card"],
  Pet: ["Full Groom", "Nail Trim", "Puppy Class", "Organic Treats", "Chew Toy"],
  "Bike Shop": ["Full Tune-Up", "Custom Build", "Gravel Tire", "Bike Fit", "Repair Class"],
  "Art & Prints": ["A3 Print", "Original Painting", "Framing", "Sketch Commission", "Studio Visit"],
  Spa: ["60min Massage", "Signature Facial", "Couples Package", "Hot Stone", "Sauna Pass"],
  Wine: ["Tasting Flight", "Monthly Club", "Sommelier Pick", "Case of 6", "Private Event"],
  Supermarket: ["Weekly Box", "Farm Eggs", "Artisan Bread", "Local Honey", "CSA Share"],
  Auto: ["Full Detail", "Ceramic Coating", "Interior Refresh", "Headlight Restore", "Pickup Service"],
  "Fitness Studio": ["Drop-in Class", "10-Pack", "Unlimited Month", "Private Session", "Retreat"],
  Furniture: ["Oak Dining Table", "Accent Chair", "Bookshelf", "Coffee Table", "Custom Build"],
  Cars: ["Sedan — Certified", "SUV — Certified", "Extended Warranty", "Trade-In Appraisal", "Financing Consult"],
  Phones: ["Unlocked Flagship", "Screen Repair", "Battery Replacement", "Trade-In Credit", "Case & Charger Bundle"],
  "Real Estate": ["Buyer Consultation", "Listing Package", "Home Valuation", "Rental Match", "Closing Support"],
  Beauty: ["Lash Lift", "Brow Shape", "Signature Facial", "Makeup Session", "Skincare Bundle"],
  Healthcare: ["New Patient Visit", "Annual Checkup", "Cleaning & Exam", "Consultation", "Follow-up Visit"],
  Pharmacy: ["Prescription Refill", "Flu Shot", "Vitamin Bundle", "Home Delivery", "Consultation"],
  Hotel: ["Standard Room / Night", "Suite / Night", "Late Checkout", "Airport Transfer", "Rooftop Access"],
  Mechanic: ["Oil Change", "Brake Service", "Diagnostics", "State Inspection", "Tire Rotation"],
  Photography: ["Portrait Session", "Wedding Package", "Product Shoot", "Photo Editing", "Print Package"],
  Education: ["1-on-1 Session", "Monthly Package", "Test Prep Bundle", "Group Class", "Assessment"],
  Cleaning: ["Standard Clean", "Deep Clean", "Move-Out Clean", "Recurring Plan", "Add-on: Windows"],
  Repairs: ["Handyman Hour", "Furniture Assembly", "TV Mounting", "Small Repair Bundle", "Consultation"],
  Construction: ["Site Consultation", "Remodel Estimate", "Permit Support", "Project Management", "Material Sourcing"],
};

export const PRODUCTS: Product[] = BUSINESSES.flatMap((b, bi) => {
  const names = PRODUCT_NAMES[b.category] ?? ["Item"];
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `${b.id}-p${i}`,
    businessId: b.id,
    name: names[i % names.length],
    price: Math.round((15 + ((bi + 1) * (i + 2) * 3.14)) % 250) + 9,
    image: b.images[i % b.images.length],
    kind: (i % 5 === 4 ? "service" : "product") as "product" | "service",
    rating: 4.4 + ((i + bi) % 6) / 10,
    tag: i === 0 ? "Bestseller" : i === 2 ? "New" : undefined,
  }));
});

export const productsFor = (bid: string) => PRODUCTS.filter((p) => p.businessId === bid);

export type ChatAttachment =
  | { kind: "product"; productId: string }
  | { kind: "invoice"; amount: number; label: string; status: "unpaid" | "paid" }
  | { kind: "order"; orderId: string; status: "confirmed" | "preparing" | "shipped" | "delivered" }
  | { kind: "location"; label: string }
  | { kind: "voice"; duration: string };

export type Chat = {
  id: string;
  businessId: string;
  last: string;
  time: string;
  unread: number;
  pinned?: boolean;
  archived?: boolean;
  attachment?: ChatAttachment["kind"];
};

export const CHATS: Chat[] = [
  { id: "c1", businessId: "sole", last: "Your order shipped 🚚 — tracking on the way.", time: "9:41 AM", unread: 2, pinned: true, attachment: "order" },
  { id: "c2", businessId: "brew", last: "Grab-and-go ready at the counter ☕️", time: "9:12 AM", unread: 1 },
  { id: "c3", businessId: "casa", last: "Table for 2 booked for Friday.", time: "8:50 AM", unread: 0 },
  { id: "c4", businessId: "glow", last: "🎙 Voice message · 0:24", time: "8:22 AM", unread: 1, attachment: "voice" },
  { id: "c5", businessId: "meridian", last: "Here's your invoice for the weekend stay.", time: "Yesterday", unread: 0, attachment: "invoice" },
  { id: "c6", businessId: "loaf", last: "We saved you the last cardamom bun.", time: "Yesterday", unread: 0 },
  { id: "c7", businessId: "petal", last: "Bouquet delivered — how was it?", time: "Yesterday", unread: 0 },
  { id: "c8", businessId: "torque", last: "📍 Shared location: Torque Auto Repair", time: "Yesterday", unread: 0, attachment: "location" },
  { id: "c9", businessId: "sharp", last: "Wed 4:30 confirmed. See you soon.", time: "Mon", unread: 0 },
  { id: "c10", businessId: "iron", last: "Coach Alex added a new plan.", time: "Mon", unread: 3 },
  { id: "c11", businessId: "mobilehub", last: "Your trade-in quote is ready to review.", time: "Mon", unread: 0 },
  { id: "c12", businessId: "harbor", last: "New listing matches your saved search.", time: "Sun", unread: 1 },
  { id: "c13", businessId: "lumen", last: "Your engraving preview is ready.", time: "Sun", unread: 0 },
  { id: "c14", businessId: "wellpoint", last: "Appointment reminder for tomorrow, 2:00 PM.", time: "Sat", unread: 0 },
  { id: "c15", businessId: "sparkle", last: "We're on our way — 15 minutes out.", time: "Sat", unread: 0 },
  { id: "c16", businessId: "codeforge", last: "Cohort starts Monday — welcome aboard!", time: "Fri", unread: 0 },
  { id: "c17", businessId: "circuit", last: "Repair complete, ready for pickup.", time: "Thu", unread: 0, archived: true },
  { id: "c18", businessId: "still", last: "Thanks for the 5-star review! 💛", time: "Wed", unread: 0, archived: true },
  { id: "c19", businessId: "cellar", last: "Your case ships next Tuesday.", time: "Tue", unread: 0, archived: true },
  { id: "c20", businessId: "oakmill", last: "Delivery scheduled for the 24th.", time: "Last week", unread: 0, archived: true },
];

export const CHAT_REQUESTS = [
  { id: "r1", businessId: "voltix", note: "Wants to send you a quote" },
  { id: "r2", businessId: "drive", note: "Replying to your inquiry" },
  { id: "r3", businessId: "fixit", note: "Available for your repair request" },
];

export const GROUPS = [
  { id: "g1", name: "Brooklyn Foodies", members: 128, last: "Casa Verde brunch this Sunday?" },
  { id: "g2", name: "Runners Club", members: 54, last: "Sole Society drop next week 👀" },
  { id: "g3", name: "Neighborhood Deals", members: 402, last: "Loaf Bakery 20% off Tuesdays." },
  { id: "g4", name: "First-Time Buyers", members: 216, last: "Harbor Realty just listed a 2BR in Wynwood." },
];

export type Story = {
  id: string;
  business: Business;
  cover: string;
  seen: boolean;
  caption: string;
};

const STORY_CAPTIONS = [
  "New arrivals just dropped 🆕",
  "20% off this weekend only",
  "Behind the scenes at the shop 🎬",
  "We're open today until 8 PM",
  "Limited stock — almost gone",
  "Swipe up to see customer reviews ⭐️",
  "Big announcement coming Monday",
  "Now booking for next month",
  "Community shoutout: thank you! 🫶",
  "Fresh batch just came out of the oven",
  "Live from our pop-up event",
  "Meet the team",
];

export const STORIES: Story[] = BUSINESSES.slice(0, 16).map((b, i) => ({
  id: `s${i}`,
  business: b,
  cover: b.images[i % b.images.length],
  seen: i > 7,
  caption: STORY_CAPTIONS[i % STORY_CAPTIONS.length],
}));

export const COMMUNITIES = [
  { id: "co1", name: "Local Makers", members: 2130, cover: img("photo-1523240795612-9a054b0db644") },
  { id: "co2", name: "Weekend Brunch", members: 981, cover: img("photo-1533089860892-a7c6f0a88666") },
  { id: "co3", name: "Home Baristas", members: 512, cover: img("photo-1442512595331-e89e73853f31") },
  { id: "co4", name: "Sneakerheads", members: 3420, cover: img("photo-1595950653106-6c9ebd614d3a") },
  { id: "co5", name: "First-Time Homebuyers", members: 1740, cover: img("photo-1600585154340-be6161a56a0c") },
];

export type Call = {
  id: string;
  businessId: string;
  type: "outgoing" | "incoming";
  mode: "voice" | "video";
  missed: boolean;
  time: string;
};

export const CALLS: Call[] = [
  { id: "ca1", businessId: "sharp", type: "outgoing", mode: "voice", missed: false, time: "Today, 10:14" },
  { id: "ca2", businessId: "petal", type: "incoming", mode: "voice", missed: false, time: "Today, 09:02" },
  { id: "ca3", businessId: "harbor", type: "incoming", mode: "video", missed: false, time: "Today, 08:20" },
  { id: "ca4", businessId: "casa", type: "incoming", mode: "voice", missed: true, time: "Yesterday, 18:33" },
  { id: "ca5", businessId: "iron", type: "outgoing", mode: "voice", missed: false, time: "Yesterday, 07:15" },
  { id: "ca6", businessId: "wellpoint", type: "incoming", mode: "video", missed: false, time: "Yesterday, 14:02" },
  { id: "ca7", businessId: "torque", type: "outgoing", mode: "voice", missed: true, time: "Mon, 11:48" },
  { id: "ca8", businessId: "loaf", type: "incoming", mode: "voice", missed: false, time: "Mon, 08:44" },
  { id: "ca9", businessId: "brew", type: "outgoing", mode: "voice", missed: true, time: "Sun, 16:20" },
  { id: "ca10", businessId: "meridian", type: "incoming", mode: "video", missed: false, time: "Sun, 12:10" },
  { id: "ca11", businessId: "mobilehub", type: "outgoing", mode: "voice", missed: false, time: "Sat, 17:05" },
  { id: "ca12", businessId: "still", type: "incoming", mode: "voice", missed: false, time: "Fri, 09:30" },
];

export const ORDERS = [
  { id: "#WT-2041", customer: "Ava Chen", total: 128, status: "Fulfilled", when: "2h ago" },
  { id: "#WT-2040", customer: "Marcus Lee", total: 42, status: "Preparing", when: "3h ago" },
  { id: "#WT-2039", customer: "Priya Shah", total: 89, status: "Preparing", when: "5h ago" },
  { id: "#WT-2038", customer: "Diego Ruiz", total: 210, status: "Fulfilled", when: "Yesterday" },
  { id: "#WT-2037", customer: "Nina Park", total: 34, status: "Refunded", when: "Yesterday" },
  { id: "#WT-2036", customer: "Sam O'Neill", total: 156, status: "Fulfilled", when: "2d ago" },
];

export const findBusiness = (id: string) => BUSINESSES.find((b) => b.id === id);

export const SEARCH_PLACEHOLDERS = [
  "Shoes near me",
  "Best brunch this weekend",
  "Restaurants open now",
  "Baby clothes",
  "A florist in Brooklyn",
  "Barber shops with no wait",
  "House for sale nearby",
  "Laptop repair today",
  "Hotel with a rooftop bar",
  "Describe what you're looking for",
];

export type Contact = { id: string; name: string; handle: string; avatar: string; color: string; last?: string };

const AVATAR_COLORS = ["#2F6BFF", "#7c3aed", "#f97316", "#0ea5e9", "#db2777", "#15803d", "#b91c1c", "#0e7490"];

const CONTACT_NAMES = [
  "Ava Chen", "Marcus Lee", "Priya Shah", "Diego Ruiz", "Nina Park", "Sam O'Neill",
  "Kai Tanaka", "Zara Ahmed", "Leo Martin", "Iris Wong", "Noah Reed", "Maya Patel",
  "Ethan Cole", "Sofia Rossi", "Jonah Kim", "Layla Hart", "Owen Blake", "Ruby Ford",
  "Theo Sun", "Ella Vance", "Chidi Okafor", "Amara Bello", "Yuki Sato", "Femi Ade",
];

export const CONTACTS: Contact[] = CONTACT_NAMES.map((name, i) => ({
  id: `u${i}`,
  name,
  handle: "@" + name.toLowerCase().replace(/[^a-z]/g, ""),
  avatar: name.split(" ").map((n) => n[0]).join("").slice(0, 2),
  color: AVATAR_COLORS[i % AVATAR_COLORS.length],
  last: ["online", "last seen 2m ago", "last seen 1h ago", "last seen today", "active now"][i % 5],
}));

export type CustomList = { id: string; name: string; emoji: string; count: number; tint: string };

export const LISTS: CustomList[] = [
  { id: "l1", name: "VIP Customers", emoji: "⭐️", count: 24, tint: "#f59e0b" },
  { id: "l2", name: "Suppliers", emoji: "📦", count: 12, tint: "#0ea5e9" },
  { id: "l3", name: "Frequent Buyers", emoji: "🛍", count: 58, tint: "#2F6BFF" },
  { id: "l4", name: "Wholesale", emoji: "🏷", count: 9, tint: "#7c3aed" },
  { id: "l5", name: "Friends", emoji: "🫶", count: 34, tint: "#db2777" },
  { id: "l6", name: "Family", emoji: "🏡", count: 8, tint: "#15803d" },
  { id: "l7", name: "Recently Contacted", emoji: "🕒", count: 41, tint: "#64748b" },
];

export const ME = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  dm: "woot.link/alexmorgan",
  avatar: "AM",
  color: "#2F6BFF",
  role: "Business Owner",
  verified: true,
  business: "Sole Society",
  followers: 12483,
  reviews: 1284,
  plan: "Medium Business",
};
