// app/faq/page.tsx
"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Shield,
  CreditCard,
  CalendarX,
  Home,
  Star,
  Mail,
  Phone,
  ArrowRight,
  Heart,
  Globe,
 
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="var(--color-brand-600)" />
      <path
        d="M16 6L6 14V26H13V19H19V26H26V14L16 6Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 6V26" stroke="var(--color-brand-600)" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const navLinks = [
  { label: "Stays", href: "#" },
  { label: "Experiences", href: "#" },
  { label: "Wishlist", href: "#" },
  { label: "List your property", href: "#" },
  { label: "Help", href: "#" },
];

const categories = [
  { id: "all", label: "All Topics", icon: HelpCircle },
  { id: "booking", label: "Booking", icon: CalendarX },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "hosting", label: "Hosting", icon: Home },
  { id: "trust", label: "Trust & Safety", icon: Shield },
  { id: "reviews", label: "Reviews", icon: Star },
];

const faqs = [
  {
    id: 1,
    category: "booking",
    question: "How do I book a heritage haveli in Jaipur?",
    answer:
      "Browse our curated collection of Jaipur heritage stays, select your dates, and click 'Reserve'. You'll receive instant confirmation along with a digital guide to your property's history and nearby attractions like Hawa Mahal and City Palace.",
  },
  {
    id: 2,
    category: "booking",
    question: "Can I modify my reservation dates after booking?",
    answer:
      "Yes! Go to 'Trips' in your account dashboard and select 'Modify Reservation'. Hosts in Jaipur typically respond within 2 hours. Date changes are subject to availability and the host's cancellation policy.",
  },
  {
    id: 3,
    category: "booking",
    question: "What is the check-in process for Jaipur properties?",
    answer:
      "Most hosts offer flexible check-in with digital key codes or in-person greetings. For heritage properties in the Walled City, hosts often provide a traditional welcome with refreshments. Check-in details are shared 24 hours before arrival.",
  },
  {
    id: 4,
    category: "payments",
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, credit/debit cards (Visa, Mastercard, RuPay), net banking, and wallets like Paytm and PhonePe. All transactions are processed in INR with bank-level SSL encryption.",
  },
  {
    id: 5,
    category: "payments",
    question: "When will I be charged for my booking?",
    answer:
      "For most stays, you're charged the full amount at booking. For longer stays (7+ nights), you may be charged 50% upfront and the remainder 7 days before check-in. You'll always see the exact charge schedule before confirming.",
  },
  {
    id: 6,
    category: "payments",
    question: "Are there any hidden fees?",
    answer:
      "Never. HappyStay displays the total price upfront — including cleaning fees, service fees, and taxes. What you see is exactly what you pay. No surprises at checkout.",
  },
  {
    id: 7,
    category: "hosting",
    question: "How do I list my Jaipur property?",
    answer:
      "Click 'List your property' and follow our guided setup. You'll need property photos, amenity details, and pricing. Our Jaipur team offers free virtual staging advice to help your haveli or villa stand out to guests.",
  },
  {
    id: 8,
    category: "hosting",
    question: "What commission does HappyStay charge hosts?",
    answer:
      "We charge a competitive 3-5% host service fee per booking — among the lowest in India. There are no listing fees, no monthly charges, and no hidden costs to list your Jaipur property.",
  },
  {
    id: 9,
    category: "hosting",
    question: "Can I set my own house rules?",
    answer:
      "Absolutely. You control check-in times, guest limits, pet policies, and cultural considerations. Many Jaipur hosts include respectful guidelines for heritage properties to preserve their historical significance.",
  },
  {
    id: 10,
    category: "trust",
    question: "Is HappyStay available 24/7 for emergencies?",
    answer:
      "Yes. Our Jaipur support team is available round-the-clock via phone and chat. For safety emergencies, we have a dedicated hotline with local language support in Hindi and English.",
  },
  {
    id: 11,
    category: "trust",
    question: "How does HappyStay verify properties?",
    answer:
      "Every Jaipur listing undergoes a rigorous verification process including photo verification, host identity checks, and optional in-person inspections. Look for the 'Verified' badge on listings for extra peace of mind.",
  },
  {
    id: 12,
    category: "trust",
    question: "What if a property doesn't match the photos?",
    answer:
      "Contact us within 24 hours of check-in. Our 'HappyStay Guarantee' ensures you'll receive a full refund or be moved to a comparable property at no extra cost. Your satisfaction is our priority.",
  },
  {
    id: 13,
    category: "reviews",
    question: "How does the review system work?",
    answer:
      "After checkout, both guests and hosts have 14 days to leave a review. Reviews are only published once both parties submit or the window closes. This ensures honest, unbiased feedback about your Jaipur stay.",
  },
  {
    id: 14,
    category: "reviews",
    question: "Can I respond to a review on my property?",
    answer:
      "Hosts can publicly respond to any review within 30 days. This is a great way to thank guests or address concerns professionally. Thoughtful responses boost your listing's credibility.",
  },
];

const footerCompany = [
  { label: "About us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "#" },
];

const footerSupport = [
  { label: "Help Center", href: "#" },
  { label: "Cancellation", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const footerHosting = [
  { label: "List your property", href: "#" },
  { label: "Host resources", href: "#" },
  { label: "Heating responsibly", href: "#" },
];

const footerTopStays = [
  { label: "Heritage Stays", href: "#" },
  { label: "Villas", href: "#" },
  { label: "Apartments", href: "#" },
  { label: "Luxury Stays", href: "#" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(1);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
    
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&h=700&fit=crop"
            alt="Jaipur Hawa Mahal"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.4) 40%, rgba(15,23,42,0.7) 100%)",
            }}
          />
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="jaipur-motif"
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
            <rect width="100%" height="100%" fill="url(#jaipur-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-28 sm:pt-28 sm:pb-36 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <MapPin className="w-3.5 h-3.5" />
            Jaipur, The Pink City
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            How can we help you?
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Find answers about stays, payments, hosting, and everything
            HappyStay in Jaipur.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search
                className="w-5 h-5"
                style={{ color: "var(--color-text-faint)" }}
              />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl border-0 shadow-2xl text-base outline-none focus:ring-4 transition-all"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-body)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CATEGORY PILLS============================================================= */}
      <section className="relative z-20 -mt-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border hover:shadow-md"
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-brand-600)"
                      : "var(--color-surface)",
                    color: isActive ? "white" : "var(--color-text-secondary)",
                    borderColor: isActive
                      ? "var(--color-brand-600)"
                      : "var(--color-border)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FAQ CONTENT  ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {activeCategory === "all"
                ? "Frequently Asked Questions"
                : categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "result" : "results"}
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20">
              <Search
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: "var(--color-text-faint)" }}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                No results found
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Try adjusting your search or browse all topics.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                style={{ color: "var(--color-brand-600)" }}
              >
                Clear filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-[var(--color-surface)] rounded-2xl border transition-all duration-300 hover:shadow-md"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: "var(--color-brand-50)",
                          color: "var(--color-brand-600)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-base sm:text-lg font-semibold leading-snug"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                        openId === faq.id ? "rotate-180" : ""
                      }`}
                      style={{ color: "var(--color-text-faint)" }}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openId === faq.id ? "300px" : "0px",
                      opacity: openId === faq.id ? 1 : 0,
                    }}
                  >
                    <div
                      className="px-5 sm:px-6 pb-6 pl-[4.5rem] sm:pl-[5.5rem]"
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
          )}
        </div>
      </section>

      {/* ============================================================= */}
      {/*  VISUAL BREAK — JAIPUR IMAGES                                 */
      /* ============================================================= */}
      <section className="py-10 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=500&fit=crop",
                label: "Amer Fort",
              },
              {
                src: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=400&h=500&fit=crop",
                label: "Hawa Mahal",
              },
              {
                src: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&h=500&fit=crop",
                label: "Jal Mahal",
              },
              {
                src: "https://images.unsplash.com/photo-1589820296156-2454bbe6a8a0?w=400&h=500&fit=crop",
                label: "City Palace",
              },
            ].map((img, i) => (
              <div
                key={i}
                className="relative group rounded-2xl overflow-hidden aspect-[3/4]"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-semibold">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  STILL NEED HELP CTA      ============================================================= */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via), var(--color-cta-to))",
            }}
          >
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none">
                <circle
                  cx="150"
                  cy="50"
                  r="80"
                  fill="var(--color-brand-500)"
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

            <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16 text-center">
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "var(--color-brand-50)" }}
              >
                <MessageCircle
                  className="w-8 h-8"
                  style={{ color: "var(--color-brand-600)" }}
                />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                Still have questions?
              </h3>
              <p
                className="text-base max-w-md mx-auto mb-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Our Jaipur support team is here to help you with bookings,
                hosting, or anything else.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "var(--color-brand-600)" }}
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:shadow-md"
                  style={{
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-border-strong)",
                    backgroundColor: "var(--color-surface)",
                  }}
                >
                  <Phone className="w-4 h-4" />
                  +1 (030-236-8890)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  NEWSLETTER BANNER         ============================================================= */}
      <section className="px-4 pb-16">
        <div
          className="max-w-6xl mx-auto rounded-2xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via), var(--color-cta-to))",
          }}
        >
          <div className="absolute left-0 bottom-0 opacity-30 pointer-events-none">
            <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
              <path
                d="M20 140V100L30 90L40 100V140H20ZM50 140V80L60 70L70 80V140H50ZM80 140V90L90 80L100 90V140H80ZM110 140V70L120 60L130 70V140H110ZM140 140V85L150 75L160 85V140H140ZM170 140V95L180 85L190 95V140H170ZM200 140V75L210 65L220 75V140H200ZM230 140V100L240 90L250 100V140H230Z"
                fill="var(--color-brand-600)"
              />
              <circle
                cx="240"
                cy="40"
                r="15"
                fill="var(--color-brand-500)"
                opacity="0.4"
              />
              <path
                d="M260 140V110L270 100L280 110V140H260Z"
                fill="var(--color-brand-600)"
              />
            </svg>
          </div>
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle
                cx="160"
                cy="40"
                r="60"
                fill="var(--color-brand-500)"
                opacity="0.3"
              />
              <path
                d="M140 200V150Q150 130 160 150V200H140ZM170 200V140Q180 120 190 140V200H170Z"
                fill="var(--color-brand-600)"
              />
            </svg>
          </div>

          <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Get the best stays & deals in Jaipur
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Join our newsletter and never miss a special offer.
              </p>
            </div>
            <div className="flex w-full sm:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-72 px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all bg-white"
                style={{
                  borderColor: "var(--color-border-strong)",
                  color: "var(--color-text-body)",
                }}
              />
              <button
                className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: "var(--color-brand-600)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

  
    </div>
  );
}