"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  ChevronRight,
  ArrowUpDown,
  Snowflake,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HappyStayFooter from "@/components/footer";
import { budgetStays } from "../../../../lib/propertiesData";
import BudgetStayCard from "@/components/budgetStayCard";


type SortKey = "recommended" | "price-low" | "price-high" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const sharingFilters = ["Any", "Private", "Shared", "Dorm"] as const;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

export default function BudgetStaysPage() {
  const [sortKey, setSortKey] = useState<SortKey>("price-low");
  const [sharing, setSharing] = useState<(typeof sharingFilters)[number]>("Any");
  const [acOnly, setAcOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sortOpen, setSortOpen] = useState(false);

  const heroImage = budgetStays[0]?.image;
  const cheapest = Math.min(...budgetStays.map((s) => parsePrice(s.price)));

  const visibleStays = useMemo(() => {
    const filtered = budgetStays.filter((s) => {
      const matchesSharing = sharing === "Any" || s.roomSharing === sharing;
      const matchesAc = !acOnly || s.hasAC;
      const matchesPrice = parsePrice(s.price) <= maxPrice;
      return matchesSharing && matchesAc && matchesPrice;
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
  }, [sortKey, sharing, acOnly, maxPrice]);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-body)" }}
    >
      <Navbar scrolled={true} />

      {/* --- HERO --- */}
      <section className="relative h-[36vh] sm:h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Budget stays in Jaipur"
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
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 mb-3">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Properties</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Budget Stays</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Budget Stays in Jaipur
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-2 max-w-xl">
            Clean, no-frills rooms and hostel beds that go easy on your
            wallet — starting from just ₹{cheapest}.
          </p>

          <div className="flex items-center gap-4 mt-5 text-white text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {budgetStays.length} stays available
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4" />
              From ₹{cheapest} / night
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
          {/* Sharing type quick filters */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {sharingFilters.map((s) => {
              const active = sharing === s;
              return (
                <button
                  key={s}
                  onClick={() => setSharing(s)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
                  style={{
                    backgroundColor: active ? "var(--color-brand-600)" : "transparent",
                    borderColor: active ? "var(--color-brand-600)" : "var(--color-border-strong)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {s}
                </button>
              );
            })}

            {/* AC toggle */}
            <button
              onClick={() => setAcOnly((a) => !a)}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition"
              style={{
                backgroundColor: acOnly ? "var(--color-brand-600)" : "transparent",
                borderColor: acOnly ? "var(--color-brand-600)" : "var(--color-border-strong)",
                color: acOnly ? "#fff" : "var(--color-text-secondary)",
              }}
            >
              <Snowflake className="w-3.5 h-3.5" />
              AC only
            </button>
          </div>

          {/* Price cap slider */}
          <div className="flex items-center gap-2 min-w-[180px]">
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
              Up to ₹{maxPrice.toLocaleString("en-IN")}
            </span>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 accent-[var(--color-brand-600)]"
            />
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
      <section className="px-6 lg:px-20 py-8 max-w-8xl mx-auto">
        {visibleStays.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
          >
            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              No stays match that filter
            </p>
            <p className="text-sm mt-1">Try raising the price cap or clearing a filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {visibleStays.map((stay) => (
              <BudgetStayCard key={stay.id} stay={stay} />
            ))}
          </div>
        )}
      </section>

      <HappyStayFooter />
    </div>
  );
}