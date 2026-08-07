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
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
  PartyPopper,
  Mountain,
  Camera,
  Crown,
  Palette,
  ChefHat,
  TreePine,
  CalendarDays,
  Building2,
  ArrowRight,
  Menu,
  X,
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

const places = [
  {
    id: 1,
    rank: "#1",
    name: "Hawa Mahal",
    tagline: "Jaipur's Iconic Landmark",
    rating: 4.8,
    reviews: "12k+",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    rank: "#2",
    name: "Amber Fort",
    tagline: "Royal Fort with Sunset Views",
    rating: 4.7,
    reviews: "10k+",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    rank: "#3",
    name: "City Palace",
    tagline: "Royalty & Heritage",
    rating: 4.8,
    reviews: "9k+",
    image:
      "https://images.unsplash.com/photo-1585506942812-e629b357f7be?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    rank: "#4",
    name: "Jantar Mantar",
    tagline: "Ancient Astronomical Marvel",
    rating: 4.6,
    reviews: "8k+",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
  },
];

const experiences = [
  { icon: Landmark, label: "Heritage Walks" },
  { icon: UtensilsCrossed, label: "Food & Cuisine" },
  { icon: ShoppingBag, label: "Shopping" },
  { icon: PartyPopper, label: "Culture & Festivals" },
  { icon: Mountain, label: "Desert Safari" },
  { icon: Camera, label: "Photography" },
];

const reasons = [
  {
    icon: Crown,
    title: "Royal Heritage",
    desc: "Live the story of Rajputana",
  },
  {
    icon: Palette,
    title: "Rich Culture",
    desc: "Colorful traditions & festivals",
  },
  {
    icon: ChefHat,
    title: "Delicious Food",
    desc: "A paradise for food lovers",
  },
  {
    icon: TreePine,
    title: "Natural Beauty",
    desc: "Desert, hills & stunning views",
  },
];

/* ─────────────────────────── Components ─────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "#" },
    { label: "Hotels", href: "#" },
    { label: "Tourist Places", href: "#", active: true },
    { label: "Experiences", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
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
              <span className="text-[10px] text-text-muted font-medium tracking-wide">
                Explore. Experience. Belong.
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
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
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-text-secondary transition-colors">
              <CalendarDays className="h-4 w-4" />
              Plan Your Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-4 pb-4 pt-2 space-y-1">
          {links.map((link) => (
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
          <div className="pt-2 flex items-center gap-3">
            <button className="p-2 text-text-muted">
              <Search className="h-5 w-5" />
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-white">
              <CalendarDays className="h-4 w-4" />
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/tourist-places-hero-bg.png"
          alt="Hawa Mahal Jaipur"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay - heavier on left for text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" /> */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-40">
        <div className="flex min-h-[560px] lg:min-h-[620px] items-center">
          <div className="w-full lg:w-1/2 pt-12 pb-32 lg:pb-40">
            {/* Label */}
            <p className="text-sm font-semibold tracking-[0.25em] text-brand-600 uppercase mb-3">
              Explore
            </p>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-playfair)] text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-700 leading-[0.95] mb-2">
              Jaipur
              <Heart className="inline-block h-8 w-8 sm:h-10 sm:w-10 ml-2 fill-brand-600 text-brand-600 align-top mt-2" />
            </h1>

            {/* Subtitle */}
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl text-text-primary font-semibold mt-3 mb-4">
              The Pink City of Royalty
            </h2>

            {/* Description */}
            <p className="max-w-md text-text-secondary text-base sm:text-lg leading-relaxed mb-6">
              Discover majestic forts, royal palaces, vibrant culture and
              timeless charm in the heart of Rajasthan.
            </p>

            {/* Script text */}
            <p className="font-[family-name:var(--font-dancing)] text-2xl sm:text-3xl text-brand-600">
              Feel the Royal Vibes{" "}
              <Heart className="inline-block h-5 w-5 fill-brand-600 text-brand-600 align-middle" />
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar - overlapping bottom */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-28 mb-12">
        <div
          className="rounded-2xl bg-surface border border-border p-4 sm:p-5"
          style={{ boxShadow: "0 8px 40px rgba(99, 102, 241, 0.12)" }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* All Places */}
            <div className="flex-1 relative">
              <button className="w-full flex items-center justify-between rounded-xl border border-border-strong bg-surface-muted px-4 py-3.5 text-sm text-text-primary hover:border-brand-200 transition-colors">
                <span className="flex items-center gap-2.5 text-brand-500 font-bold">
                  <Landmark className="h-5 w-5 text-brand-700" />
                  All Places
                </span>
                <ChevronDown className="h-4 w-4 text-brand-700" />
              </button>
            </div>

            {/* Best Time */}
            <div className="flex-1 relative">
              <button className="w-full flex items-center justify-between rounded-xl border border-border-strong bg-surface-muted px-4 py-3.5 text-sm text-text-primary hover:border-brand-200 transition-colors">
                <span className="flex items-center text-brand-700 font-bold gap-2.5">
                  <CalendarDays className="h-5 w-5 text-brand-700" />
                  Best Time
                </span>
                <ChevronDown className="h-4 w-4 text-brand-700" />
              </button>
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <button className="w-full flex items-center justify-between rounded-xl border border-border-strong bg-surface-muted px-4 py-3.5 text-sm text-text-primary hover:border-brand-200 transition-colors">
                <span className="flex items-center text-brand-700 font-bold gap-2.5">
                  <MapPin className="h-5 w-5 text-brand-700" />
                  Jaipur
                </span>
                <ChevronDown className="h-4 w-4 text-brand-700" />
              </button>
            </div>

            {/* Search Button */}
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
              style={{ boxShadow: "0 4px 20px rgba(67, 56, 202, 0.35)" }}
            >
              <Search className="h-4 w-4" />
              Search Places
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-3">
      <span className="h-px w-10 bg-(--color-badge-luxury)" />
      <span className="text-xs font-semibold tracking-[0.2em] text-(--color-badge-luxury) uppercase">
        {text}
      </span>
      <span className="h-px w-10 bg-(--color-badge-luxury)" />
    </div>
  );
}

function FeaturedPlaces() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <SectionLabel text="Featured" />
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-(--color-badge-luxury) text-center mb-3">
          Top Tourist Places in Jaipur
        </h2>
        <p className="text-center text-(--color-badge-new) text-base sm:text-lg max-w-2xl mx-auto mb-5 sm:mb-10">
          Explore the timeless beauty of Jaipur with our handpicked destinations
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {places.map((place) => (
            <div
              key={place.id}
              className="group relative rounded-2xl overflow-hidden bg-surface border border-border hover:shadow-lg transition-all duration-300"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-74 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950  via-indigo-950/30 to-transparent" />

                {/* Rank Badge */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold"
                  style={{ boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)" }}
                >
                  {place.rank}
                </div>

                {/* Heart */}
                <button className="absolute top-3 left-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Content on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 text-white/90 mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium">{place.name}</span>
                  </div>
                  <p className="text-white/70 text-xs mb-2">{place.tagline}</p>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-rating text-rating" />
                    <span className="text-white text-xs font-semibold">
                      {place.rating}
                    </span>
                    <span className="text-white/60 text-xs">
                      ({place.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-8 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-600 hover:text-white transition-all duration-300">
            View All Tourist Places
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TopExperiences() {
  return (
    <section className="py-4" >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel text="Explore" />
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-700 text-center mb-6">
          Top Experiences in Jaipur
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.label}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-100 bg-linear-to-tl from-(--color-brand-300) via-(--color-brand-100) to-transparent text-brand-600 group-hover:bg-brand-100 group-hover:text-white group-hover:border-brand-600 group-hover:rotate-360 transition-all duration-300"
                style={{ boxShadow: "0 2px 8px rgba(99, 102, 241, 0.08)" }}
              >
                <exp.icon className="h-8 w-8 group-hover:text-(--color-badge-new)" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-text-secondary text-center group-hover:text-brand-600 transition-colors">
                {exp.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVisit() {
  return (
   <section className="py-12 lg:py-16">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="rounded-3xl bg-brand-200 border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image — 1/4 width on desktop, full-width stacked on mobile */}
  

        <div className="relative h-64 sm:h-80 lg:h-full lg:col-span-2">
          <Image
            src="/tourist-places-bottom-cta-img.png"
            alt="Amber Fort Jaipur"
            fill
            className="object-cover object-center object-bottom"
            sizes="(max-width: 1024px) 100vw, 25vw"
           

          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:bg-gradient-to-l" />
        </div>

        {/* Content — 3/4 width on desktop */}
        <div className="p-4 sm:p-10 lg:p-12 flex flex-col justify-center lg:col-span-3">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-brand-700 mb-8 text-center lg:text-left">
            Why Visit Jaipur?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <reason.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-brand-600 mb-0.5">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-brand-600/80">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

function CTABanner() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 ">
            <Image
              src="/tourist-place-bottom-cta2.png"
              alt="Rajasthan Sunset"
              fill
              className="object-cover "
            />
            {/* <div className="absolute inset-0" style={{ backgroundColor: "rgba(67, 56, 202, 0.82)" }} /> */}
          </div>

          <div className="relative px-6 py-14 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Plan Your Jaipur Adventure Today
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Create unforgettable memories in the Pink City
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
            >
              <CalendarDays className="h-4 w-4" />
              Explore Jaipur With Us
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function TouristPlacesPage() {
  return (
    <main
      className={`${playfair.variable} ${inter.variable} ${dancing.variable} min-h-screen bg-brand-50/50 font-[family-name:var(--font-inter)]`}
    >
      {/* <Navbar /> */}
      <Hero />
      <FeaturedPlaces />
      <TopExperiences />
      <WhyVisit />
      <CTABanner />

      
    </main>
  );
}