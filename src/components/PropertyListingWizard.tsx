"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Castle,
  Building2,
  Hotel,
  Home,
  Trees,
  Bed,
  Gem,
  Wifi,
  Car,
  Snowflake,
  ChefHat,
  Shirt,
  Tv,
  Waves,
  Dumbbell,
  PawPrint,
  Zap,
  Video,
  ArrowUpDown,
  Coffee,
  Droplet,
  ShieldCheck,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
  Minus,
  Plus,
  PartyPopper,
  Pencil,
} from "lucide-react";

// ---------------------------------------------------------
// Static config
// ---------------------------------------------------------
const STEPS = [
  "Property Type",
  "Location & Details",
  "Amenities",
  "Photos",
  "Pricing & Contact",
  "Review",
] as const;

const propertyTypeOptions = [
  { id: "villa", label: "Villa", icon: Castle },
  { id: "apartment", label: "Apartment", icon: Building2 },
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "homestay", label: "Homestay", icon: Home },
  { id: "farmhouse", label: "Farmhouse", icon: Trees },
  { id: "budget", label: "Budget / PG Room", icon: Bed },
  { id: "luxury", label: "Luxury Stay", icon: Gem },
] as const;

const amenityOptions = [
  { id: "wifi", label: "Free Wifi", icon: Wifi },
  { id: "parking", label: "Free Parking", icon: Car },
  { id: "ac", label: "Air Conditioning", icon: Snowflake },
  { id: "kitchen", label: "Kitchen", icon: ChefHat },
  { id: "laundry", label: "Washing Machine", icon: Shirt },
  { id: "tv", label: "Television", icon: Tv },
  { id: "pool", label: "Swimming Pool", icon: Waves },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "pets", label: "Pet Friendly", icon: PawPrint },
  { id: "garden", label: "Garden / Outdoor Space", icon: Trees },
  { id: "power", label: "Power Backup", icon: Zap },
  { id: "cctv", label: "CCTV Security", icon: Video },
  { id: "elevator", label: "Elevator", icon: ArrowUpDown },
  { id: "breakfast", label: "Breakfast Included", icon: Coffee },
  { id: "hotwater", label: "Hot Water", icon: Droplet },
  { id: "guard", label: "24/7 Security Guard", icon: ShieldCheck },
] as const;

const indianStates = [
  "Rajasthan", "Delhi", "Maharashtra", "Karnataka", "Gujarat",
  "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Punjab", "Kerala",
];

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------
interface PhotoItem {
  id: string;
  url: string;
  file: File;
}

interface ListingData {
  propertyType: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  pricePerNight: string;
  cleaningFee: string;
  weeklyDiscount: string;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
}

const initialData: ListingData = {
  propertyType: "",
  title: "",
  description: "",
  address: "",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "",
  guests: 2,
  bedrooms: 1,
  bathrooms: 1,
  amenities: [],
  pricePerNight: "",
  cleaningFee: "",
  weeklyDiscount: "",
  hostName: "",
  hostEmail: "",
  hostPhone: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export default function PropertyListingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ListingData>(initialData);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [maxStepReached, setMaxStepReached] = useState(0);

  function update<K extends keyof ListingData>(field: K, value: ListingData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleAmenity(id: string) {
    setData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter((a) => a !== id)
        : [...prev.amenities, id],
    }));
  }

  function handlePhotoSelect(files: FileList | null) {
    if (!files) return;
    const remaining = 10 - photos.length;
    const selected = Array.from(files).slice(0, remaining);
    const newPhotos: PhotoItem[] = selected.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      url: URL.createObjectURL(file),
      file,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    setErrors((prev) => ({ ...prev, photos: "" }));
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function validateStep(index: number): Record<string, string> {
    const e: Record<string, string> = {};

    if (index === 0) {
      if (!data.propertyType) e.propertyType = "Please choose a property type";
    }

    if (index === 1) {
      if (!data.title.trim() || data.title.trim().length < 10)
        e.title = "Title should be at least 10 characters";
      if (!data.description.trim() || data.description.trim().length < 30)
        e.description = "Description should be at least 30 characters";
      if (!data.address.trim()) e.address = "Address is required";
      if (!data.city.trim()) e.city = "City is required";
      if (!data.state.trim()) e.state = "State is required";
      if (!PINCODE_REGEX.test(data.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
    }

    if (index === 3) {
      if (photos.length < 3) e.photos = "Please add at least 3 photos";
    }

    if (index === 4) {
      const price = Number(data.pricePerNight);
      if (!data.pricePerNight || price <= 0) e.pricePerNight = "Enter a valid nightly price";
      if (!data.hostName.trim()) e.hostName = "Please enter your name";
      if (!EMAIL_REGEX.test(data.hostEmail.trim())) e.hostEmail = "Enter a valid email address";
      if (!INDIA_PHONE_REGEX.test(data.hostPhone.trim())) e.hostPhone = "Enter a valid 10-digit mobile number";
    }

    return e;
  }

  function goNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    const next = Math.min(step + 1, STEPS.length - 1);
    setStep(next);
    setMaxStepReached((m) => Math.max(m, next));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function goToStep(index: number) {
    if (index <= maxStepReached) setStep(index);
  }

  async function handleSubmit() {
    setSubmitError(null);
    setSubmitting(true);
    try {
      // TODO: point this at your real host-listing endpoint.
      // Photos are real File objects (photos[i].file) — send as multipart/form-data
      // or upload to your storage provider (S3 / Cloudinary) first and send back URLs.
      const formData = new FormData();
      formData.append("listing", JSON.stringify(data));
      photos.forEach((p) => formData.append("photos", p.file));

      const res = await fetch("/api/host/listings", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPropertyType = useMemo(
    () => propertyTypeOptions.find((p) => p.id === data.propertyType),
    [data.propertyType]
  );

  if (submitted) {
    return <SuccessScreen title={data.title} />;
  }

  return (
    <div
      className="rounded-3xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      {/* --- STEPPER --- */}
      <div
        className="px-5 sm:px-8 pt-6 pb-5 border-b overflow-x-auto scrollbar-none"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center min-w-max">
          {STEPS.map((label, i) => {
            const isCompleted = i < step;
            const isActive = i === step;
            const isClickable = i <= maxStepReached;
            return (
              <React.Fragment key={label}>
                <button
                  type="button"
                  onClick={() => goToStep(i)}
                  disabled={!isClickable}
                  className="flex items-center gap-2 shrink-0 disabled:cursor-not-allowed"
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition"
                    style={{
                      backgroundColor: isCompleted || isActive ? "var(--color-brand-600)" : "var(--color-surface-muted)",
                      color: isCompleted || isActive ? "#fff" : "var(--color-text-faint)",
                    }}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className="text-xs font-semibold hidden md:inline whitespace-nowrap"
                    style={{ color: isActive ? "var(--color-text-primary)" : "var(--color-text-faint)" }}
                  >
                    {label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px w-6 sm:w-10 mx-1.5 sm:mx-2 shrink-0"
                    style={{ backgroundColor: i < step ? "var(--color-brand-600)" : "var(--color-border-strong)" }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* --- STEP CONTENT --- */}
      <div className="px-5 sm:px-8 py-8 min-h-[420px]">
        {step === 0 && (
          <StepPropertyType
            selected={data.propertyType}
            onSelect={(id) => update("propertyType", id)}
            error={errors.propertyType}
          />
        )}

        {step === 1 && (
          <StepLocationDetails data={data} update={update} errors={errors} />
        )}

        {step === 2 && (
          <StepAmenities selected={data.amenities} onToggle={toggleAmenity} />
        )}

        {step === 3 && (
          <StepPhotos
            photos={photos}
            onSelect={handlePhotoSelect}
            onRemove={removePhoto}
            error={errors.photos}
          />
        )}

        {step === 4 && (
          <StepPricingContact data={data} update={update} errors={errors} />
        )}

        {step === 5 && (
          <StepReview
            data={data}
            photos={photos}
            propertyTypeLabel={selectedPropertyType?.label}
            onEditStep={goToStep}
          />
        )}
      </div>

      {/* --- SUBMIT ERROR --- */}
      {submitError && (
        <div className="px-5 sm:px-8">
          <div
            className="flex items-start gap-2 rounded-xl px-4 py-3 mb-2 text-sm"
            style={{ backgroundColor: "#fef2f2", color: "#b91c1c" }}
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {submitError}
          </div>
        </div>
      )}

      {/* --- FOOTER NAV --- */}
      <div
        className="flex items-center justify-between px-5 sm:px-8 py-5 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition hover:opacity-80 disabled:opacity-0 disabled:pointer-events-none"
          style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-secondary)" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <span className="text-xs font-medium" style={{ color: "var(--color-text-faint)" }}>
          Step {step + 1} of {STEPS.length}
        </span>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--color-brand-600)" }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit listing
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Step 0 — Property type
// ---------------------------------------------------------
function StepPropertyType({
  selected,
  onSelect,
  error,
}: {
  selected: string;
  onSelect: (id: string) => void;
  error?: string;
}) {
  return (
    <div>
      <StepHeading
        title="What kind of property are you listing?"
        subtitle="Choose the option that best describes your space."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {propertyTypeOptions.map((opt) => {
          const Icon = opt.icon;
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border py-6 px-3 transition"
              style={{
                borderColor: active ? "var(--color-brand-600)" : "var(--color-border)",
                backgroundColor: active ? "var(--color-brand-50)" : "var(--color-surface)",
              }}
            >
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full"
                style={{
                  backgroundColor: active ? "var(--color-brand-600)" : "var(--color-surface-muted)",
                  color: active ? "#fff" : "var(--color-brand-600)",
                }}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span
                className="text-sm font-semibold text-center"
                style={{ color: active ? "var(--color-brand-700)" : "var(--color-text-secondary)" }}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      {error && <FieldError message={error} className="mt-4" />}
    </div>
  );
}

// ---------------------------------------------------------
// Step 1 — Location & details
// ---------------------------------------------------------
function StepLocationDetails({
  data,
  update,
  errors,
}: {
  data: ListingData;
  update: <K extends keyof ListingData>(field: K, value: ListingData[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <StepHeading
        title="Tell us about your place"
        subtitle="A clear title, honest description, and exact address help guests trust your listing."
      />

      <div className="grid grid-cols-1 gap-5 mt-6">
        <TextField
          label="Listing title"
          placeholder="e.g. Sunlit 3BHK Villa with Private Pool near Amer Fort"
          value={data.title}
          onChange={(v) => update("title", v)}
          error={errors.title}
        />

        <TextAreaField
          label="Description"
          placeholder="Describe your space, the neighborhood, and what makes it special..."
          value={data.description}
          onChange={(v) => update("description", v)}
          error={errors.description}
          rows={4}
        />

        <TextField
          label="Street address"
          placeholder="House no., street, landmark"
          value={data.address}
          onChange={(v) => update("address", v)}
          error={errors.address}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <TextField label="City" value={data.city} onChange={(v) => update("city", v)} error={errors.city} />
          <SelectField
            label="State"
            value={data.state}
            onChange={(v) => update("state", v)}
            options={indianStates}
            error={errors.state}
          />
          <TextField
            label="Pincode"
            placeholder="302001"
            value={data.pincode}
            onChange={(v) => update("pincode", v.replace(/[^0-9]/g, "").slice(0, 6))}
            error={errors.pincode}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <Stepper label="Guests" value={data.guests} min={1} max={30} onChange={(v) => update("guests", v)} />
          <Stepper label="Bedrooms" value={data.bedrooms} min={1} max={15} onChange={(v) => update("bedrooms", v)} />
          <Stepper label="Bathrooms" value={data.bathrooms} min={1} max={15} onChange={(v) => update("bathrooms", v)} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Step 2 — Amenities
// ---------------------------------------------------------
function StepAmenities({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <StepHeading
        title="What amenities do you offer?"
        subtitle="Select everything that applies — listings with more amenities get booked faster."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {amenityOptions.map((a) => {
          const Icon = a.icon;
          const active = selected.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onToggle(a.id)}
              className="flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition"
              style={{
                borderColor: active ? "var(--color-brand-600)" : "var(--color-border)",
                backgroundColor: active ? "var(--color-brand-50)" : "var(--color-surface)",
              }}
            >
              <Icon
                className="w-4 h-4 shrink-0"
                style={{ color: active ? "var(--color-brand-600)" : "var(--color-text-faint)" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: active ? "var(--color-brand-700)" : "var(--color-text-secondary)" }}
              >
                {a.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-4" style={{ color: "var(--color-text-faint)" }}>
        {selected.length} amenity{selected.length === 1 ? "" : "ies"} selected
      </p>
    </div>
  );
}

// ---------------------------------------------------------
// Step 3 — Photos
// ---------------------------------------------------------
function StepPhotos({
  photos,
  onSelect,
  onRemove,
  error,
}: {
  photos: PhotoItem[];
  onSelect: (files: FileList | null) => void;
  onRemove: (id: string) => void;
  error?: string;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <StepHeading
        title="Add photos of your property"
        subtitle="Upload at least 3 clear, well-lit photos. The first photo becomes your cover image."
      />

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onSelect(e.dataTransfer.files);
        }}
        className="mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-10 px-4 cursor-pointer transition"
        style={{
          borderColor: dragOver ? "var(--color-brand-600)" : "var(--color-border-strong)",
          backgroundColor: dragOver ? "var(--color-brand-50)" : "var(--color-surface-muted)",
        }}
      >
        <span
          className="flex items-center justify-center w-12 h-12 rounded-full"
          style={{ backgroundColor: "var(--color-brand-100)", color: "var(--color-brand-600)" }}
        >
          <Upload className="w-5 h-5" />
        </span>
        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Click to upload or drag and drop
        </p>
        <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
          PNG or JPG, up to 10 photos
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onSelect(e.target.files)}
        />
      </label>

      {error && <FieldError message={error} className="mt-3" />}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
          {photos.map((p, i) => (
            <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image src={p.url} alt="Property photo" fill className="object-cover" unoptimized />
              {i === 0 && (
                <span
                  className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "var(--color-brand-600)" }}
                >
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => onRemove(p.id)}
                aria-label="Remove photo"
                className="absolute top-2 right-2 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// Step 4 — Pricing & contact
// ---------------------------------------------------------
function StepPricingContact({
  data,
  update,
  errors,
}: {
  data: ListingData;
  update: <K extends keyof ListingData>(field: K, value: ListingData[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <StepHeading title="Set your price" subtitle="You can always change this later from your host dashboard." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
        <TextField
          label="Price per night (₹)"
          placeholder="3500"
          value={data.pricePerNight}
          onChange={(v) => update("pricePerNight", v.replace(/[^0-9]/g, ""))}
          error={errors.pricePerNight}
          prefix="₹"
        />
        <TextField
          label="Cleaning fee (₹)"
          placeholder="500"
          value={data.cleaningFee}
          onChange={(v) => update("cleaningFee", v.replace(/[^0-9]/g, ""))}
          prefix="₹"
        />
        <TextField
          label="Weekly discount (%)"
          placeholder="10"
          value={data.weeklyDiscount}
          onChange={(v) => update("weeklyDiscount", v.replace(/[^0-9]/g, "").slice(0, 2))}
          prefix="%"
        />
      </div>

      <div className="h-px my-8" style={{ backgroundColor: "var(--color-border)" }} />

      <StepHeading title="Your contact details" subtitle="We'll use this to verify your listing and reach you about bookings." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
        <TextField
          label="Full name"
          placeholder="Your name"
          value={data.hostName}
          onChange={(v) => update("hostName", v)}
          error={errors.hostName}
        />
        <TextField
          label="Email address"
          placeholder="you@example.com"
          value={data.hostEmail}
          onChange={(v) => update("hostEmail", v)}
          error={errors.hostEmail}
        />
        <TextField
          label="Phone number"
          placeholder="98765 43210"
          value={data.hostPhone}
          onChange={(v) => update("hostPhone", v.replace(/[^0-9]/g, "").slice(0, 10))}
          error={errors.hostPhone}
          prefix="+91"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Step 5 — Review
// ---------------------------------------------------------
function StepReview({
  data,
  photos,
  propertyTypeLabel,
  onEditStep,
}: {
  data: ListingData;
  photos: PhotoItem[];
  propertyTypeLabel?: string;
  onEditStep: (index: number) => void;
}) {
  return (
    <div>
      <StepHeading title="Review your listing" subtitle="Make sure everything looks right before you submit." />

      <div className="space-y-4 mt-6">
        <ReviewCard title="Property type" onEdit={() => onEditStep(0)}>
          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {propertyTypeLabel ?? "—"}
          </p>
        </ReviewCard>

        <ReviewCard title="Details" onEdit={() => onEditStep(1)}>
          <p className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
            {data.title || "Untitled listing"}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {data.address}, {data.city}, {data.state} {data.pincode}
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--color-text-faint)" }}>
            {data.guests} guests · {data.bedrooms} bedrooms · {data.bathrooms} bathrooms
          </p>
        </ReviewCard>

        <ReviewCard title={`Amenities (${data.amenities.length})`} onEdit={() => onEditStep(2)}>
          {data.amenities.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>None selected</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {data.amenities.map((id) => {
                const opt = amenityOptions.find((a) => a.id === id);
                return (
                  <span
                    key={id}
                    className="text-[11px] font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-700)" }}
                  >
                    {opt?.label ?? id}
                  </span>
                );
              })}
            </div>
          )}
        </ReviewCard>

        <ReviewCard title={`Photos (${photos.length})`} onEdit={() => onEditStep(3)}>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {photos.map((p) => (
              <div key={p.id} className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src={p.url} alt="Property photo" fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </ReviewCard>

        <ReviewCard title="Pricing & contact" onEdit={() => onEditStep(4)}>
          <p className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
            ₹{data.pricePerNight || "0"} / night
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-faint)" }}>
            {data.hostName} · {data.hostEmail} · +91 {data.hostPhone}
          </p>
        </ReviewCard>
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl border px-4 py-4"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-muted)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-text-faint)" }}>
          {title}
        </p>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80"
          style={{ color: "var(--color-brand-600)" }}
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------
// Success screen
// ---------------------------------------------------------
function SuccessScreen({ title }: { title: string }) {
  return (
    <div
      className="rounded-3xl border shadow-sm p-10 sm:p-16 text-center"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <span
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
        style={{ backgroundColor: "var(--color-brand-50)", color: "var(--color-brand-600)" }}
      >
        <PartyPopper className="w-7 h-7" />
      </span>
      <h3 className="text-2xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
        Listing submitted!
      </h3>
      <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
        {title ? `"${title}" is` : "Your property is"} now in review. Our team
        typically verifies new listings within 24–48 hours — we'll email you
        as soon as it's live.
      </p>
    </div>
  );
}

// ---------------------------------------------------------
// Shared small building blocks
// ---------------------------------------------------------
function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h3>
      <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
        {subtitle}
      </p>
    </div>
  );
}

function FieldError({ message, className = "" }: { message: string; className?: string }) {
  return (
    <p className={`flex items-center gap-1 text-xs ${className}`} style={{ color: "#dc2626" }}>
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
  prefix,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  prefix?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: error ? "#fca5a5" : "var(--color-border-strong)",
        }}
      >
        {prefix && (
          <span className="text-sm font-medium shrink-0" style={{ color: "var(--color-text-secondary)" }}>
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
          style={{ color: "var(--color-text-body)" }}
        />
      </div>
      {error && <FieldError message={error} className="mt-1.5" />}
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 3,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none resize-none placeholder:text-slate-400"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: error ? "#fca5a5" : "var(--color-border-strong)",
          color: "var(--color-text-body)",
        }}
      />
      {error && <FieldError message={error} className="mt-1.5" />}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: error ? "#fca5a5" : "var(--color-border-strong)",
          color: "var(--color-text-body)",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <FieldError message={error} className="mt-1.5" />}
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </label>
      <div
        className="flex items-center justify-between px-3.5 py-2 rounded-xl border"
        style={{ borderColor: "var(--color-border-strong)", backgroundColor: "var(--color-surface)" }}
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex items-center justify-center w-7 h-7 rounded-full border transition disabled:opacity-30"
          style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-secondary)" }}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex items-center justify-center w-7 h-7 rounded-full border transition disabled:opacity-30"
          style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-secondary)" }}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}