import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Invalid credentials.",
        },
        { status: response.status }
      );
    }

    
    return NextResponse.json(
      {
        success: true,
        message: data.message || "Login successful",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Login API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during login.",
      },
      { status: 500 }
    );
  }
}
