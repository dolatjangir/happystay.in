"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpDown,
  UtensilsCrossed,
  Users2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HappyStayFooter from "@/components/footer";
import { homestays } from "../../../../lib/propertiesData";
import HomestayCard from "@/components/homestayCard";

type SortKey = "recommended" | "price-low" | "price-high" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const hostTypeFilters = [
  "Any",
  "Family Stay",
  "Private Room with Host",
  "Entire Home",
] as const;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

export default function HomestaysPage() {
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [hostType, setHostType] = useState<(typeof hostTypeFilters)[number]>("Any");
  const [mealsOnly, setMealsOnly] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const heroImage = homestays[0]?.image;
  const avgRating =
    homestays.reduce((sum, h) => sum + h.rating, 0) / (homestays.length || 1);

  const visibleHomestays = useMemo(() => {
    const filtered = homestays.filter((h) => {
      const matchesHost = hostType === "Any" || h.hostType === hostType;
      const matchesMeals = !mealsOnly || h.mealsIncluded;
      return matchesHost && matchesMeals;
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
  }, [sortKey, hostType, mealsOnly]);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-body)" }}
    >
      <Navbar scrolled={true} />

      {/* --- HERO --- */}
      <section className="relative h-[38vh] sm:h-[42vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Homestays in Jaipur"
              fill
              priority
              className="object-cover object-center brightness-[0.6]"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0.15))",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-20 pb-8 max-w-8xl mx-auto">
         

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Homestays in Jaipur
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-2 max-w-xl">
            Live like a local with a host family — home-cooked meals,
            warm hospitality and real Rajasthani culture.
          </p>

          <div className="flex items-center gap-4 mt-5 text-white text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {homestays.length} homestays available
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
          {/* Host type quick filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Users2 className="w-4 h-4 shrink-0 mr-0.5" style={{ color: "var(--color-text-faint)" }} />
            {hostTypeFilters.map((h) => {
              const active = hostType === h;
              return (
                <button
                  key={h}
                  onClick={() => setHostType(h)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
                  style={{
                    backgroundColor: active ? "var(--color-brand-600)" : "transparent",
                    borderColor: active ? "var(--color-brand-600)" : "var(--color-border-strong)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {h}
                </button>
              );
            })}

            {/* Meals included toggle */}
            <button
              onClick={() => setMealsOnly((m) => !m)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
              style={{
                backgroundColor: mealsOnly ? "var(--color-brand-600)" : "transparent",
                borderColor: mealsOnly ? "var(--color-brand-600)" : "var(--color-border-strong)",
                color: mealsOnly ? "#fff" : "var(--color-text-secondary)",
              }}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Meals included
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-medium hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>
              {visibleHomestays.length} results
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

            <button
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border shadow-sm transition hover:opacity-80"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-strong)",
                color: "var(--color-text-secondary)",
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <section className="px-6 lg:px-20 py-8 max-w-8xl mx-auto">
        {visibleHomestays.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
          >
            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              No homestays match that filter
            </p>
            <p className="text-sm mt-1">Try a different host type or turn off meals-only.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleHomestays.map((homestay) => (
              <HomestayCard key={homestay.id} homestay={homestay} />
            ))}
          </div>
        )}
      </section>

      <HappyStayFooter />
    </div>
  );
}