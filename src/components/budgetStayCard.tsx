"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Heart, Snowflake, Users } from "lucide-react";
import type { Property } from "@/components/PropertyCarousel";

export default function BudgetStayCard({ stay }: { stay: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group flex flex-col rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={stay.image}
          alt={stay.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        {stay.roomSharing && (
          <span
            className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-secondary)" }}
          >
            {stay.roomSharing}
          </span>
        )}

        {stay.badge && (
          <span
            className="absolute bottom-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: stay.badgeColor ?? "var(--color-badge-favorite)" }}
          >
            {stay.badge}
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
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-bold text-sm leading-snug transition-colors group-hover:opacity-80"
            style={{ color: "var(--color-text-primary)" }}
          >
            {stay.title}
          </h3>
          <span
            className="flex items-center gap-0.5 text-xs font-semibold shrink-0"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Star className="w-3.5 h-3.5" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
            {stay.rating.toFixed(1)}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-text-faint)" }} />
          {stay.location}
        </p>

        <div
          className="flex items-center gap-3 text-xs font-medium mt-2.5 pt-2.5 border-t"
          style={{ color: "var(--color-text-secondary)", borderColor: "var(--color-border)" }}
        >
          {stay.guests && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
              {stay.guests} {stay.guests > 1 ? "people" : "person"}
            </span>
          )}
          <span
            className="flex items-center gap-1"
            style={{ color: stay.hasAC ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
          >
            <Snowflake className="w-3.5 h-3.5" />
            {stay.hasAC ? "AC" : "Non-AC"}
          </span>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <span className="text-base font-extrabold" style={{ color: "var(--color-text-primary)" }}>
              {stay.price}
            </span>
            <span className="text-xs font-medium ml-1" style={{ color: "var(--color-text-faint)" }}>
              / {stay.priceUnit ?? "night"}
            </span>
          </div>

          <button
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}