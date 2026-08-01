"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Heart, Coffee, Users } from "lucide-react";
import type { Property } from "@/components/PropertyCarousel";

export default function HotelCard({ hotel }: { hotel: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group flex flex-col rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {hotel.starRating && (
          <span
            className="absolute top-3 left-3 flex items-center gap-0.5 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-secondary)" }}
          >
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }}
              />
            ))}
          </span>
        )}

        {hotel.badge && (
          <span
            className="absolute top-11 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: hotel.badgeColor ?? "var(--color-badge-favorite)" }}
          >
            {hotel.badge}
          </span>
        )}

        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setSaved((s) => !s)}
          className="absolute top-3 right-3 p-1.5 rounded-full transition backdrop-blur-sm"
          style={{ backgroundColor: "var(--color-overlay-dark)" }}
        >
          <Heart
            className="w-4 h-4 transition"
            style={{ color: "#fff", fill: saved ? "#fff" : "transparent" }}
          />
        </button>

        <div
          className="absolute -bottom-3 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"
          style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-primary)" }}
        >
          <Star className="w-3.5 h-3.5" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
          {hotel.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-6">
        <h3
          className="font-bold text-base leading-snug transition-colors group-hover:opacity-80"
          style={{ color: "var(--color-text-primary)" }}
        >
          {hotel.title}
        </h3>

        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-text-faint)" }} />
          {hotel.location}
        </p>

        <div
          className="flex items-center gap-3 text-xs font-medium mt-3 pb-3 border-b"
          style={{ color: "var(--color-text-secondary)", borderColor: "var(--color-border)" }}
        >
          {hotel.guests && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
              Sleeps {hotel.guests}
            </span>
          )}
          <span
            className="flex items-center gap-1"
            style={{ color: hotel.breakfastIncluded ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
          >
            <Coffee className="w-3.5 h-3.5" />
            {hotel.breakfastIncluded ? "Breakfast included" : "Room only"}
          </span>
        </div>

        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-700)" }}
              >
                {a}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-surface-muted)", color: "var(--color-text-muted)" }}
              >
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold" style={{ color: "var(--color-text-primary)" }}>
              {hotel.price}
            </span>
            <span className="text-xs font-medium ml-1" style={{ color: "var(--color-text-faint)" }}>
              / {hotel.priceUnit ?? "night"}
            </span>
            <p className="text-[11px]" style={{ color: "var(--color-text-faint)" }}>
              {hotel.reviewsCount} reviews
            </p>
          </div>

          <button
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}