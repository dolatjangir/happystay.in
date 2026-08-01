"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Star, Heart } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceUnit?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: string;
 guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  furnishing?: "Furnished" | "Semi-Furnished" | "Unfurnished";
  starRating?: number; 
  breakfastIncluded?: boolean;
}

interface PropertyCarouselProps {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  properties: Property[];
}

export default function PropertyCarousel({
  id,
  title,
  subtitle,
  icon: Icon,
  properties,
}: PropertyCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 280;
    const gap = 20;
    const amount = (cardWidth + gap) * 2;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      className="scroll-mt-24 px-6 lg:px-20 py-8 max-w-8xl mx-auto"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              backgroundColor: "var(--color-brand-50)",
              color: "var(--color-brand-600)",
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <button
          className="hidden sm:flex text-sm font-semibold items-center gap-1 transition hover:opacity-75"
          style={{ color: "var(--color-brand-600)" }}
        >
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        {/* Prev button */}
        <button
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollByAmount("prev")}
          disabled={!canScrollPrev}
          className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full shadow-md border transition disabled:opacity-0 disabled:pointer-events-none hidden sm:flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-none snap-x snap-mandatory"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Next button */}
        <button
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollByAmount("next")}
          disabled={!canScrollNext}
          className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full shadow-md border transition disabled:opacity-0 disabled:pointer-events-none hidden sm:flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div
      data-card
      className="group snap-start shrink-0 w-[260px] sm:w-[280px] rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="280px"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {property.badge && (
          <span
            className="absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{
              backgroundColor: property.badgeColor ?? "var(--color-badge-favorite)",
            }}
          >
            {property.badge}
          </span>
        )}

        <button
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 p-1.5 rounded-full transition backdrop-blur-sm"
          style={{ backgroundColor: "var(--color-overlay-dark)", color: "#fff" }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-bold text-sm truncate transition-colors"
          style={{ color: "var(--color-text-primary)" }}
        >
          {property.title}
        </h3>

        <div
          className="flex items-center justify-between text-xs mt-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-text-faint)" }} />
            <span className="truncate">{property.location}</span>
          </span>
          <span
            className="flex items-center gap-1 font-semibold shrink-0"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Star className="w-3.5 h-3.5" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
            {property.rating.toFixed(1)}
            <span className="font-normal" style={{ color: "var(--color-text-faint)" }}>
              ({property.reviewsCount})
            </span>
          </span>
        </div>

        <div
          className="mt-3 pt-3 border-t flex items-baseline gap-1"
          style={{ borderColor: "var(--color-border)" }}
        >
          <span className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>
            {property.price}
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-faint)" }}>
            / {property.priceUnit ?? "night"}
          </span>
        </div>
      </div>
    </div>
  );
}