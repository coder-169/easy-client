import User from "@/app/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const getHeaders = await headers();
    const id = getHeaders.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const user = await User.findByIdAndUpdate(id, body).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid id user not found!" },
        { status: 400 }
      );
    }

    // Update user in database
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to update profile",
      },
      { status: 500 }
    );
  }
}
