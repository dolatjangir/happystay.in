"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Heart,
  Globe,
  ChevronDown,
  User,
  LogOut,
  Settings,
  MessageSquare,
  Calendar,
  Bookmark,
  LayoutDashboard,
  HelpCircle,
  MapPin,
  Utensils,
  ShoppingBag,
  Music,
  Ticket,
  Users,
  Home,
  Building,
  Hotel,
  TreePine,
  Warehouse,
  Banknote,
  Crown,
  FileText,
  Shield,
  Phone,
  BookOpen,
  DollarSign,
  HeadphonesIcon,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────
interface UserData {
  name: string;
  email: string;
  avatar?: string;
  isHost?: boolean;
}

interface NavbarProps {
  scrolled?: boolean;
  isLoggedIn?: boolean;
  user?: UserData;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onLogout?: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

interface MenuSection {
  key: string;
  label: string;
  items: MenuItem[];
}

// ─── Menu Data ───────────────────────────────────────────
const menuSections: MenuSection[] = [
  {
    key: "stays",
    label: "Stays",
    items: [
      { label: "All Properties", href: "#", icon: Home, description: "Browse all accommodations" },
      { label: "Villas", href: "#", icon: Building, description: "Private luxury villas" },
      { label: "Apartments", href: "#", icon: Hotel, description: "City apartments & flats" },
      { label: "Hotels", href: "#", icon: Crown, description: "Boutique & chain hotels" },
      { label: "Homestays", href: "#", icon: Users, description: "Stay with local hosts" },
      { label: "Farmhouses", href: "#", icon: TreePine, description: "Rustic countryside stays" },
      { label: "Budget Stays", href: "#", icon: Banknote, description: "Affordable options" },
      { label: "Luxury Stays", href: "#", icon: Crown, description: "Premium experiences" },
    ],
  },
  {
    key: "explore",
    label: "Explore Jaipur",
    items: [
      { label: "Tourist Places", href: "#", icon: MapPin, description: "Top attractions & sights" },
      { label: "Restaurants", href: "#", icon: Utensils, description: "Best dining spots" },
      { label: "Shopping", href: "#", icon: ShoppingBag, description: "Markets & malls" },
      { label: "Nightlife", href: "#", icon: Music, description: "Bars, clubs & lounges" },
      { label: "Events", href: "#", icon: Ticket, description: "Festivals & happenings" },
      { label: "Local Guides", href: "#", icon: Users, description: "Expert city tours" },
    ],
  },
  {
    key: "host",
    label: "Become a Host",
    items: [
      { label: "List Your Property", href: "#", icon: FileText, description: "Start earning today" },
      { label: "Host Dashboard", href: "#", icon: LayoutDashboard, description: "Manage your listings" },
      { label: "Pricing Guide", href: "#", icon: DollarSign, description: "Optimize your rates" },
      { label: "Host Support", href: "#", icon: HeadphonesIcon, description: "24/7 dedicated help" },
    ],
  },
  {
    key: "help",
    label: "Help",
    items: [
      { label: "Contact Us", href: "#", icon: Phone, description: "Get in touch" },
      { label: "FAQ", href: "#", icon: HelpCircle, description: "Common questions" },
      { label: "Safety", href: "#", icon: Shield, description: "Trust & safety info" },
      { label: "Cancellation Policy", href: "#", icon: FileText, description: "Flexible booking terms" },
      { label: "Terms & Privacy", href: "#", icon: BookOpen, description: "Legal information" },
    ],
  },
];

// ─── Component ───────────────────────────────────────────
export default function Navbar({
  scrolled = false,
  isLoggedIn = false,
  user,
  onSignIn,
  onSignUp,
  onLogout,
}: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const navRef = useRef<HTMLElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Hover intent delay (ms) — prevents flickering when moving between trigger and dropdown
  const HOVER_DELAY = 150;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, HOVER_DELAY);
  }, [clearCloseTimer]);

  const openMenu = useCallback((key: string) => {
    clearCloseTimer();
    setActiveMenu(key);
  }, [clearCloseTimer]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const activeSection = menuSections.find((s) => s.key === activeMenu);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-sm shadow-sm border-b border-slate-100"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/happystay-logo.png"
                alt="HappyStay"
                width={120}
                height={56}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuSections.map((section) => (
                <div
                  key={section.key}
                  className="relative"
                  onMouseEnter={() => openMenu(section.key)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeMenu === section.key
                        ? "text-indigo-600 bg-indigo-50 "
                        : "text-slate-600 hover:text-indigo-600 bg-stone-100/50 hover:bg-slate-100/80"
                    }`}
                    aria-expanded={activeMenu === section.key}
                    aria-haspopup="true" 
                  >
                    {section.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMenu === section.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}

              {/* Standalone Wishlist link */}
              <Link
                href="#"
                className="px-4 py-2.5 bg-stone-100/50 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 transition-all duration-200"
              >
                Wishlist
              </Link>
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* Wishlist icon (mobile + desktop) */}
              <button
                className="p-2.5 rounded-full bg-stone-100/50 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                className="hidden sm:flex p-2.5 rounded-full bg-stone-100/50 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" />
              </button>

              {/* Auth buttons or User dropdown */}
              {!isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-2 ml-1">
                  <button
                    onClick={onSignIn}
                    className="px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={onSignUp}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200/50 transition-all hover:shadow-lg hover:shadow-indigo-200/60 active:scale-95"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="relative hidden sm:block" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-slate-100 bg-white rounded-full transition border border-slate-200 shadow-sm"
                    aria-expanded={userDropdownOpen}
                    aria-haspopup="true"
                  >
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm font-semibold text-slate-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>

                      <div className="py-1">
                        {[
                          { icon: Calendar, label: "My Trips", href: "#" },
                          { icon: FileText, label: "Bookings", href: "#" },
                          { icon: MessageSquare, label: "Messages", href: "#" },
                          { icon: Bookmark, label: "Wishlist", href: "#" },
                          { icon: Settings, label: "Account Settings", href: "#" },
                          ...(user?.isHost
                            ? [{ icon: LayoutDashboard, label: "Host Dashboard", href: "#" }]
                            : []),
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-slate-400" />
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-slate-50 py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onLogout?.();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Full-Width Mega Menu ── */}
        {activeSection && (
          <div
            ref={megaMenuRef}
            className="hidden lg:block absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg shadow-slate-200/30"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeSection.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 group"
                      onClick={() => setActiveMenu(null)}
                    >
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-lg font-semibold text-slate-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto py-2">
              {/* Mobile mega menus as accordions */}
              {menuSections.map((section) => {
                const isExpanded = mobileExpanded === section.key;
                return (
                  <div key={section.key} className="border-b border-slate-50 last:border-0">
                    <button
                      onClick={() =>
                        setMobileExpanded(isExpanded ? null : section.key)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-medium text-slate-800">
                        {section.label}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-4 grid grid-cols-1 gap-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-slate-700">
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="#"
                className="flex items-center gap-3 px-5 py-4 text-slate-800 font-medium hover:bg-slate-50 transition-colors border-b border-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5 text-slate-400" />
                Wishlist
              </Link>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-slate-100 space-y-3">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignIn?.();
                    }}
                    className="w-full py-3 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignUp?.();
                    }}
                    className="w-full py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-1">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}