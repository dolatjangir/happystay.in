"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ───────────────────────────────────────────────
   Icons (inline SVGs to keep it self-contained)
   ─────────────────────────────────────────────── */
const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#4f46e5" />
    <path d="M8 24L16 8L24 24H8Z" fill="white" />
    <circle cx="16" cy="18" r="3" fill="#c7d2fe" />
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const TagIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─── Category Icons ─── */
const HandicraftIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M24 8v32M16 16l8-8 8 8M16 32l8 8 8-8" />
    <circle cx="24" cy="24" r="14" />
  </svg>
);

const TextileIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <rect x="10" y="8" width="28" height="32" rx="2" />
    <path d="M10 16h28M10 32h28M18 8v32M30 8v32" />
  </svg>
);

const JewelleryIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M24 8c-8 0-14 6-14 12 0 8 14 20 14 20s14-12 14-20c0-6-6-12-14-12z" />
    <circle cx="24" cy="20" r="4" />
  </svg>
);

const PotteryIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M16 8h16l-2 8h-12l-2-8z" />
    <path d="M14 16c-2 8-2 16 4 22h12c6-6 6-14 4-22" />
    <ellipse cx="24" cy="38" rx="10" ry="3" />
  </svg>
);

const MiniatureIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <rect x="8" y="8" width="32" height="32" rx="2" />
    <circle cx="24" cy="20" r="6" />
    <path d="M12 36l8-10 6 6 10-12" />
  </svg>
);

const FootwearIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M8 32c0-8 8-16 16-16s16 8 16 16v4H8v-4z" />
    <path d="M12 32c0-4 4-8 8-8" />
  </svg>
);

const HomeDecorIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M24 4L4 20h8v24h24V20h8L24 4z" />
    <rect x="18" y="28" width="12" height="16" />
  </svg>
);

const OrganicIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-8 h-8">
    <path d="M24 4c-8 4-12 12-12 20 0 8 6 12 12 12s12-4 12-12c0-8-4-16-12-20z" />
    <path d="M24 16v16M18 22h12" />
  </svg>
);

/* ─── What to Shop Icons ─── */
const TextileShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

const JewelleryShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="3" /><path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
  </svg>
);

const PotteryShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <path d="M8 4h8l-1 4H9L8 4z" /><path d="M7 8c-1 4-1 8 2 11h6c3-3 3-7 2-11" /><ellipse cx="12" cy="19" rx="5" ry="1.5" />
  </svg>
);

const FootwearShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <path d="M4 18c0-4 4-8 8-8s8 4 8 8v2H4v-2z" /><path d="M6 18c0-2 2-4 4-4" />
  </svg>
);

const PaintingShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M7 17l4-4 3 3 3-3" />
  </svg>
);

const GiftShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="8" width="18" height="14" rx="2" /><path d="M12 8V4M8 8c0-2 2-4 4-4s4 2 4 4" /><path d="M3 14h18" />
  </svg>
);

/* ─── Tips Icons ─── */
const BargainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const MorningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const QualityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 10h.01M6 14h.01M18 10h.01M18 14h.01" />
  </svg>
);

const TipsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" className="w-6 h-6">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

/* ─── Navigation ─── */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Stays", href: "/stays" },
  { label: "Experiences", href: "/experiences" },
  { label: "Tourist Places", href: "/tourist-places" },
  { label: "Shopping", href: "/shopping", active: true },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Blogs", href: "/blogs" },
];

/* ─── Categories ─── */
const categories = [
  { name: "Handicrafts", icon: <HandicraftIcon /> },
  { name: "Textiles & Fabrics", icon: <TextileIcon /> },
  { name: "Jewellery", icon: <JewelleryIcon /> },
  { name: "Jaipuri Blue Pottery", icon: <PotteryIcon /> },
  { name: "Miniatures", icon: <MiniatureIcon /> },
  { name: "Footwear", icon: <FootwearIcon /> },
  { name: "Home Decor", icon: <HomeDecorIcon /> },
  { name: "Organic Products", icon: <OrganicIcon /> },
];

/* ─── Markets ─── */
const markets = [
  {
    name: "Johari Bazaar",
    description: "Jewellery, gems & gemstones",
    rating: 4.8,
    reviews: "1.2K+",
    location: "Pink City",
    badge: "Top Pick",
    badgeColor: "bg-brand-600",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&h=400&fit=crop",
  },
  {
    name: "Bapu Bazaar",
    description: "Textiles, clothes & street shopping",
    rating: 4.7,
    reviews: "987+",
    location: "Pink City",
    badge: "Popular",
    badgeColor: "bg-brand-500",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop",
  },
  {
    name: "Tripolia Bazaar",
    description: "Blue pottery, handicrafts",
    rating: 4.6,
    reviews: "763+",
    location: "Pink City",
    badge: "Popular",
    badgeColor: "bg-brand-500",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop",
  },
  {
    name: "C-Scheme",
    description: "Modern brands & designer wear",
    rating: 4.5,
    reviews: "512+",
    location: "C-Scheme",
    badge: null,
    badgeColor: "",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
];

/* ─── What to Shop ─── */
const shopItems = [
  { title: "Handmade Textiles", desc: "Bandhani, Block prints, Kota doria", icon: <TextileShopIcon /> },
  { title: "Jaipuri Jewellery", desc: "Kundan, Meenakari, Silver", icon: <JewelleryShopIcon /> },
  { title: "Blue Pottery", desc: "World famous & unique", icon: <PotteryShopIcon /> },
  { title: "Traditional Footwear", desc: "Leather mojris, handmade", icon: <FootwearShopIcon /> },
  { title: "Miniature Paintings", desc: "Royal Rajputana art", icon: <PaintingShopIcon /> },
  { title: "Home Decor & Gifts", desc: "Lanterns, lamps, wooden crafts", icon: <GiftShopIcon /> },
];

/* ─── Experiences ─── */
const experiences = [
  {
    title: "Shop with Artisans",
    desc: "Meet local craftsmen & learn the stories behind crafts",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=250&fit=crop",
  },
  {
    title: "Vintage & Offbeat Finds",
    desc: "Discover hidden gems in small lanes",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=250&fit=crop",
  },
  {
    title: "Boutique Shopping",
    desc: "Stylish modern stores in C-Scheme & Tonk Road",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=250&fit=crop",
  },
];

/* ─── Shopping Tips ─── */
const tips = [
  { title: "Bargain Politely", desc: "Haggling is part of the culture", icon: <BargainIcon /> },
  { title: "Visit in the Morning", desc: "Best for fresh collections", icon: <MorningIcon /> },
  { title: "Look for Quality", desc: "Handmade items last longer", icon: <QualityIcon /> },
  { title: "Carry Cash", desc: "Small shops prefer cash", icon: <CashIcon /> },
];

/* ─── Filter Pills ─── */
const filterPills = [
  { label: "Handicrafts & Art", icon: "🏺" },
  { label: "Traditional Markets", icon: "🕌" },
  { label: "Modern Boutiques", icon: "🛍️" },
];

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function ShoppingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("All Areas");
  const [category, setCategory] = useState("All Categories");

  return (
    <div className="min-h-screen bg-bg">
     

      {/* ─────────── HERO SECTION ─────────── */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1600&h=800&fit=crop"
            alt="Jaipur Markets"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
          <div className="max-w-xl">
            {/* Cursive Subtitle */}
            <p className="text-brand-600 text-xl sm:text-2xl font-medium italic mb-1" style={{ fontFamily: "Georgia, serif" }}>
              Shop the Best of
            </p>
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] mb-4">
              Shopping
              <br />
              <span className="text-brand-600">in Jaipur</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg mb-6 max-w-md">
              From vibrant bazaars to luxury boutiques, discover a shopper&apos;s paradise in the Pink City.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filterPills.map((pill) => (
                <button
                  key={pill.label}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-border-strong shadow-sm text-sm font-medium text-text-secondary hover:bg-white hover:shadow-md transition-all"
                >
                  <span>{pill.icon}</span>
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-16 mb-12">
          <div className="bg-surface rounded-2xl shadow-lg border border-border p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <SearchIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-text-primary uppercase tracking-wider">What are you looking for?</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Jewellery, Handicrafts, Textiles..."
                    className="w-full bg-transparent text-sm text-text-body placeholder:text-text-faint outline-none"
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <MapPinIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-text-primary uppercase tracking-wider">Where in Jaipur?</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>All Areas</option>
                    <option>Pink City</option>
                    <option>C-Scheme</option>
                    <option>Malviya Nagar</option>
                    <option>Tonk Road</option>
                  </select>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-text-faint rotate-90 flex-shrink-0" />
              </div>

              {/* Category Dropdown */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <TagIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-text-primary uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>All Categories</option>
                    <option>Handicrafts</option>
                    <option>Jewellery</option>
                    <option>Textiles</option>
                    <option>Pottery</option>
                    <option>Footwear</option>
                  </select>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-text-faint rotate-90 flex-shrink-0" />
              </div>

              {/* Search Button */}
              <button className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0">
                <SearchIcon className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SHOP BY CATEGORY ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-border-strong" />
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-600 text-center">Shop by Category</h2>
          <div className="h-px w-12 bg-border-strong" />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="group flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-surface-muted transition-colors"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center group-hover:bg-brand-100 group-hover:scale-105 transition-all">
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-text-secondary text-center leading-tight group-hover:text-brand-600 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────── TOP SHOPPING MARKETS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-600 text-lg italic mb-1" style={{ fontFamily: "Georgia, serif" }}>Explore</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
              Top Shopping <span className="text-brand-600">Markets in Jaipur</span>
            </h2>
            <p className="text-text-muted mt-1">Vibrant lanes full of color, culture and craftsmanship</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-brand-600 text-brand-600 font-semibold text-sm hover:bg-brand-600 hover:text-white transition-all self-start sm:self-auto">
            View All Markets
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {markets.map((market) => (
            <div
              key={market.name}
              className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={market.image}
                  alt={market.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {market.badge && (
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${market.badgeColor} text-white text-xs font-semibold flex items-center gap-1`}>
                    <StarIcon className="w-3 h-3" />
                    {market.badge}
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                  <HeartIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-text-primary text-base mb-0.5">{market.name}</h3>
                <p className="text-text-muted text-sm mb-3">{market.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <StarIcon className="w-4 h-4 text-rating" />
                    <span className="text-sm font-semibold text-text-primary">{market.rating}</span>
                    <span className="text-xs text-text-muted">({market.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <MapPinIcon className="w-3.5 h-3.5" />
                    {market.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── WHAT TO SHOP IN JAIPUR ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-surface rounded-3xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Image */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&h=600&fit=crop"
                alt="Jaipur Shopping"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 lg:to-surface/80" />
            </div>

            {/* Right Content */}
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1">What to Shop in Jaipur?</h2>
              <p className="text-text-muted mb-8">Take home a piece of Pink City&apos;s culture</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {shopItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">{item.title}</h4>
                      <p className="text-text-muted text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── UNIQUE SHOPPING EXPERIENCES ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-600 text-center mb-2">Unique Shopping Experiences</h2>
        <p className="text-text-muted text-center mb-8">Make your Jaipur trip more memorable</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-text-primary text-base mb-1">{exp.title}</h3>
                <p className="text-text-muted text-sm">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── SHOPPING TIPS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
            {/* Title */}
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <TipsIcon />
                <h3 className="font-bold text-text-primary text-lg">Shopping Tips</h3>
              </div>
              <p className="text-text-muted text-xs">Make the most of your Jaipur shopping experience</p>
            </div>

            {/* Tips */}
            {tips.map((tip) => (
              <div key={tip.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm">{tip.title}</h4>
                  <p className="text-text-muted text-xs mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA BANNER ─────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1600&h=400&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Plan Your Jaipur Shopping Trip
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8">
              Discover the flavors, colors and crafts of the Pink City.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg">
              <MapPinIcon className="w-4 h-4" />
              Explore Markets
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    
      <footer className="bg-text-primary text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <LogoIcon />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white tracking-tight">HappyStay</span>
                <span className="text-[10px] font-semibold text-brand-200 tracking-[0.2em] uppercase">Jaipur</span>
              </div>
            </div>
            <p className="text-sm">© 2026 HappyStay Jaipur. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}