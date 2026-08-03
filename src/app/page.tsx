"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Heart,
  Globe,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Building2,
  Home,
  MapPin,
  Waves,
  Sparkles,
  Users,
  Castle,
  Hotel,
  
  Star,
  Bed,
} from "lucide-react";
import gsap from "gsap";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import HappyStayFooter from "@/components/footer";
import Navbar from "@/components/navbar";

// --- Types ---
interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface PropertyType {
  id: string;
  name: string;
  roomType:string;
  location: string;
 
  price:string;
  image: string;
  icon: React.ElementType;
}

interface FeaturedStay {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
}

// --- Data ---
const categories: Category[] = [
  { id: "1", name: "Heritage Stays", icon: Castle },
  { id: "2", name: "Havelis", icon: Hotel },
  { id: "3", name: "Apartments", icon: Building2 },
  { id: "4", name: "Villas", icon: Home },
  { id: "5", name: "Pool Stays", icon: Waves },
  { id: "6", name: "Boutique Stays", icon: Sparkles },
  { id: "7", name: "Luxury Stays", icon: Castle },
  { id: "8", name: "Family Stays", icon: Users },
];

const propertyTypes: PropertyType[] = [
  {
    id: "1",
    name: "Fully Furnished Room",
    location: "Jaipur • Vidyadhar Nagar",
    roomType: "Shared Furnished",
    price: "₹5,000 / month",
    image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
    icon: Bed,
  },
  {
    id: "2",
    name: "Private PG Room",
    location: "Jaipur • Vaishali Nagar",
    roomType: "Private Furnished",
    price: "₹7,500 / month",
    image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    icon: Home,
  },
  {
    id: "3",
    name: "1 RK Apartment",
    location: "Jaipur • Mansarovar",
    roomType: "Semi Furnished",
    price: "₹8,500 / month",
    image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    icon: Building2,
  },
  {
    id: "4",
    name: "Boys PG Room",
    location: "Jaipur • Malviya Nagar",
    roomType: "Shared AC Room",
    price: "₹6,000 / month",
    image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    icon: Users,
  },
  {
    id: "5",
    name: "Girls PG Room",
    location: "Jaipur • Jagatpura",
    roomType: "Private AC Room",
    price: "₹9,000 / month",
    image:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
    icon: Bed,
  },
  {
    id: "6",
    name: "Studio Room",
    location: "Jaipur • Raja Park",
    roomType: "Fully Furnished",
    price: "₹10,000 / month",
    image:"https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
    icon: Home,
  },
];
const featuredStays: FeaturedStay[] = [
  {
    id: "1",
    title: "Heritage Haveli Stay",
    badge: "Guest favorite",
    badgeColor: "bg-indigo-600",
    location: "GSchome, Jaipur",
    rating: 4.8,
    reviewsCount: 128,
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Pink City Rooftop Villa",
    badge: "New",
    badgeColor: "bg-indigo-500",
    location: "Bani Park, Jaipur",
    rating: 4.7,
    reviewsCount: 96,
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Luxury Heritage Villa",
    badge: "Luxury",
    badgeColor: "bg-indigo-700",
    location: "Vaishali Nagar, Jaipur",
    rating: 4.9,
    reviewsCount: 78,
    price: "₹7,999",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Designer Apartment",
    badge: "Guest favorite",
    badgeColor: "bg-indigo-600",
    location: "Malviya Nagar, Jaipur",
    rating: 4.6,
    reviewsCount: 103,
    price: "₹2,799",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
  },
];

export default function HappyStayLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    // GSAP Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from(".animate-fade-in", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from(searchBoxRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      {/* --- HEADER --- */}
     

      {/* --- HERO SECTION --- */}
  <section
  ref={heroRef}
  className="relative h-[30vh] w-full overflow-hidden"
>
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/happy-stay-jaipur-hero-img.png"
      alt="Hawa Mahal Jaipur"
      fill
      priority
      className="object-cover object-center brightness-[0.95]"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:w-2/3" />
  </div>

  {/* Floating Search Bar */}
  <div
    ref={searchBoxRef}
    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-20 bg-white rounded-2xl p-2 shadow-xl border border-slate-100/80"
  >
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">

      {/* Property Type */}
      <div className="flex items-center gap-3 px-4 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition border-b md:border-b-0 md:border-r border-slate-100">
        <div className="text-slate-400">
          <Home className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            Property Type
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
            <span className="truncate">Any type</span>
            <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center gap-3 px-4 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition border-b md:border-b-0 md:border-r border-slate-100">
        <div className="text-slate-400">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            Category
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
            <span className="truncate">Any category</span>
            <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
          </div>
        </div>
      </div>

      {/* City */}
      <div className="flex items-center gap-3 px-4 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition border-b md:border-b-0 md:border-r border-slate-100">
        <div className="text-slate-400">
          <Castle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            City
          </p>
          <div className="flex items-center justify-between text-sm text-slate-700 font-semibold">
            <span className="truncate">Jaipur</span>
            <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Location & Search Button */}
      <div className="flex items-center gap-2 pl-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Location
            </p>
            <span className="text-sm text-slate-500 font-medium truncate block">
              Any location
            </span>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-200 transition shrink-0">
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>

    </div>
  </div>
</section>

<div className="bg-[url('/property-sec-bg-img.png')] bg-no-repeat bg-center bg-cover py-6">
      {/* --- CATEGORIES SLIDER --- */}
      <section className="px-6 lg:px-20 pt-4 max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">Browse by categories</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="flex flex-col items-center justify-center min-w-[110px] p-4 bg-slate-50/80 hover:bg-indigo-50/50 hover:border-indigo-200 border border-transparent rounded-2xl cursor-pointer transition group"
                >
                  <div className="p-3 bg-white text-indigo-600 rounded-full shadow-sm mb-2 group-hover:scale-110 transition duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 text-center">
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
         
        </div>
      </section>

      {/* --- PROPERTY TYPES --- */}
      <section className="px-6 lg:px-20 py-2 max-w-8xl mx-auto ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Property Types</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {propertyTypes.map((prop) => {
  const Icon = prop.icon;

  return (
    <div
      key={prop.id}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={prop.image}
          alt={prop.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Room Type Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          {prop.roomType}
        </div>

        {/* Icon */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-white p-2 shadow-lg">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
            {prop.name}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            📍 {prop.location}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Starting From
            </p>

            <p className="text-xl font-bold text-indigo-600">
              {prop.price}
            </p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
})}
          </div>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-md border border-slate-100 hover:bg-slate-50 hidden lg:flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </section>
</div>
      {/* --- FEATURED STAYS IN JAIPUR --- */}
      <section className="px-6 lg:px-20 pt-12 pb-6 max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Featured stays in Jaipur</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {featuredStays.map((stay) => (
              <div
                key={stay.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden transition cursor-pointer"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  {stay.badge && (
                    <span
                      className={`absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm ${stay.badgeColor}`}
                    >
                      {stay.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition">
                    {stay.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {stay.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-800 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {stay.rating} ({stay.reviewsCount})
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline gap-1">
                    <span className="text-base font-bold text-slate-900">
                      {stay.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-md border border-slate-100 hover:bg-slate-50 hidden lg:flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </section>

      {/* --- NEWSLETTER BANNER --- */}
      <section className="px-6 lg:px-20 py-8 max-w-8xl mx-auto">
        <div className=" relative bg-gradient-to-r from-violet-100 via-indigo-100 to-indigo-50 rounded-3xl p-8 lg:p-12 overflow-hidden border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
         <img src="/happy-stay-jaipur-home-bottom-cta-left.png" alt="hawamahal-blueprient" className="absolute left-0 top-0  w-70 h-40 opacity-50"/>
          <img src="/happy-stay-jaipur-home-bottom-cta-right.png" alt="tree-blueprient"  className="absolute right-4 top-0 w-30 h-40 opacity-70"/>
          <div className="max-w-md z-10 ">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Get the best stays & deals in Jaipur
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Join our newsletter and never miss a special offer.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto z-10 sm:mr-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none w-full md:w-72 shadow-sm border border-slate-200/80 focus:border-indigo-500 transition"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl text-sm shadow-md shadow-indigo-200 transition shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}