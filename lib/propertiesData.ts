import type { Property } from "@/components/PropertyCarousel";

// A small, reusable pool of Unsplash images per property style.
// Swap these for real listing photos when you wire up the backend.
const img = {
  villa1: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
  villa2: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
  villa3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
  apt1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
  apt2: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
  apt3: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
  hotel1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  hotel2: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
  hotel3: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
  home1: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
  home2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  home3: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
  farm1: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
  farm2: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&q=80&w=800",
  farm3: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
  budget1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  budget2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
  luxury1: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
  luxury2: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
  luxury3: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800",
};

export const villas: Property[] = [
  {
    id: "v1", title: "Luxury Heritage Villa", location: "Vaishali Nagar, Jaipur",
    price: "₹7,999", rating: 4.9, reviewsCount: 78, image: img.villa1,
    badge: "Luxury", badgeColor: "var(--color-badge-luxury)",
    guests: 8, bedrooms: 4, bathrooms: 3,
    amenities: ["Private Pool", "Free Wifi", "Parking", "AC"],
  },
  {
    id: "v2", title: "Pink City Rooftop Villa", location: "Bani Park, Jaipur",
    price: "₹4,999", rating: 4.7, reviewsCount: 96, image: img.villa2,
    badge: "New", badgeColor: "var(--color-badge-new)",
    guests: 4, bedrooms: 2, bathrooms: 2,
    amenities: ["Rooftop", "Free Wifi", "Kitchen"],
  },
  {
    id: "v3", title: "Private Pool Villa", location: "Amer Road, Jaipur",
    price: "₹9,499", rating: 4.8, reviewsCount: 54, image: img.villa3,
    guests: 10, bedrooms: 5, bathrooms: 4,
    amenities: ["Private Pool", "Garden", "Parking", "AC", "Free Wifi"],
  },
  {
    id: "v4", title: "Garden View Villa", location: "Jagatpura, Jaipur",
    price: "₹6,299", rating: 4.6, reviewsCount: 61, image: img.villa1,
    badge: "Guest favorite", badgeColor: "var(--color-badge-favorite)",
    guests: 6, bedrooms: 3, bathrooms: 2,
    amenities: ["Garden", "Parking", "Kitchen", "AC"],
  },
  {
    id: "v5", title: "Royal Courtyard Villa", location: "Civil Lines, Jaipur",
    price: "₹8,750", rating: 4.9, reviewsCount: 43, image: img.villa2,
    guests: 8, bedrooms: 4, bathrooms: 3,
    amenities: ["Courtyard", "Free Wifi", "Parking", "AC"],
  },
  {
    id: "v6", title: "Modern 3BHK Villa", location: "Mansarovar, Jaipur",
    price: "₹5,899", rating: 4.5, reviewsCount: 88, image: img.villa3,
    guests: 6, bedrooms: 3, bathrooms: 2,
    amenities: ["Free Wifi", "Kitchen", "Parking"],
  },
  {
    id: "v7", title: "Sunset Terrace Villa", location: "Nahargarh Road, Jaipur",
    price: "₹7,250", rating: 4.7, reviewsCount: 37, image: img.villa2,
    guests: 6, bedrooms: 3, bathrooms: 3,
    amenities: ["Terrace", "Private Pool", "Free Wifi"],
  },
  {
    id: "v8", title: "Emerald Lawns Villa", location: "Sanganer, Jaipur",
    price: "₹5,499", rating: 4.4, reviewsCount: 52, image: img.villa1,
    guests: 5, bedrooms: 3, bathrooms: 2,
    amenities: ["Garden", "Parking", "AC"],
  },
];


export const apartments: Property[] = [
  {
    id: "a1", title: "Designer Apartment", location: "Malviya Nagar, Jaipur",
    price: "₹2,799", rating: 4.6, reviewsCount: 103, image: img.apt1,
    badge: "Guest favorite", badgeColor: "var(--color-badge-favorite)",
    guests: 4, bedrooms: 2, bathrooms: 2, furnishing: "Furnished",
    amenities: ["Free Wifi", "AC", "Lift", "Parking"],
  },
  {
    id: "a2", title: "1 RK Apartment", location: "Mansarovar, Jaipur",
    price: "₹8,500", priceUnit: "month", rating: 4.4, reviewsCount: 39, image: img.apt2,
    guests: 2, bedrooms: 1, bathrooms: 1, furnishing: "Semi-Furnished",
    amenities: ["Kitchen", "Parking"],
  },
  {
    id: "a3", title: "2BHK City View Apartment", location: "C-Scheme, Jaipur",
    price: "₹3,299", rating: 4.7, reviewsCount: 72, image: img.apt3,
    guests: 5, bedrooms: 2, bathrooms: 2, furnishing: "Furnished",
    amenities: ["Free Wifi", "AC", "Balcony", "Lift"],
  },
  {
    id: "a4", title: "Cozy Studio Apartment", location: "Raja Park, Jaipur",
    price: "₹2,299", rating: 4.5, reviewsCount: 58, image: img.apt1,
    guests: 2, bedrooms: 1, bathrooms: 1, furnishing: "Furnished",
    amenities: ["Free Wifi", "Kitchen"],
  },
  {
    id: "a5", title: "Furnished Business Suite", location: "Tonk Road, Jaipur",
    price: "₹3,999", rating: 4.6, reviewsCount: 47, image: img.apt2,
    badge: "New", badgeColor: "var(--color-badge-new)",
    guests: 3, bedrooms: 1, bathrooms: 1, furnishing: "Furnished",
    amenities: ["Free Wifi", "AC", "Workspace", "Lift"],
  },
  {
    id: "a6", title: "Skyline View Apartment", location: "Vidyadhar Nagar, Jaipur",
    price: "₹3,150", rating: 4.3, reviewsCount: 65, image: img.apt3,
    guests: 4, bedrooms: 2, bathrooms: 1, furnishing: "Semi-Furnished",
    amenities: ["Parking", "Lift"],
  },
  {
    id: "a7", title: "3BHK Family Apartment", location: "Jagatpura, Jaipur",
    price: "₹4,599", rating: 4.5, reviewsCount: 84, image: img.apt1,
    guests: 6, bedrooms: 3, bathrooms: 2, furnishing: "Furnished",
    amenities: ["Free Wifi", "AC", "Parking", "Kids Area"],
  },
  {
    id: "a8", title: "Unfurnished 2BHK Flat", location: "Sanganer, Jaipur",
    price: "₹2,899", rating: 4.1, reviewsCount: 28, image: img.apt2,
    guests: 4, bedrooms: 2, bathrooms: 1, furnishing: "Unfurnished",
    amenities: ["Parking", "Lift"],
  },
];

export const hotels: Property[] = [
  {
    id: "h1", title: "Heritage Haveli Stay", location: "GSchome, Jaipur",
    price: "₹3,499", rating: 4.8, reviewsCount: 128, image: img.hotel1,
    badge: "Guest favorite", badgeColor: "var(--color-badge-favorite)",
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 4, breakfastIncluded: true,
    amenities: ["Free Wifi", "Breakfast", "AC", "Room Service"],
  },
  {
    id: "h2", title: "Boutique Palace Hotel", location: "MI Road, Jaipur",
    price: "₹4,250", rating: 3, reviewsCount: 91, image: img.hotel2,
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 5, breakfastIncluded: true,
    amenities: ["Pool", "Spa", "Free Wifi", "Breakfast"],
  },
  {
    id: "h3", title: "The Pink City Inn", location: "Johari Bazaar, Jaipur",
    price: "₹2,899", rating: 4.4, reviewsCount: 112, image: img.hotel3,
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 3, breakfastIncluded: false,
    amenities: ["Free Wifi", "AC"],
  },
  {
    id: "h4", title: "Rambagh View Hotel", location: "Bhawani Singh Rd, Jaipur",
    price: "₹5,499", rating: 4.8, reviewsCount: 66, image: img.hotel1,
    guests: 3, bedrooms: 1, bathrooms: 1, starRating: 5, breakfastIncluded: true,
    amenities: ["Pool", "Spa", "Gym", "Breakfast", "Free Wifi"],
  },
  {
    id: "h5", title: "Central Comfort Hotel", location: "Station Road, Jaipur",
    price: "₹2,199", rating: 4.2, reviewsCount: 140, image: img.hotel2,
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 3, breakfastIncluded: false,
    amenities: ["Free Wifi", "Parking"],
  },
  {
    id: "h6", title: "Amber Fort View Hotel", location: "Amer, Jaipur",
    price: "₹3,899", rating: 4.6, reviewsCount: 84, image: img.hotel3,
    badge: "New", badgeColor: "var(--color-badge-new)",
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 4, breakfastIncluded: true,
    amenities: ["Free Wifi", "Breakfast", "AC", "Room Service"],
  },
  {
    id: "h7", title: "Grand Rajputana Hotel", location: "Sansar Chandra Rd, Jaipur",
    price: "₹6,299", rating: 5, reviewsCount: 58, image: img.hotel1,
    badge: "Luxury", badgeColor: "var(--color-badge-luxury)",
    guests: 3, bedrooms: 1, bathrooms: 1, starRating: 5, breakfastIncluded: true,
    amenities: ["Pool", "Spa", "Gym", "Breakfast", "Bar"],
  },
  {
    id: "h8", title: "Budget Traveller's Hotel", location: "Ajmer Road, Jaipur",
    price: "₹1,499", rating: 4, reviewsCount: 97, image: img.hotel2,
    guests: 2, bedrooms: 1, bathrooms: 1, starRating: 3, breakfastIncluded: false,
    amenities: ["Free Wifi"],
  },
];

export const homestays: Property[] = [
  { id: "hs1", title: "Traditional Rajasthani Homestay", location: "Bapu Nagar, Jaipur", price: "₹1,899", rating: 4.7, reviewsCount: 52, image: img.home1 },
  { id: "hs2", title: "Family-run Garden Homestay", location: "Jagatpura, Jaipur", price: "₹1,650", rating: 4.6, reviewsCount: 38, image: img.home2 },
  { id: "hs3", title: "Cozy Rooftop Homestay", location: "Sanganer, Jaipur", price: "₹1,499", rating: 4.5, reviewsCount: 47, image: img.home3, badge: "Guest favorite", badgeColor: "var(--color-badge-favorite)" },
  { id: "hs4", title: "Local Culture Homestay", location: "Chandpole, Jaipur", price: "₹1,750", rating: 4.8, reviewsCount: 29, image: img.home1 },
  { id: "hs5", title: "Peaceful Courtyard Homestay", location: "Vaishali Nagar, Jaipur", price: "₹1,999", rating: 4.4, reviewsCount: 33, image: img.home2 },
  { id: "hs6", title: "Home-cooked Meals Homestay", location: "Malviya Nagar, Jaipur", price: "₹1,599", rating: 4.6, reviewsCount: 41, image: img.home3 },
];

export const farmhouses: Property[] = [
  { id: "f1", title: "Riverside Farmhouse Retreat", location: "Chatsu Road, Jaipur", price: "₹6,499", rating: 4.7, reviewsCount: 36, image: img.farm1 },
  { id: "f2", title: "Organic Farm Stay", location: "Bassi, Jaipur", price: "₹5,299", rating: 4.5, reviewsCount: 24, image: img.farm2, badge: "New", badgeColor: "var(--color-badge-new)" },
  { id: "f3", title: "Weekend Farmhouse with Pool", location: "Achrol, Jaipur", price: "₹8,999", rating: 4.8, reviewsCount: 19, image: img.farm3 },
  { id: "f4", title: "Mustard Field Farmhouse", location: "Dudu, Jaipur", price: "₹4,750", rating: 4.4, reviewsCount: 27, image: img.farm1 },
  { id: "f5", title: "Bonfire & Barn Farmhouse", location: "Chomu, Jaipur", price: "₹7,250", rating: 4.6, reviewsCount: 31, image: img.farm2 },
  { id: "f6", title: "Countryside Escape Farmhouse", location: "Shahpura, Jaipur", price: "₹5,999", rating: 4.5, reviewsCount: 22, image: img.farm3 },
];

export const budgetStays: Property[] = [
  { id: "b1", title: "Fully Furnished Room", location: "Vidyadhar Nagar, Jaipur", price: "₹5,000", priceUnit: "month", rating: 4.2, reviewsCount: 45, image: img.budget1 },
  { id: "b2", title: "Boys PG Room", location: "Malviya Nagar, Jaipur", price: "₹6,000", priceUnit: "month", rating: 4.1, reviewsCount: 58, image: img.budget2 },
  { id: "b3", title: "Simple Shared Room", location: "Mansarovar, Jaipur", price: "₹899", rating: 4.0, reviewsCount: 63, image: img.budget1, badge: "Guest favorite", badgeColor: "var(--color-badge-favorite)" },
  { id: "b4", title: "Backpacker Hostel Bed", location: "Bani Park, Jaipur", price: "₹549", rating: 4.3, reviewsCount: 92, image: img.budget2 },
  { id: "b5", title: "Compact Studio Stay", location: "Jagatpura, Jaipur", price: "₹1,099", rating: 4.1, reviewsCount: 37, image: img.budget1 },
  { id: "b6", title: "No-frills City Room", location: "Raja Park, Jaipur", price: "₹799", rating: 3.9, reviewsCount: 51, image: img.budget2 },
];

export const luxuryStays: Property[] = [
  { id: "l1", title: "Royal Palace Suite", location: "Civil Lines, Jaipur", price: "₹14,999", rating: 4.9, reviewsCount: 34, image: img.luxury1, badge: "Luxury", badgeColor: "var(--color-badge-luxury)" },
  { id: "l2", title: "5-Star Heritage Resort", location: "Amer Road, Jaipur", price: "₹18,499", rating: 4.9, reviewsCount: 27, image: img.luxury2, badge: "Luxury", badgeColor: "var(--color-badge-luxury)" },
  { id: "l3", title: "Private Infinity Pool Villa", location: "Vaishali Nagar, Jaipur", price: "₹22,999", rating: 5.0, reviewsCount: 15, image: img.luxury3 },
  { id: "l4", title: "Maharaja Themed Suite", location: "MI Road, Jaipur", price: "₹12,750", rating: 4.8, reviewsCount: 41, image: img.luxury1 },
  { id: "l5", title: "Skyline Penthouse", location: "C-Scheme, Jaipur", price: "₹16,299", rating: 4.7, reviewsCount: 22, image: img.luxury2 },
  { id: "l6", title: "Fort View Luxury Villa", location: "Amer, Jaipur", price: "₹19,999", rating: 4.9, reviewsCount: 18, image: img.luxury3, badge: "Luxury", badgeColor: "var(--color-badge-luxury)" },
];

export interface CategoryConfig {
  id: string;
  label: string;
  subtitle: string;
  iconName: "Castle" | "Building2" | "Hotel" | "Home" | "Trees" | "Wallet" | "Gem";
  data: Property[];
}

export const propertyCategories: CategoryConfig[] = [
  { id: "villas", label: "Villas", subtitle: "Private villas with space to spread out", iconName: "Castle", data: villas },
  { id: "apartments", label: "Apartments", subtitle: "Serviced apartments for short & long stays", iconName: "Building2", data: apartments },
  { id: "hotels", label: "Hotels", subtitle: "Handpicked hotels across Jaipur", iconName: "Hotel", data: hotels },
  { id: "homestays", label: "Homestays", subtitle: "Live like a local with a host family", iconName: "Home", data: homestays },
  { id: "farmhouses", label: "Farmhouses", subtitle: "Escape the city to the countryside", iconName: "Trees", data: farmhouses },
  { id: "budget-stays", label: "Budget Stays", subtitle: "Great stays that go easy on your wallet", iconName: "Wallet", data: budgetStays },
  { id: "luxury-stays", label: "Luxury Stays", subtitle: "Indulgent stays for the finer moments", iconName: "Gem", data: luxuryStays },
];