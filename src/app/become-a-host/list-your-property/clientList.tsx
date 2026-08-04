"use client";

import { useState, useRef, useCallback } from "react";
import {
  Home, Heart, Globe, MapPin, Building2, Grid3X3, Camera,
  DollarSign, FileText, Shield, CheckCircle2, Minus, Plus,
  ArrowRight, ArrowLeft, Headphones, Users, Settings, MapPinned,
  ChevronDown, BedDouble, DoorOpen, UsersRound, Type, Tag,
  LayoutGrid, AlignLeft, Clock, ImageIcon, HelpCircle, X, Check,
  Apple, Play, Upload, Trash2, Star, Wifi, Tv, Wind, Flame,
  ChefHat, Car, Waves, Dumbbell, Shirt, Droplets, Refrigerator,
  Coffee, Flower2, Cigarette, Dog, Music, Accessibility,
  AlertTriangle, Cross, FireExtinguisher, Sun, Bath, Armchair,
  TreePine, UtensilsCrossed, Heater,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FormData {
  title: string; propertyType: string; category: string;
  accommodationType: "entire" | "private" | "shared";
  guests: number; description: string;
  address: string; city: string; state: string;
  country: string; zipCode: string; landmark: string;
  bedrooms: number; bathrooms: number; beds: number;
  propertySize: string; floor: string;
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  amenities: string[]; photos: string[];
  basePrice: string; currency: string; cleaningFee: string;
  securityDeposit: string; minNights: number; maxNights: number;
  cancellationPolicy: string;
  checkInTime: string; checkOutTime: string;
  smokingAllowed: boolean; petsAllowed: boolean;
  partiesAllowed: boolean; additionalRules: string;
}

interface Step { id: number; label: string; icon: React.ReactNode; }

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const steps: Step[] = [
  { id: 1, label: "Basic Details", icon: <Home size={18} /> },
  { id: 2, label: "Location", icon: <MapPin size={18} /> },
  { id: 3, label: "Property Details", icon: <Building2 size={18} /> },
  { id: 4, label: "Amenities", icon: <Grid3X3 size={18} /> },
  { id: 5, label: "Photos", icon: <Camera size={18} /> },
  { id: 6, label: "Pricing", icon: <DollarSign size={18} /> },
  { id: 7, label: "House Rules", icon: <FileText size={18} /> },
  { id: 8, label: "Review & Publish", icon: <Shield size={18} /> },
];

const propertyTypes = [
  "Apartment", "House", "Villa", "Heritage Haveli",
  "Boutique Hotel", "Resort", "Hostel", "Guest House",
];

const categories = [
  "City View", "Heritage", "Luxury", "Budget",
  "Family Friendly", "Couples", "Business", "Nature & Retreat",
];

const cancellationPolicies = [
  { value: "flexible", label: "Flexible", desc: "Full refund 1 day prior to arrival" },
  { value: "moderate", label: "Moderate", desc: "Full refund 5 days prior to arrival" },
  { value: "strict", label: "Strict", desc: "Full refund 30 days prior to arrival" },
];

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: <Wifi size={18} /> },
  { id: "tv", label: "TV", icon: <Tv size={18} /> },
  { id: "ac", label: "Air Conditioning", icon: <Wind size={18} /> },
  { id: "heating", label: "Heating", icon: <Heater size={18} /> },
  { id: "kitchen", label: "Kitchen", icon: <ChefHat size={18} /> },
  { id: "parking", label: "Free Parking", icon: <Car size={18} /> },
  { id: "pool", label: "Swimming Pool", icon: <Waves size={18} /> },
  { id: "gym", label: "Gym", icon: <Dumbbell size={18} /> },
  { id: "washing", label: "Washing Machine", icon: <Shirt size={18} /> },
  { id: "hot_water", label: "Hot Water", icon: <Droplets size={18} /> },
  { id: "refrigerator", label: "Refrigerator", icon: <Refrigerator size={18} /> },
  { id: "coffee", label: "Coffee Maker", icon: <Coffee size={18} /> },
  { id: "balcony", label: "Balcony/Terrace", icon: <Flower2 size={18} /> },
  { id: "garden", label: "Garden", icon: <TreePine size={18} /> },
  { id: "fireplace", label: "Fireplace", icon: <Flame size={18} /> },
  { id: "elevator", label: "Elevator", icon: <ArrowRight size={18} /> },
  { id: "wheelchair", label: "Wheelchair Accessible", icon: <Accessibility size={18} /> },
  { id: "smoke_alarm", label: "Smoke Alarm", icon: <AlertTriangle size={18} /> },
  { id: "first_aid", label: "First Aid Kit", icon: <Cross size={18} /> },
  { id: "fire_extinguisher", label: "Fire Extinguisher", icon: <FireExtinguisher size={18} /> },
  { id: "workspace", label: "Dedicated Workspace", icon: <Armchair size={18} /> },
  { id: "bathtub", label: "Bathtub", icon: <Bath size={18} /> },
  { id: "bbq", label: "BBQ Grill", icon: <UtensilsCrossed size={18} /> },
  { id: "breakfast", label: "Breakfast Included", icon: <Sun size={18} /> },
];

const whyHosts = [
  { icon: <Star size={24} className="text-brand-600" />, title: "Higher Earnings", desc: "Hosts earn up to 30% more with HappyStay." },
  { icon: <Users size={24} className="text-brand-600" />, title: "Trusted Community", desc: "Verified guests & secure booking process." },
  { icon: <Settings size={24} className="text-brand-600" />, title: "Easy Management", desc: "Simple tools to manage listings & bookings." },
  { icon: <MapPinned size={24} className="text-brand-600" />, title: "Local Support", desc: "Dedicated host support team in Jaipur." },
];

const hostingBenefits = [
  "Reach millions of travelers", "Set your own price",
  "Flexible cancellation", "Secure & verified guests", "24/7 dedicated support",
];

const tips = [
  { icon: <Type size={18} />, title: "Add a catchy title", desc: "Make it short, clear & attractive" },
  { icon: <Camera size={18} />, title: "Upload high quality photos", desc: "Bright and professional photos get more bookings" },
  { icon: <AlignLeft size={18} />, title: "Describe your space", desc: "Highlight what makes your property special" },
  { icon: <Tag size={18} />, title: "Set competitive pricing", desc: "Check similar listings in your area" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ListYourPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "", propertyType: "", category: "",
    accommodationType: "entire", guests: 2, description: "",
    address: "", city: "", state: "", country: "",
    zipCode: "", landmark: "",
    bedrooms: 1, bathrooms: 1, beds: 1,
    propertySize: "", floor: "", furnishing: "furnished",
    amenities: [], photos: [],
    basePrice: "", currency: "INR", cleaningFee: "",
    securityDeposit: "", minNights: 1, maxNights: 30,
    cancellationPolicy: "flexible",
    checkInTime: "14:00", checkOutTime: "11:00",
    smokingAllowed: false, petsAllowed: false,
    partiesAllowed: false, additionalRules: "",
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuestChange = (delta: number) => {
    setFormData((prev) => ({ ...prev, guests: Math.max(1, Math.min(50, prev.guests + delta)) }));
  };

  const handleNumberChange = (field: keyof FormData, delta: number, min: number, max: number) => {
    setFormData((prev) => ({ ...prev, [field]: Math.max(min, Math.min(max, (prev[field] as number) + delta)) }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((a) => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) newPhotos.push(URL.createObjectURL(file));
    });
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos].slice(0, 12) }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const removePhoto = (index: number) => {
    setFormData((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const goToNext = () => { if (currentStep < 8) setCurrentStep((prev) => prev + 1); };
  const goToPrev = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };

  const handlePublish = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.title.trim().length > 0 && formData.propertyType !== "" && formData.category !== "" && formData.description.trim().length > 0;
      case 2: return formData.address.trim().length > 0 && formData.city.trim().length > 0 && formData.country.trim().length > 0;
      case 3: return formData.bedrooms > 0 && formData.bathrooms > 0;
      case 4: return formData.amenities.length > 0;
      case 5: return formData.photos.length > 0;
      case 6: return formData.basePrice !== "" && Number(formData.basePrice) > 0;
      case 7: return true;
      case 8: return true;
      default: return false;
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      title: "", propertyType: "", category: "",
      accommodationType: "entire", guests: 2, description: "",
      address: "", city: "", state: "", country: "",
      zipCode: "", landmark: "",
      bedrooms: 1, bathrooms: 1, beds: 1,
      propertySize: "", floor: "", furnishing: "furnished",
      amenities: [], photos: [],
      basePrice: "", currency: "INR", cleaningFee: "",
      securityDeposit: "", minNights: 1, maxNights: 30,
      cancellationPolicy: "flexible",
      checkInTime: "14:00", checkOutTime: "11:00",
      smokingAllowed: false, petsAllowed: false,
      partiesAllowed: false, additionalRules: "",
    });
  };

  /* ================================================================ */
  /*  RENDER STEP CONTENT                                              */
  /* ================================================================ */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Property Title<span className="text-red-500">*</span>
              </label>
              <input type="text" value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. Heritage Haveli with City View"
                className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Property Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select value={formData.propertyType}
                    onChange={(e) => updateField("propertyType", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all cursor-pointer">
                    <option value="" disabled>Select property type</option>
                    {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Category<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all cursor-pointer">
                    <option value="" disabled>Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Accommodation Type<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "entire" as const, label: "Entire Place", icon: <Home size={18} /> },
                  { value: "private" as const, label: "Private Room", icon: <DoorOpen size={18} /> },
                  { value: "shared" as const, label: "Shared Room", icon: <UsersRound size={18} /> },
                ].map((opt) => {
                  const sel = formData.accommodationType === opt.value;
                  return (
                    <button key={opt.value}
                      onClick={() => updateField("accommodationType", opt.value)}
                      className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-2 transition-all duration-200 ${sel ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border-strong bg-surface text-text-secondary hover:border-border hover:bg-surface-muted"}`}>
                      {opt.icon}
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Number of Guests<span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-text-muted mb-3">Maximum number of guests allowed</p>
              <div className="inline-flex items-center gap-4 border border-border-strong rounded-xl px-2 py-2">
                <button onClick={() => handleGuestChange(-1)} disabled={formData.guests <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold text-text-primary w-6 text-center">{formData.guests}</span>
                <button onClick={() => handleGuestChange(1)} disabled={formData.guests >= 50}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Short Description<span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-text-muted mb-2">Briefly describe your property</p>
              <textarea value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="A few highlights about your property..." rows={4} maxLength={500}
                className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none" />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-text-faint">{formData.description.length}/500</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Street Address<span className="text-red-500">*</span>
              </label>
              <textarea value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="e.g. 123, MI Road, Near City Palace" rows={2}
                className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  City<span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="e.g. Jaipur"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  State / Province
                </label>
                <input type="text" value={formData.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  placeholder="e.g. Rajasthan"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Country<span className="text-red-500">*</span>
                </label>
                <input type="text" value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="e.g. India"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  ZIP / Postal Code
                </label>
                <input type="text" value={formData.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  placeholder="e.g. 302001"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Nearby Landmark <span className="text-text-muted font-normal">(Optional)</span>
              </label>
              <input type="text" value={formData.landmark}
                onChange={(e) => updateField("landmark", e.target.value)}
                placeholder="e.g. Near Hawa Mahal, 500m from City Palace"
                className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              <p className="text-xs text-text-muted mt-1.5">Helps guests find your property easily</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Bedrooms", field: "bedrooms" as const, icon: <BedDouble size={16} />, min: 0, max: 20 },
                { label: "Bathrooms", field: "bathrooms" as const, icon: <Bath size={16} />, min: 0, max: 20 },
                { label: "Beds", field: "beds" as const, icon: <BedDouble size={16} />, min: 1, max: 50 },
              ].map((item) => (
                <div key={item.field} className="bg-surface-muted rounded-xl border border-border p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2 text-text-muted">
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => handleNumberChange(item.field, -1, item.min, item.max)}
                      disabled={(formData[item.field] as number) <= item.min}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface border border-border-strong hover:border-brand-300 text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                      <Minus size={12} />
                    </button>
                    <span className="text-lg font-bold text-text-primary w-6 text-center">{formData[item.field] as number}</span>
                    <button onClick={() => handleNumberChange(item.field, 1, item.min, item.max)}
                      disabled={(formData[item.field] as number) >= item.max}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface border border-border-strong hover:border-brand-300 text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Property Size <span className="text-text-muted font-normal">(sq ft)</span>
                </label>
                <input type="text" value={formData.propertySize}
                  onChange={(e) => updateField("propertySize", e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Floor <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <input type="text" value={formData.floor}
                  onChange={(e) => updateField("floor", e.target.value)}
                  placeholder="e.g. 3rd Floor"
                  className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Furnishing Status<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "furnished" as const, label: "Fully Furnished", icon: <Armchair size={18} /> },
                  { value: "semi-furnished" as const, label: "Semi Furnished", icon: <LayoutGrid size={18} /> },
                  { value: "unfurnished" as const, label: "Unfurnished", icon: <Home size={18} /> },
                ].map((opt) => {
                  const sel = formData.furnishing === opt.value;
                  return (
                    <button key={opt.value}
                      onClick={() => updateField("furnishing", opt.value)}
                      className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border-2 transition-all duration-200 ${sel ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border-strong bg-surface text-text-secondary hover:border-border hover:bg-surface-muted"}`}>
                      {opt.icon}
                      <span className="text-xs font-semibold text-center">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">
                  Select Amenities <span className="text-red-500">*</span>
                </h3>
                <span className="text-xs text-text-muted">{formData.amenities.length} selected</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => {
                  const sel = formData.amenities.includes(amenity.id);
                  return (
                    <button key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 transition-all duration-200 text-left ${sel ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border-strong bg-surface text-text-secondary hover:border-border hover:bg-surface-muted"}`}>
                      <span className={sel ? "text-brand-600" : "text-text-muted"}>{amenity.icon}</span>
                      <span className="text-xs font-semibold">{amenity.label}</span>
                      {sel && <Check size={14} className="ml-auto text-brand-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                Property Photos <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-text-muted mb-4">
                Upload at least 5 photos. First photo will be your cover image. Max 12 photos.
              </p>
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border-strong rounded-2xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all group">
                <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-100 transition-colors">
                  <Upload size={24} className="text-brand-600" />
                </div>
                <p className="text-sm font-semibold text-text-primary">Click to upload photos</p>
                <p className="text-xs text-text-muted mt-1">JPG, PNG up to 10MB each</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
              {formData.photos.length > 0 && (
                <div className="mt-5">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                        <img src={photo} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-brand-600 text-white text-[10px] font-bold rounded-md">COVER</div>
                        )}
                        <button onClick={() => removePhoto(idx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Base Price per Night<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-semibold">
                    {formData.currency === "INR" ? "₹" : "$"}
                  </span>
                  <input type="number" value={formData.basePrice}
                    onChange={(e) => updateField("basePrice", e.target.value)}
                    placeholder="2500"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Currency</label>
                <div className="relative">
                  <select value={formData.currency}
                    onChange={(e) => updateField("currency", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all cursor-pointer">
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Cleaning Fee <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-semibold">
                    {formData.currency === "INR" ? "₹" : "$"}
                  </span>
                  <input type="number" value={formData.cleaningFee}
                    onChange={(e) => updateField("cleaningFee", e.target.value)}
                    placeholder="500"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Security Deposit <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-semibold">
                    {formData.currency === "INR" ? "₹" : "$"}
                  </span>
                  <input type="number" value={formData.securityDeposit}
                    onChange={(e) => updateField("securityDeposit", e.target.value)}
                    placeholder="2000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Minimum Nights</label>
                <div className="inline-flex items-center gap-4 border border-border-strong rounded-xl px-2 py-2">
                  <button onClick={() => handleNumberChange("minNights", -1, 1, 30)} disabled={formData.minNights <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold text-text-primary w-6 text-center">{formData.minNights}</span>
                  <button onClick={() => handleNumberChange("minNights", 1, 1, 30)} disabled={formData.minNights >= 30}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Maximum Nights</label>
                <div className="inline-flex items-center gap-4 border border-border-strong rounded-xl px-2 py-2">
                  <button onClick={() => handleNumberChange("maxNights", -1, 1, 365)} disabled={formData.maxNights <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold text-text-primary w-6 text-center">{formData.maxNights}</span>
                  <button onClick={() => handleNumberChange("maxNights", 1, 1, 365)} disabled={formData.maxNights >= 365}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">Cancellation Policy</label>
              <div className="space-y-3">
                {cancellationPolicies.map((policy) => {
                  const sel = formData.cancellationPolicy === policy.value;
                  return (
                    <button key={policy.value}
                      onClick={() => updateField("cancellationPolicy", policy.value)}
                      className={`w-full flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 text-left ${sel ? "border-brand-600 bg-brand-50" : "border-border-strong bg-surface hover:border-border hover:bg-surface-muted"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${sel ? "border-brand-600 bg-brand-600" : "border-border-strong"}`}>
                        {sel && <Check size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${sel ? "text-brand-700" : "text-text-primary"}`}>{policy.label}</p>
                        <p className="text-xs text-text-muted mt-0.5">{policy.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Check-in Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                  <input type="time" value={formData.checkInTime}
                    onChange={(e) => updateField("checkInTime", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Check-out Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" />
                  <input type="time" value={formData.checkOutTime}
                    onChange={(e) => updateField("checkOutTime", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">House Rules</label>
              <div className="space-y-3">
                {[
                  { field: "smokingAllowed" as const, label: "Smoking Allowed", icon: <Cigarette size={18} />, desc: "Guests can smoke inside the property" },
                  { field: "petsAllowed" as const, label: "Pets Allowed", icon: <Dog size={18} />, desc: "Guests can bring their pets" },
                  { field: "partiesAllowed" as const, label: "Parties/Events Allowed", icon: <Music size={18} />, desc: "Guests can host parties or events" },
                ].map((rule) => {
                  const allowed = formData[rule.field] as boolean;
                  return (
                    <div key={rule.field}
                      className="flex items-center justify-between px-4 py-4 rounded-xl border border-border-strong bg-surface">
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted">{rule.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{rule.label}</p>
                          <p className="text-xs text-text-muted">{rule.desc}</p>
                        </div>
                      </div>
                      <button onClick={() => updateField(rule.field, !allowed)}
                        className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${allowed ? "bg-brand-600" : "bg-border-strong"}`}>
                        <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${allowed ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Additional Rules <span className="text-text-muted font-normal">(Optional)</span>
              </label>
              <p className="text-xs text-text-muted mb-2">Any other rules guests should know about</p>
              <textarea value={formData.additionalRules}
                onChange={(e) => updateField("additionalRules", e.target.value)}
                placeholder="e.g. No shoes inside, Quiet hours after 10 PM..." rows={3} maxLength={300}
                className="w-full px-4 py-3 rounded-xl border border-border-strong bg-surface text-text-primary placeholder:text-text-faint text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none" />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-text-faint">{formData.additionalRules.length}/300</span>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-brand-50 rounded-2xl border border-brand-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Review Your Listing</h3>
                  <p className="text-xs text-text-muted">Double-check everything before publishing</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Basic Details</h4>
                    <button onClick={() => setCurrentStep(1)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-text-muted">Title:</span><span className="text-text-primary font-medium">{formData.title || "—"}</span>
                    <span className="text-text-muted">Type:</span><span className="text-text-primary font-medium">{formData.propertyType || "—"}</span>
                    <span className="text-text-muted">Category:</span><span className="text-text-primary font-medium">{formData.category || "—"}</span>
                    <span className="text-text-muted">Accommodation:</span><span className="text-text-primary font-medium capitalize">{formData.accommodationType}</span>
                    <span className="text-text-muted">Guests:</span><span className="text-text-primary font-medium">{formData.guests}</span>
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Location</h4>
                    <button onClick={() => setCurrentStep(2)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-text-muted">Address:</span><span className="text-text-primary font-medium">{formData.address || "—"}</span>
                    <span className="text-text-muted">City:</span><span className="text-text-primary font-medium">{formData.city || "—"}</span>
                    <span className="text-text-muted">Country:</span><span className="text-text-primary font-medium">{formData.country || "—"}</span>
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Property Details</h4>
                    <button onClick={() => setCurrentStep(3)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-text-muted">Bedrooms:</span><span className="text-text-primary font-medium">{formData.bedrooms}</span>
                    <span className="text-text-muted">Bathrooms:</span><span className="text-text-primary font-medium">{formData.bathrooms}</span>
                    <span className="text-text-muted">Beds:</span><span className="text-text-primary font-medium">{formData.beds}</span>
                    <span className="text-text-muted">Furnishing:</span><span className="text-text-primary font-medium capitalize">{formData.furnishing}</span>
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Amenities</h4>
                    <button onClick={() => setCurrentStep(4)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.length > 0 ? formData.amenities.map((id) => {
                      const am = amenitiesList.find((a) => a.id === id);
                      return am ? (
                        <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg border border-brand-100">
                          {am.icon}{am.label}
                        </span>
                      ) : null;
                    }) : <span className="text-text-muted text-sm">No amenities selected</span>}
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Photos</h4>
                    <button onClick={() => setCurrentStep(5)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ImageIcon size={16} className="text-brand-600" />
                    <span className="text-text-primary font-medium">{formData.photos.length} photos uploaded</span>
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">Pricing</h4>
                    <button onClick={() => setCurrentStep(6)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-text-muted">Base Price:</span>
                    <span className="text-text-primary font-medium">{formData.basePrice ? `${formData.currency === "INR" ? "₹" : "$"}${formData.basePrice}/night` : "—"}</span>
                    <span className="text-text-muted">Cleaning Fee:</span>
                    <span className="text-text-primary font-medium">{formData.cleaningFee ? `${formData.currency === "INR" ? "₹" : "$"}${formData.cleaningFee}` : "—"}</span>
                    <span className="text-text-muted">Min Nights:</span><span className="text-text-primary font-medium">{formData.minNights}</span>
                    <span className="text-text-muted">Cancellation:</span><span className="text-text-primary font-medium capitalize">{formData.cancellationPolicy}</span>
                  </div>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-text-primary">House Rules</h4>
                    <button onClick={() => setCurrentStep(7)} className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-text-muted">Check-in:</span><span className="text-text-primary font-medium">{formData.checkInTime}</span>
                    <span className="text-text-muted">Check-out:</span><span className="text-text-primary font-medium">{formData.checkOutTime}</span>
                    <span className="text-text-muted">Smoking:</span><span className="text-text-primary font-medium">{formData.smokingAllowed ? "Allowed" : "Not Allowed"}</span>
                    <span className="text-text-muted">Pets:</span><span className="text-text-primary font-medium">{formData.petsAllowed ? "Allowed" : "Not Allowed"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  /* ================================================================ */
  /*  SUCCESS OVERLAY                                                  */
  /* ================================================================ */
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="bg-surface rounded-3xl border border-border p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Listing Published!</h2>
          <p className="text-sm text-text-muted mb-6 leading-relaxed">
            Your property has been successfully listed on HappyStay. Guests can now discover and book your space.
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-all">
              View My Listings
            </button>
            <button onClick={resetForm}
              className="w-full px-6 py-3 border border-border-strong text-text-secondary text-sm font-semibold rounded-xl hover:bg-surface-muted transition-all">
              List Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  MAIN RENDER                                                      */
  /* ================================================================ */
  return (
    <div className="min-h-screen bg-bg font-sans antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden ">
        <img src="/list-a-property-page-hero-bg2.png" alt="Hero background" className="absolute bottom-16 right-0 w-[60%] h-full object-contain scale-125" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-2 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100">
                Host with Happy Stay
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-text-primary leading-[1.1] tracking-tight">
                Earn More.<br />Share <span className="text-brand-600">Hospitality.</span>
              </h1>
              <p className="text-base sm:text-lg text-text-secondary max-w-md leading-relaxed">
                Join thousands of hosts in Jaipur who are earning great income by sharing their beautiful properties.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100">
                    <Globe size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Global</p>
                    <p className="text-xs text-text-muted">Visibility</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100">
                    <Shield size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Verified</p>
                    <p className="text-xs text-text-muted">Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100">
                    <Users size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">24/7 Host</p>
                    <p className="text-xs text-text-muted">Support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/10" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] lg:w-[90%] ">
                  <img src="/list-a-property-page-hero-sofa.png" alt="Luxury living room furniture"
                    className="w-full h-auto object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FORM SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-26  ">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT SIDEBAR — Steps */}
          <div className="lg:col-span-3 z-10">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-surface rounded-2xl shadow-2xl border border-border p-5">
                <div className="relative">
                  <div className="absolute left-[19px] top-8 bottom-8 w-px bg-border-strong" />
                  <div className="space-y-1">
                    {steps.map((step) => {
                      const isActive = step.id === currentStep;
                      const isCompleted = step.id < currentStep;
                      return (
                        <button key={step.id}
                          onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-brand-600 shadow-lg shadow-brand-600/20" : "hover:bg-surface-muted"}`}>
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isActive ? "bg-white/20 text-white" : isCompleted ? "bg-brand-50 text-brand-600 border border-brand-200" : "bg-surface-muted text-text-faint border border-border-strong"}`}>
                            {isCompleted ? <Check size={16} className="text-brand-600" /> : step.icon}
                          </div>
                          <div className="text-left">
                            <p className={`text-[11px] font-semibold uppercase tracking-wide ${isActive ? "text-brand-100" : "text-text-muted"}`}>Step {step.id}</p>
                            <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-text-secondary"}`}>{step.label}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-2xl border border-border shadow-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                    <Headphones size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">Need Help?</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Our hosting experts are here for you.</p>
                  </div>
                </div>
                <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-strong text-sm font-medium text-text-secondary hover:bg-surface-muted hover:border-brand-200 transition-all">
                  Contact Support <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* CENTER — Form */}
          <div className="lg:col-span-6 z-10">
            <div className="bg-surface rounded-2xl shadow-2xl border border-border p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">{steps[currentStep - 1].label}</h2>
                <p className="text-sm text-text-muted mt-1">
                  {currentStep === 1 && "Tell us about your property"}
                  {currentStep === 2 && "Where is your property located?"}
                  {currentStep === 3 && "Details about rooms and space"}
                  {currentStep === 4 && "What amenities do you offer?"}
                  {currentStep === 5 && "Show guests what your place looks like"}
                  {currentStep === 6 && "Set your pricing and policies"}
                  {currentStep === 7 && "Rules for your guests"}
                  {currentStep === 8 && "Review everything before publishing"}
                </p>
              </div>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
                <button onClick={goToPrev} disabled={currentStep === 1}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-strong text-sm font-semibold transition-all ${currentStep === 1 ? "opacity-30 cursor-not-allowed text-text-muted" : "text-text-secondary hover:bg-surface-muted hover:border-brand-200"}`}>
                  <ArrowLeft size={16} /> Back
                </button>
                {currentStep < 8 ? (
                  <button onClick={goToNext} disabled={!isStepValid()}
                    className={`inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5 ${isStepValid() ? "bg-brand-600 hover:bg-brand-700 shadow-brand-600/25 hover:shadow-brand-600/40" : "bg-text-muted cursor-not-allowed shadow-none"}`}>
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={handlePublish} disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:-translate-y-0.5 disabled:opacity-70">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Shield size={16} /> Publish Listing
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 space-y-6 z-10">
            <div className="bg-surface rounded-2xl shadow-2xl border border-border p-6">
              <h3 className="text-base font-bold text-text-primary leading-snug">
                Hosting on HappyStay is <span className="text-brand-600">easy & rewarding</span>
              </h3>
              <ul className="mt-5 space-y-3">
                {hostingBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-0.5 border border-brand-100">
                      <Check size={12} className="text-brand-600" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="text-base font-bold text-text-primary mb-5">Tips for a great listing</h3>
              <div className="space-y-4">
                {tips.map((tip) => (
                  <div key={tip.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                      <span className="text-brand-600">{tip.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{tip.title}</p>
                      <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="text-sm font-bold text-brand-600 mb-1">Manage on the go</h3>
              <p className="text-xs text-text-muted mb-4 leading-relaxed">Download our app to manage your property anytime, anywhere.</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-text-primary rounded-lg hover:bg-text-secondary transition-colors">
                  <Apple size={14} className="text-white" />
                  <span className="text-[10px] font-semibold text-white">App Store</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-text-primary rounded-lg hover:bg-text-secondary transition-colors">
                  <Play size={14} className="text-white" />
                  <span className="text-[10px] font-semibold text-white">Google Play</span>
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-40 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border-4 border-slate-700 relative overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-600 rounded-full" />
                  <div className="mt-6 mx-2 space-y-1.5">
                    <div className="h-8 bg-brand-600/20 rounded-lg" />
                    <div className="h-6 bg-slate-700/50 rounded-lg" />
                    <div className="h-6 bg-slate-700/50 rounded-lg" />
                    <div className="h-12 bg-slate-700/30 rounded-lg mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY HOSTS LOVE HAPPYSTAY */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-10">
          Why Hosts Love <span className="text-brand-600">HappyStay</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyHosts.map((item) => (
            <div key={item.title}
              className="bg-surface rounded-2xl border border-border p-6 text-center hover:shadow-lg hover:shadow-brand-600/5 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4 border border-brand-100 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-300">
                <span className="group-hover:text-white transition-colors duration-300">{item.icon}</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 sm:px-12 py-10 sm:py-12">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to start your hosting journey?</h2>
              <p className="text-brand-100 text-sm sm:text-base">Join HappyStay today and turn your space into income.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 text-sm font-bold rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0">
              Get Started Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}