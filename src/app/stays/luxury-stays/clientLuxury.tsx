"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  ChevronRight,
  ArrowUpDown,
  ConciergeBell,
  ChefHat,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HappyStayFooter from "@/components/footer";
import { luxuryStays } from "../../../../lib/propertiesData";
import LuxuryStayCard from "@/components/luxurystayCard";


type SortKey = "recommended" | "price-low" | "price-high" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const experienceFilters = ["Any", "Palace", "Resort", "Private Villa", "Penthouse"] as const;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

export default function LuxuryStaysPage() {
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [experience, setExperience] = useState<(typeof experienceFilters)[number]>("Any");
  const [conciergeOnly, setConciergeOnly] = useState(false);
  const [chefOnly, setChefOnly] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const heroImage = luxuryStays[0]?.image;
  const avgRating =
    luxuryStays.reduce((sum, s) => sum + s.rating, 0) / (luxuryStays.length || 1);

  const visibleStays = useMemo(() => {
    const filtered = luxuryStays.filter((s) => {
      const matchesExperience = experience === "Any" || s.experience === experience;
      const matchesConcierge = !conciergeOnly || s.hasConcierge;
      const matchesChef = !chefOnly || s.hasPrivateChef;
      return matchesExperience && matchesConcierge && matchesChef;
    });
    const sorted = [...filtered];
    switch (sortKey) {
      case "price-low":
        sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-high":
        sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [sortKey, experience, conciergeOnly, chefOnly]);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-body)" }}
    >
      <Navbar scrolled={true} />

      {/* --- HERO --- */}
      <section className="relative h-[46vh] sm:h-[52vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Luxury stays in Jaipur"
              fill
              priority
              className="object-cover object-center brightness-[0.55]"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,23,42,0.85), rgba(15,23,42,0.2))",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-20 pb-10 max-w-8xl mx-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 mb-3">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Properties</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Luxury Stays</span>
          </div>

          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: "var(--color-brand-200)" }}
          >
            Curated Collection
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Luxury Stays in Jaipur
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-xl">
            Palace suites, private villas and heritage resorts with
            butler service, private chefs, and views fit for royalty.
          </p>

          <div className="flex items-center gap-4 mt-6 text-white text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {luxuryStays.length} stays available
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
              {avgRating.toFixed(1)} average rating
            </span>
          </div>
        </div>
      </section>

      {/* --- STICKY FILTER / SORT BAR --- */}
      <div
        className="sticky top-0 z-30 backdrop-blur border-b"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="px-6 lg:px-20 max-w-8xl mx-auto py-3 flex flex-wrap items-center gap-3">
          {/* Experience type quick filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {experienceFilters.map((e) => {
              const active = experience === e;
              return (
                <button
                  key={e}
                  onClick={() => setExperience(e)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
                  style={{
                    backgroundColor: active ? "var(--color-brand-700)" : "transparent",
                    borderColor: active ? "var(--color-brand-700)" : "var(--color-border-strong)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {e}
                </button>
              );
            })}

            {/* Concierge toggle */}
            <button
              onClick={() => setConciergeOnly((c) => !c)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
              style={{
                backgroundColor: conciergeOnly ? "var(--color-brand-700)" : "transparent",
                borderColor: conciergeOnly ? "var(--color-brand-700)" : "var(--color-border-strong)",
                color: conciergeOnly ? "#fff" : "var(--color-text-secondary)",
              }}
            >
              <ConciergeBell className="w-3.5 h-3.5" />
              Concierge
            </button>

            {/* Private chef toggle */}
            <button
              onClick={() => setChefOnly((c) => !c)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
              style={{
                backgroundColor: chefOnly ? "var(--color-brand-700)" : "transparent",
                borderColor: chefOnly ? "var(--color-brand-700)" : "var(--color-border-strong)",
                color: chefOnly ? "#fff" : "var(--color-text-secondary)",
              }}
            >
              <ChefHat className="w-3.5 h-3.5" />
              Private chef
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-medium hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>
              {visibleStays.length} results
            </span>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border shadow-sm transition hover:opacity-80"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border-strong)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortOptions.find((o) => o.key === sortKey)?.label}
              </button>

              {sortOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl border shadow-lg overflow-hidden z-40"
                  style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortKey(opt.key);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium transition hover:opacity-80"
                      style={{
                        backgroundColor:
                          sortKey === opt.key ? "var(--color-brand-50)" : "transparent",
                        color:
                          sortKey === opt.key
                            ? "var(--color-brand-700)"
                            : "var(--color-text-secondary)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <section className="px-6 lg:px-20 py-10 max-w-8xl mx-auto">
        {visibleStays.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
          >
            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              No stays match that filter
            </p>
            <p className="text-sm mt-1">Try a different experience type or clear a toggle.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleStays.map((stay) => (
              <LuxuryStayCard key={stay.id} stay={stay} />
            ))}
          </div>
        )}
      </section>

      <HappyStayFooter />
    </div>
  );
}