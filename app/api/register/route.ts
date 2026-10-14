
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import WorkshopRegistration from "../../../models/WorkshopRegistration";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      age,
      gender,
      email,
      phone,
      college,
      workshopSession,
      consent,
    } = body;

    // Validate required fields
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      age === undefined ||
      age === null ||
      age === "" ||
      typeof gender !== "string" ||
      !gender ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof college !== "string" ||
      !college.trim() ||
      typeof workshopSession !== "string" ||
      !workshopSession
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate consent
    if (consent !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Please confirm the consent checkbox.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Save registration
    const registration = await WorkshopRegistration.create({
      fullName: fullName.trim(),
      age: Number(age),
      gender,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      workshopSession,
      consent: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed successfully!",
        registrationId: registration._id.toString(),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Workshop registration error:", error);

    const err = error as {
      name?: string;
      message?: string;
      errors?: Record<string, { message?: string }>;
    };

    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors ?? {})
        .map((item) => item.message)
        .filter(Boolean)
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          message: message || "Please check your registration details.",
        },
        { status: 400 }
      );
    }

    // Invalid JSON request
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request. Please submit the form again.",
        },
        { status: 400 }
      );
    }

    // Other server or database errors
    return NextResponse.json(
      {
        success: false,
        message:
          "Registration could not be saved. Please check MongoDB connection and the VS Code terminal.",
      },
      { status: 500 }
    );
  }
}
