"use client";

import React from "react";
import {
  Castle,
  Building2,
  Hotel,
  Home,
  Trees,
  Wallet,
  Gem,
  SlidersHorizontal,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HappyStayFooter from "@/components/footer";
import PropertyCarousel from "@/components/PropertyCarousel";
import { CategoryConfig, propertyCategories } from "../../../../lib/propertiesData";


const iconMap: Record<CategoryConfig["iconName"], React.ElementType> = {
  Castle,
  Building2,
  Hotel,
  Home,
  Trees,
  Wallet,
  Gem,
};

export default function AllPropertiesPage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-body)",
      }}
    >
      

      {/* --- PAGE HEADER --- */}
      <section className="px-6 lg:px-20 pt-10 pb-6 max-w-8xl mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "var(--color-brand-600)" }}
        >
          Jaipur, Rajasthan
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl lg:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              All Properties
            </h1>
            <p
              className="text-sm mt-2 max-w-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              Browse every stay type we offer in Jaipur — from heritage
              villas to budget-friendly rooms. Use next / previous to move
              through each category, or jump straight to one below.
            </p>
          </div>

          <button
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition hover:opacity-80"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border-strong)",
              color: "var(--color-text-secondary)",
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </section>

      {/* --- CATEGORY JUMP NAV --- */}
      <nav
        className="sticky top-0 z-30 backdrop-blur border-y"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="px-6 lg:px-20 max-w-8xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-3">
            {propertyCategories.map((cat) => {
              const Icon = iconMap[cat.iconName];
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition hover:opacity-80"
                  style={{
                    borderColor: "var(--color-border-strong)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "var(--color-brand-600)" }} />
                  {cat.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* --- CATEGORY SECTIONS --- */}
      <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {propertyCategories.map((cat, index) => (
          <div
            key={cat.id}
            style={{
              backgroundColor:
                index % 2 === 1 ? "var(--color-surface-muted)" : "transparent",
            }}
          >
            <PropertyCarousel
              id={cat.id}
              title={cat.label}
              subtitle={cat.subtitle}
              icon={iconMap[cat.iconName]}
              properties={cat.data}
            />
          </div>
        ))}
      </div>

      <HappyStayFooter />
    </div>
  );
}