// app/add-requirement/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Home,
  Star,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  MessageCircle,
  Phone,
  Mail,
  BedDouble,
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Utensils,
  Sparkles,
  ChevronDown,
  Plus,
  Minus,
  HeartHandshake,
  BadgeCheck,
  Flame,
  TreePine,
  Tv,
  Snowflake,
  Loader2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  minBudget: string;
  maxBudget: string;
  propertyTypes: string[];
  preferredAreas: string[];
  amenities: string[];
  specialRequests: string;
  urgency: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const jaipurAreas = [
  "C-Scheme",
  "Malviya Nagar",
  "Vaishali Nagar",
  "Jagatpura",
  "Mansarovar",
  "Bani Park",
  "Civil Lines",
  "Raja Park",
  "Tonk Road",
  "Near Hawa Mahal",
  "Amer Road",
  "JLN Marg",
];

const propertyTypes = [
  { id: "heritage", label: "Heritage Haveli", icon: Home },
  { id: "villa", label: "Private Villa", icon: TreePine },
  { id: "apartment", label: "Apartment", icon: BedDouble },
  { id: "luxury", label: "Luxury Suite", icon: Sparkles },
  { id: "resort", label: "Resort", icon: Waves },
  { id: "homestay", label: "Homestay", icon: HeartHandshake },
];

const amenitiesList = [
  { id: "wifi", label: "High-Speed WiFi", icon: Wifi },
  { id: "parking", label: "Free Parking", icon: Car },
  { id: "pool", label: "Swimming Pool", icon: Waves },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "ac", label: "Air Conditioning", icon: Snowflake },
  { id: "tv", label: "Smart TV", icon: Tv },
  { id: "breakfast", label: "Breakfast Included", icon: Star },
];

const urgencyOptions = [
  { value: "asap", label: "ASAP — Within 24 hours", desc: "Need a place urgently" },
  { value: "week", label: "This Week", desc: "Flexible within 7 days" },
  { value: "month", label: "This Month", desc: "Planning ahead" },
  { value: "later", label: "Just Browsing", desc: "No rush, exploring options" },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Verified Hosts Only", desc: "Every response from a verified property owner" },
  { icon: Clock, label: "Avg. 2 Hour Response", desc: "Hosts in Jaipur reply quickly" },
  { icon: BadgeCheck, label: "Zero Platform Fees", desc: "Free to post your requirement" },
  { icon: HeartHandshake, label: "Best Price Guarantee", desc: "Match or beat any listed price" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function AddRequirementPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    minBudget: "",
    maxBudget: "",
    propertyTypes: [],
    preferredAreas: [],
    amenities: [],
    specialRequests: "",
    urgency: "week",
  });

  const toggleArray = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const adjustGuests = (field: "adults" | "children", delta: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(field === "adults" ? 1 : 0, prev[field] + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center py-20">
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "var(--color-brand-50)" }}
          >
            <CheckCircle2
              className="w-10 h-10"
              style={{ color: "var(--color-brand-600)" }}
            />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Requirement Posted!
          </h2>
          <p
            className="text-base mb-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Your stay requirement has been shared with verified Jaipur hosts.
          </p>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Expect responses within 2 hours. Check your email at {formData.email}
          </p>

          <div
            className="rounded-2xl border p-6 mb-8 text-left"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--color-text-faint)" }}
            >
              Requirement Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Dates</span>
                <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {formData.checkIn || "—"} to {formData.checkOut || "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Guests</span>
                <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {formData.adults} Adults{formData.children > 0 ? `, ${formData.children} Children` : ""}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Budget</span>
                <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                  ₹{formData.minBudget || "0"} - ₹{formData.maxBudget || "Any"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--color-text-muted)" }}>Property Types</span>
                <span className="font-medium text-right" style={{ color: "var(--color-text-primary)" }}>
                  {formData.propertyTypes.length > 0
                    ? formData.propertyTypes.map(t => propertyTypes.find(p => p.id === t)?.label).join(", ")
                    : "Any"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  checkIn: "",
                  checkOut: "",
                  adults: 2,
                  children: 0,
                  minBudget: "",
                  maxBudget: "",
                  propertyTypes: [],
                  preferredAreas: [],
                  amenities: [],
                  specialRequests: "",
                  urgency: "week",
                });
              }}
              className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:shadow-md"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border-strong)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              Post Another Requirement
            </button>
            <a
              href="#"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-brand-600)" }}
            >
              Browse Listings
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&h=700&fit=crop"
            alt="Jaipur City Palace"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.88) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="req-motif" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#req-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-28 sm:pt-28 sm:pb-36 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <Flame className="w-3.5 h-3.5" />
            Free for Guests
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Tell us your{" "}
            <span style={{ color: "var(--color-brand-200)" }}>perfect stay</span>
            <br className="hidden sm:block" /> in Jaipur
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Post your requirement and let verified Jaipur hosts come to you with
            their best offers. Zero fees, zero obligation.
          </p>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TRUST STRIP                                                   */}
      {/* ============================================================= */}
      <section className="relative z-10 -mt-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={i}
                className="bg-[var(--color-surface)] rounded-2xl border p-5 text-center transition-all shadow-lg hover:shadow-xl"                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: "var(--color-brand-50)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--color-brand-600)" }} />
                </div>
                <p className="text-sm font-bold mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                  {point.label}
                </p>
                <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FORM                                                         */}
      {/* ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ---- Main Form ---- */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Basic Info */}
              <div
                className="bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
                  >
                    01
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Contact Details
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      How hosts will reach you
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Full Name <span style={{ color: "var(--color-brand-600)" }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: "var(--color-text-body)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Phone Number <span style={{ color: "var(--color-brand-600)" }}>*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: "var(--color-text-body)",
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Email Address <span style={{ color: "var(--color-brand-600)" }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: "var(--color-text-body)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Stay Details */}
              <div
                className="bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
                  >
                    02
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Stay Details
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      When and who is traveling
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-faint)" }} />
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border-strong)",
                          color: "var(--color-text-body)",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-faint)" }} />
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border-strong)",
                          color: "var(--color-text-body)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div
                    className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-muted)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" style={{ color: "var(--color-brand-600)" }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Adults</p>
                        <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>Age 13+</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => adjustGuests("adults", -1)}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:bg-[var(--color-surface)]"
                        style={{ borderColor: "var(--color-border-strong)" }}
                      >
                        <Minus className="w-3.5 h-3.5" style={{ color: "var(--color-text-primary)" }} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center" style={{ color: "var(--color-text-primary)" }}>
                        {formData.adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustGuests("adults", 1)}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:bg-[var(--color-surface)]"
                        style={{ borderColor: "var(--color-border-strong)" }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: "var(--color-text-primary)" }} />
                      </button>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-muted)" }}
                  >
                    <div className="flex items-center gap-3">
                      <BedDouble className="w-5 h-5" style={{ color: "var(--color-brand-600)" }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Children</p>
                        <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>Ages 2-12</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => adjustGuests("children", -1)}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:bg-[var(--color-surface)]"
                        style={{ borderColor: "var(--color-border-strong)" }}
                      >
                        <Minus className="w-3.5 h-3.5" style={{ color: "var(--color-text-primary)" }} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center" style={{ color: "var(--color-text-primary)" }}>
                        {formData.children}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustGuests("children", 1)}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:bg-[var(--color-surface)]"
                        style={{ borderColor: "var(--color-border-strong)" }}
                      >
                        <Plus className="w-3.5 h-3.5" style={{ color: "var(--color-text-primary)" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Budget */}
              <div
                className="bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
                  >
                    03
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Budget Range (per night)
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      Help hosts match your price expectations
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Minimum Budget
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-faint)" }} />
                      <input
                        type="number"
                        value={formData.minBudget}
                        onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                        placeholder="1,500"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border-strong)",
                          color: "var(--color-text-body)",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Maximum Budget
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-faint)" }} />
                      <input
                        type="number"
                        value={formData.maxBudget}
                        onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                        placeholder="15,000"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border-strong)",
                          color: "var(--color-text-body)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Property Preferences */}
              <div
                className="bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
                  >
                    04
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Property Preferences
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      Select all that apply
                    </p>
                  </div>
                </div>

                {/* Property Types */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Property Type
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {propertyTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.propertyTypes.includes(type.id);
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => toggleArray("propertyTypes", type.id)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center"
                        style={{
                          borderColor: isSelected ? "var(--color-brand-500)" : "var(--color-border)",
                          backgroundColor: isSelected ? "var(--color-brand-50)" : "var(--color-surface)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: isSelected ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: isSelected ? "var(--color-brand-600)" : "var(--color-text-secondary)" }}
                        >
                          {type.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 absolute top-2 right-2" style={{ color: "var(--color-brand-600)" }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Preferred Areas */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Preferred Areas in Jaipur
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {jaipurAreas.map((area) => {
                    const isSelected = formData.preferredAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleArray("preferredAreas", area)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all border"
                        style={{
                          borderColor: isSelected ? "var(--color-brand-500)" : "var(--color-border-strong)",
                          backgroundColor: isSelected ? "var(--color-brand-50)" : "var(--color-surface-muted)",
                          color: isSelected ? "var(--color-brand-600)" : "var(--color-text-secondary)",
                        }}
                      >
                        <MapPin className="w-3 h-3" />
                        {area}
                      </button>
                    );
                  })}
                </div>

                {/* Amenities */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Must-Have Amenities
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {amenitiesList.map((amenity) => {
                    const Icon = amenity.icon;
                    const isSelected = formData.amenities.includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleArray("amenities", amenity.id)}
                        className="flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left"
                        style={{
                          borderColor: isSelected ? "var(--color-brand-500)" : "var(--color-border)",
                          backgroundColor: isSelected ? "var(--color-brand-50)" : "var(--color-surface)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: isSelected ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: isSelected ? "var(--color-brand-600)" : "var(--color-text-secondary)" }}
                        >
                          {amenity.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Additional */}
              <div
                className="bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
                  >
                    05
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Additional Details
                    </h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      Help hosts understand your needs better
                    </p>
                  </div>
                </div>

                {/* Urgency */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  How urgent is this?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {urgencyOptions.map((opt) => {
                    const isSelected = formData.urgency === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: opt.value })}
                        className="flex items-start gap-3 p-4 rounded-xl border transition-all text-left"
                        style={{
                          borderColor: isSelected ? "var(--color-brand-500)" : "var(--color-border)",
                          backgroundColor: isSelected ? "var(--color-brand-50)" : "var(--color-surface)",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            borderColor: isSelected ? "var(--color-brand-600)" : "var(--color-border-strong)",
                          }}
                        >
                          {isSelected && (
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: "var(--color-brand-600)" }}
                            />
                          )}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: isSelected ? "var(--color-brand-600)" : "var(--color-text-primary)" }}
                          >
                            {opt.label}
                          </p>
                          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Special Requests */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Special Requests or Notes
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g., Need wheelchair accessibility, celebrating anniversary, traveling with pets, prefer ground floor..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      borderColor: "var(--color-border-strong)",
                      color: "var(--color-text-body)",
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-xs text-center sm:text-left" style={{ color: "var(--color-text-muted)" }}>
                  By posting, you agree to our{" "}
                  <a href="#" className="underline" style={{ color: "var(--color-brand-600)" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline" style={{ color: "var(--color-brand-600)" }}>
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--color-brand-600)" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Posting Requirement...
                    </>
                  ) : (
                    <>
                      Post My Requirement
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ---- Sidebar (desktop) ---- */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Progress Card */}
              <div
                className="rounded-2xl border p-6"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <h4
                  className="text-sm font-bold mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Why post a requirement?
                </h4>
                <ul className="space-y-4">
                  {[
                    { icon: Star, text: "Get personalized offers from verified hosts" },
                    { icon: IndianRupee, text: "Compare prices and negotiate directly" },
                    { icon: Clock, text: "Save time — hosts come to you" },
                    { icon: ShieldCheck, text: "100% free, no obligation to book" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "var(--color-brand-50)" }}
                        >
                          <Icon className="w-4 h-4" style={{ color: "var(--color-brand-600)" }} />
                        </div>
                        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                          {item.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Featured Property */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop"
                    alt="Featured Jaipur Stay"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-xs font-semibold mb-1">Trending in Jaipur</p>
                    <p className="text-white text-sm font-bold">Heritage Haveli near Hawa Mahal</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[var(--color-rating)] text-[var(--color-rating)]" />
                      <span className="text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>
                        4.9
                      </span>
                      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        (128 reviews)
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: "var(--color-brand-600)" }}>
                      ₹4,500/night
                    </span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    View similar properties <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Support Card */}
              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via))",
                  borderColor: "var(--color-brand-200)",
                }}
              >
                <h4
                  className="text-sm font-bold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Need help filling this?
                </h4>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  Our Jaipur concierge team can help you find the perfect stay over a quick call.
                </p>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +1 (030-236-8890)
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Start Live Chat
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    concierge@happystay.in
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}