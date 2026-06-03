import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiUrl  = process.env.API_BASE_URL;
  const authKey = process.env.API_AUTH_KEY;

  if (!apiUrl || !authKey) {
    return NextResponse.json(
      { message: "Server misconfiguration: missing API_BASE_URL or API_AUTH_KEY" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(`${apiUrl}/kisaan/companion/v1/trigger-otp`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${authKey}`,
      },
      body: JSON.stringify({
        mobileNumber: body.mobileNumber,
        channel:      "COMPANION",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("[trigger-otp]", err);
    return NextResponse.json({ message: "Failed to reach backend", detail: String(err) }, { status: 500 });
  }
}
