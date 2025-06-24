import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT *
        FROM VendorBusinessUnitRegistration
        ORDER BY RegistrationDate DESC
        LIMIT 1
      `,
      values: [],
    });

    if (results.length === 0) {
      return NextResponse.json({ message: "No registrations found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 