import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { ADMID, MGRID, password } = body;

  try {
    let user = null;
    let userRole = null;

    // Admin login
    if (ADMID) {
      const results = await query({
        query: "SELECT OfficerID as id, OfficerPassword as password FROM AdminOfficer WHERE OfficerID = ?",
        values: [ADMID],
      });
      if (results.length > 0) {
        user = results[0];
        userRole = "admin";
      }
    }

    // Manager login
    if (!user && MGRID) {
      const results = await query({
        query: "SELECT ManagerID as id, Password as password FROM Manager WHERE ManagerID = ?",
        values: [MGRID],
      });
      if (results.length > 0) {
        user = results[0];
        userRole = "manager";
      }
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      role: userRole,
      userId: user.id,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}