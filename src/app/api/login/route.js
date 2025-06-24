import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function createSession(userId, userRole) {
  const sessionToken = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  await query({
    query: `
      INSERT INTO Sessions (SessionToken, UserID, UserRole, ExpiresAt) 
      VALUES (?, ?, ?, ?)
    `,
    values: [sessionToken, userId, userRole, expiresAt],
  });

  return sessionToken;
}

export async function POST(request) {
  const body = await request.json();
  const { vendorID, adminID, password } = body;

  try {
    let user;
    let userRole;

    if (vendorID) {
      // Handle Vendor Login
      userRole = 'vendor';
      const results = await query({
        query: "SELECT * FROM Vendor WHERE VendorID = ?",
        values: [vendorID],
      });
      if (results.length === 0) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
      user = results[0];
    } else if (adminID) {
      // Handle Admin Officer Login
      userRole = 'admin';
      const results = await query({
        query: "SELECT * FROM AdminOfficer WHERE OfficerID = ?",
        values: [adminID],
      });
      if (results.length === 0) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }
      user = results[0];
    } else {
      return NextResponse.json(
        { message: "vendorID or adminID must be provided" },
        { status: 400 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    
    // Create session
    const userId = user.VendorID || user.OfficerID;
    const sessionToken = await createSession(userId, userRole);

    return NextResponse.json({
      message: "Login successful",
      token: sessionToken,
      role: userRole,
      userId: userId,
    });

  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 