"use client";

import { useState, useMemo } from "react";
import {
  Home, MapPin, Users, DollarSign, Star, TrendingUp, TrendingDown,
  Calendar, Bell, Search, Filter, MoreHorizontal, Eye, Edit3,
  Trash2, CheckCircle2, XCircle, Clock, ArrowUpRight, ArrowDownRight,
  BedDouble, Bath, Wifi, Heart, MessageSquare, Settings, LogOut,
  Plus, ChevronDown, ChevronLeft, ChevronRight, BarChart3,
  PieChart, Activity, Award, Shield, Zap, Download, Share2,
  Smartphone, Mail, Phone, User, Copy, ExternalLink, RefreshCw,
  MapPinned, ImageIcon, FileText, HelpCircle, Menu, X,
  Sun, Moon, CloudRain, Wind, Thermometer, Droplets,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Booking {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  bookedAt: string;
}

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  status: "active" | "inactive" | "under_review";
  beds: number;
  baths: number;
  guests: number;
  monthlyEarnings: number;
  occupancyRate: number;
}

interface Review {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  rating: number;
  comment: string;
  date: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "booking" | "review" | "system" | "payment";
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */
const bookings: Booking[] = [
  { id: "B001", guest: "Rahul Sharma", avatar: "RS", property: "Heritage Haveli with City View", checkIn: "2026-08-10", checkOut: "2026-08-14", guests: 4, amount: 18500, status: "confirmed", bookedAt: "2026-08-02" },
  { id: "B002", guest: "Priya Patel", avatar: "PP", property: "Luxury Villa near Amber Fort", checkIn: "2026-08-12", checkOut: "2026-08-15", guests: 2, amount: 12400, status: "pending", bookedAt: "2026-08-03" },
  { id: "B003", guest: "Amit Kumar", avatar: "AK", property: "Cozy Apartment in MI Road", checkIn: "2026-08-05", checkOut: "2026-08-08", guests: 3, amount: 9600, status: "completed", bookedAt: "2026-07-28" },
  { id: "B004", guest: "Sneha Gupta", avatar: "SG", property: "Heritage Haveli with City View", checkIn: "2026-08-18", checkOut: "2026-08-22", guests: 5, amount: 22000, status: "confirmed", bookedAt: "2026-08-01" },
  { id: "B005", guest: "Vikram Singh", avatar: "VS", property: "Boutique Hotel Room 204", checkIn: "2026-08-20", checkOut: "2026-08-25", guests: 2, amount: 15000, status: "cancelled", bookedAt: "2026-07-30" },
  { id: "B006", guest: "Neha Verma", avatar: "NV", property: "Luxury Villa near Amber Fort", checkIn: "2026-08-25", checkOut: "2026-08-30", guests: 6, amount: 28000, status: "confirmed", bookedAt: "2026-08-03" },
];

const properties: Property[] = [
  { id: "P001", title: "Heritage Haveli with City View", type: "Heritage Haveli", location: "MI Road, Jaipur", price: 4500, rating: 4.9, reviews: 128, image: "/prop1.jpg", status: "active", beds: 3, baths: 2, guests: 6, monthlyEarnings: 142000, occupancyRate: 87 },
  { id: "P002", title: "Luxury Villa near Amber Fort", type: "Villa", location: "Amber, Jaipur", price: 6200, rating: 4.8, reviews: 89, image: "/prop2.jpg", status: "active", beds: 4, baths: 3, guests: 8, monthlyEarnings: 185000, occupancyRate: 92 },
  { id: "P003", title: "Cozy Apartment in MI Road", type: "Apartment", location: "MI Road, Jaipur", price: 2800, rating: 4.6, reviews: 56, image: "/prop3.jpg", status: "active", beds: 2, baths: 1, guests: 4, monthlyEarnings: 78000, occupancyRate: 74 },
  { id: "P004", title: "Boutique Hotel Room 204", type: "Boutique Hotel", location: "C-Scheme, Jaipur", price: 3500, rating: 4.7, reviews: 42, image: "/prop4.jpg", status: "under_review", beds: 1, baths: 1, guests: 2, monthlyEarnings: 0, occupancyRate: 0 },
];

const reviews: Review[] = [
  { id: "R001", guest: "Rahul Sharma", avatar: "RS", property: "Heritage Haveli with City View", rating: 5, comment: "Absolutely stunning property! The view of the city palace from the terrace is breathtaking. Host was very helpful.", date: "2026-08-05" },
  { id: "R002", guest: "Priya Patel", avatar: "PP", property: "Luxury Villa near Amber Fort", rating: 5, comment: "Perfect family getaway. The pool and garden area are beautiful. Will definitely come back!", date: "2026-08-03" },
  { id: "R003", guest: "Amit Kumar", avatar: "AK", property: "Cozy Apartment in MI Road", rating: 4, comment: "Great location, very clean and well maintained. Slightly noisy at night but overall good experience.", date: "2026-07-30" },
  { id: "R004", guest: "Sneha Gupta", avatar: "SG", property: "Heritage Haveli with City View", rating: 5, comment: "Best stay in Jaipur! The traditional decor with modern amenities is perfect. Highly recommended.", date: "2026-07-28" },
];

const notifications: Notification[] = [
  { id: "N001", title: "New Booking Confirmed", message: "Rahul Sharma booked Heritage Haveli for Aug 10-14", time: "2 min ago", read: false, type: "booking" },
  { id: "N002", title: "New Review Received", message: "You received a 5-star review for Luxury Villa", time: "1 hour ago", read: false, type: "review" },
  { id: "N003", title: "Payment Processed", message: "₹18,500 credited to your account for booking B001", time: "3 hours ago", read: true, type: "payment" },
  { id: "N004", title: "Listing Under Review", message: "Boutique Hotel Room 204 is being reviewed by our team", time: "1 day ago", read: true, type: "system" },
  { id: "N005", title: "New Booking Request", message: "Priya Patel requested to book Luxury Villa", time: "2 days ago", read: true, type: "booking" },
];

const revenueData = [
  { month: "Jan", amount: 85000 }, { month: "Feb", amount: 92000 }, { month: "Mar", amount: 110000 },
  { month: "Apr", amount: 125000 }, { month: "May", amount: 140000 }, { month: "Jun", amount: 165000 },
  { month: "Jul", amount: 178000 }, { month: "Aug", amount: 142000 },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const bookedDates = [5, 6, 7, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30];
const pendingDates = [15, 16];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "confirmed" | "pending" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    const totalRevenue = bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.amount, 0);
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
    const avgOccupancy = Math.round(properties.reduce((sum, p) => sum + p.occupancyRate, 0) / properties.filter((p) => p.status === "active").length);
    const totalReviews = properties.reduce((sum, p) => sum + p.reviews, 0);
    const avgRating = (properties.reduce((sum, p) => sum + p.rating * p.reviews, 0) / totalReviews).toFixed(1);
    return { totalRevenue, totalBookings, confirmedBookings, avgOccupancy, totalReviews, avgRating };
  }, []);

  /* ---- Filtered Bookings ---- */
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    if (activeTab !== "all") filtered = filtered.filter((b) => b.status === activeTab);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((b) => b.guest.toLowerCase().includes(q) || b.property.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));
    }
    return filtered;
  }, [activeTab, searchQuery]);

  /* ---- Helpers ---- */
  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const formatCurrency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const statusConfig = {
    confirmed: { label: "Confirmed", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
    pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
    completed: { label: "Completed", bg: "bg-brand-50", text: "text-brand-700", border: "border-brand-200", dot: "bg-brand-500" },
  };

  const notifConfig = {
    booking: { icon: <Calendar size={14} />, bg: "bg-brand-50", text: "text-brand-600" },
    review: { icon: <Star size={14} />, bg: "bg-amber-50", text: "text-amber-600" },
    payment: { icon: <DollarSign size={14} />, bg: "bg-green-50", text: "text-green-600" },
    system: { icon: <Shield size={14} />, bg: "bg-slate-50", text: "text-slate-600" },
  };

  /* ---- Max revenue for chart ---- */
  const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

  return (
    <div className="min-h-screen bg-bg font-sans antialiased">
      {/* ============================================================ */}
      {/*  TOP NAVIGATION BAR                                          */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors">
                <Menu size={20} className="text-text-primary" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                  <Home size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary hidden sm:block">HappyStay <span className="text-brand-600">Host</span></span>
              </div>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-faint" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bookings, guests, properties..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-strong bg-bg text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2.5 rounded-xl hover:bg-surface-muted transition-colors" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} className="text-text-secondary" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-4 sm:right-8 top-16 w-80 sm:w-96 bg-surface rounded-2xl border border-border shadow-xl shadow-black/5 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                      <h3 className="text-sm font-bold text-text-primary">Notifications</h3>
                      <button className="text-xs text-brand-600 font-semibold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => {
                        const cfg = notifConfig[n.type];
                        return (
                          <div key={n.id} className={`flex items-start gap-3 px-5 py-3.5 hover:bg-surface-muted transition-colors cursor-pointer ${!n.read ? "bg-brand-50/30" : ""}`}>
                            <div className={`w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                              <span className={cfg.text}>{cfg.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-text-primary">{n.title}</p>
                              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{n.message}</p>
                              <p className="text-[11px] text-text-faint mt-1">{n.time}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-2" />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-5 py-3 border-t border-border text-center">
                      <button className="text-xs text-brand-600 font-semibold hover:underline">View all notifications</button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-text-primary">Rajesh Kumar</p>
                  <p className="text-[11px] text-text-muted">Superhost</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold border-2 border-brand-100">
                  RK
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* ======================================================== */}
          {/*  SIDEBAR (Desktop sticky / Mobile drawer)               */}
          {/* ======================================================== */}
          <aside className={`${sidebarOpen ? "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border shadow-xl" : "hidden lg:block lg:w-64 lg:shrink-0"}`}>
            {sidebarOpen && (
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-bold text-text-primary">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-surface-muted">
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>
            )}
            <div className="lg:sticky lg:top-24 space-y-1 p-2">
              {[
                { icon: <BarChart3 size={18} />, label: "Dashboard", active: true },
                { icon: <Calendar size={18} />, label: "Bookings", active: false, badge: 3 },
                { icon: <Home size={18} />, label: "Properties", active: false },
                { icon: <MessageSquare size={18} />, label: "Messages", active: false, badge: 5 },
                { icon: <Star size={18} />, label: "Reviews", active: false },
                { icon: <DollarSign size={18} />, label: "Earnings", active: false },
                { icon: <Users size={18} />, label: "Guests", active: false },
                { icon: <PieChart size={18} />, label: "Analytics", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 group relative ${
                    item.active
                      ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  }`}
                >
                  <span className={item.active ? "text-white" : "text-text-muted group-hover:text-text-primary"}>{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${item.active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-600"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                {[
                  { icon: <Settings size={18} />, label: "Settings" },
                  { icon: <HelpCircle size={18} />, label: "Help & Support" },
                  { icon: <LogOut size={18} />, label: "Logout" },
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-all duration-200 group">
                    <span className="text-text-muted group-hover:text-text-primary">{item.icon}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/*  MAIN CONTENT                                           */}
          {/* ======================================================== */}
          <main className="flex-1 min-w-0">
            {/* Welcome + Date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Welcome back, Rajesh! 👋</h1>
                <p className="text-sm text-text-muted mt-1">Here&apos;s what&apos;s happening with your properties today.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-100">
                  <Sun size={14} className="text-brand-600" />
                  <span className="text-xs font-semibold text-brand-700">32°C Jaipur</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), change: "+12.5%", up: true, icon: <DollarSign size={18} />, color: "brand" },
                { label: "Total Bookings", value: stats.totalBookings.toString(), change: "+8.2%", up: true, icon: <Calendar size={18} />, color: "green" },
                { label: "Avg. Occupancy", value: `${stats.avgOccupancy}%`, change: "+3.1%", up: true, icon: <Activity size={18} />, color: "amber" },
                { label: "Guest Rating", value: stats.avgRating, change: "-0.2", up: false, icon: <Star size={18} />, color: "purple" },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color === "brand" ? "bg-brand-50 border border-brand-100" : stat.color === "green" ? "bg-green-50 border border-green-100" : stat.color === "amber" ? "bg-amber-50 border border-amber-100" : "bg-purple-50 border border-purple-100"}`}>
                      <span className={stat.color === "brand" ? "text-brand-600" : stat.color === "green" ? "text-green-600" : stat.color === "amber" ? "text-amber-600" : "text-purple-600"}>{stat.icon}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-6 lg:gap-8">
              {/* LEFT COLUMN (2/3) */}
              <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                {/* Revenue Chart */}
                <div className="bg-surface rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">Revenue Overview</h2>
                      <p className="text-xs text-text-muted mt-0.5">Monthly earnings from all properties</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-100">Monthly</button>
                      <button className="px-3 py-1.5 rounded-lg text-text-muted text-xs font-semibold hover:bg-surface-muted transition-colors">Weekly</button>
                      <button className="px-3 py-1.5 rounded-lg text-text-muted text-xs font-semibold hover:bg-surface-muted transition-colors">Yearly</button>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 h-48 sm:h-56">
                    {revenueData.map((d, i) => {
                      const height = (d.amount / maxRevenue) * 100;
                      const isCurrent = i === revenueData.length - 1;
                      return (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="relative w-full flex justify-center">
                            <div
                              className={`w-full max-w-10 rounded-t-xl transition-all duration-500 ${isCurrent ? "bg-brand-600" : "bg-brand-200 group-hover:bg-brand-300"}`}
                              style={{ height: `${height}%` }}
                            />
                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-text-primary text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                              {formatCurrency(d.amount)}
                            </div>
                          </div>
                          <span className={`text-[11px] font-semibold ${isCurrent ? "text-brand-600" : "text-text-muted"}`}>{d.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-surface rounded-2xl border border-border overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-border">
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">Recent Bookings</h2>
                      <p className="text-xs text-text-muted mt-0.5">Manage your upcoming and past reservations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(["all", "confirmed", "pending", "cancelled"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                            activeTab === tab
                              ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                              : "text-text-muted hover:bg-surface-muted hover:text-text-secondary"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Guest</th>
                          <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Property</th>
                          <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Dates</th>
                          <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Amount</th>
                          <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Status</th>
                          <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => {
                          const cfg = statusConfig[b.status];
                          return (
                            <tr key={b.id} className="border-b border-border last:border-0 hover:bg-surface-muted/50 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold border border-brand-200">
                                    {b.avatar}
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-text-primary">{b.guest}</p>
                                    <p className="text-[11px] text-text-muted">{b.guests} guests</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm font-medium text-text-primary truncate max-w-[180px]">{b.property}</p>
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-sm text-text-secondary">
                                  <span className="font-medium">{formatDate(b.checkIn)}</span>
                                  <span className="text-text-muted mx-1">→</span>
                                  <span className="font-medium">{formatDate(b.checkOut)}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm font-bold text-text-primary">{formatCurrency(b.amount)}</p>
                              </td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                  {cfg.label}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button className="p-1.5 rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors">
                                    <Eye size={15} />
                                  </button>
                                  <button className="p-1.5 rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors">
                                    <Edit3 size={15} />
                                  </button>
                                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-red-600 transition-colors">
                                    <XCircle size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-14 h-14 rounded-full bg-surface-muted flex items-center justify-center mx-auto mb-3">
                        <Search size={24} className="text-text-faint" />
                      </div>
                      <p className="text-sm font-semibold text-text-secondary">No bookings found</p>
                      <p className="text-xs text-text-muted mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </div>

                {/* Properties Grid */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">My Properties</h2>
                      <p className="text-xs text-text-muted mt-0.5">{properties.length} listings · {properties.filter((p) => p.status === "active").length} active</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 hover:-translate-y-0.5">
                      <Plus size={16} /> Add Property
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {properties.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProperty(selectedProperty === p.id ? null : p.id)}
                        className={`bg-surface rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group ${
                          selectedProperty === p.id ? "border-brand-400 shadow-lg shadow-brand-600/10" : "border-border hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="relative h-44 bg-surface-muted overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={48} className="text-border-strong" />
                          </div>
                          <div className="absolute top-3 left-3 z-20">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                              p.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                              p.status === "under_review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-red-50 text-red-700 border-red-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${p.status === "active" ? "bg-green-500" : p.status === "under_review" ? "bg-amber-500" : "bg-red-500"}`} />
                              {p.status === "under_review" ? "Under Review" : p.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-white">{p.rating}</span>
                            <span className="text-[10px] text-white/70">({p.reviews})</span>
                          </div>
                          <div className="absolute bottom-3 left-3 z-20">
                            <p className="text-white text-sm font-bold">{p.title}</p>
                            <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> {p.location}
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <span className="flex items-center gap-1"><BedDouble size={12} /> {p.beds}</span>
                              <span className="flex items-center gap-1"><Bath size={12} /> {p.baths}</span>
                              <span className="flex items-center gap-1"><Users size={12} /> {p.guests}</span>
                            </div>
                            <p className="text-sm font-bold text-brand-600">₹{p.price.toLocaleString()}<span className="text-text-muted text-xs font-normal">/night</span></p>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div>
                              <p className="text-xs text-text-muted">Monthly Earnings</p>
                              <p className="text-sm font-bold text-text-primary">{p.monthlyEarnings > 0 ? formatCurrency(p.monthlyEarnings) : "—"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-text-muted">Occupancy</p>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-surface-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-brand-600 rounded-full" style={{ width: `${p.occupancyRate}%` }} />
                                </div>
                                <span className="text-xs font-bold text-text-primary">{p.occupancyRate}%</span>
                              </div>
                            </div>
                          </div>
                          {selectedProperty === p.id && (
                            <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
                              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-100 hover:bg-brand-100 transition-colors">
                                <Edit3 size={12} /> Edit
                              </button>
                              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-muted text-text-secondary text-xs font-semibold border border-border hover:bg-surface transition-colors">
                                <Calendar size={12} /> Calendar
                              </button>
                              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-muted text-text-secondary text-xs font-semibold border border-border hover:bg-surface transition-colors">
                                <BarChart3 size={12} /> Stats
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (1/3) */}
              <div className="space-y-6 lg:space-y-8">
                {/* Mini Calendar */}
                <div className="bg-surface rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-text-primary">August 2026</h3>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded-lg hover:bg-surface-muted text-text-muted transition-colors"><ChevronLeft size={14} /></button>
                      <button className="p-1 rounded-lg hover:bg-surface-muted text-text-muted transition-colors"><ChevronRight size={14} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((d) => (
                      <div key={d} className="text-center text-[10px] font-bold text-text-muted py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    {calendarDays.map((day) => {
                      const isBooked = bookedDates.includes(day);
                      const isPending = pendingDates.includes(day);
                      const isToday = day === 4;
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                            isToday
                              ? "bg-brand-600 text-white"
                              : isBooked
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : isPending
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "text-text-secondary hover:bg-surface-muted"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="text-[10px] text-text-muted font-medium">Booked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-[10px] text-text-muted font-medium">Pending</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                      <span className="text-[10px] text-text-muted font-medium">Today</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-surface rounded-2xl border border-border p-5">
                  <h3 className="text-sm font-bold text-text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { icon: <Plus size={16} />, label: "Add New Property", desc: "List a new space", color: "brand" },
                      { icon: <Calendar size={16} />, label: "Manage Calendar", desc: "Update availability", color: "green" },
                      { icon: <DollarSign size={16} />, label: "View Earnings", desc: "Check payouts", color: "amber" },
                      { icon: <MessageSquare size={16} />, label: "Messages", desc: "5 unread messages", color: "purple", badge: 5 },
                    ].map((action) => (
                      <button key={action.label} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-muted transition-all group text-left">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          action.color === "brand" ? "bg-brand-50 border border-brand-100" :
                          action.color === "green" ? "bg-green-50 border border-green-100" :
                          action.color === "amber" ? "bg-amber-50 border border-amber-100" :
                          "bg-purple-50 border border-purple-100"
                        }`}>
                          <span className={
                            action.color === "brand" ? "text-brand-600" :
                            action.color === "green" ? "text-green-600" :
                            action.color === "amber" ? "text-amber-600" :
                            "text-purple-600"
                          }>{action.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-text-primary">{action.label}</p>
                            {action.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-600 text-white">{action.badge}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-muted">{action.desc}</p>
                        </div>
                        <ArrowUpRight size={14} className="text-text-faint group-hover:text-brand-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="bg-surface rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-text-primary">Recent Reviews</h3>
                    <button className="text-xs text-brand-600 font-semibold hover:underline">View all</button>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((r) => (
                      <div key={r.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold border border-brand-200 shrink-0">
                            {r.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-text-primary">{r.guest}</p>
                              <div className="flex items-center gap-0.5 shrink-0">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={10} className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-border-strong"} />
                                ))}
                              </div>
                            </div>
                            <p className="text-[11px] text-text-muted mt-0.5">{r.property}</p>
                            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">{r.comment}</p>
                            <p className="text-[10px] text-text-faint mt-1.5">{formatDate(r.date)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Tip */}
                <div className="bg-gradient-to-br from-brand-600 via-brand-500 to-brand-600 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                      <Zap size={18} className="text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">Boost Your Earnings</h3>
                    <p className="text-xs text-brand-100 leading-relaxed">Properties with professional photos get 40% more bookings. Update your listing photos today!</p>
                    <button className="mt-3 px-4 py-2 bg-white text-brand-600 text-xs font-bold rounded-lg hover:bg-brand-50 transition-colors">
                      Update Photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}