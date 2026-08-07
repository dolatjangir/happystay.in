"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   ICONS — inline SVGs
   ═══════════════════════════════════════════════ */

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#4f46e5" />
    <path d="M8 24L16 8L24 24H8Z" fill="white" />
    <circle cx="16" cy="18" r="3" fill="#e0e7ff" />
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

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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

const DownloadIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Category Icons ─── */
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const FestivalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2L15 9h7l-5.5 4L19 20 12 16l-7 4 2.5-7L2 9h7z" />
  </svg>
);

const MusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const CulturalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const FoodIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const ArtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </svg>
);

const SportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);

const WorkshopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const KidsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

/* ─── Why Attend Icons ─── */
const CultureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M2 22h20M2 6h20M2 10h20M2 14h20M2 18h20" /><path d="M6 2v20M12 2v20M18 2v20" />
  </svg>
);

const ConnectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MemoriesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </svg>
);

const EveryoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

/* ─── Plan Experience Icons ─── */
const DiscoverIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const TicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><line x1="9" y1="5" x2="9" y2="19" />
  </svg>
);

const ReadyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const CelebrateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M12 2l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5z" /><path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5z" />
  </svg>
);

/* ─── Annual Event Icons ─── */
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const TempleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-6h6v6" />
  </svg>
);

const SwingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <circle cx="12" cy="5" r="3" /><path d="M12 8v13M9 21h6" />
  </svg>
);

const LampIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M9 18h6M10 22h4M12 2v2M12 8v2M8 6l-1.5 1.5M16 6l1.5 1.5M12 18V8" /><circle cx="12" cy="5" r="2" />
  </svg>
);

const TreeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 22V8M5 12l7-7 7 7M5 16l7-7 7 7" />
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
  { label: "Events", href: "/events", active: true },
  { label: "Blogs", href: "/blogs" },
];

const eventCategories = [
  { name: "All Events", icon: <GridIcon />, active: true },
  { name: "Festivals", icon: <FestivalIcon /> },
  { name: "Music & Concerts", icon: <MusicIcon /> },
  { name: "Cultural", icon: <CulturalIcon /> },
  { name: "Food & Drinks", icon: <FoodIcon /> },
  { name: "Art & Exhibitions", icon: <ArtIcon /> },
  { name: "Sports", icon: <SportsIcon /> },
  { name: "Workshops", icon: <WorkshopIcon /> },
  { name: "Kids & Family", icon: <KidsIcon /> },
];

const events = [
  {
    name: "Elephant Festival 2025",
    date: "10-12",
    month: "JUN",
    location: "Jaipur, Rajasthan",
    description: "A royal celebration of elephants with processions, folk music & dance.",
    category: "Festival",
    price: "₹299 onwards",
    badge: "FEATURED",
    badgeColor: "bg-brand-600",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&h=400&fit=crop",
  },
  {
    name: "Arijit Singh Live in Concert",
    date: "24",
    month: "MAY",
    location: "JECC, Sitapura, Jaipur",
    description: "An unforgettable evening with Arijit Singh live in your city!",
    category: "Music & Concert",
    price: "₹999 onwards",
    badge: "POPULAR",
    badgeColor: "bg-brand-600",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
  },
  {
    name: "Makar Sankranti Kite Festival",
    date: "14",
    month: "JAN",
    location: "Nahargarh Fort, Jaipur",
    description: "Experience the sky full of colors with kite flying, music & fun activities.",
    category: "Festival",
    price: "Free Entry",
    badge: "TRENDING",
    badgeColor: "bg-brand-600",
    image: "https://images.unsplash.com/photo-1533230408706-9f97cd3cd6d0?w=600&h=400&fit=crop",
  },
  {
    name: "Rajasthan Art & Craft Expo",
    date: "01-10",
    month: "JUN",
    location: "Bapu Bazar, Jaipur",
    description: "A showcase of traditional arts, handicrafts & handmade treasures.",
    category: "Exhibition",
    price: "₹50 onwards",
    badge: "NEW",
    badgeColor: "bg-brand-600",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
  },
];

const whyAttend = [
  { title: "Rich Culture", desc: "Experience the royal heritage and vibrant traditions.", icon: <CultureIcon /> },
  { title: "Local Connect", desc: "Meet locals and discover the real Pink City.", icon: <ConnectIcon /> },
  { title: "Memorable Moments", desc: "Create unforgettable memories with your loved ones.", icon: <MemoriesIcon /> },
  { title: "Something for Everyone", desc: "From music to food, art to festivals – enjoy it all!", icon: <EveryoneIcon /> },
];

const annualEvents = [
  { name: "Jaipur Literature Festival", month: "Jan", icon: <BookIcon /> },
  { name: "Gangaur Festival", month: "Mar", icon: <TempleIcon /> },
  { name: "Teej Festival", month: "Jul", icon: <SwingIcon /> },
  { name: "Diwali Celebration", month: "Oct", icon: <LampIcon /> },
  { name: "Christmas Carnival", month: "Dec", icon: <TreeIcon /> },
];

const planSteps = [
  { title: "Discover Events", desc: "Find the best events happening in Jaipur.", icon: <DiscoverIcon /> },
  { title: "Book Tickets", desc: "Secure your spot with easy online booking.", icon: <TicketIcon /> },
  { title: "Get Ready", desc: "Plan your trip and get event ready.", icon: <ReadyIcon /> },
  { title: "Enjoy & Celebrate", desc: "Make memories that last a lifetime!", icon: <CelebrateIcon /> },
];

const heroFeatures = [
  { icon: <CalendarIcon className="w-5 h-5" />, label: "Curated Events" },
  { icon: <TicketIcon />, label: "Easy Ticket Booking" },
  { icon: <CelebrateIcon />, label: "Unforgettable Experiences" },
];

/* ─── Calendar Data ─── */
const calendarDays = [
  ["", "", "", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9", "10", "11"],
  ["12", "13", "14", "15", "16", "17", "18"],
  ["19", "20", "21", "22", "23", "24", "25"],
  ["26", "27", "28", "29", "30", "31", ""],
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("All Categories");
  const [dateVal, setDateVal] = useState("Select Date");
  const [location, setLocation] = useState("Jaipur, Rajasthan");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-bg">
     

      {/* ─────────── HERO ─────────── */}
      <section className="relative h-[75dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/events-hero-img.png"
            alt="Jaipur Events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-white/10" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" /> */}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-28 pb-36">
          <div className="max-w-lg">
            <p className="text-brand-600 text-lg sm:text-xl font-medium italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Celebrate the Pink City
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.05] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Events in <span className="text-brand-600">Jaipur</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg mb-8 max-w-md">
              From royal festivals to vibrant cultural celebrations – discover the best events happening in the Pink City.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {heroFeatures.map((f, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-border-strong shadow-sm text-sm text-text-secondary">
                  <span className="text-brand-600">{f.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </section>
  {/* Search Bar */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 mb-12">
          <div className="bg-surface rounded-2xl shadow-lg border border-border p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <SearchIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Search Events</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for events, concerts, festivals..."
                    className="w-full bg-transparent text-sm text-text-body placeholder:text-text-faint outline-none"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <HeartIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>All Categories</option>
                    <option>Festivals</option>
                    <option>Music & Concerts</option>
                    <option>Cultural</option>
                    <option>Food & Drinks</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-faint flex-shrink-0" />
              </div>

              {/* Date */}
              <div className="sm:w-40 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <CalendarIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Date</label>
                  <select
                    value={dateVal}
                    onChange={(e) => setDateVal(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>Select Date</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Next Month</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-faint flex-shrink-0" />
              </div>

              {/* Location */}
              <div className="sm:w-44 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong">
                <MapPinIcon className="w-5 h-5 text-text-faint flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-semibold text-text-primary uppercase tracking-wider">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm text-text-body outline-none cursor-pointer appearance-none"
                  >
                    <option>Jaipur, Rajasthan</option>
                    <option>Pink City</option>
                    <option>C-Scheme</option>
                    <option>Malviya Nagar</option>
                  </select>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-faint flex-shrink-0" />
              </div>

              {/* Button */}
              <button className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0">
                Search Events
              </button>
            </div>
          </div>
        </div>


      {/* ─────────── CATEGORIES ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-brand-200" />
            <p className="text-brand-600 text-lg italic" style={{ fontFamily: "Georgia, serif" }}>What&apos;s Happening</p>
            <div className="h-px w-12 bg-brand-200" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Upcoming Events in Jaipur</h2>
          <p className="text-text-muted text-sm">Explore concerts, festivals, workshops, exhibitions and more.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {eventCategories.map((cat) => (
            <button
              key={cat.name}
              className={`group flex flex-col items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border transition-all min-w-[80px] sm:min-w-[100px] ${
                cat.active
                  ? "border-brand-600 bg-brand-600 text-white shadow-md"
                  : "border-border-strong bg-surface text-text-secondary hover:border-brand-200 hover:text-brand-600"
              }`}
            >
              <span className={cat.active ? "text-white" : "text-text-muted group-hover:text-brand-600"}>
                {cat.icon}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────── EVENT CARDS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((evt) => (
            <div
              key={evt.name}
              className="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={evt.image}
                  alt={evt.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  {evt.badge}
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand-600/80 transition-colors">
                  <HeartIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex flex-col items-center bg-brand-50 rounded-lg px-2.5 py-1.5 border border-brand-100">
                    <span className="text-xs font-bold text-brand-700">{evt.date}</span>
                    <span className="text-[10px] font-semibold text-brand-500 uppercase">{evt.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text-primary text-sm leading-tight mb-0.5">{evt.name}</h3>
                    <div className="flex items-center gap-1 text-text-muted text-xs">
                      <MapPinIcon className="w-3 h-3" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-text-muted text-xs leading-relaxed mb-3 line-clamp-2">{evt.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-600 text-[10px] font-semibold border border-brand-100">
                    {evt.category}
                  </span>
                  <span className="text-xs font-bold text-brand-600">{evt.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-600 text-brand-600 font-semibold text-sm hover:bg-brand-600 hover:text-white transition-all">
            View All Events
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ─────────── CALENDAR & WHY ATTEND ─────────── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    {/* ─── Calendar Card ─── */}
    <div className="relative bg-brand-700 rounded-3xl p-6 sm:p-8 text-white overflow-hidden min-h-[420px] sm:min-h-[460px]">
      
      {/* Background Image — Bottom Right */}
      <img 
        src="/list-a-property-page-hero-bg2.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 object-contain object-right-bottom opacity-25 pointer-events-none select-none z-0"
      />

      {/* Content Layer */}
      <div className="relative z-10 max-w-xs">
        <p className="text-brand-200 text-sm italic mb-1" style={{ fontFamily: "Georgia, serif" }}>
          Don&apos;t Miss Out!
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold mb-2">
          Jaipur Events<br />Calendar 2025
        </h3>
        <p className="text-brand-100 text-sm mb-6">
          Your go-to guide for all major events, festivals and celebrations in Jaipur.
        </p>

        <ul className="space-y-2.5 mb-6">
          {["Monthly updated events", "Exclusive offers & discounts", "Save your favorite events"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-brand-100">
              <CheckIcon className="w-4 h-4 text-brand-200 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors">
          <DownloadIcon className="w-4 h-4" />
          Download Calendar
        </button>
      </div>

      {/* Calendar Widget — sits above the bg image */}
      <div className="mt-8 sm:mt-0 sm:absolute sm:top-1/2 sm:right-6 lg:right-8 sm:-translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 relative z-10">
        <div className="flex items-center justify-between mb-3">
          
          <button className="text-white/60 hover:text-white text-xs">&lt;</button>
          <span className="text-sm font-semibold text-white">May 2025</span>
          <button className="text-white/60 hover:text-white text-xs">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <span key={d} className="text-[9px] text-brand-200 font-semibold py-1">{d}</span>
          ))}
          {calendarDays.flat().map((day, i) => (
            <span
              key={i}
              className={`text-xs py-1.5 rounded-md ${
                day === "24"
                  ? "bg-brand-500 text-white font-bold"
                  : day
                  ? "text-white/80 hover:bg-white/10 cursor-pointer"
                  : ""
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* ─── Why Attend ─── */}
    <div className="relative bg-brand-50/50 rounded-3xl border border-border p-6 sm:p-8">
       <img 
        src="/happy-stay-jaipur-home-bottom-cta-right.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-1/2 h-1/2 object-contain object-right-bottom opacity-50 pointer-events-none select-none z-0"
      />
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
        Why Attend Events in Jaipur?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {whyAttend.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-sm">{item.title}</h4>
              <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* ─────────── ANNUAL EVENTS ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-text-primary">Annual Events You Shouldn&apos;t Miss</h3>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-border-strong flex items-center justify-center text-text-muted hover:border-brand-200 hover:text-brand-600 transition-colors">
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-full border border-border-strong flex items-center justify-center text-text-muted hover:border-brand-200 hover:text-brand-600 transition-colors">
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
          {annualEvents.map((evt) => (
            <div
              key={evt.name}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface border border-border hover:border-brand-200 hover:shadow-md transition-all cursor-pointer min-w-[240px]"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                {evt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-text-primary text-sm truncate">{evt.name}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold border border-brand-100">
                {evt.month}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── PLAN YOUR EXPERIENCE ─────────── */}
      <section className="relative bg-brand-700 py-6 mb-12">
         <img 
        src="/list-a-property-page-hero-bg2.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom opacity-20 pointer-events-none select-none z-0"
      />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-10">Plan Your Event Experience</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {planSteps.map((step, i) => (
              <div key={step.title} className="flex flex-row items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-brand-100 mb-4">
                  {step.icon}
                </div>
                <div className="text-start pl-3">
                <h4 className="font-semibold text-white text-sm mb-1">{step.title}</h4>
                <p className="text-brand-100 text-xs leading-relaxed max-w-[180px]">{step.desc}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── NEWSLETTER ─────────── */}
      <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 bg-brand-50/50 rounded-2xl border border-border p-6 sm:p-8">
               <img 
        src="/happy-stay-jaipur-home-bottom-cta-left.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom opacity-50 pointer-events-none select-none z-0"
      />
          <div>
            <p className="text-brand-600 text-lg italic mb-1" style={{ fontFamily: "Georgia, serif" }}>Stay Updated!</p>
            <p className="text-text-muted text-sm">Subscribe to get the latest updates on events, offers and exciting things to do in Jaipur.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-3 rounded-xl bg-surface-muted border border-border-strong text-sm text-text-body placeholder:text-text-faint outline-none focus:border-brand-200"
            />
            <button className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-sm flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

   
    </div>
  );
}