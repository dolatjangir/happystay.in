"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ArrowRight,
  Star,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------
// Types & validation helpers
// ---------------------------------------------------------
interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_REGEX = /^[6-9]\d{9}$/;

function getPasswordStrength(password: string): {
  score: number; // 0-4
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Too weak", color: "#ef4444" },
    { label: "Weak", color: "#f97316" },
    { label: "Fair", color: "#eab308" },
    { label: "Good", color: "#22c55e" },
    { label: "Strong", color: "var(--color-brand-600)" },
  ];

  return { score, ...levels[score] };
}

function validateField(name: keyof FormState, form: FormState): string | undefined {
  switch (name) {
    case "fullName":
      if (!form.fullName.trim()) return "Please enter your full name";
      if (form.fullName.trim().length < 2) return "Name looks too short";
      return undefined;
    case "email":
      if (!form.email.trim()) return "Please enter your email";
      if (!EMAIL_REGEX.test(form.email.trim())) return "Enter a valid email address";
      return undefined;
    case "phone":
      if (!form.phone.trim()) return "Please enter your phone number";
      if (!INDIA_PHONE_REGEX.test(form.phone.trim())) return "Enter a valid 10-digit mobile number";
      return undefined;
    case "password":
      if (!form.password) return "Please create a password";
      if (form.password.length < 8) return "Password must be at least 8 characters";
      return undefined;
    case "confirmPassword":
      if (!form.confirmPassword) return "Please confirm your password";
      if (form.confirmPassword !== form.password) return "Passwords don't match";
      return undefined;
    case "agreedToTerms":
      if (!form.agreedToTerms) return "You must agree to the terms to continue";
      return undefined;
    default:
      return undefined;
  }
}

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
};

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const passwordStrength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, { ...form, [field]: value }),
      }));
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form) }));
  }

  function validateAll(): boolean {
    const fields: (keyof FormState)[] = [
      "fullName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "agreedToTerms",
    ];
    const newErrors: FormErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, form);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched(
      fields.reduce((acc, f) => ({ ...acc, [f]: true }), {} as Record<keyof FormState, boolean>)
    );
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) return;

    setSubmitting(true);
    try {
      // TODO: point this at your real signup endpoint.
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      router.push("/");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full lg:grid lg:grid-cols-2"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* --- LEFT BRAND PANEL --- */}
      <div className="relative hidden lg:block h-screen sticky top-0 overflow-hidden">
        <Image
          src="/happy-stay-jaipur-hero-img.png"
          alt="Hawa Mahal, Jaipur"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,23,42,0.92) 5%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.35) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 w-fit">
          <img src="/happystay-logo.png" alt="HappyStay Logo" className="h-16 w-auto" />
          </Link>

          {/* Middle content */}
          <div className="max-w-md">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--color-brand-200)" }}
            >
              Join HappyStay
            </p>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
              Find your perfect stay in the Pink City
            </h1>
            <p className="text-white/80 text-sm mt-4 leading-relaxed">
              Create an account to book villas, heritage havelis, and budget
              rooms across Jaipur — save favorites, track bookings, and get
              member-only deals.
            </p>
          </div>

          {/* Stat cards */}
          {/* <div className="flex items-center gap-3">
            <div className="flex-1 rounded-2xl p-4 backdrop-blur-md bg-white/10 border border-white/15">
              <div className="flex items-center gap-1.5 text-white font-bold text-lg">
                <Star className="w-4 h-4" style={{ fill: "var(--color-rating)", color: "var(--color-rating)" }} />
                4.8
              </div>
              <p className="text-white/70 text-xs mt-0.5">Average guest rating</p>
            </div>
            <div className="flex-1 rounded-2xl p-4 backdrop-blur-md bg-white/10 border border-white/15">
              <div className="flex items-center gap-1.5 text-white font-bold text-lg">
                <ShieldCheck className="w-4 h-4" style={{ color: "var(--color-brand-200)" }} />
                500+
              </div>
              <p className="text-white/70 text-xs mt-0.5">Verified properties</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* --- RIGHT FORM PANEL --- */}
      <div className="flex flex-col min-h-screen  px-6 py-8 sm:px-10 lg:px-14 xl:px-20">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 w-fit lg:hidden mb-8">
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            Happy<span style={{ color: "var(--color-brand-600)" }}>Stay</span>
          </span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto lg:mx-0">
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            Create your account
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold transition hover:opacity-80"
              style={{ color: "var(--color-brand-600)" }}
            >
              Log in
            </Link>
          </p>

          {/* Social sign up */}
          <div className="grid grid-cols-2 gap-3 mt-7">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition hover:opacity-80"
              style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-secondary)" }}
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border shadow-sm transition hover:opacity-80"
              style={{ borderColor: "var(--color-border-strong)", color: "var(--color-text-secondary)" }}
            >
              <FacebookIcon />
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--color-text-faint)" }}>
              OR SIGN UP WITH EMAIL
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} />
          </div>

          {/* Server-side / submit error */}
          {submitError && (
            <div
              className="flex items-start gap-2 rounded-xl px-4 py-3 mb-5 text-sm"
              style={{ backgroundColor: "#fef2f2", color: "#b91c1c" }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {submitError}
            </div>
          )}

          {/* --- FORM --- */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full name */}
            <FormField
              label="Full name"
              icon={User}
              type="text"
              placeholder="Aditi Sharma"
              value={form.fullName}
              onChange={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              error={touched.fullName ? errors.fullName : undefined}
              autoComplete="name"
            />

            {/* Email */}
            <FormField
              label="Email address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              error={touched.email ? errors.email : undefined}
              autoComplete="email"
            />

            {/* Phone */}
            <FormField
              label="Phone number"
              icon={Phone}
              type="tel"
              placeholder="98765 43210"
              value={form.phone}
              onChange={(v) => handleChange("phone", v.replace(/[^0-9]/g, "").slice(0, 10))}
              onBlur={() => handleBlur("phone")}
              error={touched.phone ? errors.phone : undefined}
              autoComplete="tel"
              prefix="+91"
            />

            {/* Password */}
            <div>
              <FormField
                label="Password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={(v) => handleChange("password", v)}
                onBlur={() => handleBlur("password")}
                error={touched.password ? errors.password : undefined}
                autoComplete="new-password"
                trailingAction={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="p-1 rounded-md transition hover:opacity-70"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor:
                            i < passwordStrength.score
                              ? passwordStrength.color
                              : "var(--color-border-strong)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium mt-1.5" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <FormField
              label="Confirm password"
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              onBlur={() => handleBlur("confirmPassword")}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
              autoComplete="new-password"
              trailingAction={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="p-1 rounded-md transition hover:opacity-70"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  style={{ color: "var(--color-text-faint)" }}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* Terms checkbox */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <span
                  className="mt-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-md border shrink-0 transition"
                  style={{
                    backgroundColor: form.agreedToTerms ? "var(--color-brand-600)" : "transparent",
                    borderColor: form.agreedToTerms ? "var(--color-brand-600)" : "var(--color-border-strong)",
                  }}
                >
                  {form.agreedToTerms && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={form.agreedToTerms}
                  onChange={(e) => handleChange("agreedToTerms", e.target.checked)}
                  onBlur={() => handleBlur("agreedToTerms")}
                />
                <span className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  I agree to HappyStay&apos;s{" "}
                  <Link href="/terms" className="font-semibold hover:opacity-80" style={{ color: "var(--color-brand-600)" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold hover:opacity-80" style={{ color: "var(--color-brand-600)" }}>
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {touched.agreedToTerms && errors.agreedToTerms && (
                <p className="flex items-center gap-1 text-xs mt-1.5 ml-[26px]" style={{ color: "#dc2626" }}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.agreedToTerms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                backgroundColor: "var(--color-brand-600)",
                boxShadow: "0 8px 20px var(--color-brand-shadow)",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center mt-8" style={{ color: "var(--color-text-faint)" }}>
            Protected by industry-standard encryption. HappyStay never shares
            your data without consent.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Reusable form field
// ---------------------------------------------------------
interface FormFieldProps {
  label: string;
  icon: React.ElementType;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  prefix?: string;
  trailingAction?: React.ReactNode;
}

function FormField({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  prefix,
  trailingAction,
}: FormFieldProps) {
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition focus-within:ring-2"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: error ? "#fca5a5" : "var(--color-border-strong)",
        }}
      >
        <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--color-text-faint)" }} />
        {prefix && (
          <span className="text-sm font-medium shrink-0" style={{ color: "var(--color-text-secondary)" }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
          style={{ color: "var(--color-text-body)" }}
        />
        {trailingAction}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs mt-1.5" style={{ color: "#dc2626" }}>
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// Inline brand icons (kept local so no extra icon package is needed)
// ---------------------------------------------------------
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}