"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Heart, Users, BedDouble, Bath } from "lucide-react";
import type { Property } from "@/components/PropertyCarousel";

export default function VillaCard({ villa }: { villa: Property }) {
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
      <div className="relative h-56 sm:h-52 lg:h-56 w-full overflow-hidden">
        <Image
          src={villa.image}
          alt={villa.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {villa.badge && (
          <span
            className="absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: villa.badgeColor ?? "var(--color-badge-favorite)" }}
          >
            {villa.badge}
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
            style={{
              color: "#fff",
              fill: saved ? "#fff" : "transparent",
            }}
          />
        </button>

        {/* Rating chip overlapping the image bottom edge */}
        <div
          className="absolute -bottom-3 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"
          style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-primary)" }}
        >
          <Star className="w-3.5 h-3.5" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
          {villa.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-6">
        <h3
          className="font-bold text-base leading-snug transition-colors group-hover:opacity-80"
          style={{ color: "var(--color-text-primary)" }}
        >
          {villa.title}
        </h3>

        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-text-faint)" }} />
          {villa.location}
        </p>

        {/* Guests / beds / baths */}
        {(villa.guests || villa.bedrooms || villa.bathrooms) && (
          <div
            className="flex items-center gap-3 text-xs font-medium mt-3 pb-3 border-b"
            style={{ color: "var(--color-text-secondary)", borderColor: "var(--color-border)" }}
          >
            {villa.guests && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
                {villa.guests} guests
              </span>
            )}
            {villa.bedrooms && (
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
                {villa.bedrooms} beds
              </span>
            )}
            {villa.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
                {villa.bathrooms} baths
              </span>
            )}
          </div>
        )}

        {/* Amenities */}
        {villa.amenities && villa.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {villa.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-700)" }}
              >
                {a}
              </span>
            ))}
            {villa.amenities.length > 3 && (
              <span
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-surface-muted)", color: "var(--color-text-muted)" }}
              >
                +{villa.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold" style={{ color: "var(--color-text-primary)" }}>
              {villa.price}
            </span>
            <span className="text-xs font-medium ml-1" style={{ color: "var(--color-text-faint)" }}>
              / {villa.priceUnit ?? "night"}
            </span>
            <p className="text-[11px]" style={{ color: "var(--color-text-faint)" }}>
              {villa.reviewsCount} reviews
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