// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    console.log("user data route",name, email, password)

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "All inputs are required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    console.log(data)
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.error || "Something went wrong",
        },
        { status: response.status }
      );
    }

    
    return NextResponse.json(
      {
        success: true,
        message: data.message || "Registration successful",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Register API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during register.",
      },
      { status: 500 }
    );
  }
}
