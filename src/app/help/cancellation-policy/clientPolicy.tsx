// app/cancellation-policy/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarX,
  Clock,
  RefreshCcw,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Wallet,
  Mail,
  MessageCircle,
  Phone,
  Info,
  Ban,
  Calendar,
  Percent,
  Zap,
  HeartHandshake,
  FileText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const policyTiers = [
  {
    name: "Flexible",
    tagline: "Full refund, no questions",
    color: "var(--color-brand-600)",
    bgLight: "var(--color-brand-50)",
    borderColor: "var(--color-brand-200)",
    badge: "Most Popular",
    rules: [
      { label: "Cancel before check-in", value: "Full refund" },
      { label: "Cancel within 24h of booking", value: "Full refund" },
      { label: "No-show", value: "1 night charge" },
    ],
    bestFor: "Guests who want maximum flexibility",
    icon: RefreshCcw,
  },
  {
    name: "Moderate",
    tagline: "Partial refund with notice",
    color: "var(--color-brand-600)",
    bgLight: "var(--color-brand-50)",
    borderColor: "var(--color-brand-200)",
    badge: null,
    rules: [
      { label: "Cancel 5+ days before", value: "Full refund" },
      { label: "Cancel 3-5 days before", value: "50% refund" },
      { label: "Cancel under 3 days", value: "No refund" },
    ],
    bestFor: "Balanced flexibility for hosts & guests",
    icon: Clock,
  },
  {
    name: "Strict",
    tagline: "Minimal refund window",
    color: "var(--color-brand-600)",
    bgLight: "var(--color-brand-50)",
    borderColor: "var(--color-brand-200)",
    badge: null,
    rules: [
      { label: "Cancel 14+ days before", value: "Full refund" },
      { label: "Cancel 7-14 days before", value: "50% refund" },
      { label: "Cancel under 7 days", value: "No refund" },
    ],
    bestFor: "Peak season & premium properties",
    icon: ShieldCheck,
  },
];

const timelineSteps = [
  {
    icon: CalendarX,
    title: "Guest Cancels",
    desc: "Initiate cancellation from your Trips dashboard or contact our Jaipur support team.",
    time: "Anytime",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    desc: "Our system calculates your refund based on the host's policy and booking timeline.",
    time: "Under 60s",
  },
  {
    icon: Wallet,
    title: "Refund Issued",
    desc: "Funds returned to your original payment method. UPI refunds are instant; cards take 5-7 days.",
    time: "0-7 days",
  },
  {
    icon: HeartHandshake,
    title: "Rebooking Help",
    desc: "Need a new stay? Our Jaipur concierge finds comparable properties at the same price point.",
    time: "Optional",
  },
];

const cancellationFaqs = [
  {
    id: 1,
    question: "How do I cancel my booking in Jaipur?",
    answer:
      "Go to 'Trips' in your account, select your Jaipur stay, and click 'Cancel Reservation'. You'll see the exact refund amount before confirming. Alternatively, call our 24/7 Jaipur support line for assistance.",
  },
  {
    id: 2,
    question: "When will I receive my refund?",
    answer:
      "UPI and wallet refunds are processed instantly. Credit/debit card refunds take 5-7 business days. Net banking refunds typically reflect within 3-5 business days. You'll receive an email confirmation once initiated.",
  },
  {
    id: 3,
    question: "What if the host cancels my booking?",
    answer:
      "If a host cancels, you receive a 100% refund automatically plus a travel credit of up to ₹2,000 for the inconvenience. Our team will also help you find a comparable replacement property in Jaipur at no extra cost.",
  },
  {
    id: 4,
    question: "Can I modify my dates instead of cancelling?",
    answer:
      "Yes! Most Jaipur hosts allow date modifications. Go to 'Trips' → 'Modify Reservation'. Changes are subject to availability and price differences. No modification fees apply for changes made 7+ days in advance.",
  },
  {
    id: 5,
    question: "Are there any cancellation fees?",
    answer:
      "HappyStay never charges guest cancellation fees. The only deduction is based on the host's chosen policy (Flexible, Moderate, or Strict). The exact amount is shown transparently before you confirm cancellation.",
  },
  {
    id: 6,
    question: "What happens during Jaipur peak season (Diwali, New Year)?",
    answer:
      "During peak season (Oct-Jan), many properties switch to Strict policy. We clearly label these bookings at checkout. We recommend purchasing travel insurance for high-season reservations.",
  },
  {
    id: 7,
    question: "Can I get a refund for a no-show?",
    answer:
      "No-show refunds depend on the host's policy. Flexible listings may refund the full amount minus one night. Moderate/Strict policies typically retain the full booking amount. Contact us within 24 hours if you missed check-in due to an emergency.",
  },
  {
    id: 8,
    question: "How do Force Majeure cancellations work?",
    answer:
      "For events beyond control — natural disasters, government lockdowns, flight cancellations — our Jaipur team reviews each case individually. We prioritize full refunds and provide emergency rebooking support.",
  },
];

const specialCases = [
  {
    icon: AlertCircle,
    title: "Medical Emergency",
    desc: "Submit a doctor's note within 48 hours. Full refund guaranteed regardless of policy.",
  },
  {
    icon: Ban,
    title: "Property Mismatch",
    desc: "If the listing doesn't match reality, cancel within 24h of check-in for full refund + relocation.",
  },
  {
    icon: Calendar,
    title: "Government Orders",
    desc: "Lockdowns or travel bans trigger automatic full refunds. No documentation needed.",
  },
  {
    icon: Percent,
    title: "Travel Insurance",
    desc: "Add insurance at checkout for coverage on non-refundable bookings. Claims handled by our partner.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function CancellationPolicyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1600&h=700&fit=crop"
            alt="Jaipur Hawa Mahal"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.85) 100%)",
            }}
          />
        </div>

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="cancel-motif"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z"
                  fill="white"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cancel-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-24 pb-28 sm:pt-32 sm:pb-36 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <CalendarX className="w-3.5 h-3.5" />
            Cancellation & Refunds
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Cancel with{" "}
            <span style={{ color: "var(--color-brand-200)" }}>
              Confidence.
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Transparent policies, instant refunds, and zero hidden fees. We
            believe flexibility is part of the perfect Jaipur stay.
          </p>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  POLICY TIERS      ============================================================= */}
      <section className="relative z-10 -mt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {policyTiers.map((tier, i) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === i;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedTier(isSelected ? null : i)}
                  className={`group relative bg-[var(--color-surface)] ring-${tier.borderColor} rounded-2xl border p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isSelected ? "ring-2 shadow-xl -translate-y-1" : ""
                  }`}
                  style={{
                    borderColor: isSelected
                      ? tier.borderColor
                      : "var(--color-border)",
                     
                  }}
                >
                  {tier.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: "var(--color-brand-600)" }}
                    >
                      {tier.badge}
                    </div>
                  )}

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: tier.bgLight }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: tier.color }}
                    />
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-5"
                    style={{ color: "var(--color-brand-600)" }}
                  >
                    {tier.tagline}
                  </p>

                  <div className="space-y-3 mb-5">
                    {tier.rules.map((rule, ri) => (
                      <div
                        key={ri}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                        style={{
                          backgroundColor: "var(--color-surface-muted)",
                        }}
                      >
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {rule.label}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {rule.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Best for:{" "}
                      <span
                        className="font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {tier.bestFor}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Policy Legend */}
          <div
            className="mt-6 text-center text-xs font-medium px-4 py-3 rounded-xl border"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            <Info className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Every listing clearly displays its policy before you book. No surprises, ever.
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  HOW CANCELLATION WORKS — TIMELINE                            */
      /* ============================================================= */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              How Cancellation Works
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Simple, transparent, and fast. Here's exactly what happens when
              you cancel a Jaipur stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5"
              style={{
                background:
                  "linear-gradient(to right, var(--color-brand-200), var(--color-brand-500), var(--color-brand-200))",
              }}
            />

            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 relative z-10 border-4"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-brand-100)",
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  </div>
                  <div
                    className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold mb-3"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-600)",
                    }}
                  >
                    {step.time}
                  </div>
                  <h4
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed px-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  REFUND CALCULATOR PREVIEW   ============================================================= */}
      <section className="py-10 px-4">
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
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-600)",
                    }}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    Refund Breakdown
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Know exactly what you&apos;ll get back
                  </h3>
                  <p
                    className="text-base mb-8 leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Before you cancel, we show a complete refund breakdown
                    including what the host keeps, what we refund, and when
                    you&apos;ll see it in your account.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Booking Amount",
                        value: "₹12,500",
                        icon: CheckCircle2,
                        color: "var(--color-text-primary)",
                      },
                      {
                        label: "HappyStay Service Fee",
                        value: "₹0 (Refunded)",
                        icon: CheckCircle2,
                        color: "var(--color-brand-600)",
                      },
                      {
                        label: "Host Retention (Flexible)",
                        value: "₹0",
                        icon: CheckCircle2,
                        color: "var(--color-brand-600)",
                      },
                      {
                        label: "Total Refund",
                        value: "₹12,500",
                        icon: Wallet,
                        color: "var(--color-brand-600)",
                        bold: true,
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between py-3 px-4 rounded-xl"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.6)",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className="w-4 h-4"
                              style={{ color: item.color }}
                            />
                            <span
                              className={`text-sm ${
                                item.bold ? "font-bold" : "font-medium"
                              }`}
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {item.label}
                            </span>
                          </div>
                          <span
                            className={`text-sm ${
                              item.bold ? "font-bold" : "font-medium"
                            }`}
                            style={{ color: item.color }}
                          >
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=600&h=500&fit=crop"
                      alt="Jaipur Jal Mahal"
                      width={600}
                      height={500}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                  {/* Floating card */}
                  <div
                    className="absolute -bottom-5 -left-5 sm:bottom-6 sm:-left-8 bg-[var(--color-surface)] rounded-xl border shadow-xl p-4 sm:p-5 max-w-[200px]"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      100%
                    </div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      of Flexible cancellations are fully refunded
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SPECIAL CASES                                                */
      /* ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Special Circumstances
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Life happens. Here&apos;s how we handle exceptional situations
              beyond standard policies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specialCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group bg-[var(--color-surface)] rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "var(--color-brand-50)" }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  </div>
                  <h4
                    className="text-base font-bold mb-2"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FAQ ACCORDION                                                */
      /* ============================================================= */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Common Questions
            </h2>
            <p
              className="text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Everything you need to know about cancelling your Jaipur stay.
            </p>
          </div>

          <div className="space-y-3">
            {cancellationFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-[var(--color-surface)] rounded-2xl border transition-all duration-300"
                style={{ borderColor: "var(--color-border)" }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                >
                  <span
                    className="text-sm sm:text-base font-semibold leading-snug"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-text-faint)" }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openFaq === faq.id ? "300px" : "0px",
                    opacity: openFaq === faq.id ? 1 : 0,
                  }}
                >
                  <div
                    className="px-5 sm:px-6 pb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CTA — NEED HELP?                                             */
      /* ============================================================= */}
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
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--color-brand-50)" }}
                >
                  <FileText
                    className="w-7 h-7"
                    style={{ color: "var(--color-brand-600)" }}
                  />
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Need help with a cancellation?
                </h3>
                <p
                  className="text-sm sm:text-base mb-8 leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Our Jaipur support team is standing by to walk you through
                  your options, process refunds, and find you a new stay if
                  needed.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--color-brand-600)" }}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Start Live Chat
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
                      <Phone className="w-4 h-4" />
                      Call +1 (030-236-8890)
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
                      <Mail className="w-4 h-4" />
                      Email Support
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <p
                  className="text-xs mt-5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Average response time:{" "}
                  <span className="font-semibold">under 3 minutes</span> via
                  chat
                </p>
              </div>

              <div className="relative h-64 md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=600&fit=crop"
                  alt="Jaipur Support"
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