// app/safety/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  Phone,
  MessageCircle,
  BadgeCheck,
  Users,
  Home,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  HeartHandshake,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  FileCheck,
  Headphones,
  Siren,
  Fingerprint,
  Wifi,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const safetyPillars = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    desc: "Every property in Jaipur undergoes rigorous photo verification, host identity checks, and optional in-person inspections before going live.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Bank-level SSL encryption protects every transaction. Your payment is held securely until 24 hours after check-in.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
  {
    icon: Eye,
    title: "Transparent Reviews",
    desc: "Double-blind review system ensures honest feedback. Reviews publish only after both parties submit or the window closes.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
  {
    icon: Phone,
    title: "24/7 Emergency Line",
    desc: "Round-the-clock support in Hindi & English. Dedicated safety team with direct lines to local Jaipur authorities.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
  {
    icon: Users,
    title: "Community Standards",
    desc: "Every guest and host agrees to our code of conduct. Zero tolerance for discrimination, harassment, or unsafe behavior.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
  {
    icon: HeartHandshake,
    title: "HappyStay Guarantee",
    desc: "If a property doesn't match its listing, we relocate you or provide a full refund within 24 hours of check-in.",
    color: "var(--color-brand-50)",
    iconColor: "var(--color-brand-600)",
  },
];

const hostSafety = [
  {
    icon: BadgeCheck,
    title: "Guest Verification",
    desc: "All guests complete government ID verification before booking. You always know who is staying at your property.",
  },
  {
    icon: CreditCard,
    title: "Damage Protection",
    desc: "Up to ₹10,00,000 in property damage coverage for every booking. Submit claims directly through your host dashboard.",
  },
  {
    icon: Siren,
    title: "Instant Alerts",
    desc: "Get notified of unusual activity, over-occupancy, or policy violations in real-time via SMS and push notifications.",
  },
  {
    icon: FileCheck,
    title: "Legal Support",
    desc: "Access to vetted local legal partners in Jaipur for tenancy disputes, eviction support, and contract guidance.",
  },
];

const guestSafety = [
  {
    icon: MapPin,
    title: "Accurate Locations",
    desc: "GPS-verified addresses ensure you arrive at the right place. No bait-and-switch listings in the Pink City.",
  },
  {
    icon: Wifi,
    title: "Digital Check-in",
    desc: "Contactless entry with encrypted smart locks or verified host meet-and-greet. No shared physical keys.",
  },
  {
    icon: Clock,
    title: "Flexible Cancellation",
    desc: "Clear, fair cancellation policies displayed before you book. Full refunds available up to 48 hours before check-in.",
  },
  {
    icon: Headphones,
    title: "Local Concierge",
    desc: "Dedicated Jaipur concierge team to help with transport, medical emergencies, and local safety advisories.",
  },
];

const trustBadges = [
  { label: "ISO 27001 Certified", desc: "Information Security" },
  { label: "PCI DSS Compliant", desc: "Payment Security" },
  { label: "GDPR Ready", desc: "Data Privacy" },
  { label: "RBI Regulated", desc: "Financial Standards" },
];

const jaipurTips = [
  {
    title: "Heritage Property Safety",
    desc: "Many Jaipur havelis are historic structures. We ensure all listed heritage properties meet modern fire safety and structural standards.",
  },
  {
    title: "Neighborhood Guides",
    desc: "Every listing includes a detailed neighborhood safety guide — from well-lit streets in C-Scheme to gated communities in Malviya Nagar.",
  },
  {
    title: "Women Traveler Support",
    desc: "Curated 'Women-Friendly' stays with 24/7 female support staff, secure single-entry properties, and verified female hosts.",
  },
  {
    title: "Local Emergency Numbers",
    desc: "Auto-shared upon booking: Police (100), Fire (101), Ambulance (108), and our dedicated HappyStay Safety Hotline.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function SafetyPage() {
  const [activeTab, setActiveTab] = useState<"guests" | "hosts">("guests");

  return (
    <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&h=800&fit=crop"
            alt="Jaipur Amer Fort"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.85) 100%)",
            }}
          />
        </div>

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="safety-motif"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60 15 L70 35 L90 35 L75 50 L80 70 L60 60 L40 70 L45 50 L30 35 L50 35 Z"
                  fill="white"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#safety-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-32 sm:pt-32 sm:pb-40 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Trust & Safety Center
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Your Safety,
            <br />
            <span style={{ color: "var(--color-brand-200)" }}>
              Our Promise.
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            From verified listings in Jaipur to 24/7 emergency support, we build
            trust into every stay — so you can focus on creating memories in the
            Pink City.
          </p>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SAFETY PILLARS GRID         ============================================================= */}
      <section className="relative z-10 -mt-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {safetyPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="group bg-[var(--color-surface)] rounded-2xl border p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: pillar.color }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: pillar.iconColor }}
                  />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TRUST BADGES STRIP      ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border px-6 py-8 sm:px-10 sm:py-10"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Industry-Leading Security
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Certified, compliant, and constantly audited.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: "var(--color-brand-50)" }}
                    >
                      <CheckCircle2
                        className="w-6 h-6"
                        style={{ color: "var(--color-brand-600)" }}
                      />
                    </div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {badge.label}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {badge.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  GUEST / HOST SAFETY TABS  ============================================================= */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div
              className="inline-flex p-1 rounded-xl border"
              style={{
                backgroundColor: "var(--color-surface-muted)",
                borderColor: "var(--color-border)",
              }}
            >
              <button
                onClick={() => setActiveTab("guests")}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor:
                    activeTab === "guests"
                      ? "var(--color-surface)"
                      : "transparent",
                  color:
                    activeTab === "guests"
                      ? "var(--color-brand-600)"
                      : "var(--color-text-muted)",
                  boxShadow:
                    activeTab === "guests"
                      ? "0 1px 3px rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                For Guests
              </button>
              <button
                onClick={() => setActiveTab("hosts")}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor:
                    activeTab === "hosts"
                      ? "var(--color-surface)"
                      : "transparent",
                  color:
                    activeTab === "hosts"
                      ? "var(--color-brand-600)"
                      : "var(--color-text-muted)",
                  boxShadow:
                    activeTab === "hosts"
                      ? "0 1px 3px rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                For Hosts
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeTab === "guests" ? guestSafety : hostSafety).map(
              (item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-5 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-[var(--color-brand-200)]"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-brand-50)" }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: "var(--color-brand-600)" }}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-base font-bold mb-1"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  JAIPUR-SPECIFIC SAFETY       ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Staying Safe in{" "}
              <span style={{ color: "var(--color-brand-600)" }}>Jaipur</span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Local insights and safety measures tailored for the Pink City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {jaipurTips.map((tip, i) => (
              <div
                key={i}
                className="relative group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: "var(--color-brand-500)" }}
                />
                <div className="p-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "var(--color-brand-50)" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {tip.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  HOW WE HANDLE ISSUES   ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via), var(--color-cta-to))",
            }}
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
              <svg width="250" height="250" viewBox="0 0 250 250" fill="none">
                <circle
                  cx="180"
                  cy="70"
                  r="100"
                  fill="var(--color-brand-500)"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 opacity-15 pointer-events-none">
              <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                <path
                  d="M10 120V80L25 65L40 80V120H10ZM50 120V70L65 55L80 70V120H50ZM90 120V85L105 70L120 85V120H90Z"
                  fill="var(--color-brand-600)"
                />
              </svg>
            </div>

            <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    How We Handle Safety Issues
                  </h3>
                  <p
                    className="text-base mb-8 leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    If something goes wrong, we act fast. Our 3-step resolution
                    process ensures you're never left stranded in Jaipur.
                  </p>

                  <div className="space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Report Instantly",
                        desc: "Use the in-app safety button or call our 24/7 hotline. Average response time: under 3 minutes.",
                      },
                      {
                        step: "02",
                        title: "We Investigate",
                        desc: "Our Jaipur-based safety team assesses the situation and contacts the host or local authorities if needed.",
                      },
                      {
                        step: "03",
                        title: "Resolution",
                        desc: "Rebooking, refund, or relocation — we resolve 94% of safety issues within 2 hours of reporting.",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <span
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{
                            backgroundColor: "var(--color-brand-50)",
                            color: "var(--color-brand-600)",
                          }}
                        >
                          {item.step}
                        </span>
                        <div>
                          <h4
                            className="text-sm font-bold mb-1"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.title}
                          </h4>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=500&fit=crop"
                      alt="Jaipur Safety"
                      width={600}
                      height={500}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                  {/* Floating stat card */}
                  <div
                    className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-8 bg-[var(--color-surface)] rounded-xl border shadow-xl p-4 sm:p-5"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="text-2xl sm:text-3xl font-bold mb-1"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      99.7%
                    </div>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Safety incident-free stays
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  COMMUNITY STANDARDS        ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Our Community Standards
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Everyone on HappyStay agrees to these principles. They keep our
              community safe, respectful, and welcoming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Respect",
                desc: "Treat everyone with dignity. No discrimination based on caste, religion, gender, or nationality.",
              },
              {
                icon: Home,
                title: "Responsibility",
                desc: "Take care of the property as if it were your own. Report damages immediately.",
              },
              {
                icon: AlertTriangle,
                title: "Safety First",
                desc: "Follow all local laws and house rules. No illegal activities or unauthorized gatherings.",
              },
              {
                icon: Fingerprint,
                title: "Authenticity",
                desc: "Use your real identity. Fake profiles are permanently banned from the platform.",
              },
              {
                icon: Star,
                title: "Integrity",
                desc: "Leave honest reviews. Manipulating ratings through fake bookings is strictly prohibited.",
              },
              {
                icon: Shield,
                title: "Security",
                desc: "Never share account credentials. Report suspicious activity to our trust team immediately.",
              },
            ].map((std, i) => {
              const Icon = std.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-brand-50)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {std.title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {std.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CTA — REPORT / CONTACT      ============================================================= */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl border overflow-hidden relative"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Need Immediate Help?
                </h3>
                <p
                  className="text-sm sm:text-base mb-8 leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Whether it&apos;s a safety concern, property issue, or
                  emergency in Jaipur — our team is one tap away.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--color-brand-600)" }}
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Emergency Line
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:shadow-md"
                    style={{
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border-strong)",
                      backgroundColor: "var(--color-surface-muted)",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat with Support
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <p
                  className="text-xs mt-5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Average response time:{" "}
                  <span className="font-semibold">under 3 minutes</span>
                </p>
              </div>

              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&h=600&fit=crop"
                  alt="Jaipur Hawa Mahal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)] via-transparent to-transparent md:from-transparent md:via-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}