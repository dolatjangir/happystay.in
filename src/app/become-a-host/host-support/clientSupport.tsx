"use client";

import { useState, useRef, useMemo } from "react";
import {
  Headphones, Search, MessageCircle, Mail, Phone, Clock, CheckCircle2,
  ArrowRight, ChevronDown, ChevronUp, Send, User, FileText, DollarSign,
  Home, Calendar, Shield, Settings, Zap, Star, Globe, HelpCircle,
  Wifi, ImageIcon, MapPin, Users, AlertTriangle, Check, X, Bot,
  Sparkles, BookOpen, Video, ExternalLink, ThumbsUp, ThumbsDown,
  Copy, CheckCheck, Loader2, ArrowUpRight, Heart, Award, TrendingUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportCategory {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  articles: number;
}

interface TicketForm {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  propertyId: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const supportCategories: SupportCategory[] = [
  { id: "listings", title: "Listings & Photos", desc: "Create, edit, and optimize your property listings", icon: <Home size={22} />, articles: 24 },
  { id: "bookings", title: "Bookings & Calendar", desc: "Manage reservations, availability, and cancellations", icon: <Calendar size={22} />, articles: 18 },
  { id: "payments", title: "Payments & Earnings", desc: "Payouts, pricing, fees, and tax information", icon: <DollarSign size={22} />, articles: 15 },
  { id: "guests", title: "Guest Management", desc: "Communication, reviews, and guest issues", icon: <Users size={22} />, articles: 12 },
  { id: "account", title: "Account & Profile", desc: "Settings, verification, and security", icon: <Settings size={22} />, articles: 10 },
  { id: "safety", title: "Safety & Trust", desc: "Insurance, policies, and dispute resolution", icon: <Shield size={22} />, articles: 8 },
];

const faqs: FAQItem[] = [
  {
    id: "f1", category: "listings",
    question: "How do I create a new property listing?",
    answer: "Go to your Host Dashboard and click 'Add Property'. You'll go through an 8-step process covering basic details, location, amenities, photos, pricing, and house rules. Most hosts complete this in under 15 minutes.",
  },
  {
    id: "f2", category: "listings",
    question: "What photos should I upload for best results?",
    answer: "Upload at least 8 high-resolution photos. Include: exterior, living room, each bedroom, kitchen, bathrooms, and any unique features. Bright, natural-light photos get 40% more bookings. We recommend a 16:9 aspect ratio.",
  },
  {
    id: "f3", category: "bookings",
    question: "How do I manage my availability calendar?",
    answer: "From your Host Dashboard, go to 'Calendar' under any property. Click on dates to block them, set custom prices for specific dates, or enable instant booking. You can also sync with Google Calendar or iCal.",
  },
  {
    id: "f4", category: "bookings",
    question: "Can I cancel a confirmed booking?",
    answer: "Host cancellations should be avoided as they affect your ranking. In emergencies, go to Bookings > select the reservation > Cancel. A cancellation fee may apply depending on your host tier and reason.",
  },
  {
    id: "f5", category: "payments",
    question: "When do I receive my payout?",
    answer: "Payouts are processed within 24 hours of guest check-in. Depending on your bank, funds typically arrive in 1-3 business days. You can track all payouts from your Earnings dashboard.",
  },
  {
    id: "f6", category: "payments",
    question: "What fees does HappyStay charge hosts?",
    answer: "HappyStay charges just 3% per confirmed booking — the lowest in the industry. A 2.5% payment processing fee also applies. There are no monthly fees, no listing fees, and no hidden charges.",
  },
  {
    id: "f7", category: "guests",
    question: "How do I communicate with guests?",
    answer: "Use our built-in messaging system accessible from your dashboard or the HappyStay Host app. All communications are logged for your protection. We recommend responding within 1 hour during business hours.",
  },
  {
    id: "f8", category: "guests",
    question: "What if a guest damages my property?",
    answer: "HappyStay provides up to ₹10,00,000 in host damage protection. Document the damage with photos, file a claim within 48 hours of checkout, and our team will review and process your claim within 5 business days.",
  },
  {
    id: "f9", category: "account",
    question: "How do I become a Superhost?",
    answer: "Superhost status is earned by maintaining: 4.8+ rating, 90%+ response rate, <1% cancellation rate, and 10+ completed stays per quarter. Benefits include priority support, badge on listings, and higher search ranking.",
  },
  {
    id: "f10", category: "safety",
    question: "Is my property insured when guests stay?",
    answer: "Yes! Every booking on HappyStay includes complimentary Host Protection Insurance covering property damage up to ₹10,00,000 and liability protection up to ₹50,00,000. No additional action is required from you.",
  },
];

const quickLinks = [
  { icon: <BookOpen size={16} />, label: "Getting Started Guide", desc: "5 min read" },
  { icon: <Video size={16} />, label: "Video Tutorials", desc: "12 videos" },
  { icon: <FileText size={16} />, label: "Host Policy PDF", desc: "Download" },
  { icon: <Zap size={16} />, label: "Pricing Calculator", desc: "Interactive" },
];

const ticketCategories = [
  "Listing Issue", "Booking Problem", "Payment Query", "Guest Dispute",
  "Account Access", "Technical Bug", "Feature Request", "Other",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function HostSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>("f1");
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: "user" | "bot"; text: string}[]>([
    { role: "bot", text: "Hi! I'm Happy, your AI support assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [ticketForm, setTicketForm] = useState<TicketForm>({
    name: "", email: "", category: "", subject: "", message: "", propertyId: "",
  });

  /* ---- Filtered FAQs ---- */
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;
    if (activeCategory) filtered = filtered.filter((f) => f.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  /* ---- Chat ---- */
  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        role: "bot",
        text: "Thanks for reaching out! For detailed assistance with this issue, I'd recommend submitting a support ticket or checking our help articles. Would you like me to connect you with a human agent?",
      }]);
      setIsTyping(false);
    }, 1500);
  };

  /* ---- Ticket ---- */
  const submitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setShowTicketForm(false);
      setTicketSubmitted(false);
      setTicketForm({ name: "", email: "", category: "", subject: "", message: "", propertyId: "" });
    }, 3000);
  };

  /* ---- Helpers ---- */
  const toggleFaq = (id: string) => setOpenFaq(openFaq === id ? null : id);

  return (
    <div className="min-h-screen bg-bg font-sans antialiased">
      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
 <section className="relative overflow-hidden border-b border-border">
  {/* Reusable SVG clip-path definition (render once, invisible) */}
  <svg width="0" height="0" className="absolute">
    <defs>
      <clipPath id="heroBlobClip" clipPathUnits="objectBoundingBox">
        <path d="M0.72,0.05 
                 C0.88,0.10 0.98,0.28 0.97,0.46 
                 C0.96,0.64 0.90,0.78 0.76,0.88 
                 C0.62,0.98 0.42,1.00 0.27,0.92 
                 C0.12,0.84 0.01,0.68 0.02,0.50 
                 C0.03,0.32 0.14,0.16 0.30,0.08 
                 C0.44,0.01 0.58,0.00 0.72,0.05 Z" />
      </clipPath>
    </defs>
  </svg>

  {/* Background gradient + faint diagonal pattern */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-bg to-bg" />
  <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path d="M100 0 L200 100 L100 200 L0 100 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-brand-600" />
      <path d="M100 20 L180 100 L100 180 L20 100 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-brand-600" />
      <path d="M100 40 L160 100 L100 160 L40 100 Z" stroke="currentColor" strokeWidth="1" fill="none" className="text-brand-600" />
    </svg>
  </div>

  <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

      {/* Left Content */}
      <div className="text-left">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-6">
          <Headphones size={14} className="mr-1.5" /> Host Support
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-[1.1] tracking-tight mb-6">
          We&apos;re Here to<br />
          <span className="text-brand-600">Help You Succeed.</span>
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed mb-10">
          Whether you need help with listings, bookings, or payments, our dedicated host support team is available 24/7 to assist you.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-faint" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answers... e.g. 'How do I update my photos?'"
            className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/15 focus:border-brand-500 transition-all shadow-lg shadow-black/[0.02]"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-muted text-text-muted transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 mt-10">
          {[
            { value: "2 min", label: "Avg. Response Time", icon: <Clock size={16} /> },
            { value: "4.9★", label: "Support Rating", icon: <Star size={16} /> },
            { value: "24/7", label: "Available", icon: <Globe size={16} /> },
            { value: "98%", label: "Issues Resolved", icon: <CheckCircle2 size={16} /> },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100 shrink-0">
                <span className="text-brand-600">{stat.icon}</span>
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="relative mt-4 lg:mt-0 flex justify-center lg:justify-end">
        {/* Decorative blurred blobs behind the image, echoing the same shape */}
        <div
          className="absolute -top-6 -right-6 w-[80%] h-[80%] bg-brand-100 opacity-70 blur-2xl"
          style={{ clipPath: "url(#heroBlobClip)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-4 w-[55%] h-[55%] bg-brand-50 opacity-90 blur-xl"
          style={{ clipPath: "url(#heroBlobClip)" }}
          aria-hidden="true"
        />

        {/* Main image, clipped into the blob shape */}
        <img
          src="https://img.magnific.com/free-photo/cozy-dining-room-modern-apartment_181624-61506.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Cozy dining room in a modern apartment"
          width={800}
          height={640}
          className="relative z-10 w-full max-w-[560px] aspect-[4/3.2] object-cover shadow-xl transition-transform duration-500 hover:scale-[1.03]"
          style={{ clipPath: "url(#heroBlobClip)" }}
        />

        {/* Floating accent badge */}
        <div className="absolute z-20 bottom-4 left-2 md:-left-6 bg-surface border border-border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L20.9 12L31.3 13.5L23.7 20.8L25.5 31.2L16 26.2L6.5 31.2L8.3 20.8L0.7 13.5L11.1 12L16 2Z" fill="var(--color-rating)"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary leading-none">4.9 Rating</p>
            <p className="text-xs text-text-muted mt-1">from 2,400+ hosts</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ============================================================ */}
      {/*  SUPPORT CATEGORIES                                          */}
      {/* ============================================================ */}
<section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 overflow-hidden">
  {/* Ambient background glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-100/40 rounded-full blur-[100px] -z-10" />

  <div className="text-center mb-8">
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
      Support Center
    </span>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
      How Can We Help?
    </h2>
    <p className="text-base text-text-muted mt-3 max-w-md mx-auto leading-relaxed">
      Choose a topic to find relevant articles and guides
    </p>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {supportCategories.map((cat) => {
      const isActive = activeCategory === cat.id;
      return (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(isActive ? null : cat.id)}
          className={`relative bg-surface rounded-[1.75rem] p-7 text-left transition-all duration-300 group overflow-hidden ${
            isActive
              ? "ring-2 ring-brand-600 shadow-2xl shadow-brand-600/15 -translate-y-1.5"
              : "ring-1 ring-border hover:ring-brand-200 hover:shadow-2xl hover:shadow-brand-600/10 hover:-translate-y-1.5"
          }`}
        >
          {/* Corner gradient wash, appears on hover/active */}
          <div
            className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-brand-200 to-brand-500 blur-2xl transition-opacity duration-500 ${
              isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
            }`}
          />

          <div className="relative flex items-start justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30 scale-105"
                  : "bg-brand-50 text-brand-600 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/30 group-hover:scale-105"
              }`}
            >
              {cat.icon}
            </div>
            <span className="text-[11px] font-bold text-text-faint uppercase tracking-wider bg-surface-muted px-2.5 py-1 rounded-full">
              {cat.articles} articles
            </span>
          </div>

          <h3 className="relative text-lg font-bold text-text-primary mb-1.5 tracking-tight">
            {cat.title}
          </h3>
          <p className="relative text-sm text-text-muted leading-relaxed mb-5">
            {cat.desc}
          </p>

          <div
            className={`relative flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-all duration-300 ${
              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            Browse Articles
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </button>
      );
    })}
  </div>
</section>

      {/* ====================FAQ SECTION   ===================== */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: FAQ List */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    {searchQuery ? `Search Results` : activeCategory ? `${supportCategories.find((c) => c.id === activeCategory)?.title} FAQs` : "Frequently Asked Questions"}
                  </h2>
                  <p className="text-sm text-text-muted mt-1">
                    {filteredFaqs.length} {filteredFaqs.length === 1 ? "result" : "results"} found
                  </p>
                </div>
                {(activeCategory || searchQuery) && (
                  <button
                    onClick={() => { setActiveCategory(null); setSearchQuery(""); }}
                    className="text-xs text-brand-600 font-semibold hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border border-border transition-all duration-200 overflow-hidden ${
                      openFaq === faq.id ? "border-brand-300 bg-brand-50/30 shadow-md shadow-brand-600/5" : "border-border bg-bg hover:border-brand-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                    >
                      <span className={`text-sm font-semibold ${openFaq === faq.id ? "text-brand-700" : "text-text-primary"}`}>
                        {faq.question}
                      </span>
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        openFaq === faq.id ? "bg-brand-600 text-white" : "bg-surface-muted text-text-muted"
                      }`}>
                        {openFaq === faq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-5 sm:px-6 pb-5 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                          <span className="text-xs text-text-muted">Was this helpful?</span>
                          <button className="p-1.5 rounded-lg hover:bg-green-50 text-text-muted hover:text-green-600 transition-colors">
                            <ThumbsUp size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors">
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-text-faint" />
                  </div>
                  <p className="text-base font-semibold text-text-secondary">No results found</p>
                  <p className="text-sm text-text-muted mt-1">Try a different search term or browse categories</p>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Links */}
              <div className="bg-bg rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary mb-4">Quick Resources</h3>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <button key={link.label} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-muted transition-all group text-left">
                      <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center border border-brand-100 shrink-0">
                        <span className="text-brand-600">{link.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary">{link.label}</p>
                        <p className="text-[11px] text-text-muted">{link.desc}</p>
                      </div>
                      <ArrowUpRight size={14} className="text-text-faint group-hover:text-brand-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Options */}
              <div className="bg-bg rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-text-primary mb-4">Contact Support</h3>
                <div className="space-y-3">
                  <button onClick={() => setChatOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 border border-brand-100 hover:bg-brand-100 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-brand-700">Live Chat</p>
                      <p className="text-[11px] text-brand-600">Avg. wait: 30 seconds</p>
                    </div>
                    <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  </button>

                  <button onClick={() => setShowTicketForm(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-strong hover:border-brand-200 hover:bg-surface-muted transition-all group">
                    <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center shrink-0 border border-border">
                      <Mail size={18} className="text-text-muted group-hover:text-brand-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-text-primary">Submit a Ticket</p>
                      <p className="text-[11px] text-text-muted">Response within 2 hours</p>
                    </div>
                  </button>

                  <a href="tel:+911412345678" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-strong hover:border-brand-200 hover:bg-surface-muted transition-all group">
                    <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center shrink-0 border border-border">
                      <Phone size={18} className="text-text-muted group-hover:text-brand-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-text-primary">Call Us</p>
                      <p className="text-[11px] text-text-muted">+91 141 234 5678</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Host Protection */}
              <div className="bg-gradient-to-br from-brand-600 via-brand-500 to-brand-600 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Shield size={20} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Host Protection</h3>
                  <p className="text-xs text-brand-100 leading-relaxed mb-3">Up to ₹10L property damage cover and ₹50L liability protection on every booking.</p>
                  <button className="text-xs font-bold text-white underline hover:no-underline">Learn more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============  TICKET FORM MODAL          ========================== */}
      {showTicketForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTicketForm(false)} />
          <div className="relative bg-surface rounded-3xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {ticketSubmitted ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Ticket Submitted!</h3>
                <p className="text-sm text-text-muted mb-6">We&apos;ve received your request. Our team will respond within 2 hours.</p>
                <p className="text-xs text-text-faint">Ticket ID: #HS-{Math.floor(Math.random() * 90000) + 10000}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100">
                      <Mail size={18} className="text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">Submit a Support Ticket</h3>
                      <p className="text-xs text-text-muted">We&apos;ll get back to you within 2 hours</p>
                    </div>
                  </div>
                  <button onClick={() => setShowTicketForm(false)} className="p-2 rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={submitTicket} className="p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
                      <input required type="text" value={ticketForm.name} onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
                      <input required type="email" value={ticketForm.email} onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" placeholder="host@example.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">Category</label>
                      <select required value={ticketForm.category} onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all cursor-pointer">
                        <option value="" disabled>Select category</option>
                        {ticketCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">Property ID <span className="text-text-muted font-normal">(Optional)</span></label>
                      <input type="text" value={ticketForm.propertyId} onChange={(e) => setTicketForm({ ...ticketForm, propertyId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" placeholder="e.g. P001" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Subject</label>
                    <input required type="text" value={ticketForm.subject} onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Message</label>
                    <textarea required value={ticketForm.message} onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })} rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none"
                      placeholder="Describe your issue in detail..." />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5">
                    <Send size={16} /> Submit Ticket
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= AI CHAT WIDGET   ================== */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm">
          <div className="bg-surface rounded-3xl border border-border shadow-2xl shadow-black/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-brand-600 to-brand-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Happy AI</p>
                  <p className="text-[11px] text-brand-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-surface-muted text-text-secondary border border-border rounded-bl-md"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-muted border border-border rounded-2xl rounded-bl-md px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border-strong bg-bg text-text-primary text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                />
                <button onClick={sendChatMessage} disabled={!chatInput.trim()}
                  className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-600/30 flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* ========== HOST SUCCESS STORIES     =================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
            <Heart size={12} className="mr-1" /> Host Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Supported Every Step of the Way</h2>
          <p className="text-sm text-text-muted mt-2 max-w-xl mx-auto">Hear from hosts who got the help they needed to grow their business</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              name: "Anita Sharma",
              role: "Heritage Haveli Host",
              avatar: "AS",
              quote: "When I had a payment issue, the support team resolved it within 30 minutes. The live chat is incredibly responsive — much better than any other platform I've used.",
              rating: 5,
            },
            {
              name: "Vikram Patel",
              role: "Villa Owner, Amber",
              avatar: "VP",
              quote: "The host protection gave me peace of mind. When a guest accidentally broke a vase, the claim process was smooth and I was reimbursed within 3 days. Outstanding service!",
              rating: 5,
            },
            {
              name: "Priya Gupta",
              role: "Boutique Hotel Manager",
              avatar: "PG",
              quote: "I was struggling with pricing strategy. The support team connected me with a host success manager who helped me optimize my rates. My earnings increased by 35% in one month!",
              rating: 5,
            },
          ].map((story, idx) => (
            <div key={idx} className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-brand-600/5 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < story.rating ? "text-amber-400 fill-amber-400" : "text-border-strong"} />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">&ldquo;{story.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-bold border border-brand-200">
                  {story.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{story.name}</p>
                  <p className="text-xs text-text-muted">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================  SUPPORT HOURS & CONTACT                                       ============================================================ */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
                <Clock size={12} className="mr-1" /> Availability
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Always Here for You</h2>
              <p className="text-sm text-text-muted leading-relaxed">Multiple ways to reach us, whenever you need assistance.</p>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <MessageCircle size={20} />,
                  title: "Live Chat",
                  desc: "Instant answers from our AI and human agents",
                  detail: "Available 24/7 · Avg. wait: 30 sec",
                  action: "Start Chat",
                  color: "brand",
                  onClick: () => setChatOpen(true),
                },
                {
                  icon: <Mail size={20} />,
                  title: "Email Support",
                  desc: "Detailed help for complex issues",
                  detail: "support@happystay.com · 2 hr response",
                  action: "Send Email",
                  color: "green",
                  onClick: () => setShowTicketForm(true),
                },
                {
                  icon: <Phone size={20} />,
                  title: "Phone Support",
                  desc: "Speak directly with a host specialist",
                  detail: "+91 141 234 5678 · 8 AM - 10 PM IST",
                  action: "Call Now",
                  color: "amber",
                  onClick: null,
                },
                {
                  icon: <Video size={20} />,
                  title: "Video Consultation",
                  desc: "One-on-one session with a host success manager",
                  detail: "Book a 30-min slot · Free for Superhosts",
                  action: "Book Session",
                  color: "purple",
                  onClick: null,
                },
              ].map((contact) => (
                <div key={contact.title} className="bg-bg rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    contact.color === "brand" ? "bg-brand-50 border border-brand-100" :
                    contact.color === "green" ? "bg-green-50 border border-green-100" :
                    contact.color === "amber" ? "bg-amber-50 border border-amber-100" :
                    "bg-purple-50 border border-purple-100"
                  }`}>
                    <span className={
                      contact.color === "brand" ? "text-brand-600" :
                      contact.color === "green" ? "text-green-600" :
                      contact.color === "amber" ? "text-amber-600" :
                      "text-purple-600"
                    }>{contact.icon}</span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-1">{contact.title}</h3>
                  <p className="text-sm text-text-muted mb-3">{contact.desc}</p>
                  <p className="text-xs text-text-faint mb-4">{contact.detail}</p>
                  {contact.onClick ? (
                    <button onClick={contact.onClick} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline">
                      {contact.action} <ArrowRight size={12} />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600">
                      {contact.action} <ArrowRight size={12} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================  CTA BANNER              ============================================================ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <path d="M0 200 L0 100 Q50 60 100 100 L150 100 Q200 60 250 100 L300 100 Q350 60 400 100 L450 100 Q500 60 550 100 L600 100 Q650 60 700 100 L750 100 Q800 60 850 100 L900 100 L900 200 Z" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-8 sm:px-12 py-10 sm:py-14">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Still have questions?</h2>
              <p className="text-brand-100 text-sm sm:text-base max-w-md">Our host success team is ready to help you grow. Reach out anytime — we&apos;re just a message away.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-xl backdrop-blur-sm transition-all border border-white/30">
                <MessageCircle size={16} /> Start Live Chat
              </button>
              <button onClick={() => setShowTicketForm(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 text-sm font-bold rounded-xl hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Submit a Ticket <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}