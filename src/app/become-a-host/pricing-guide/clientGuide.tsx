"use client";

import { useState, useMemo } from "react";
import {
  DollarSign, TrendingUp, MapPin, Calendar, Users, Star,
  Shield, Zap, ArrowRight, Check, ChevronDown, BedDouble,
  Bath, Wifi, Home, Award, BarChart3, Lightbulb, Target,
  Clock, Percent, Gift, Headphones, Globe, Sparkles,
  ArrowUpRight, Minus, Plus, Info, CheckCircle2,
  PiggyBank, TrendingDown, Eye, Heart, Share2,
  Thermometer, Sun, CloudRain, Snowflake,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface LocationData {
  name: string;
  avgPrice: number;
  demand: "high" | "medium" | "low";
  occupancy: number;
  trend: number;
}

interface SeasonData {
  name: string;
  months: string;
  multiplier: number;
  icon: React.ReactNode;
  desc: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const locations: LocationData[] = [
  { name: "MI Road & City Centre", avgPrice: 4200, demand: "high", occupancy: 88, trend: 12 },
  { name: "Amber Fort Area", avgPrice: 5800, demand: "high", occupancy: 82, trend: 18 },
  { name: "C-Scheme", avgPrice: 3500, demand: "medium", occupancy: 76, trend: 8 },
  { name: "Jhotwara", avgPrice: 2200, demand: "medium", occupancy: 68, trend: 5 },
  { name: "Malviya Nagar", avgPrice: 2800, demand: "medium", occupancy: 71, trend: 7 },
  { name: "Vaishali Nagar", avgPrice: 3200, demand: "low", occupancy: 62, trend: 3 },
];

const seasons: SeasonData[] = [
  { name: "Peak Season", months: "Oct - Mar", multiplier: 1.4, icon: <Sun size={18} />, desc: "Tourist season, festivals, weddings" },
  { name: "High Season", months: "Jul - Sep", multiplier: 1.15, icon: <CloudRain size={18} />, desc: "Monsoon retreats, long weekends" },
  { name: "Standard", months: "Apr - Jun", multiplier: 1.0, icon: <Thermometer size={18} />, desc: "Regular demand, stable bookings" },
  { name: "Low Season", months: "May - Jun", multiplier: 0.75, icon: <Snowflake size={18} />, desc: "Summer heat, fewer tourists" },
];

const pricingTips = [
  {
    icon: <Target size={22} />,
    title: "Know Your Market",
    desc: "Research similar properties in your area. Check their pricing, amenities, and occupancy rates to position yourself competitively.",
  },
  {
    icon: <Calendar size={22} />,
    title: "Seasonal Adjustments",
    desc: "Raise prices by 30-50% during peak tourist season (Oct-Mar) and festivals. Lower them slightly in off-season to maintain occupancy.",
  },
  {
    icon: <Zap size={22} />,
    title: "Dynamic Pricing",
    desc: "Adjust prices based on demand, local events, and day of week. Weekends and holidays typically command 20-40% premium rates.",
  },
  {
    icon: <Gift size={22} />,
    title: "Early Bird & Last-Minute",
    desc: "Offer 10-15% discounts for bookings made 60+ days in advance. Offer last-minute deals to fill empty nights within 7 days.",
  },
  {
    icon: <Percent size={22} />,
    title: "Length of Stay Discounts",
    desc: "Encourage longer stays with weekly (10% off) and monthly (20% off) discounts. This reduces turnover costs and ensures steady income.",
  },
  {
    icon: <Star size={22} />,
    title: "Review-Based Pricing",
    desc: "Properties with 4.8+ ratings can charge 15-25% more. Focus on guest experience first, then gradually increase your rates as reviews improve.",
  },
];

const feeBreakdown = [
  { label: "Base Nightly Rate", value: "₹3,500", desc: "Your competitive starting price" },
  { label: "HappyStay Service Fee", value: "3%", desc: "Only charged when you get a booking" },
  { label: "Payment Processing", value: "2.5%", desc: "Secure payment gateway fee" },
  { label: "GST (if applicable)", value: "18%", desc: "On service fee only, not your earnings" },
];

const comparisons = [
  { platform: "HappyStay", hostFee: "3%", guestFee: "0%", payout: "₹33,950", highlight: true },
  { platform: "Competitor A", hostFee: "15%", guestFee: "14%", payout: "₹29,750", highlight: false },
  { platform: "Competitor B", hostFee: "10%", guestFee: "12%", payout: "₹31,500", highlight: false },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PricingGuidePage() {
  const [basePrice, setBasePrice] = useState(3500);
  const [nights, setNights] = useState(15);
  const [occupancy, setOccupancy] = useState(75);
  const [propertyType, setPropertyType] = useState("apartment");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedSeason, setSelectedSeason] = useState(seasons[2]);
  const [showEstimator, setShowEstimator] = useState(false);

  const propertyMultipliers: Record<string, number> = {
    apartment: 1.0, house: 1.3, villa: 1.8, "heritage-haveli": 2.0,
    "boutique-hotel": 1.5, resort: 2.2, hostel: 0.6, "guest-house": 0.9,
  };

  const earnings = useMemo(() => {
    const adjustedBase = basePrice * propertyMultipliers[propertyType];
    const seasonalPrice = adjustedBase * selectedSeason.multiplier;
    const monthlyNights = Math.round((nights * occupancy) / 100);
    const gross = Math.round(seasonalPrice * monthlyNights);
    const happyStayFee = Math.round(gross * 0.03);
    const paymentFee = Math.round(gross * 0.025);
    const net = gross - happyStayFee - paymentFee;
    return { gross, happyStayFee, paymentFee, net, monthlyNights };
  }, [basePrice, nights, occupancy, propertyType, selectedSeason]);

  const handlePriceChange = (delta: number) => {
    setBasePrice((prev) => Math.max(500, Math.min(50000, prev + delta)));
  };

  const handleNightsChange = (delta: number) => {
    setNights((prev) => Math.max(1, Math.min(31, prev + delta)));
  };

  const handleOccupancyChange = (delta: number) => {
    setOccupancy((prev) => Math.max(10, Math.min(100, prev + delta)));
  };

  return (
    <div className="min-h-screen bg-bg font-sans antialiased">
      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
{/* Hero Section */}
<section className="container mx-auto px-6 py-8 md:py-12 grid md:grid-cols-2 gap-10 items-center">
  <div className="space-y-8">
    <div className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-xs tracking-wide inline-flex uppercase border border-brand-100">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 13V10M10 13V7M13 13V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span>Pricing Guide</span>
    </div>

    <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight text-text-primary">
      Price Smart.<br />
      <span className="relative text-brand-600 inline-block mt-2">
        Earn More.
        <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-brand-600 rounded-full opacity-80"></span>
      </span>
    </h1>

    <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
      Set the perfect price for your property with real-time market insights and data-backed recommendations. <br />
      <span className="font-semibold text-text-primary mt-2 block">
        HappyStay hosts earn up to <span className="text-brand-600 font-bold">40% more</span> than those who don`t.
      </span>
    </p>

    <div className="flex flex-wrap gap-4 pt-4">
      <button 
       onClick={() => {
    if (!showEstimator) {
      setShowEstimator(true);

      setTimeout(() => {
        document.getElementById("estimator")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      setShowEstimator(false);
    }
  }}
      className="bg-brand-600 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-brand-700 transition shadow-md">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        calcuate your earnings
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
        </svg>
      </button>

      <button className="bg-surface text-text-body border border-border-strong px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-surface-muted transition shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3333 3H4.66667C3.74619 3 3 3.74619 3 4.66667V19.3333C3 20.2538 3.74619 21 4.66667 21H19.3333C20.2538 21 21 20.2538 21 19.3333V4.66667C21 3.74619 20.2538 3 19.3333 3ZM12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        List Your Property
      </button>
    </div>

    <div className="flex flex-wrap gap-6 pt-6 text-sm font-medium text-text-muted">
      {[
        { label: 'Data-backed Insights', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3h-2v10h2V3zm4 8h-2v10h2V11zm4-6h-2v16h2V5zM9 17H7v4h2v-4zm-4-4H3v8h2v-8z" fill="currentColor"/></svg> },
        { label: 'Real-time Updates', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-4h2v4zm0-6H11V8h2v2z" fill="currentColor"/></svg> },
        { label: 'Maximize Earnings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11V3h8v8h-8zm0 10v-8h8v8h-8zM0 11V3h8v8H0zm0 10v-8h8v8H0z" fill="currentColor"/></svg> },
      ].map(({ label, icon }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-brand-600">{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Right side Image */}
{/* Right side Image Container */}
<div className="relative mt-8 md:mt-0 w-full max-w-2xl mx-auto">
  {/* Soft brand-tinted shadow stroke behind */}
  <div
    className="absolute inset-0 bg-brand-100 opacity-60 pointer-events-none"
    style={{
      WebkitMaskImage: "url('/brush-stroke-mask.png')",
      maskImage: "url('/brush-stroke-mask.png')",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      transform: "translate(12px, 12px)",
    }}
  />

  {/* Main brush-stroke masked image */}
  <img
    src="https://img.magnific.com/free-photo/cozy-dining-room-modern-apartment_181624-61506.jpg?semt=ais_hybrid&w=740&q=80"
    alt="Modern house interior preview"
    width={900}
    height={740}
    className="relative w-full h-auto object-cover"
    style={{
      WebkitMaskImage: "url('/brush-stroke-mask.png')",
      maskImage: "url('/brush-stroke-mask.png')",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      aspectRatio: "4 / 3",
    }}
  />
</div>
</section>

{/* Stats Bar */}
<section className="container mx-auto px-6 pb-4">
  <div className="bg-surface rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl border border-border">
    {[
      { label: 'Avg. Nightly Rate', value: '₹4,200', icon: '₹' },
      { label: 'Avg. Occupancy', value: '78%', icon: <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 4V17.3333H18.6667V4H13.3333ZM4 17.3333V28H9.33333V17.3333H4ZM22.6667 9.33333V28H28V9.33333H22.6667ZM13.3333 21.3333V28H18.6667V21.3333H13.3333Z" fill="currentColor"/></svg> },
      { label: 'Avg. Monthly Earnings', value: '₹1.2L', icon: <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.3333 2.66667L24 4.01333L29.9867 10L24 15.9867L25.3333 17.3333L32 10L25.3333 2.66667ZM16 10.6667L14.6667 12L20.6667 18L14.6667 24L16 25.3333L22.6667 18L16 10.6667ZM8 18.6667L6.66667 20L12.6667 26L6.66667 32L8 33.3333L14.6667 26L8 18.6667Z" fill="currentColor"/></svg> },
      { label: 'Avg. Host Rating', value: '4.8+', icon: <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2L20.9 12L31.3 13.5L23.7 20.8L25.5 31.2L16 26.2L6.5 31.2L8.3 20.8L0.7 13.5L11.1 12L16 2Z" fill="var(--color-rating)"/></svg> },
    ].map(({ label, value, icon }, idx) => (
      <div key={label} className={`flex items-center gap-4 ${idx !== 3 ? 'md:border-r border-border md:pr-4' : ''}`}>
        <div className="bg-brand-50 text-brand-600 min-w-12 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold text-text-primary leading-tight">{value}</span>
          <span className="text-sm text-text-muted whitespace-nowrap">{label}</span>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* ============================================================ */}
      {/*  EARNINGS ESTIMATOR (Sticky/Modal-like section)              */}
      {/* ============================================================ */}
      {showEstimator && (
        <section id="estimator" className="bg-surface border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Earnings Estimator</h2>
                <p className="text-sm text-text-muted mt-1">See how much you could earn based on your property details</p>
              </div>
              <button
                onClick={() => setShowEstimator(false)}
                className="p-2 rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors"
              >
                <Minus size={20} />
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-5">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">Property Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "apartment", label: "Apartment", icon: <Home size={16} /> },
                      { value: "house", label: "House", icon: <Home size={16} /> },
                      { value: "villa", label: "Villa", icon: <Home size={16} /> },
                      { value: "heritage-haveli", label: "Heritage", icon: <Home size={16} /> },
                    ].map((opt) => {
                      const sel = propertyType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setPropertyType(opt.value)}
                          className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all duration-200 ${
                            sel ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border-strong bg-bg text-text-secondary hover:border-border hover:bg-surface-muted"
                          }`}
                        >
                          {opt.icon}
                          <span className="text-xs font-semibold">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Base Price */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Base Nightly Rate (₹)
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePriceChange(-100)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-strong hover:border-brand-300 hover:bg-surface-muted transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={basePrice}
                        onChange={(e) => setBasePrice(Math.max(500, Number(e.target.value)))}
                        className="w-full px-4 py-3 rounded-xl border border-border-strong bg-bg text-text-primary text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                      />
                    </div>
                    <button
                      onClick={() => handlePriceChange(100)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-border-strong hover:border-brand-300 hover:bg-surface-muted transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="100"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full mt-3 accent-brand-600"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Nights Available */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Available Nights / Month
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleNightsChange(-1)} disabled={nights <= 1}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-strong hover:border-brand-300 transition-colors disabled:opacity-30">
                        <Minus size={14} />
                      </button>
                      <span className="text-lg font-bold text-text-primary w-8 text-center">{nights}</span>
                      <button onClick={() => handleNightsChange(1)} disabled={nights >= 31}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-strong hover:border-brand-300 transition-colors disabled:opacity-30">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Occupancy */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Expected Occupancy
                    </label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleOccupancyChange(-5)} disabled={occupancy <= 10}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-strong hover:border-brand-300 transition-colors disabled:opacity-30">
                        <Minus size={14} />
                      </button>
                      <span className="text-lg font-bold text-text-primary w-10 text-center">{occupancy}%</span>
                      <button onClick={() => handleOccupancyChange(5)} disabled={occupancy >= 100}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-strong hover:border-brand-300 transition-colors disabled:opacity-30">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">Location in Jaipur</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {locations.map((loc) => {
                      const sel = selectedLocation.name === loc.name;
                      return (
                        <button
                          key={loc.name}
                          onClick={() => setSelectedLocation(loc)}
                          className={`flex flex-col items-start gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                            sel ? "border-brand-600 bg-brand-50" : "border-border-strong bg-bg hover:border-border hover:bg-surface-muted"
                          }`}
                        >
                          <span className={`text-xs font-bold ${sel ? "text-brand-700" : "text-text-primary"}`}>{loc.name}</span>
                          <span className="text-[10px] text-text-muted">Avg ₹{loc.avgPrice.toLocaleString()}/night</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded mt-1 ${
                            loc.demand === "high" ? "bg-green-50 text-green-700" :
                            loc.demand === "medium" ? "bg-amber-50 text-amber-700" :
                            "bg-slate-50 text-slate-600"
                          }`}>
                            {loc.demand === "high" ? "🔥 High Demand" : loc.demand === "medium" ? "📈 Medium" : "📉 Low"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">Season</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {seasons.map((s) => {
                      const sel = selectedSeason.name === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelectedSeason(s)}
                          className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all duration-200 ${
                            sel ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border-strong bg-bg text-text-secondary hover:border-border hover:bg-surface-muted"
                          }`}
                        >
                          {s.icon}
                          <span className="text-xs font-semibold">{s.name}</span>
                          <span className="text-[10px] text-text-muted">{s.months}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sel ? "bg-brand-100 text-brand-700" : "bg-surface-muted text-text-muted"}`}>
                            {s.multiplier}x
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Card */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24 bg-surface rounded-2xl border border-border p-6 shadow-lg shadow-brand-600/5">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100">
                      <PiggyBank size={20} className="text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-primary">Estimated Earnings</h3>
                      <p className="text-xs text-text-muted">Per month in {selectedSeason.name}</p>
                    </div>
                  </div>

                  <div className="text-center py-6 bg-brand-50 rounded-xl border border-brand-100 mb-6">
                    <p className="text-4xl sm:text-5xl font-extrabold text-brand-600">
                      ₹{earnings.net.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-brand-700 font-medium mt-1">Net Monthly Earnings</p>
                    <p className="text-xs text-text-muted mt-1">{earnings.monthlyNights} booked nights @ ₹{Math.round(earnings.gross / earnings.monthlyNights).toLocaleString()}/night avg</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">Gross Earnings</span>
                      <span className="font-semibold text-text-primary">₹{earnings.gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted flex items-center gap-1"><Info size={12} /> HappyStay Fee (3%)</span>
                      <span className="font-semibold text-red-600">-₹{earnings.happyStayFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted flex items-center gap-1"><Info size={12} /> Payment Processing (2.5%)</span>
                      <span className="font-semibold text-red-600">-₹{earnings.paymentFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-text-primary">You Keep</span>
                      <span className="font-bold text-brand-600">₹{earnings.net.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="bg-surface-muted rounded-xl p-4 mb-6">
                    <p className="text-xs text-text-muted leading-relaxed">
                      <span className="font-semibold text-text-primary">💡 Tip:</span> Hosts in {selectedLocation.name} with {propertyType} properties typically see {selectedLocation.occupancy}% occupancy. Adjust your price to match market rates of ₹{selectedLocation.avgPrice.toLocaleString()}.
                    </p>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5">
                    Start Hosting Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/*  MARKET INSIGHTS — Location Comparison                        */}
      {/* ============================================================ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
            <MapPin size={12} className="mr-1" /> Market Insights
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Jaipur Market Rates by Location</h2>
          <p className="text-sm text-text-muted mt-2 max-w-xl mx-auto">Understand pricing trends across different neighborhoods to position your property competitively.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-text-primary">{loc.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">Jaipur, Rajasthan</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${
                  loc.demand === "high" ? "bg-green-50 text-green-700 border-green-200" :
                  loc.demand === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-slate-50 text-slate-600 border-slate-200"
                }`}>
                  {loc.demand === "high" ? "HIGH DEMAND" : loc.demand === "medium" ? "MEDIUM" : "LOW"}
                </span>
              </div>

              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-extrabold text-brand-600">₹{loc.avgPrice.toLocaleString()}</span>
                <span className="text-sm text-text-muted mb-1">/night avg</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-muted">Occupancy Rate</span>
                    <span className="font-semibold text-text-primary">{loc.occupancy}%</span>
                  </div>
                  <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full transition-all duration-700" style={{ width: `${loc.occupancy}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">YoY Growth</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold ${loc.trend > 5 ? "text-green-600" : "text-amber-600"}`}>
                    <TrendingUp size={12} /> +{loc.trend}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEASONAL PRICING GUIDE                                       */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
              <Calendar size={12} className="mr-1" /> Seasonal Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">When to Adjust Your Prices</h2>
            <p className="text-sm text-text-muted mt-2 max-w-xl mx-auto">Jaipur&apos;s tourism follows clear seasonal patterns. Smart hosts adjust pricing to maximize earnings year-round.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {seasons.map((s) => (
              <div key={s.name} className="bg-bg rounded-2xl border border-border p-6 text-center hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 border border-brand-100 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-300">
                  <span className="text-brand-600 group-hover:text-white transition-colors duration-300">{s.icon}</span>
                </div>
                <h3 className="text-base font-bold text-text-primary mb-1">{s.name}</h3>
                <p className="text-xs text-brand-600 font-semibold mb-2">{s.months}</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-3">
                  <span className="text-sm font-extrabold text-brand-600">{s.multiplier}x</span>
                  <span className="text-[10px] text-brand-700 font-medium">multiplier</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Seasonal Calendar Visual */}
          <div className="mt-10 bg-bg rounded-2xl border border-border p-6">
            <h3 className="text-sm font-bold text-text-primary mb-4">Annual Pricing Calendar</h3>
            <div className="grid grid-cols-12 gap-1">
              {[
                { m: "J", p: 75 }, { m: "F", p: 80 }, { m: "M", p: 90 },
                { m: "A", p: 70 }, { m: "M", p: 60 }, { m: "J", p: 55 },
                { m: "J", p: 75 }, { m: "A", p: 80 }, { m: "S", p: 85 },
                { m: "O", p: 100 }, { m: "N", p: 100 }, { m: "D", p: 95 },
              ].map((month,idx) => (
                <div key={idx} className="text-center">
                  <div className="relative h-24 bg-surface-muted rounded-t-lg overflow-hidden mb-1">
                    <div
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-500 ${
                        month.p >= 90 ? "bg-brand-600" : month.p >= 75 ? "bg-brand-400" : month.p >= 60 ? "bg-brand-300" : "bg-brand-200"
                      }`}
                      style={{ height: `${month.p}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-text-muted">{month.m}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand-600" />
                <span className="text-[10px] text-text-muted font-medium">Peak (90-100%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand-400" />
                <span className="text-[10px] text-text-muted font-medium">High (75-89%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand-300" />
                <span className="text-[10px] text-text-muted font-medium">Standard (60-74%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-brand-200" />
                <span className="text-[10px] text-text-muted font-medium">Low (&lt;60%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING TIPS                                                 */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
            <Lightbulb size={12} className="mr-1" /> Pro Tips
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">6 Pricing Strategies That Work</h2>
          <p className="text-sm text-text-muted mt-2 max-w-xl mx-auto">Learn from top-performing HappyStay hosts who consistently earn 40% above market average.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricingTips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center border border-brand-100 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-300">
                  <span className="text-brand-600 group-hover:text-white transition-colors duration-300">{tip.icon}</span>
                </div>
                <span className="text-[11px] font-bold text-text-faint uppercase tracking-wider">Tip {idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">{tip.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEE BREAKDOWN & COMPARISON                                   */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Fee Breakdown */}
            <div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
                <Percent size={12} className="mr-1" /> Transparent Fees
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">What You Pay, What You Keep</h2>
              <p className="text-sm text-text-muted mb-8 leading-relaxed">HappyStay has the lowest host fees in the industry. We believe you should keep more of what you earn.</p>

              <div className="space-y-4">
                {feeBreakdown.map((fee) => (
                  <div key={fee.label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center border border-brand-100 shrink-0">
                      <DollarSign size={20} className="text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-text-primary">{fee.label}</p>
                        <p className="text-sm font-bold text-brand-600">{fee.value}</p>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{fee.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">No hidden fees. No monthly charges.</p>
                    <p className="text-xs text-green-700 mt-0.5">You only pay when you get a booking. No listing fees, no subscription costs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Comparison */}
            <div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
                <BarChart3 size={12} className="mr-1" /> Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">How We Compare</h2>
              <p className="text-sm text-text-muted mb-8 leading-relaxed">See how much more you keep with HappyStay vs. other platforms on a typical ₹35,000 monthly earning.</p>

              <div className="bg-bg rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-4 gap-4 px-5 py-3.5 bg-surface-muted border-b border-border text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  <span>Platform</span>
                  <span className="text-center">Host Fee</span>
                  <span className="text-center">Guest Fee</span>
                  <span className="text-right">Your Payout</span>
                </div>
                {comparisons.map((comp) => (
                  <div
                    key={comp.platform}
                    className={`grid grid-cols-4 gap-4 px-5 py-4 border-b border-border last:border-0 items-center ${comp.highlight ? "bg-brand-50/50" : ""}`}
                  >
                    <span className={`text-sm font-bold ${comp.highlight ? "text-brand-700" : "text-text-primary"}`}>{comp.platform}</span>
                    <span className="text-center text-sm font-semibold text-text-secondary">{comp.hostFee}</span>
                    <span className="text-center text-sm font-semibold text-text-secondary">{comp.guestFee}</span>
                    <span className={`text-right text-sm font-bold ${comp.highlight ? "text-brand-600" : "text-text-primary"}`}>{comp.payout}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">You could earn ₹4,200 more per month</p>
                    <p className="text-brand-100 text-xs mt-0.5">Compared to other platforms with higher fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING CHECKLIST                                            */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100 mb-4">
                <CheckCircle2 size={12} className="mr-1" /> Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Before You Set Your Price</h2>
              <p className="text-sm text-text-muted leading-relaxed mb-8">Run through this quick checklist to ensure your pricing strategy is optimized for maximum earnings.</p>

              <div className="space-y-4">
                {[
                  "Research 5-10 similar properties in your area",
                  "Check local events, festivals, and holidays for the next 3 months",
                  "Set your base price 10-15% below market for the first 5 bookings",
                  "Enable instant booking to improve search ranking",
                  "Add professional photos (properties with photos earn 40% more)",
                  "Offer weekly (10%) and monthly (20%) discounts",
                  "Set a competitive cleaning fee (₹300-800 for most properties)",
                  "Review and adjust prices every 2 weeks based on demand",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-0.5 border border-brand-100">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-bg rounded-2xl border border-border p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white text-lg font-bold">
                    RK
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Rajesh Kumar</p>
                    <p className="text-xs text-text-muted">Superhost · 3 properties</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-text-primary">4.9</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Heritage Haveli</span>
                    <span className="text-sm font-bold text-brand-600">₹4,500/night</span>
                  </div>
                  <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: "87%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-muted">
                    <span>87% occupancy</span>
                    <span>₹1,42,000/mo</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Luxury Villa</span>
                    <span className="text-sm font-bold text-brand-600">₹6,200/night</span>
                  </div>
                  <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: "92%" }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-muted">
                    <span>92% occupancy</span>
                    <span>₹1,85,000/mo</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">Total Monthly Earnings</span>
                    <span className="text-xl font-extrabold text-brand-600">₹3,27,000</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-50 border border-green-200 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-xs font-bold text-green-700">+40% vs market avg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ / HELP SECTION                                           */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Common Pricing Questions</h2>
          <p className="text-sm text-text-muted mt-2">Everything you need to know about pricing on HappyStay</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { q: "How do I set my initial price?", a: "Start 10-15% below similar properties to attract your first bookings and reviews. Once you have 5+ reviews, gradually raise to market rate." },
            { q: "Can I change prices anytime?", a: "Yes! You have full control. Update daily, weekly, or seasonal rates anytime from your host dashboard." },
            { q: "What is dynamic pricing?", a: "It automatically adjusts your rates based on demand, local events, and seasonality. Enable it in your dashboard for hands-off optimization." },
            { q: "How are fees calculated?", a: "HappyStay charges just 3% per booking. Payment processing is 2.5%. There are no listing fees or monthly charges." },
            { q: "Should I offer discounts?", a: "Yes! Weekly (10%) and monthly (20%) discounts attract longer stays, reducing turnover costs and ensuring steady income." },
            { q: "How do reviews affect pricing?", a: "Properties with 4.8+ ratings can charge 15-25% more. Focus on guest experience first, then increase rates as your rating improves." },
          ].map((faq, idx) => (
            <div key={idx} className="bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-brand-600/5 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center border border-brand-100 mb-3">
                <span className="text-xs font-bold text-brand-600">{idx + 1}</span>
              </div>
              <h3 className="text-sm font-bold text-text-primary mb-2">{faq.q}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA BANNER                                                   */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <path d="M0 200 L0 100 Q50 60 100 100 L150 100 Q200 60 250 100 L300 100 Q350 60 400 100 L450 100 Q500 60 550 100 L600 100 Q650 60 700 100 L750 100 Q800 60 850 100 L900 100 L900 200 Z" fill="white" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-15">
            <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0 80 L0 50 Q30 20 60 50 L90 50 Q120 20 150 50 L180 50 Q210 20 240 50 L270 50 Q300 20 330 50 L360 50 Q390 20 420 50 L450 50 Q480 20 510 50 L540 50 Q570 20 600 50 L630 50 Q660 20 690 50 L720 50 Q750 20 780 50 L810 50 Q840 20 870 50 L900 50 Q930 20 960 50 L990 50 Q1020 20 1050 50 L1080 50 Q1110 20 1140 50 L1170 50 Q1200 20 1230 50 L1260 50 L1260 80 Z" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-8 sm:px-12 py-10 sm:py-14">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to start earning?</h2>
              <p className="text-brand-100 text-sm sm:text-base max-w-md">List your property on HappyStay and join thousands of hosts earning great income with smart pricing.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => setShowEstimator(!showEstimator)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-xl backdrop-blur-sm transition-all border border-white/30"
              >
                <DollarSign size={16} />
                {showEstimator ? "Hide Estimator" : "Calculate Earnings"}
              </button>
              <a href="/host/list-property" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 text-sm font-bold rounded-xl hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                List Your Property
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}