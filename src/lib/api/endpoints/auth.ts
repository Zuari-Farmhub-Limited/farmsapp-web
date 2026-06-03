import { apiClient } from "../client";
import type { LoginResult } from "@/types";

// trigger-otp and login go through Next.js API routes (server-side)
// so Basic Auth credentials (API_AUTH_KEY) are never exposed to the browser
export const authApi = {
  triggerOtp: (mobileNumber: string) =>
    apiClient.post<{ status_code: string; message: string }>(
      "/api/auth/trigger-otp",
      { mobileNumber },
    ),

  login: (mobileNumber: string, otp: string, preferredLanguage = "English") =>
    apiClient.post<LoginResult>(
      "/api/auth/login",
      { mobileNumber, otp, preferredLanguage },
    ),
};
