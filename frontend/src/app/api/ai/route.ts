import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
console.log(id)
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User id is required." },
        { status: 400 }
      );
    }

    console.log(`Calling AI endpoint at: ${process.env.API_URL}/ai/generate`);

    const response = await fetch(`${process.env.API_URL}/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to generate plans.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Plans generated successfully",
        data: data, // contains myPlans array
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ AI API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during plan generation.",
      },
      { status: 500 }
    );
  }
}
