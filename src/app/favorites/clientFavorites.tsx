"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  MapPin,
  Star,
  Share2,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Trash2,
  ArrowRight,
  Home,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Users,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface Property {
  id: string;
  images: string[];
  title: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  dates: string;
  badges: string[];
  beds: number;
  baths: number;
  maxGuests: number;
  isSuperhost: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const savedProperties: Property[] = [
  {
    id: "1",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
    ],
    title: "Heritage Haveli with Courtyard",
    location: "Near Hawa Mahal, Jaipur",
    distance: "2.5 km from City Palace",
    rating: 4.92,
    reviewCount: 128,
    pricePerNight: 4200,
    originalPrice: 5500,
    dates: "Aug 12 – 17",
    badges: ["Guest favorite", "Rare find"],
    beds: 2,
    baths: 2,
    maxGuests: 4,
    isSuperhost: true,
  },
  {
    id: "2",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop",
    ],
    title: "Luxury Pool Villa in C-Scheme",
    location: "C-Scheme, Jaipur",
    distance: "5 km from Airport",
    rating: 4.85,
    reviewCount: 84,
    pricePerNight: 8900,
    dates: "Sep 3 – 8",
    badges: ["New"],
    beds: 3,
    baths: 3,
    maxGuests: 6,
    isSuperhost: false,
  },
  {
    id: "3",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&h=450&fit=crop",
    ],
    title: "Rooftop Apartment with Fort View",
    location: "Amer Road, Jaipur",
    distance: "1 km from Amer Fort",
    rating: 4.97,
    reviewCount: 215,
    pricePerNight: 3200,
    originalPrice: 4000,
    dates: "Aug 20 – 25",
    badges: ["Guest favorite"],
    beds: 1,
    baths: 1,
    maxGuests: 2,
    isSuperhost: true,
  },
  {
    id: "4",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&h=450&fit=crop",
    ],
    title: "Boutique Stay in Walled City",
    location: "Bani Park, Jaipur",
    distance: "3 km from Railway Station",
    rating: 4.78,
    reviewCount: 56,
    pricePerNight: 2800,
    dates: "Oct 1 – 6",
    badges: [],
    beds: 2,
    baths: 1,
    maxGuests: 3,
    isSuperhost: false,
  },
  {
    id: "5",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=450&fit=crop",
    ],
    title: "Royal Suite with Private Garden",
    location: "Malviya Nagar, Jaipur",
    distance: "8 km from City Center",
    rating: 4.88,
    reviewCount: 92,
    pricePerNight: 6500,
    originalPrice: 8200,
    dates: "Nov 10 – 15",
    badges: ["Luxury"],
    beds: 2,
    baths: 2,
    maxGuests: 4,
    isSuperhost: true,
  },
  {
    id: "6",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=450&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=450&fit=crop",
    ],
    title: "Modern Studio near JLN Marg",
    location: "Jagatpura, Jaipur",
    distance: "Near World Trade Park",
    rating: 4.65,
    reviewCount: 34,
    pricePerNight: 1800,
    dates: "Any time",
    badges: ["New"],
    beds: 1,
    baths: 1,
    maxGuests: 2,
    isSuperhost: false,
  },
];

const recommendedProperties: Property[] = [
  {
    id: "r1",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop"],
    title: "Pink City Penthouse",
    location: "Raja Park, Jaipur",
    distance: "Central Jaipur",
    rating: 4.9,
    reviewCount: 67,
    pricePerNight: 5200,
    dates: "Available now",
    badges: ["Guest favorite"],
    beds: 2,
    baths: 2,
    maxGuests: 4,
    isSuperhost: true,
  },
  {
    id: "r2",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop"],
    title: "Cozy Homestay with Terrace",
    location: "Mansarovar, Jaipur",
    distance: "South Jaipur",
    rating: 4.72,
    reviewCount: 45,
    pricePerNight: 2200,
    dates: "Weekends free",
    badges: [],
    beds: 2,
    baths: 1,
    maxGuests: 3,
    isSuperhost: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function FavoritesPage() {
  const [properties, setProperties] = useState<Property[]>(savedProperties);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [removedId, setRemovedId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovedId(id);
    setTimeout(() => {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setRemovedId(null);
    }, 300);
  };

  const nextImage = (id: string, total: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const prevImage = (id: string, total: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total,
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
      {/* ============================================================= */}
      {/*  HERO / HEADER                                                */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&h=600&fit=crop"
            alt="Jaipur Amer Fort"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.9) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="fav-motif" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fav-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-28 sm:pt-28 sm:pb-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 backdrop-blur-sm border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
                Your Collection
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Saved Stays
              </h1>
              <p
                className="text-lg sm:text-xl max-w-xl leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {properties.length} beautiful properties in Jaipur waiting for
                your next trip.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div
                className="px-5 py-3 rounded-xl backdrop-blur-sm border text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-2xl font-bold text-white">{properties.length}</p>
                <p className="text-[11px] text-white/70">Saved</p>
              </div>
              <div
                className="px-5 py-3 rounded-xl backdrop-blur-sm border text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-2xl font-bold text-white">
                  ₹{formatPrice(Math.min(...properties.map((p) => p.pricePerNight)))}
                </p>
                <p className="text-[11px] text-white/70">From/night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TOOLBAR                                                      */}
     
      {properties.length > 0 && (
        <section className="sticky top-0 z-30 bg-[var(--color-surface)] border-b" style={{ borderColor: "var(--color-border)" }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--color-border-strong)",
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:shadow-sm"
                style={{
                  borderColor: "var(--color-border-strong)",
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--color-surface-muted)" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 rounded-md transition-all"
                style={{
                  backgroundColor: viewMode === "grid" ? "var(--color-surface)" : "transparent",
                  boxShadow: viewMode === "grid" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                <Grid3X3
                  className="w-4 h-4"
                  style={{ color: viewMode === "grid" ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
                />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-2 rounded-md transition-all"
                style={{
                  backgroundColor: viewMode === "list" ? "var(--color-surface)" : "transparent",
                  boxShadow: viewMode === "list" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                <LayoutList
                  className="w-4 h-4"
                  style={{ color: viewMode === "list" ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
                />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  EMPTY STATE                                                  */}
      {properties.length === 0 && (
        <section className="py-24 px-4">
          <div className="max-w-md mx-auto text-center">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "var(--color-brand-50)" }}
            >
              <Heart className="w-10 h-10" style={{ color: "var(--color-brand-200)" }} />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              No saved stays yet
            </h2>
            <p
              className="text-sm sm:text-base mb-8 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Start exploring Jaipur&apos;s finest heritage havelis, luxury
              villas, and cozy apartments. Tap the heart icon on any listing to
              save it here.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-brand-600)" }}
            >
              Explore Stays
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  PROPERTY GRID                                                */}
      {properties.length > 0 && (
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-5"
              }
            >
              {properties.map((property) => {
                const currentImg = imageIndexes[property.id] || 0;
                const isRemoving = removedId === property.id;

                return (
                  <div
                    key={property.id}
                    className={`group relative transition-all duration-300 ${
                      isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    } ${viewMode === "list" ? "flex flex-col sm:flex-row gap-5" : ""}`}
                  >
                    {/* Image Section */}
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-[var(--color-surface-muted)] ${
                        viewMode === "list" ? "sm:w-72 flex-shrink-0" : "w-full aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={property.images[currentImg]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {property.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white backdrop-blur-sm"
                            style={{
                              backgroundColor:
                                badge === "Guest favorite"
                                  ? "var(--color-badge-favorite)"
                                  : badge === "New"
                                  ? "var(--color-badge-new)"
                                  : badge === "Luxury"
                                  ? "var(--color-badge-luxury)"
                                  : "var(--color-brand-600)",
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Heart / Remove */}
                      <button
                        onClick={() => handleRemove(property.id)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                      >
                        <Heart className="w-4.5 h-4.5 fill-red-500 text-red-500" />
                      </button>

                      {/* Image Navigation */}
                      {property.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage(property.id, property.images.length);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft className="w-4 h-4" style={{ color: "var(--color-text-primary)" }} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage(property.id, property.images.length);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="w-4 h-4" style={{ color: "var(--color-text-primary)" }} />
                          </button>
                          {/* Dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {property.images.map((_, i) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImageIndexes((prev) => ({ ...prev, [property.id]: i }));
                                }}
                                className="w-1.5 h-1.5 rounded-full transition-all"
                                style={{
                                  backgroundColor:
                                    i === currentImg
                                      ? "white"
                                      : "rgba(255,255,255,0.5)",
                                  transform: i === currentImg ? "scale(1.3)" : "scale(1)",
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Superhost */}
                      {property.isSuperhost && (
                        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" style={{ color: "var(--color-brand-600)" }} />
                          <span className="text-[10px] font-bold" style={{ color: "var(--color-brand-600)" }}>
                            Superhost
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className={`flex-1 ${viewMode === "grid" ? "pt-3.5" : "py-1"}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3
                          className="text-sm font-bold leading-snug line-clamp-1"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-[var(--color-rating)] text-[var(--color-rating)]" />
                          <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                            {property.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {property.location}
                      </p>
                      <p className="text-xs mb-2" style={{ color: "var(--color-text-faint)" }}>
                        {property.distance}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3 h-3" />
                          {property.beds} beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" />
                          {property.baths} baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {property.maxGuests} guests
                        </span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                            {property.dates}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-base font-bold"
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              ₹{formatPrice(property.pricePerNight)}
                            </span>
                            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                              / night
                            </span>
                            {property.originalPrice && (
                              <span
                                className="text-xs line-through"
                                style={{ color: "var(--color-text-faint)" }}
                              >
                                ₹{formatPrice(property.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 opacity-0 group-hover:opacity-100"
                          style={{ backgroundColor: "var(--color-brand-600)" }}
                        >
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  RECOMMENDED SECTION                                          */}
      {/* ============================================================= */}
      {properties.length > 0 && (
        <section className="py-12 px-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  You might also like
                </h2>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  Based on your saved preferences
                </p>
              </div>
              <a
                href="#"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                style={{ color: "var(--color-brand-600)" }}
              >
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommendedProperties.map((property) => (
                <div
                  key={property.id}
                  className="group rounded-2xl border overflow-hidden transition-all hover:shadow-lg"
                  style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className="text-sm font-bold line-clamp-1"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3 h-3 fill-[var(--color-rating)] text-[var(--color-rating)]" />
                        <span className="text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>
                          {property.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>
                      {property.location}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                        ₹{formatPrice(property.pricePerNight)}
                      </span>
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        / night
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Explore More Card */}
              <a
                href="#"
                className="group flex flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-all hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)] min-h-[280px]"
                style={{ borderColor: "var(--color-border-strong)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: "var(--color-brand-50)" }}
                >
                  <Home className="w-7 h-7" style={{ color: "var(--color-brand-600)" }} />
                </div>
                <h3
                  className="text-sm font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Explore More
                </h3>
                <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
                  Discover 500+ stays in Jaipur
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold"
                  style={{ color: "var(--color-brand-600)" }}
                >
                  Browse all <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= */}
      {/*  NEWSLETTER / CTA                                             */}
      {/* ============================================================= */}
      <section className="px-4 py-12 pb-20">
        <div
          className="max-w-5xl mx-auto rounded-2xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via), var(--color-cta-to))",
          }}
        >
          <div className="absolute left-0 bottom-0 opacity-30 pointer-events-none">
            <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
              <path
                d="M20 140V100L30 90L40 100V140H20ZM50 140V80L60 70L70 80V140H50ZM80 140V90L90 80L100 90V140H80ZM110 140V70L120 60L130 70V140H110ZM140 140V85L150 75L160 85V140H140ZM170 140V95L180 85L190 95V140H170ZM200 140V75L210 65L220 75V140H200ZM230 140V100L240 90L250 100V140H230Z"
                fill="var(--color-brand-600)"
              />
              <circle cx="240" cy="40" r="15" fill="var(--color-brand-500)" opacity="0.4" />
              <path d="M260 140V110L270 100L280 110V140H260Z" fill="var(--color-brand-600)" />
            </svg>
          </div>
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="160" cy="40" r="60" fill="var(--color-brand-500)" opacity="0.3" />
              <path d="M140 200V150Q150 130 160 150V200H140ZM170 200V140Q180 120 190 140V200H170Z" fill="var(--color-brand-600)" />
            </svg>
          </div>

          <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Get price drop alerts
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                We&apos;ll notify you when your saved Jaipur stays go on sale.
              </p>
            </div>
            <div className="flex w-full sm:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all bg-white"
                style={{
                  borderColor: "var(--color-border-strong)",
                  color: "var(--color-text-body)",
                }}
              />
              <button
                className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: "var(--color-brand-600)" }}
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}