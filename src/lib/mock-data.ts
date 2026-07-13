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
  description: string;
  images: string[];
  cover: string;
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
};
const pack = (key: keyof typeof IMAGES) => IMAGES[key].map((i) => img(i));

export const BUSINESSES: Business[] = [
  { id: "sole", name: "Sole Society", handle: "@solesociety", category: "Shoes", logo: "👟", color: "#111827", verified: true, location: "Brooklyn, NY", distance: "0.4 mi", rating: 4.9, reviews: 1284, description: "Handcrafted sneakers made in small batches. Free 30-day returns.", images: pack("shoes"), cover: pack("shoes")[0] },
  { id: "brew", name: "Brew & Bloom", handle: "@brewbloom", category: "Cafe", logo: "☕️", color: "#7c4a2b", verified: true, location: "Portland, OR", distance: "0.8 mi", rating: 4.8, reviews: 942, description: "Single-origin coffee and seasonal florals under one roof.", images: pack("cafe"), cover: pack("cafe")[0] },
  { id: "loaf", name: "Loaf Bakery", handle: "@loafbakery", category: "Bakery", logo: "🥐", color: "#c98a3d", verified: true, location: "Austin, TX", distance: "1.1 mi", rating: 4.9, reviews: 2033, description: "Sourdough, pastries and cakes baked before sunrise.", images: pack("bakery"), cover: pack("bakery")[0] },
  { id: "north", name: "North Atelier", handle: "@northatelier", category: "Fashion", logo: "🧥", color: "#1f2937", verified: true, location: "Los Angeles, CA", distance: "2.3 mi", rating: 4.7, reviews: 566, description: "Minimalist ready-to-wear, ethically produced.", images: pack("fashion"), cover: pack("fashion")[0] },
  { id: "tiny", name: "Tiny Bloom", handle: "@tinybloom", category: "Baby & Kids", logo: "🍼", color: "#f472b6", verified: true, location: "Seattle, WA", distance: "0.6 mi", rating: 4.8, reviews: 812, description: "Organic baby clothes and gentle skincare.", images: pack("baby"), cover: pack("baby")[0] },
  { id: "sharp", name: "Sharp & Co.", handle: "@sharpco", category: "Barber", logo: "💈", color: "#0f172a", verified: true, location: "Chicago, IL", distance: "0.3 mi", rating: 4.9, reviews: 1420, description: "Classic cuts, hot towels, and no wait times.", images: pack("barber"), cover: pack("barber")[0] },
  { id: "petal", name: "Petal Studio", handle: "@petalstudio", category: "Florist", logo: "🌸", color: "#db2777", verified: true, location: "San Francisco, CA", distance: "1.5 mi", rating: 4.9, reviews: 671, description: "Same-day bouquets and event installations.", images: pack("flowers"), cover: pack("flowers")[0] },
  { id: "circuit", name: "Circuit Lab", handle: "@circuitlab", category: "Electronics", logo: "🔌", color: "#2563eb", verified: true, location: "Denver, CO", distance: "3.2 mi", rating: 4.6, reviews: 388, description: "Repairs and gear for phones, tablets and laptops.", images: pack("tech"), cover: pack("tech")[0] },
  { id: "iron", name: "Iron & Oak Gym", handle: "@ironoak", category: "Gym", logo: "🏋️", color: "#111827", verified: true, location: "Miami, FL", distance: "0.9 mi", rating: 4.8, reviews: 1104, description: "24/7 strength gym with personal coaching.", images: pack("gym"), cover: pack("gym")[0] },
  { id: "casa", name: "Casa Verde", handle: "@casaverde", category: "Restaurant", logo: "🌿", color: "#166534", verified: true, location: "Brooklyn, NY", distance: "0.7 mi", rating: 4.9, reviews: 2871, description: "Plant-forward Mexican cooking with a natural wine list.", images: pack("restaurant"), cover: pack("restaurant")[0] },
  { id: "lumen", name: "Lumen Jewelry", handle: "@lumen", category: "Jewelry", logo: "💎", color: "#0ea5e9", verified: true, location: "New York, NY", distance: "4.1 mi", rating: 4.9, reviews: 512, description: "Recycled gold, ethically sourced stones.", images: pack("jewelry"), cover: pack("jewelry")[0] },
  { id: "margin", name: "Margin Books", handle: "@marginbooks", category: "Bookstore", logo: "📚", color: "#7c2d12", verified: true, location: "Boston, MA", distance: "1.8 mi", rating: 4.9, reviews: 634, description: "Independent bookstore with weekly readings.", images: pack("bookstore"), cover: pack("bookstore")[0] },
  { id: "paws", name: "Paws & Co.", handle: "@pawsco", category: "Pet", logo: "🐾", color: "#b45309", verified: true, location: "Nashville, TN", distance: "0.5 mi", rating: 4.8, reviews: 921, description: "Grooming, treats and everything for your best friend.", images: pack("pet"), cover: pack("pet")[0] },
  { id: "spin", name: "Spin Cycles", handle: "@spincycles", category: "Bike Shop", logo: "🚲", color: "#0f766e", verified: true, location: "Minneapolis, MN", distance: "2.7 mi", rating: 4.7, reviews: 402, description: "Tune-ups, custom builds, and gravel gear.", images: pack("bike"), cover: pack("bike")[0] },
  { id: "hue", name: "Hue Studio", handle: "@huestudio", category: "Art & Prints", logo: "🎨", color: "#7c3aed", verified: true, location: "San Diego, CA", distance: "3.0 mi", rating: 4.8, reviews: 289, description: "Original artwork and limited-edition prints.", images: pack("art"), cover: pack("art")[0] },
  { id: "still", name: "Still Spa", handle: "@stillspa", category: "Spa", logo: "🧖", color: "#0e7490", verified: true, location: "Scottsdale, AZ", distance: "5.4 mi", rating: 4.9, reviews: 1188, description: "Massage, facials and quiet.", images: pack("spa"), cover: pack("spa")[0] },
  { id: "cellar", name: "Cellar & Co.", handle: "@cellar", category: "Wine", logo: "🍷", color: "#7f1d1d", verified: true, location: "Napa, CA", distance: "8.2 mi", rating: 4.8, reviews: 741, description: "Curated natural wines with weekly tastings.", images: pack("wine"), cover: pack("wine")[0] },
  { id: "green", name: "Greenline Market", handle: "@greenline", category: "Grocery", logo: "🥬", color: "#15803d", verified: true, location: "Philadelphia, PA", distance: "0.2 mi", rating: 4.7, reviews: 1560, description: "Neighborhood grocer stocking local farms.", images: pack("grocery"), cover: pack("grocery")[0] },
  { id: "drive", name: "Drive Detail", handle: "@drivedetail", category: "Auto", logo: "🚗", color: "#1e40af", verified: true, location: "Houston, TX", distance: "6.1 mi", rating: 4.8, reviews: 322, description: "Mobile detailing and ceramic coating.", images: pack("auto"), cover: pack("auto")[0] },
  { id: "pulse", name: "Pulse Fitness", handle: "@pulse", category: "Fitness Studio", logo: "💪", color: "#b91c1c", verified: true, location: "Atlanta, GA", distance: "1.4 mi", rating: 4.8, reviews: 894, description: "HIIT and pilates classes daily.", images: pack("fitness"), cover: pack("fitness")[0] },
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
  Grocery: ["Weekly Box", "Farm Eggs", "Artisan Bread", "Local Honey", "CSA Share"],
  Auto: ["Full Detail", "Ceramic Coating", "Interior Refresh", "Headlight Restore", "Pickup Service"],
  "Fitness Studio": ["Drop-in Class", "10-Pack", "Unlimited Month", "Private Session", "Retreat"],
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

export type Chat = {
  id: string;
  businessId: string;
  last: string;
  time: string;
  unread: number;
  pinned?: boolean;
};

export const CHATS: Chat[] = [
  { id: "c1", businessId: "sole", last: "Your order shipped 🚚 — tracking on the way.", time: "9:41 AM", unread: 2, pinned: true },
  { id: "c2", businessId: "brew", last: "Grab-and-go ready at the counter ☕️", time: "9:12 AM", unread: 1 },
  { id: "c3", businessId: "loaf", last: "We saved you the last cardamom bun.", time: "Yesterday", unread: 0 },
  { id: "c4", businessId: "petal", last: "Bouquet delivered — how was it?", time: "Yesterday", unread: 0 },
  { id: "c5", businessId: "sharp", last: "Wed 4:30 confirmed. See you soon.", time: "Mon", unread: 0 },
  { id: "c6", businessId: "casa", last: "Table for 2 booked for Friday.", time: "Sun", unread: 0 },
  { id: "c7", businessId: "iron", last: "Coach Alex added a new plan.", time: "Sat", unread: 3 },
  { id: "c8", businessId: "lumen", last: "Your engraving preview is ready.", time: "Fri", unread: 0 },
];

export const CHAT_REQUESTS = [
  { id: "r1", businessId: "circuit", note: "Wants to send you a quote" },
  { id: "r2", businessId: "drive", note: "Replying to your inquiry" },
];

export const GROUPS = [
  { id: "g1", name: "Brooklyn Foodies", members: 128, last: "Casa Verde brunch this Sunday?" },
  { id: "g2", name: "Runners Club", members: 54, last: "Sole Society drop next week 👀" },
  { id: "g3", name: "Neighborhood Deals", members: 402, last: "Loaf Bakery 20% off Tuesdays." },
];

export const STORIES = BUSINESSES.slice(0, 10).map((b, i) => ({
  id: `s${i}`,
  business: b,
  cover: b.images[i % b.images.length],
  seen: i > 4,
}));

export const COMMUNITIES = [
  { id: "co1", name: "Local Makers", members: 2130, cover: img("photo-1523240795612-9a054b0db644") },
  { id: "co2", name: "Weekend Brunch", members: 981, cover: img("photo-1533089860892-a7c6f0a88666") },
  { id: "co3", name: "Home Baristas", members: 512, cover: img("photo-1442512595331-e89e73853f31") },
  { id: "co4", name: "Sneakerheads", members: 3420, cover: img("photo-1595950653106-6c9ebd614d3a") },
];

export const CALLS = [
  { id: "ca1", businessId: "sharp", type: "outgoing", missed: false, time: "Today, 10:14" },
  { id: "ca2", businessId: "petal", type: "incoming", missed: false, time: "Today, 09:02" },
  { id: "ca3", businessId: "casa", type: "incoming", missed: true, time: "Yesterday, 18:33" },
  { id: "ca4", businessId: "iron", type: "outgoing", missed: false, time: "Yesterday, 07:15" },
  { id: "ca5", businessId: "loaf", type: "incoming", missed: false, time: "Mon, 08:44" },
  { id: "ca6", businessId: "brew", type: "outgoing", missed: true, time: "Sun, 16:20" },
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
  "Describe what you're looking for",
];