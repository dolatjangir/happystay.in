"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   ICONS — inline SVGs matching the screenshot
   ═══════════════════════════════════════════════ */

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#ec4899" />
    <path d="M8 24L16 8L24 24H8Z" fill="white" />
    <circle cx="16" cy="18" r="3" fill="#fbcfe8" />
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const MusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CocktailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M8 21h8M12 21v-7M5 3l7 11 7-11M12 14V3" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-6h6v6" />
  </svg>
);

const SofaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 18V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9M2 18h20M6 18v3m12-3v3" />
  </svg>
);

const GuitarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M11.5 13.5c-1.5 1.5-3.5 1.5-5 0s-1.5-3.5 0-5l7-7 3 3-2 2 2 2-2 2 2 2-5 5z" /><circle cx="8.5" cy="11.5" r="1" />
  </svg>
);

const DiscoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const DiningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 3v18h18" /><path d="M7 16v-5a2 2 0 0 1 4 0v5" /><path d="M11 16V8a2 2 0 0 1 4 0v8" /><path d="M15 16v-3a2 2 0 0 1 4 0v3" />
  </svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const BeerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M7 21h10M9 21v-9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9M6 8h12v4H6z" /><path d="M18 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M5 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2M5 17h14M5 17l-1.5 3h17L19 17" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MarketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-6h6v6" />
  </svg>
);

const PlaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z" /><path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Stays", href: "/stays" },
  { label: "Experiences", href: "/experiences" },
  { label: "Tourist Places", href: "/tourist-places" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Shopping", href: "/shopping" },
  { label: "Nightlife", href: "/nightlife", active: true },
  { label: "Blogs", href: "/blogs" },
];

const nightlifeCategories = [
  { name: "All", icon: <CocktailIcon />, active: true },
  { name: "Rooftop Bars", icon: <BuildingIcon /> },
  { name: "Lounges", icon: <SofaIcon /> },
  { name: "Live Music", icon: <GuitarIcon /> },
  { name: "Night Clubs", icon: <DiscoIcon /> },
  { name: "Fine Dining", icon: <DiningIcon /> },
  { name: "Cafes", icon: <CoffeeIcon /> },
  { name: "Pubs & Brewhouse", icon: <BeerIcon /> },
];

const rooftopBars = [
  {
    name: "Skyfall by Replay",
    type: "Rooftop Lounge",
    location: "C-Scheme, Jaipur",
    rating: 4.6,
    reviews: "1.2K Reviews",
    tags: ["Rooftop", "Lounge", "Live DJ"],
    badge: "Best View",
    badgeColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
  },
  {
    name: "The Chaos",
    type: "Rooftop Bar",
    location: "M.I Road, Jaipur",
    rating: 4.4,
    reviews: "986 Reviews",
    tags: ["Rooftop", "Trendy", "Cocktails"],
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&h=400&fit=crop",
  },
  {
    name: "Rooftop 360°",
    type: "Multi-Cuisine Lounge",
    location: "Malviya Nagar, Jaipur",
    rating: 4.5,
    reviews: "1.1K Reviews",
    tags: ["Rooftop", "Live Music", "Food"],
    badge: "Popular",
    badgeColor: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop",
  },
  {
    name: "House of People",
    type: "Rooftop Bar & Lounge",
    location: "C-Scheme, Jaipur",
    rating: 4.3,
    reviews: "783 Reviews",
    tags: ["Rooftop", "Cocktails", "Ambience"],
    badge: "Premium",
    badgeColor: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
  },
];

const liveMusicVenues = [
  { name: "Blue Monkey", type: "Live Music Cafe", rating: 4.4, image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=150&fit=crop" },
  { name: "Hard Rock Cafe", type: "Live Music", rating: 4.5, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=150&fit=crop" },
  { name: "Penthouze Nightclub", type: "DJ & Dance", rating: 4.2, image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=200&h=150&fit=crop" },
];

const nightClubs = [
  { name: "Club Naila", type: "Night Club", rating: 4.3, image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=200&h=150&fit=crop" },
  { name: "The Basement", type: "Underground Club", rating: 4.1, image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=200&h=150&fit=crop" },
  { name: "Club DNA", type: "Dance & EDM", rating: 4.2, image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&h=150&fit=crop" },
];

const fineDining = [
  { name: "Bar Palladio", type: "European Fine Dining", rating: 4.6, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop" },
  { name: "Suvarna Mahal", type: "Royal Dining", rating: 4.5, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&h=150&fit=crop" },
  { name: "Tapri Central", type: "Late Night Cafe", rating: 4.3, image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=200&h=150&fit=crop" },
];

const culturalNights = [
  { name: "Chokhi Dhani", type: "Cultural Village", rating: 4.6, image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200&h=150&fit=crop" },
  { name: "Amber Fort", type: "Light & Sound Show", rating: 4.7, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&h=150&fit=crop" },
  { name: "Bagore Ki Haveli", type: "Cultural Show", rating: 4.5, image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=200&h=150&fit=crop" },
];

const nightMarkets = [
  { name: "Johari Bazaar", time: "Open till 11 PM", icon: <MarketIcon /> },
  { name: "Bapu Bazaar", time: "Open till 10:30 PM", icon: <PlaceIcon /> },
  { name: "MI Road", time: "Open till 11 PM", icon: <BuildingIcon /> },
];

const safetyTips = [
  { title: "Stay in Well-lit Areas", icon: <ShieldIcon /> },
  { title: "Use Trusted Transport", icon: <CarIcon /> },
  { title: "Plan Your Return", icon: <ClockIcon /> },
  { title: "Respect Local Culture", icon: <UsersIcon /> },
];

const heroFeatures = [
  { icon: <CocktailIcon />, label: "Rooftop Bars with a View" },
  { icon: <MusicIcon className="w-5 h-5" />, label: "Live Music & DJ Nights" },
  { icon: <ShieldIcon />, label: "Safe & Premium Experiences" },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function NightlifePage() {
  const [location, setLocation] = useState("Jaipur, Rajasthan");
  const [experience, setExperience] = useState("All Nightlife");
  const [when, setWhen] = useState("Any Day");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
   

      {/* ─────────── HERO ─────────── */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1600&h=900&fit=crop"
            alt="Jaipur Nightlife"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/70 to-[#0a0a0f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-40">
          <div className="max-w-xl">
            <p className="text-pink-400 text-lg sm:text-xl font-medium italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
              When the Pink City Comes Alive
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Nightlife
              <br />
              <span className="text-pink-400">in Jaipur</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-md">
              From royal rooftop lounges to electric dance floors, explore the best nightlife experiences in the Pink City.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {heroFeatures.map((f, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300">
                  <span className="text-pink-400">{f.icon}</span>
                  <span className="text-xs sm:text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-24 mb-12">
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <MapPinIcon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>

              {/* Experience */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <MusicIcon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none"
                  >
                    <option className="bg-[#14141f]">All Nightlife</option>
                    <option className="bg-[#14141f]">Rooftop Bars</option>
                    <option className="bg-[#14141f]">Night Clubs</option>
                    <option className="bg-[#14141f]">Live Music</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>

              {/* When */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <CalendarIcon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">When</label>
                  <select
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none"
                  >
                    <option className="bg-[#14141f]">Any Day</option>
                    <option className="bg-[#14141f]">Tonight</option>
                    <option className="bg-[#14141f]">This Weekend</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>

              {/* Button */}
              <button className="px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition-colors shadow-lg flex items-center justify-center gap-2 flex-shrink-0">
                Explore Now
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CATEGORIES ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-pink-500/30" />
          <h2 className="text-lg sm:text-xl font-semibold text-pink-400 text-center">Explore Nightlife Categories</h2>
          <div className="h-px w-16 bg-pink-500/30" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {nightlifeCategories.map((cat) => (
            <button
              key={cat.name}
              className={`group flex flex-col items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border transition-all min-w-[80px] sm:min-w-[100px] ${
                cat.active
                  ? "border-pink-500 bg-pink-500/10 text-pink-400"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className={cat.active ? "text-pink-400" : "text-gray-400 group-hover:text-white"}>
                {cat.icon}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────── TOP ROOFTOP BARS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-pink-500 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Top Rooftop Bars & Lounges</h2>
          </div>
          <button className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-pink-400 transition-colors">
            View All <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rooftopBars.map((bar) => (
              <div
                key={bar.name}
                className="group bg-[#14141f] rounded-2xl border border-white/10 overflow-hidden hover:border-pink-500/30 transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={bar.image}
                    alt={bar.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141f] to-transparent opacity-60" />
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${bar.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider`}>
                    {bar.badge}
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-pink-500/80 transition-colors">
                    <HeartIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white text-sm mb-0.5">{bar.name}</h3>
                  <p className="text-gray-500 text-xs mb-1">{bar.type}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <MapPinIcon className="w-3 h-3" />
                    {bar.location}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="text-sm font-semibold text-white">{bar.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({bar.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bar.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll arrow */}
          <button className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#14141f] border border-white/10 items-center justify-center text-white hover:bg-pink-500 hover:border-pink-500 transition-colors shadow-xl">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ─────────── FOUR CATEGORY SECTIONS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Live Music */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <MusicIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Live Music &</h3>
                  <h3 className="font-bold text-white text-sm">DJ Venues</h3>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {liveMusicVenues.map((v) => (
                <div key={v.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{v.name}</h4>
                    <p className="text-xs text-gray-500">{v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">{v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Night Clubs */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <DiscoIcon />
                </div>
                <h3 className="font-bold text-white text-sm">Night Clubs</h3>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {nightClubs.map((v) => (
                <div key={v.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{v.name}</h4>
                    <p className="text-xs text-gray-500">{v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">{v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fine Dining */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <DiningIcon />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Fine Dining</h3>
                  <h3 className="font-bold text-white text-sm">After Dark</h3>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {fineDining.map((v) => (
                <div key={v.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{v.name}</h4>
                    <p className="text-xs text-gray-500">{v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">{v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Nights */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <SparklesIcon />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Cultural Nights &</h3>
                  <h3 className="font-bold text-white text-sm">Experiences</h3>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {culturalNights.map((v) => (
                <div key={v.name} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={v.image} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{v.name}</h4>
                    <p className="text-xs text-gray-500">{v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">{v.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── NIGHT MARKETS & SAFETY ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Night Markets */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <MarketIcon />
                </div>
                <h3 className="font-bold text-white text-sm">Night Markets & Late Night Shopping</h3>
              </div>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {nightMarkets.map((m) => (
                <div key={m.name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/20 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-400">
                    {m.icon}
                  </div>
                  <h4 className="text-xs font-semibold text-white text-center">{m.name}</h4>
                  <p className="text-[10px] text-gray-500 text-center">{m.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Nightlife */}
          <div className="bg-[#14141f] rounded-2xl border border-white/10 p-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <GlobeIcon />
              </div>
              <h3 className="font-bold text-white text-sm">Safe Nightlife in Jaipur</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {safetyTips.map((tip) => (
                <div key={tip.title} className="flex flex-col items-center gap-2 p-2">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    {tip.icon}
                  </div>
                  <p className="text-[10px] text-gray-400 text-center leading-tight">{tip.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CTA BANNER ─────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a1a] via-[#0f0a1f] to-[#0a0f1a]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1600&h=500&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Experience Jaipur After Dark</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6">Unforgettable nights, royal vibes, and memories that last forever.</p>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition-colors shadow-lg">
                Explore Nightlife
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Right Stats */}
            <div className="flex items-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <PlaceIcon />
                </div>
                <span className="text-xl font-bold text-white">200+</span>
                <span className="text-xs text-gray-500">Places</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <UsersIcon />
                </div>
                <span className="text-xl font-bold text-white">50K+</span>
                <span className="text-xs text-gray-500">Happy Visitors</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <ShieldIcon />
                </div>
                <span className="text-xl font-bold text-white">100%</span>
                <span className="text-xs text-gray-500">Safe & Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}