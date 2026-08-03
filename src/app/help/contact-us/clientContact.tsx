// app/contact/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Phone,
  Mail,
  BookOpen,
  Heart,
  Globe,
  ChevronRight,
 
  MapPin,
  Star,
  ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

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

const faqLinks = [
  { label: "Booking Help", href: "#" },
  { label: "Payments", href: "#" },
  { label: "Cancellations", href: "#" },
  { label: "Listing Your Property", href: "#" },
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

const propertyStrip = [
  {
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    alt: "Heritage Haveli",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    alt: "Pool Resort",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    alt: "Luxury Hotel",
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop",
    alt: "Designer Apartment",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form
  };

  return (
    <div className="relative min-h-screen  font-sans antialiased">
 
   <div className="fixed inset-0 -z-10">
    <Image
      src="/contact-us-bg.png"
      alt="Background"
      fill
      priority
      className="object-cover"
    />

    {/* White overlay */}
    <div className="absolute inset-0 bg-white/70"></div>
    </div>
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className=" pt-16 pb-0 text-center px-4">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          We&apos;re here to help.
          <br />
          Let&apos;s{" "}
          <span style={{ color: "var(--color-brand-600)" }}>Connect.</span>
        </h1>

        {/* Team Photo */}
        <div className="max-w-6xl mx-auto mt-4 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=500&fit=crop"
            alt="HappyStay Team"
            width={1400}
            height={500}
            className="w-full h-[300px] sm:h-[400px] lg:h-[420px] object-cover"
            priority
          />
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CONTACT CARDS (overlap hero)                                  ============================================================= */}
      <section className="relative -mt-24 sm:-mt-44 z-10 px-4">
        {/* Decorative background pattern */}
        <div className="absolute inset-x-0 top-24 h-64 opacity-[0.04] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="text-[var(--color-brand-600)]">
            <defs>
              <pattern id="motif" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                  d="M40 5 L50 20 L65 20 L55 32 L60 48 L40 38 L20 48 L25 32 L15 20 L30 20 Z"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#motif)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Card 1 */}
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "var(--color-brand-50)" }}
            >
              <Phone className="w-6 h-6" style={{ color: "var(--color-brand-600)" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Call Us
            </h3>
            <p className="text-sm font-medium mb-1" style={{ color: "var(--color-brand-600)" }}>
              +1 (030-236-8890)
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
              Support hours:
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Mon-Fri 9 AM - 6 PM IST
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "var(--color-brand-50)" }}
            >
              <Mail className="w-6 h-6" style={{ color: "var(--color-brand-600)" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Email Us
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Support email:
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--color-brand-600)" }}>
              happystayeli@gmail.com
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "var(--color-brand-50)" }}
            >
              <BookOpen className="w-6 h-6" style={{ color: "var(--color-brand-600)" }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              Visit Help Center
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Learn more about is our
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--color-brand-600)" }}>
              full Help pages
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FORM + FAQ + PROPERTY STRIP      ============================================================= */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          {/* ---- Form ---- */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: "var(--color-text-body)",
                      }}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: "var(--color-text-body)",
                      }}
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all appearance-none bg-transparent"
                      style={{
                        borderColor: "var(--color-border-strong)",
                        color: formData.subject
                          ? "var(--color-text-body)"
                          : "var(--color-text-faint)",
                      }}
                    >
                      <option value="">Select a subject...</option>
                      <option value="booking">Booking Help</option>
                      <option value="payment">Payment Issue</option>
                      <option value="cancellation">Cancellation</option>
                      <option value="property">List Your Property</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "var(--color-text-faint)" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      borderColor: "var(--color-border-strong)",
                      color: "var(--color-text-body)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: "var(--color-brand-600)" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* ---- FAQ Sidebar ---- */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                Frequently Asked Topics
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                Quick links to everyone:
              </p>
              <ul className="space-y-3">
                {faqLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center text-sm font-semibold transition-colors hover:underline"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Card */}
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden mt-6">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop"
                  alt="Designer Apartment"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Designer Apartment
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[var(--color-rating)] text-[var(--color-rating)]" />
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>
                      4.9
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--color-text-faint)" }} />
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    Malsiye Nagar, Jaipur
                  </span>
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--color-brand-600)" }}>
                  ₹2,799 <span className="text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>/ night</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Strip (behind/below form visually) */}
        <div className="max-w-6xl mx-auto mt-10 relative">
          <div className="flex gap-4 overflow-hidden rounded-2xl">
            {propertyStrip.map((prop, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-64 h-44 rounded-xl overflow-hidden group"
              >
                <Image
                  src={prop.src}
                  alt={prop.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ))}
            {/* Scroll hint */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--color-surface-muted)] transition-colors z-10">
              <ChevronRight className="w-5 h-5" style={{ color: "var(--color-text-primary)" }} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  NEWSLETTER BANNER      ============================================================= */}
      <section className="px-4 pb-16">
        <div
          className="max-w-6xl mx-auto rounded-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--color-cta-from), var(--color-cta-via), var(--color-cta-to))",
          }}
        >
          {/* Decorative Jaipur skyline SVG */}
          <div className="absolute left-0 bottom-0 opacity-30 pointer-events-none">
            <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
              <path
                d="M20 140V100L30 90L40 100V140H20ZM50 140V80L60 70L70 80V140H50ZM80 140V90L90 80L100 90V140H80ZM110 140V70L120 60L130 70V140H110ZM140 140V85L150 75L160 85V140H140ZM170 140V95L180 85L190 95V140H170ZM200 140V75L210 65L220 75V140H200ZM230 140V100L240 90L250 100V140H230Z"
                fill="var(--color-brand-600)"
              />
              <circle cx="240" cy="40" r="15" fill="var(--color-brand-500)" opacity="0.4" />
              <path d="M260 140V110L270 100L280 110V140H260Z" fill="var(--color-brand-600)" />
            </svg>
          </div>
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="160" cy="40" r="60" fill="var(--color-brand-500)" opacity="0.3" />
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
              <p className="text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
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