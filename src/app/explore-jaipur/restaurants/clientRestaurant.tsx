"use client";

import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Star,
  Heart,
  ArrowRight,
  Menu,
  X,
  LayoutGrid,
  UtensilsCrossed,
  Coffee,
  Pizza,
  ConciergeBell,
  Umbrella,
  ShoppingCart,
  CakeSlice,
  Eye,
  Users,
  ChefHat,
  PenLine,
  Building2,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

/* ─────────────────────────── Data ─────────────────────────── */

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Stays", href: "#" },
  { label: "Experiences", href: "#" },
  { label: "Tourist Places", href: "#" },
  { label: "Restaurants", href: "#", active: true },
  { label: "Blogs", href: "#" },
];

const categories = [
  { icon: LayoutGrid, label: "All", active: true },
  { icon: UtensilsCrossed, label: "Rajasthani" },
  { icon: ConciergeBell, label: "North Indian" },
  { icon: Pizza, label: "Italian" },
  { icon: Coffee, label: "Cafe" },
  { icon: UtensilsCrossed, label: "Fine Dining" },
  { icon: Umbrella, label: "Rooftop" },
  { icon: ShoppingCart, label: "Street Food" },
  { icon: CakeSlice, label: "Desserts" },
];

const restaurants = [
  {
    id: 1,
    name: "Bar Palladio",
    badge: "Rooftop",
    cuisines: "Italian, Continental",
    location: "Narain Niwas Palace",
    rating: 4.6,
    reviews: "1.2K",
    price: "₹₹₹₹",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Laxmi Misthan Bhandar",
    badge: "Fine Dining",
    cuisines: "Rajasthani, North Indian",
    location: "MI Road",
    rating: 4.4,
    reviews: "856",
    price: "₹₹",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "The Tattoo Cafe & Lounge",
    badge: "Rooftop",
    cuisines: "Cafe, Italian, Continental",
    location: "Kishanpole Bazar",
    rating: 4.5,
    reviews: "967",
    price: "₹₹₹",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Suvarna Mahal",
    badge: "Fine Dining",
    cuisines: "Rajasthani, Traditional",
    location: "Rambagh Palace",
    rating: 4.7,
    reviews: "1.1K",
    price: "₹₹₹₹",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Tapri Central",
    badge: "Cafe",
    cuisines: "Cafe, Fast Food, Beverages",
    location: "MI Road",
    rating: 4.3,
    reviews: "678",
    price: "₹",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Lassiwala",
    badge: "Street Food",
    cuisines: "Street Food, Beverages",
    location: "Johari Bazar",
    rating: 4.5,
    reviews: "3.7K",
    price: "₹",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Skyfall by Replay",
    badge: "Rooftop",
    cuisines: "Multi-cuisine, Cafe, Bar",
    location: "C-Scheme",
    rating: 4.4,
    reviews: "832",
    price: "₹₹₹",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Nibs – The Dessert Cafe",
    badge: "Desserts",
    cuisines: "Desserts, Beverages",
    location: "C-Scheme",
    rating: 4.6,
    reviews: "1.0K",
    price: "₹₹",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
  },
];

const rooftopFeatures = [
  {
    icon: Eye,
    title: "Scenic Views",
    desc: "Breathtaking views of forts, palaces & city lights",
  },
  {
    icon: Users,
    title: "Perfect Ambience",
    desc: "Cozy, romantic & family friendly settings",
  },
  {
    icon: ChefHat,
    title: "Great Food",
    desc: "Delicious cuisines curated for every palate",
  },
];

const stats = [
  { icon: Building2, value: "200+", label: "Restaurants" },
  { icon: UtensilsCrossed, value: "25+", label: "Cuisines" },
  { icon: Star, value: "15K+", label: "Reviews" },
];

/* ─────────────────────────── Components ─────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-text-primary tracking-tight">
                HappyStay
              </span>
              <span className="text-[10px] text-text-muted font-medium tracking-wide uppercase">
                Jaipur
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? "text-text-primary border-b-2 border-brand-600 pb-0.5"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="rounded-full border border-border-strong px-5 py-2 text-sm font-medium text-text-primary hover:border-brand-300 transition-colors">
              Login
            </button>
            <button className="rounded-full bg-brand-700 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
              List Your Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-surface px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                link.active
                  ? "bg-brand-50 text-brand-600"
                  : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button className="w-full rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-text-primary">
              Login
            </button>
            <button className="w-full rounded-full bg-brand-700 px-5 py-2.5 text-sm font-medium text-white">
              List Your Property
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <>
    <section className="relative w-full h-[70dvh] overflow-hidden  sm:pt-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
          alt="Jaipur Restaurant"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-16 lg:px-20">
        <div className="flex min-h-[500px] sm:min-h-[540px] items-center">
          <div className="w-full lg:w-1/2 pt-10 pb-28 sm:pb-32">
            {/* Script label */}
            <p className="font-[family-name:var(--font-dancing)] text-2xl sm:text-3xl text-brand-600 mb-2">
              Savor Jaipur
            </p>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] mb-4">
              Best
              Restaurants<br />
              in <span className="text-brand-700">Jaipur</span>
            </h1>

            {/* Description */}
            <p className="max-w-sm text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              From royal Rajasthani thalis to rooftop cafes with a view – explore the finest dining experiences in the Pink City.
            </p>

            {/* CTA Button */}
            {/* <button className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
              style={{ boxShadow: "0 4px 20px rgba(67, 56, 202, 0.35)" }}
            >
              Explore Restaurants
              <ArrowRight className="h-4 w-4" />
            </button> */}
          </div>
        </div>
      </div>

    
    </section>
      {/* Search Bar */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-14 mb-10 ">
        <div
          className="rounded-2xl bg-surface border border-border p-3 sm:p-4"
          style={{ boxShadow: "0 8px 60px rgba(99, 102, 241, 0.1)" }}
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="flex-[1.5] relative">
              <div className="flex items-center gap-2 rounded-xl border border-border-strong bg-surface-muted px-4 py-3">
                <Search className="h-4 w-4 text-text-faint shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-text-muted font-medium leading-none">Search Restaurant</span>
                  <input
                    type="text"
                    placeholder="Search for restaurants, cuisines..."
                    className="bg-transparent text-sm text-text-primary placeholder:text-text-faint outline-none w-full"
                  />
                </div>
              </div>
            </div>

            {/* Cuisine */}
            <div className="flex-1 relative">
              <button className="w-full flex items-center justify-between rounded-xl border border-border-strong bg-surface-muted px-4 py-3 text-sm text-text-primary hover:border-brand-200 transition-colors">
                <span className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-text-faint" />
                  <span className="flex flex-col items-start">
                    <span className="text-[10px] text-text-muted font-medium leading-none">Cuisine</span>
                    <span className="text-sm">All Cuisines</span>
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </button>
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <button className="w-full flex items-center justify-between rounded-xl border border-border-strong bg-surface-muted px-4 py-3 text-sm text-text-primary hover:border-brand-200 transition-colors">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-text-faint" />
                  <span className="flex flex-col items-start">
                    <span className="text-[10px] text-text-muted font-medium leading-none">Location</span>
                    <span className="text-sm">Jaipur, Rajasthan</span>
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 text-text-muted" />
              </button>
            </div>

            {/* Search Button */}
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shrink-0">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </>
    
  );
}

function CategoryFilter() {
  const [active, setActive] = useState("All");

  return (
    <section className="">
      <div className="mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = active === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                className={`flex flex-col items-center gap-2 min-w-[72px] px-3 py-3 rounded-xl transition-all duration-200 
                 `}
              >
                <div className={`flex items-center justify-center h-12 w-12 rounded-lg border ${isActive ? "bg-brand-50 border-brand-600" : "bg-surface-muted border-border-strong"}`}>
                <cat.icon
                  className={`h-6 w-6  ${isActive ? "text-brand-600 " : "text-text-faint"}`}
                  strokeWidth={1.5}
                /></div>
                <span className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-brand-600" : ""}`}>
                  {cat.label}
                </span>
                {isActive && (
                  <span className="h-0.5 w-6 rounded-full bg-brand-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text, script = false }: { text: string; script?: boolean }) {
  if (script) {
    return (
      <p className="font-[family-name:var(--font-dancing)] text-xl sm:text-2xl text-brand-600 text-center mb-1">
        {text}
      </p>
    );
  }
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-border-strong" />
      <span className="text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
        {text}
      </span>
      <span className="h-px w-10 bg-border-strong" />
    </div>
  );
}

function RestaurantCard({
  restaurant,
}: {
  restaurant: (typeof restaurants)[0];
}) {
  const badgeColors: Record<string, string> = {
    Rooftop: "bg-brand-600",
    "Fine Dining": "bg-brand-700",
    Cafe: "bg-brand-500",
    "Street Food": "bg-text-secondary",
    Desserts: "bg-brand-600",
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-surface border border-border hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white ${
            badgeColors[restaurant.badge] || "bg-brand-600"
          }`}
        >
          {restaurant.badge}
        </div>

        {/* Heart */}
        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-text-muted hover:text-brand-600 backdrop-blur-sm transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="text-sm font-semibold text-text-primary mb-0.5 truncate">
          {restaurant.name}
        </h3>
        <p className="text-xs text-text-muted mb-1.5">{restaurant.cuisines}</p>

        <div className="flex items-center gap-1 text-text-muted mb-2">
          <MapPin className="h-3 w-3" />
          <span className="text-xs">{restaurant.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-rating text-rating" />
            <span className="text-xs font-semibold text-text-primary">
              {restaurant.rating}
            </span>
            <span className="text-xs text-text-muted">
              ({restaurant.reviews})
            </span>
          </div>
          <span className="text-xs text-text-muted font-medium">
            {restaurant.price}
          </span>
        </div>
      </div>
    </div>
  );
}

function TopRestaurants() {
  return (
    <section className="py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel text="Handpicked for You" script />
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-text-primary text-center mb-2">
          Top Restaurants in Jaipur
        </h2>
        <p className="text-center text-text-muted text-sm sm:text-base max-w-xl mx-auto mb-8">
          Discover popular dining spots loved by locals and travelers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-8 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white transition-all duration-300">
            View All Restaurants
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function RooftopSection() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl bg-surface border border-border overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          {/* Subtle palace watermark on right */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.2] pointer-events-none hidden lg:block">
            <img src="/happy-stay-jaipur-home-bottom-cta-left.png" alt="Watermark" className="h-full w-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-auto min-h-[300px] ">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                alt="Rooftop Dining"
                fill
                className="object-cover rounded-b-2xl sm:rounded-r-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:bg-gradient-to-l" />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-8  flex flex-col justify-center relative">
              <p className="font-[family-name:var(--font-dancing)] text-xl text-brand-600 mb-1">
                Dine with a View
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-3">
                Rooftop Restaurants<br />You&apos;ll Love
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Enjoy delicious food with stunning views of Jaipur&apos;s skyline and heritage.
              </p>
              <button className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors w-fit"
                style={{ boxShadow: "0 4px 20px rgba(67, 56, 202, 0.35)" }}
              >
                Explore Rooftop Dining
                <ArrowRight className="h-4 w-4" />
              </button>

            
            </div>
              {/* Features */}
              <div className="px-3 pb-3 sm:pb-0 sm:px-0 mt-3 sm:mt-18 space-y-8">
                {rooftopFeatures.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <f.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">
                        {f.title}
                      </h4>
                      <p className="text-xs text-text-muted">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="py-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-brand-700)" }}
    >
      {/* Subtle palace watermark */}
      <div className="absolute right-0 top-0 bottom-0  h-full  opacity-[0.6] pointer-events-none hidden md:block">
        <img src="/restaurent-cta-img.png" alt="Watermark" className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Left CTA */}
          <div className="text-center lg:text-left">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-white mb-2">
              Love a Place?
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-xs mb-5">
              Share your experience and help others discover the best.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors">
              <PenLine className="h-4 w-4" />
              Write a Review
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex  items-center gap-10 sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:flex-row items-center text-center">
                <div className="flex w-12 h-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 border-white/30 text-white mb-2">
                  <stat.icon className="w-5 h-5 sm:h-8 sm:w-8 " strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center pl-2">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-white/70">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function RestaurantsPage() {
  return (
    <main
      className={`${playfair.variable} ${inter.variable} ${dancing.variable} min-h-screen bg-brand-50/50 font-[family-name:var(--font-inter)]`}
    >
      {/* <Navbar /> */}
      <Hero />
      <CategoryFilter />
      <TopRestaurants />
      <RooftopSection />
      <StatsBanner />

      <div className="h-6" />
    </main>
  );
}