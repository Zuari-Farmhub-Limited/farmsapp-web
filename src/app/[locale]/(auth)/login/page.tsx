import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to FarmsApp with your mobile number",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
