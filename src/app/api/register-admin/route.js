import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const registerAdmin = await query({
      query:
        "INSERT INTO Users (Email, Password, Role) VALUES (?, ?, 'admin')",
      values: [email, hashedPassword],
    });

    const result = registerAdmin.affectedRows;
    let message = "";
    if (result) {
      message = "Admin user created successfully";
    } else {
      message = "Failed to create admin user";
    }

    return NextResponse.json({ message: message });
  } catch (e) {
    return NextResponse.json(
      { message: e.message },
      {
        status: 500,
      }
    );
  }
} 