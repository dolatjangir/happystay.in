"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════ */

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#7c2d8e" />
    <path d="M8 24L16 8L24 24H8Z" fill="white" />
    <circle cx="16" cy="18" r="3" fill="#e9d5ff" />
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

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ─── Category Icons ─── */
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const GettingAroundIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const LocalCultureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const FoodGuideIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const ShoppingTipsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const BudgetTravelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z" /><path d="M12 12h.01" />
  </svg>
);

const SafetyTipsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PhotoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
  </svg>
);

const WeatherIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

/* ─── Hero Feature Icons ─── */
const ExpertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3L8 9l4 13 4-13-3-6z" /><path d="M2 9h20" />
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);

const JaipurIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-6h6v6" />
  </svg>
);

/* ─── Insider Tip Icons ─── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const DressIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>
);

const BargainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const HydrateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const RespectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

/* ─── CTA Icons ─── */
const ItineraryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const SuggestionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
  { label: "Events", href: "/events" },
  { label: "Local Guide", href: "/local-guide", active: true },
];

const guideCategories = [
  { name: "All Guides", icon: <GridIcon />, active: true },
  { name: "Getting Around", icon: <GettingAroundIcon /> },
  { name: "Local Culture", icon: <LocalCultureIcon /> },
  { name: "Food Guide", icon: <FoodGuideIcon /> },
  { name: "Shopping Tips", icon: <ShoppingTipsIcon /> },
  { name: "Budget Travel", icon: <BudgetTravelIcon /> },
  { name: "Safety Tips", icon: <SafetyTipsIcon /> },
  { name: "Photography Spots", icon: <PhotoIcon /> },
  { name: "Weather Guide", icon: <WeatherIcon /> },
];

const topGuides = [
  {
    title: "First Time in Jaipur?",
    subtitle: "Everything you need to know",
    desc: "A complete guide for first-time visitors to explore Jaipur with ease.",
    author: "Lokesh Sharma",
    role: "Local Expert",
    badge: "Popular",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&h=350&fit=crop",
  },
  {
    title: "Hidden Gems of Jaipur",
    subtitle: "Beyond the tourist spots",
    desc: "Explore offbeat places loved by locals that most tourists miss.",
    author: "Priya Rathore",
    role: "Heritage Enthusiast",
    badge: "Hidden Gems",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=350&fit=crop",
  },
  {
    title: "What & Where to Eat",
    subtitle: "Best local food experiences",
    desc: "From street food to royal dining – a foodie's guide to Jaipur.",
    author: "Arvind Singh",
    role: "Food Blogger",
    badge: "Local's Choice",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=350&fit=crop",
  },
  {
    title: "Getting Around Jaipur",
    subtitle: "Transport, apps & tips",
    desc: "Best ways to travel in Jaipur like a local, save time & money.",
    author: "Neha Verma",
    role: "Travel Planner",
    badge: "Travel Smart",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&h=350&fit=crop",
  },
];

const insiderTips = [
  { title: "Best Time to Visit", desc: "Oct to Mar is ideal for pleasant weather.", icon: <ClockIcon /> },
  { title: "Dress Modestly", desc: "Respect local culture, wear modest clothes.", icon: <DressIcon /> },
  { title: "Bargain Smartly", desc: "Bargaining is common in markets.", icon: <BargainIcon /> },
  { title: "Stay Hydrated", desc: "Carry water, summers can be intense.", icon: <HydrateIcon /> },
  { title: "Respect Traditions", desc: "Be polite & respect local customs.", icon: <RespectIcon /> },
];

const areas = [
  { name: "Old City", tagline: "The Heart of Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=250&fit=crop" },
  { name: "C-Scheme", tagline: "Modern & Happening", image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=250&fit=crop" },
  { name: "Jaipur North", tagline: "Peaceful & Green", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=250&fit=crop" },
  { name: "Vaishali Nagar", tagline: "Trendy & Convenient", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop" },
  { name: "Malviya Nagar", tagline: "Local & Lively", image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&h=250&fit=crop" },
];

const heroFeatures = [
  { icon: <ExpertIcon />, label: "Local Insights by Experts" },
  { icon: <GemIcon />, label: "Hidden Gems Revealed" },
  { icon: <VerifiedIcon />, label: "Trusted & Verified" },
  { icon: <JaipurIcon />, label: "100% Jaipur Experience" },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function LocalGuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [area, setArea] = useState("All Areas in Jaipur");

  return (
    <div className="min-h-screen bg-bg">


      {/* ─────────── HERO ─────────── */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&h=900&fit=crop"
            alt="Jaipur Local Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-36">
          <div className="max-w-lg">
            <p className="text-purple-700 text-lg sm:text-xl font-medium italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Explore Jaipur Like a Local
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.05] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Local Guide
              <br />
              <span className="text-purple-700">Jaipur</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-md">
              Insider tips, local stories, hidden gems and everything you need to experience the real Pink City.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {heroFeatures.map((f, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-border-strong shadow-sm text-sm text-text-secondary">
                  <span className="text-purple-700">{f.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-20 mb-12">
          <div className="bg-surface rounded-2xl shadow-lg border border-border p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <SearchIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Search Topic</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="w-full bg-transparent text-sm text-text-body placeholder:text-text-faint outline-none"
                  />
                </div>
              </div>

              <div className="sm:w-48 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>All Categories</option>
                    <option>Food & Dining</option>
                    <option>Transport</option>
                    <option>Culture</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-faint flex-shrink-0" />
              </div>

              <div className="sm:w-52 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Area</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>All Areas in Jaipur</option>
                    <option>Old City</option>
                    <option>C-Scheme</option>
                    <option>Malviya Nagar</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-faint flex-shrink-0" />
              </div>

              <button className="px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0">
                Explore Now
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── KNOW JAIPUR BETTER ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-purple-300" />
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Know Jaipur Better</h2>
            <div className="h-px w-12 bg-purple-300" />
          </div>
          <p className="text-text-muted text-sm">Everything you should know before you explore</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {guideCategories.map((cat) => (
            <button
              key={cat.name}
              className={`group flex flex-col items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border transition-all min-w-[90px] sm:min-w-[110px] ${
                cat.active
                  ? "border-purple-700 bg-purple-700 text-white shadow-md"
                  : "border-border-strong bg-surface text-text-secondary hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              <span className={cat.active ? "text-white" : "text-text-muted group-hover:text-purple-700"}>
                {cat.icon}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────── TOP LOCAL GUIDES ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">Top Local Guides</h2>
            <p className="text-text-muted text-sm">Handpicked guides to make your Jaipur trip smooth and memorable.</p>
          </div>
          <button className="hidden sm:inline-flex items-center gap-1 text-sm text-purple-700 hover:text-purple-800 transition-colors font-medium">
            View All Guides <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topGuides.map((guide) => (
            <div
              key={guide.title}
              className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-purple-200 transition-all cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider">
                  {guide.badge}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text-primary text-sm mb-0.5">{guide.title}</h3>
                <p className="text-text-muted text-xs mb-2">{guide.subtitle}</p>
                <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2">{guide.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
                    {guide.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">By {guide.author}</p>
                    <p className="text-[10px] text-text-muted">{guide.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── INSIDER TIPS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 text-center">Insider Tips from Locals</h3>
            <p className="text-text-muted text-sm text-center mb-8">Little things that make a big difference</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {insiderTips.map((tip) => (
                <div key={tip.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 mb-3">
                    {tip.icon}
                  </div>
                  <h4 className="font-semibold text-text-primary text-sm mb-1">{tip.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── EXPLORE BY AREA ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">Explore by Area</h2>
            <p className="text-text-muted text-sm">Local guides for every corner of Jaipur</p>
          </div>
          <button className="hidden sm:inline-flex items-center gap-1 text-sm text-purple-700 hover:text-purple-800 transition-colors font-medium">
            View All Areas <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
            {areas.map((a) => (
              <div
                key={a.name}
                className="flex-shrink-0 w-56 sm:w-64 group cursor-pointer"
              >
                <div className="relative h-36 rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h4 className="font-bold text-text-primary text-sm">{a.name}</h4>
                <p className="text-text-muted text-xs">{a.tagline}</p>
              </div>
            ))}
          </div>

          {/* Scroll arrows */}
          <button className="hidden lg:flex absolute -left-4 top-16 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-lg items-center justify-center text-text-muted hover:text-purple-700 hover:border-purple-300 transition-colors z-10">
            <ArrowRightIcon className="w-5 h-5 rotate-180" />
          </button>
          <button className="hidden lg:flex absolute -right-4 top-16 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-lg items-center justify-center text-text-muted hover:text-purple-700 hover:border-purple-300 transition-colors z-10">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ─────────── CTA BANNER ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700" />
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&h=500&fit=crop"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Need Help Planning Your Jaipur Trip?</h3>
                <p className="text-purple-200 text-sm max-w-md">Our local experts are here to help you plan a perfect & personalized experience.</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-200">
                    <ItineraryIcon />
                  </div>
                  <p className="text-xs text-purple-200 text-center leading-tight">Personalized<br />Itineraries</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-200">
                    <SupportIcon />
                  </div>
                  <p className="text-xs text-purple-200 text-center leading-tight">Local Expert<br />Support</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-200">
                    <SuggestionsIcon />
                  </div>
                  <p className="text-xs text-purple-200 text-center leading-tight">Best Suggestions<br />Guaranteed</p>
                </div>

                <button className="px-6 py-3 rounded-xl bg-white text-purple-900 font-semibold text-sm hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2">
                  Contact Local Expert
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── STATS BAR ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-8 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <UsersIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">50+</p>
                <p className="text-xs text-text-muted">Local Experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <ItineraryIcon />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">200+</p>
                <p className="text-xs text-text-muted">Guides & Articles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <UsersIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">1000+</p>
                <p className="text-xs text-text-muted">Happy Travelers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <StarIcon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">4.8</p>
                <p className="text-xs text-text-muted">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-text-primary">Still Have Questions?</p>
              <p className="text-xs text-text-muted">We're here to help you.</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition-colors shadow-sm flex items-center gap-2">
              Ask a Local
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}