import { NextResponse } from "next/server";

//Get User by Id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User Id is required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Invalid User.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: data.message || "User found successfully",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("User API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during fetching User.",
      },
      { status: 500 }
    );
  }
}

// Update User
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User Id is required for update." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to update user." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "User updated successfully", data: data.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /api/user/[id] User Update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during updating User.",
      },
      { status: 500 }
    );
  }
}

// Add Metric to User
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User Id is required for update." },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/user/${id}/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed add metric to User.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Metrics have been added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("POST /api/user/[id] add metric error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Unexpected error during updating User.",
      },
      { status: 500 }
    );
  }
}
