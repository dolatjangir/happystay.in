"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Heart, ConciergeBell, ChefHat, Users } from "lucide-react";
import type { Property } from "@/components/PropertyCarousel";

export default function LuxuryStayCard({ stay }: { stay: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={stay.image}
          alt={stay.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Bottom gradient so title text is always legible over the image */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0))",
          }}
        />

        {stay.experience && (
          <span
            className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
            style={{ backgroundColor: "var(--color-surface)", color: "var(--color-brand-700)" }}
          >
            {stay.experience}
          </span>
        )}

        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setSaved((s) => !s)}
          className="absolute top-4 right-4 p-2 rounded-full transition backdrop-blur-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <Heart
            className="w-4 h-4 transition"
            style={{ color: "#fff", fill: saved ? "#fff" : "transparent" }}
          />
        </button>

        {/* Title overlaid on the image, luxury magazine style */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-bold text-lg text-white leading-tight drop-shadow-sm">
            {stay.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-white/85 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {stay.location}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between">
          <span
            className="flex items-center gap-1 text-sm font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            <Star className="w-4 h-4" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
            {stay.rating.toFixed(1)}
            <span className="font-normal text-xs" style={{ color: "var(--color-text-faint)" }}>
              ({stay.reviewsCount})
            </span>
          </span>

          {stay.guests && (
            <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
              <Users className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
              {stay.guests} guests
            </span>
          )}
        </div>

        {/* Signature services */}
        <div
          className="flex items-center gap-3 text-xs font-medium mt-3 pb-3 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <span
            className="flex items-center gap-1"
            style={{ color: stay.hasConcierge ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
          >
            <ConciergeBell className="w-3.5 h-3.5" />
            {stay.hasConcierge ? "Concierge" : "No concierge"}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ color: stay.hasPrivateChef ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
          >
            <ChefHat className="w-3.5 h-3.5" />
            {stay.hasPrivateChef ? "Private chef" : "No private chef"}
          </span>
        </div>

        {stay.amenities && stay.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {stay.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-700)" }}
              >
                {a}
              </span>
            ))}
            {stay.amenities.length > 3 && (
              <span
                className="text-[11px] font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: "var(--color-surface-muted)", color: "var(--color-text-muted)" }}
              >
                +{stay.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
              {stay.price}
            </span>
            <span className="text-xs font-medium ml-1" style={{ color: "var(--color-text-faint)" }}>
              / {stay.priceUnit ?? "night"}
            </span>
          </div>

          <button
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-brand-700)" }}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}