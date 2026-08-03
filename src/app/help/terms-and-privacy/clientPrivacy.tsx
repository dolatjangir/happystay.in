// app/terms-privacy/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Shield,
  ScrollText,
  Lock,
  Eye,
  Server,
  Share2,
  Cookie,
  Mail,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Clock,
  Globe,
  Trash2,
  Phone,
  MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — Terms of Service                                           */
/* ------------------------------------------------------------------ */
const termsSections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the HappyStay platform, website, or mobile application (collectively, the 'Services'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.",
      "HappyStay operates as an online marketplace connecting guests with hosts offering accommodations in Jaipur, India. We do not own, create, sell, resell, provide, control, manage, offer, deliver, or supply any listings or host services.",
      "These Terms constitute a legally binding agreement between you and HappyStay Technologies Pvt. Ltd., a company incorporated in India with its registered office in Jaipur, Rajasthan.",
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Account Registration",
    content: [
      "You must be at least 18 years old and capable of entering into legally binding contracts to use our Services. By registering, you represent and warrant that you meet these requirements.",
      "You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.",
      "You are responsible for safeguarding your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.",
      "HappyStay reserves the right to suspend or terminate accounts that provide false information or violate these Terms.",
    ],
  },
  {
    id: "bookings",
    title: "3. Bookings & Payments",
    content: [
      "When you book a stay through HappyStay, you enter into a direct contractual relationship with the host. HappyStay acts solely as the payment collection agent for the host.",
      "All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Currency conversion rates, if applicable, are determined by your payment provider.",
      "Payment must be made in full at the time of booking unless the listing offers a payment plan. Accepted methods include UPI, credit/debit cards, net banking, and select digital wallets.",
      "HappyStay charges a guest service fee (typically 5-12% of the booking subtotal) and a host service fee (typically 3-5%) to cover platform operations, payment processing, and customer support.",
    ],
  },
  {
    id: "cancellations",
    title: "4. Cancellations & Refunds",
    content: [
      "Each listing displays the host's chosen cancellation policy: Flexible, Moderate, or Strict. By booking, you agree to the applicable policy.",
      "Refunds are processed to the original payment method. UPI and wallet refunds are typically instant; card refunds may take 5-14 business days depending on your bank.",
      "If a host cancels your confirmed booking, you will receive a full refund plus a travel credit of up to ₹2,000 as compensation for the inconvenience.",
      "Force Majeure events (natural disasters, government orders, pandemics) may qualify for exceptions to standard policies. Contact our Jaipur support team for case-by-case review.",
    ],
  },
  {
    id: "conduct",
    title: "5. User Conduct & Prohibited Activities",
    content: [
      "You agree to use our Services lawfully and respectfully. Harassment, discrimination, fraud, or illegal activity of any kind is strictly prohibited.",
      "Guests must adhere to house rules set by hosts, including check-in/check-out times, occupancy limits, pet policies, and smoking restrictions.",
      "Hosts must ensure their listings are accurately described, clean, safe, and compliant with all local laws including Jaipur municipal regulations and Rajasthan tourism guidelines.",
      "Prohibited activities include: creating fake listings, manipulating reviews, circumventing platform fees, using the platform for commercial solicitation, and transferring account access to third parties.",
    ],
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content: [
      "HappyStay is a marketplace platform and assumes no liability for the acts or omissions of hosts or guests. We do not guarantee the quality, safety, or legality of any listing.",
      "To the maximum extent permitted by law, HappyStay's total liability to you for any claim arising from or relating to these Terms or the Services shall not exceed the total amount you paid to HappyStay in the 12 months preceding the claim.",
      "We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or personal injury, except where prohibited by law.",
    ],
  },
  {
    id: "intellectual",
    title: "7. Intellectual Property",
    content: [
      "All content on the HappyStay platform — including logos, trademarks, text, graphics, images, and software — is the property of HappyStay or its licensors and is protected by Indian and international copyright laws.",
      "You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes.",
      "You retain ownership of content you submit (reviews, photos, profile information), but grant HappyStay a worldwide, royalty-free license to use, display, and distribute such content for platform operation and marketing purposes.",
    ],
  },
  {
    id: "termination",
    title: "8. Termination & Governing Law",
    content: [
      "Either party may terminate this agreement at any time. HappyStay reserves the right to suspend or terminate your access immediately for violations of these Terms or applicable law.",
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.",
      "If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.",
      "We may update these Terms from time to time. Material changes will be notified via email or platform notice. Continued use constitutes acceptance of revised Terms.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Privacy Policy                                             */
/* ------------------------------------------------------------------ */
const privacySections = [
  {
    id: "overview",
    title: "1. Overview & Scope",
    content: [
      "HappyStay Technologies Pvt. Ltd. ('we', 'us', 'our') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, mobile application, and related services.",
      "This Policy applies to all users of our platform, including guests, hosts, and visitors. By using HappyStay, you consent to the practices described in this Policy.",
      "Our services are operated from Jaipur, Rajasthan, India, and your data is primarily stored and processed within India, with select cloud services provided by global partners under strict data protection agreements.",
    ],
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    content: [
      "Account Information: Name, email address, phone number, government ID (Aadhaar/PAN/Passport for verification), date of birth, and profile photo.",
      "Payment Information: Card details, UPI IDs, bank account information (for hosts), and transaction history. Full card numbers are never stored on our servers — they are tokenized by PCI-DSS compliant payment processors.",
      "Usage Data: IP address, browser type, device information, operating system, referring URLs, pages visited, and interaction patterns.",
      "Location Data: With your consent, we collect precise location to show nearby Jaipur stays and for safety features. You can disable this in device settings.",
      "Communications: Messages between guests and hosts, support chat transcripts, and email correspondence.",
    ],
  },
  {
    id: "usage",
    title: "3. How We Use Your Information",
    content: [
      "To provide and improve our Services: Processing bookings, facilitating payments, verifying identities, and personalizing your search experience.",
      "For safety and security: Fraud detection, risk assessment, identity verification, and investigating violations of our Terms or applicable law.",
      "To communicate with you: Booking confirmations, reminders, promotional offers (with opt-out), policy updates, and support responses.",
      "For analytics and research: Aggregated, anonymized data helps us understand travel trends in Jaipur and improve platform features.",
      "Legal compliance: We may use your information as required by law, court order, or governmental regulation.",
    ],
  },
  {
    id: "sharing",
    title: "4. Information Sharing & Disclosure",
    content: [
      "With Hosts/Guests: When a booking is confirmed, we share necessary contact details and arrival information to facilitate the stay.",
      "With Service Providers: Payment processors, cloud hosting providers, analytics services, customer support tools, and verification agencies who process data on our behalf under strict confidentiality agreements.",
      "For Legal Reasons: We may disclose information if required by law, to protect our rights, or in response to valid legal process.",
      "Business Transfers: In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.",
      "We do not sell your personal information to third parties for marketing purposes.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: [
      "HappyStay uses cookies, web beacons, and similar technologies to enhance your browsing experience, remember preferences, analyze traffic, and deliver targeted advertisements.",
      "Essential Cookies: Required for platform functionality (login, booking flow, security). Cannot be disabled.",
      "Analytics Cookies: Help us understand how users interact with our platform so we can improve performance and usability.",
      "Marketing Cookies: Used to deliver relevant advertisements and measure campaign effectiveness. You can opt out via your browser settings or our Cookie Preferences center.",
      "You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect platform functionality.",
    ],
  },
  {
    id: "security",
    title: "6. Data Security",
    content: [
      "We implement industry-standard security measures including SSL/TLS encryption, AES-256 data encryption at rest, regular security audits, and strict access controls.",
      "Our payment processing is PCI-DSS Level 1 compliant. We never store full credit card numbers on our servers.",
      "Despite our efforts, no online platform can guarantee absolute security. We encourage users to use strong passwords and enable two-factor authentication where available.",
      "In the unlikely event of a data breach, we will notify affected users and relevant authorities within 72 hours as required by Indian law.",
    ],
  },
  {
    id: "rights",
    title: "7. Your Rights & Choices",
    content: [
      "Access & Correction: You can access and update most personal information through your account settings. Contact us for assistance with information not editable online.",
      "Deletion: You may request deletion of your account and personal data. We will comply within 30 days, subject to legal retention requirements for financial and regulatory records.",
      "Opt-Out: You can unsubscribe from marketing emails via the link in each email. Transactional messages (booking confirmations, safety alerts) cannot be opted out of.",
      "Data Portability: Request a copy of your data in a structured, machine-readable format.",
      "Withdraw Consent: Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.",
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention & International Transfers",
    content: [
      "We retain personal data only as long as necessary for the purposes outlined in this Policy or as required by law. Typically, account data is retained for 7 years after account closure for tax and regulatory compliance.",
      "While primary data storage is in India, some service providers may process data in other jurisdictions. We ensure all transfers comply with applicable data protection laws through Standard Contractual Clauses and adequacy decisions.",
      "If you access HappyStay from outside India, you consent to the transfer, storage, and processing of your data in India and other countries where our service providers operate.",
    ],
  },
];

const lastUpdated = "August 3, 2026";

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function TermsPrivacyPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSections = activeTab === "terms" ? termsSections : privacySections;

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentSections.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const switchTab = (tab: "terms" | "privacy") => {
    setActiveTab(tab);
    setActiveSection(tab === "terms" ? "acceptance" : "overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] font-sans antialiased">
      {/* ============================================================= */}
      {/*  HERO                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 50%, #312e81 100%)",
            }}
          />
        </div>

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="legal-motif"
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
            <rect width="100%" height="100%" fill="url(#legal-motif)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <Shield className="w-3.5 h-3.5" />
            Legal & Compliance
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Transparency you can{" "}
            <span style={{ color: "var(--color-brand-200)" }}>trust.</span>
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Clear, honest policies that protect you, your data, and your stays
            in Jaipur.
          </p>

          {/* Last Updated */}
          <div
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TAB SWITCHER      ============================================================= */}
      <section className="sticky top-0 z-40 bg-[var(--color-surface)] border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center sm:justify-start gap-1 py-3">
            <button
              onClick={() => switchTab("terms")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor:
                  activeTab === "terms" ? "var(--color-brand-50)" : "transparent",
                color:
                  activeTab === "terms"
                    ? "var(--color-brand-600)"
                    : "var(--color-text-muted)",
              }}
            >
              <ScrollText className="w-4 h-4" />
              Terms of Service
            </button>
            <button
              onClick={() => switchTab("privacy")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor:
                  activeTab === "privacy" ? "var(--color-brand-50)" : "transparent",
                color:
                  activeTab === "privacy"
                    ? "var(--color-brand-600)"
                    : "var(--color-text-muted)",
              }}
            >
              <Lock className="w-4 h-4" />
              Privacy Policy
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  MAIN CONTENT   ============================================================= */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ---- Sidebar Navigation (desktop) ---- */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-1">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-4 px-3"
                style={{ color: "var(--color-text-faint)" }}
              >
                {activeTab === "terms" ? "Terms Sections" : "Privacy Sections"}
              </p>
              {currentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    color:
                      activeSection === section.id
                        ? "var(--color-brand-600)"
                        : "var(--color-text-secondary)",
                    backgroundColor:
                      activeSection === section.id
                        ? "var(--color-brand-50)"
                        : "transparent",
                    fontWeight: activeSection === section.id ? 600 : 400,
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </aside>

          {/* ---- Mobile Section Dropdown ---- */}
          <div className="lg:hidden col-span-1 mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border-strong)",
                color: "var(--color-text-primary)",
              }}
            >
              <span>
                {currentSections.find((s) => s.id === activeSection)?.title}
              </span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                style={{ color: "var(--color-text-faint)" }}
              />
            </button>

            {mobileMenuOpen && (
              <div
                className="mt-2 rounded-xl border overflow-hidden shadow-lg"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                {currentSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-4 py-3 text-sm transition-colors hover:bg-[var(--color-surface-muted)]"
                    style={{
                      color:
                        activeSection === section.id
                          ? "var(--color-brand-600)"
                          : "var(--color-text-secondary)",
                      fontWeight: activeSection === section.id ? 600 : 400,
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---- Content ---- */}
          <div className="lg:col-span-9 space-y-12">
            {/* Intro */}
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-brand-50)" }}
                >
                  {activeTab === "terms" ? (
                    <FileText
                      className="w-6 h-6"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  ) : (
                    <Shield
                      className="w-6 h-6"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  )}
                </div>
                <div>
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {activeTab === "terms"
                      ? "Terms of Service"
                      : "Privacy Policy"}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {activeTab === "terms"
                      ? "These Terms of Service govern your use of the HappyStay platform. Please read them carefully before making a booking or listing a property in Jaipur."
                      : "This Privacy Policy describes how HappyStay collects, uses, and protects your personal information. We are committed to safeguarding your privacy while delivering exceptional stays in Jaipur."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            {currentSections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h3
                  className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: "var(--color-brand-50)",
                      color: "var(--color-brand-600)",
                    }}
                  >
                    {section.id === "acceptance" || section.id === "overview"
                      ? "1"
                      : section.id === "eligibility" || section.id === "collection"
                      ? "2"
                      : section.id === "bookings" || section.id === "usage"
                      ? "3"
                      : section.id === "cancellations" || section.id === "sharing"
                      ? "4"
                      : section.id === "conduct" || section.id === "cookies"
                      ? "5"
                      : section.id === "liability" || section.id === "security"
                      ? "6"
                      : section.id === "intellectual" || section.id === "rights"
                      ? "7"
                      : "8"}
                  </span>
                  {section.title.replace(/^\d+\.\s/, "")}
                </h3>

                <div
                  className="rounded-2xl border p-6 sm:p-8 space-y-4"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {section.content.map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Agreement Checkbox */}
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor: "var(--color-brand-50)",
                borderColor: "var(--color-brand-200)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <UserCheck
                    className="w-6 h-6"
                    style={{ color: "var(--color-brand-600)" }}
                  />
                </div>
                <div>
                  <h4
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Your Agreement
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    By continuing to use HappyStay, you acknowledge that you
                    have read, understood, and agree to be bound by these{" "}
                    {activeTab === "terms"
                      ? "Terms of Service"
                      : "Privacy Policy"}
                    . If you do not agree, please discontinue use of our
                    Services immediately.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-brand-600)",
                        border: "1px solid var(--color-brand-200)",
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      GDPR Ready
                    </div>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-brand-600)",
                        border: "1px solid var(--color-brand-200)",
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      DPDP Act 2023 Compliant
                    </div>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-brand-600)",
                        border: "1px solid var(--color-brand-200)",
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ISO 27001 Certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TRUST INDICATORS      ============================================================= */}
      <section className="py-10 px-4 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Lock, label: "256-bit SSL", desc: "Encrypted" },
              { icon: Shield, label: "PCI DSS", desc: "Compliant" },
              { icon: Eye, label: "DPDP Act", desc: "2023 Ready" },
              { icon: Server, label: "Data Stored", desc: "In India" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i}>
                  <div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: "var(--color-brand-50)" }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  </div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
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
      {/*  CONTACT CTA                                                  */}
     
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
                  Questions about our policies?
                </h3>
                <p
                  className="text-sm sm:text-base mb-8 leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Our legal and support teams in Jaipur are here to clarify any
                  concerns about your rights, data, or bookings.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--color-brand-600)" }}
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      legal@happystay.in
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
                      +1 (030-236-8890)
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
                      Live Chat Support
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="relative h-64 md:h-auto bg-[var(--color-brand-50)] flex items-center justify-center">
                <div className="text-center p-8">
                  <div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "var(--color-brand-100)" }}
                  >
                    <Globe
                      className="w-10 h-10"
                      style={{ color: "var(--color-brand-600)" }}
                    />
                  </div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    HappyStay Technologies Pvt. Ltd.
                  </h4>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    123 MI Road, Jaipur
                  </p>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Rajasthan, India — 302001
                  </p>
                  <p
                    className="text-xs mt-4"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    CIN: U72900RJ2024PTC012345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}