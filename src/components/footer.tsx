"use client";

import React, { useState } from "react";
import {
  
  Building2,
  Hotel,
  Home,
  Castle,
  Building,
  MapPin,
  Sparkles,
  Tag,
  Users,
  HelpCircle,
  FileQuestion,
  XCircle,
  FileText,
  Shield,
  ShieldCheck,
  Mail,
  Lock,
  Percent,
  Headphones,
  Landmark,
  Send,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const exploreLinks = [
  { label: "All Stays", icon: Building2 },
  { label: "Hotels", icon: Hotel },
  { label: "Homestays", icon: Home },
  { label: "Villas", icon: Castle },
  { label: "Apartments", icon: Building },
  { label: "Experiences", icon: MapPin },
  { label: "Deals & Offers", icon: Tag },
];

const companyLinks = [
  { label: "About Us", icon: Users },
  { label: "How it Works", icon: HelpCircle },
  { label: "Why Jaipur", icon: Landmark },
  { label: "Careers", icon: Sparkles },
  { label: "Blog", icon: FileText },
  { label: "Press & Media", icon: Mail },
  { label: "Contact Us", icon: Send },
];

const supportLinks = [
  { label: "Help Center", icon: Headphones },
  { label: "FAQs", icon: FileQuestion },
  { label: "Cancellation Policy", icon: XCircle },
  { label: "Terms & Conditions", icon: FileText },
  { label: "Privacy Policy", icon: Shield },
  { label: "Trust & Safety", icon: ShieldCheck },
];

const trustBadges = [
  {
    icon: Lock,
    title: "Secure Booking",
    subtitle: "Your data is safe with us",
  },
  {
    icon: Percent,
    title: "Best Price Guarantee",
    subtitle: "Find the best deals",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "We're here to help anytime",
  },
];

const socialLinks = [
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaYoutube, label: "YouTube" },
];

export default function HappyStayFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative w-full overflow-hidden rounded-t-3xl bg-[#f4f3ff]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat opacity-70 "
        style={{ backgroundImage: "url('/footer-bg-img.png')" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2.5">
               <img src="/happystay-logo.png" alt="happystay" className="h-18 w-auto" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-600">
                Discover the best stays, exclusive deals and unforgettable
                experiences in the Pink City, Jaipur.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b4dff]/10 text-[#5b4dff] transition-all duration-300 hover:bg-[#5b4dff] hover:text-white hover:shadow-lg hover:shadow-[#5b4dff]/25"
                  >
                    <social.icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore Column */}
            <div className="lg:col-span-2">
              <h3 className="relative inline-block text-base font-semibold text-[#5b4dff]">
                Explore
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-6 rounded-full bg-[#5b4dff]" />
              </h3>
              <ul className="mt-6 space-y-3.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="group flex items-center gap-2.5 text-sm text-gray-600 transition-colors duration-200 hover:text-[#5b4dff]"
                    >
                      <link.icon className="h-4 w-4 text-[#5b4dff]/70 transition-colors duration-200 group-hover:text-[#5b4dff]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-2">
              <h3 className="relative inline-block text-base font-semibold text-[#5b4dff]">
                Company
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-6 rounded-full bg-[#5b4dff]" />
              </h3>
              <ul className="mt-6 space-y-3.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="group flex items-center gap-2.5 text-sm text-gray-600 transition-colors duration-200 hover:text-[#5b4dff]"
                    >
                      <link.icon className="h-4 w-4 text-[#5b4dff]/70 transition-colors duration-200 group-hover:text-[#5b4dff]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="lg:col-span-2">
              <h3 className="relative inline-block text-base font-semibold text-[#5b4dff]">
                Support
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-6 rounded-full bg-[#5b4dff]" />
              </h3>
              <ul className="mt-6 space-y-3.5">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="group flex items-center gap-2.5 text-sm text-gray-600 transition-colors duration-200 hover:text-[#5b4dff]"
                    >
                      <link.icon className="h-4 w-4 text-[#5b4dff]/70 transition-colors duration-200 group-hover:text-[#5b4dff]" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold leading-snug text-[#5b4dff]">
                Get the best stays & deals in Jaipur
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Join our newsletter and never miss a special offer.
              </p>
              <form onSubmit={handleSubscribe} className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#5b4dff] focus:ring-2 focus:ring-[#5b4dff]/20"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-[#5b4dff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5b4dff]/25 transition-all duration-300 hover:bg-[#4a3de6] hover:shadow-xl hover:shadow-[#5b4dff]/30 active:scale-95"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="border-t border-[#5b4dff]/10">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5b4dff]/10">
                    <badge.icon className="h-5 w-5 text-[#5b4dff]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {badge.title}
                    </p>
                    <p className="text-xs text-gray-500">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#5b4dff]/10 bg-[#eae9f7]/50">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-8 lg:px-12">
            <p className="text-sm text-gray-500">
              © 2025{" "}
              <span className="font-semibold text-[#5b4dff]">HappyStay</span>.
              All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <a
                href="#"
                className="px-3 py-1 transition-colors duration-200 hover:text-[#5b4dff]"
              >
                Sitemap
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="#"
                className="px-3 py-1 transition-colors duration-200 hover:text-[#5b4dff]"
              >
                Privacy
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="#"
                className="px-3 py-1 transition-colors duration-200 hover:text-[#5b4dff]"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}