"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------
// Types & validation helpers
// ---------------------------------------------------------
interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: keyof Omit<FormState, "rememberMe">, form: FormState): string | undefined {
  switch (name) {
    case "email":
      if (!form.email.trim()) return "Please enter your email";
      if (!EMAIL_REGEX.test(form.email.trim())) return "Enter a valid email address";
      return undefined;
    case "password":
      if (!form.password) return "Please enter your password";
      return undefined;
    default:
      return undefined;
  }
}

const initialForm: FormState = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field] && field !== "rememberMe") {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field as keyof Omit<FormState, "rememberMe">, { ...form, [field]: value }),
      }));
    }
  }

  function handleBlur(field: keyof Omit<FormState, "rememberMe">) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form) }));
  }

  function validateAll(): boolean {
    const fields: (keyof Omit<FormState, "rememberMe">)[] = ["email", "password"];
    const newErrors: FormErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, form);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched((prev) => ({ ...prev, email: true, password: true }));
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) return;

    setSubmitting(true);
    try {
      // TODO: point this at your real login endpoint.
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
          rememberMe: form.rememberMe,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Invalid email or password. Please try again.");
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
              Welcome back
            </p>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
              Pick up right where you left off
            </h1>
            <p className="text-white/80 text-sm mt-4 leading-relaxed">
              Log in to manage your bookings, revisit saved stays, and keep
              exploring villas, heritage havelis, and budget rooms across
              Jaipur.
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT FORM PANEL --- */}
      <div className="flex flex-col min-h-screen px-6 py-8 sm:px-10 lg:px-14 xl:px-20">
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
            Log in to your account
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
            New to HappyStay?{" "}
            <Link
              href="/signup"
              className="font-semibold transition hover:opacity-80"
              style={{ color: "var(--color-brand-600)" }}
            >
              Create an account
            </Link>
          </p>

          {/* Social login */}
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
              OR LOG IN WITH EMAIL
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold transition hover:opacity-80"
                  style={{ color: "var(--color-brand-600)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <FormField
                label=""
                hideLabel
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(v) => handleChange("password", v)}
                onBlur={() => handleBlur("password")}
                error={touched.password ? errors.password : undefined}
                autoComplete="current-password"
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
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
              <span
                className="flex items-center justify-center w-[18px] h-[18px] rounded-md border shrink-0 transition"
                style={{
                  backgroundColor: form.rememberMe ? "var(--color-brand-600)" : "transparent",
                  borderColor: form.rememberMe ? "var(--color-brand-600)" : "var(--color-border-strong)",
                }}
              >
                {form.rememberMe && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={form.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
              />
              <span className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                Keep me logged in
              </span>
            </label>

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
                  Logging in...
                </>
              ) : (
                <>
                  Log in
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
  hideLabel?: boolean;
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
  hideLabel,
}: FormFieldProps) {
  return (
    <div>
      {!hideLabel && (
        <label
          className="block text-xs font-semibold mb-1.5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {label}
        </label>
      )}
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