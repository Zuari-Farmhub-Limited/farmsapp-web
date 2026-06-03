"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input  } from "@/components/ui/Input";
import { authApi } from "@/lib/api";
import { setTokens } from "@/lib/api/client";
import { useUserStore } from "@/store";
import { APP_NAME, APP_TAGLINE } from "@/config/constants";

const mobileSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

// OTP is 4 digits per backend
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type MobileForm = z.infer<typeof mobileSchema>;
type OtpForm    = z.infer<typeof otpSchema>;
type Step       = "mobile" | "otp";

export function LoginForm() {
  const [step,        setStep]        = useState<Step>("mobile");
  const [mobile,      setMobile]      = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [error,       setError]       = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router       = useRouter();
  const searchParams = useSearchParams();
  const setFarmer    = useUserStore((s) => s.setFarmer);

  const mobileForm = useForm<MobileForm>({ resolver: zodResolver(mobileSchema) });
  const otpForm    = useForm<OtpForm>   ({ resolver: zodResolver(otpSchema)    });

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [resendTimer]);

  async function handleSendOtp({ mobile: m }: MobileForm) {
    setError("");
    try {
      const res = await authApi.triggerOtp(m);
      if (res.data.status_code !== "SUCC200") {
        setError(res.data.message ?? "Failed to send OTP. Please try again.");
        return;
      }
      setMobile(m);
      setStep("otp");
      setResendTimer(30);
    } catch {
      setError("Failed to send OTP. Please try again.");
    }
  }

  async function handleVerifyOtp({ otp }: OtpForm) {
    setError("");
    try {
      const res = await authApi.login(mobile, otp);
      const result = res.data;

      if (result.status_code !== "SUCC200") {
        setError(result.message ?? "Invalid OTP. Please try again.");
        return;
      }

      // Store bearer token
      if (result.bearerToken) {
        setTokens(result.bearerToken, result.refreshToken, result.expiresIn);
      }

      if (!result.registeredFarmer) {
        // New user — redirect to signup/onboarding
        router.replace(`/signup?mobile=${mobile}&farmerId=${result.farmerId}`);
        return;
      }

      // Existing user — store session info
      setFarmer(
        { farmerId: result.farmerId, farmerName: "", mobileNumber: mobile, pincode: "" },
        { customerStore: result.CustomerStore, preferredLanguage: result.preferredLanguage },
      );

      const redirect = searchParams.get("redirect") ?? "/";
      router.replace(redirect);
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  }

  async function handleResend() {
    if (resendTimer > 0) return;
    setError("");
    try {
      await authApi.triggerOtp(mobile);
      setResendTimer(30);
      otpForm.reset();
    } catch {
      setError("Failed to resend OTP.");
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-card">
      {/* Logo */}
      <div className="mb-6 text-center">
        <Image
          src="/assets/images/logo.svg"
          alt={APP_NAME}
          width={120}
          height={48}
          className="mx-auto"
          priority
        />
        <p className="mt-1 text-xs text-gray-500">{APP_TAGLINE}</p>
      </div>

      {step === "mobile" ? (
        <>
          <h1 className="text-xl font-bold text-gray-900">Login to {APP_NAME}</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your mobile number to continue</p>
          <form onSubmit={mobileForm.handleSubmit(handleSendOtp)} className="mt-6 space-y-4">
            <Input
              label="Mobile Number"
              type="tel"
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter 10-digit mobile number"
              error={mobileForm.formState.errors.mobile?.message}
              {...mobileForm.register("mobile")}
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" fullWidth loading={mobileForm.formState.isSubmitting}>
              Send OTP
            </Button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold text-gray-900">Enter OTP</h1>
          <p className="mt-1 text-sm text-gray-500">
            We sent a 4-digit OTP to{" "}
            <span className="font-semibold text-primary">+91 {mobile}</span>
          </p>
          <button
            type="button"
            className="mt-1 text-xs text-info hover:underline"
            onClick={() => { setStep("mobile"); setError(""); otpForm.reset(); }}
          >
            Change number
          </button>

          <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} className="mt-6 space-y-4">
            <Input
              label="OTP"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              error={otpForm.formState.errors.otp?.message}
              autoFocus
              {...otpForm.register("otp")}
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" fullWidth loading={otpForm.formState.isSubmitting}>
              Verify & Login
            </Button>
          </form>

          <div className="mt-4 text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-gray-500">Resend OTP in {resendTimer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
