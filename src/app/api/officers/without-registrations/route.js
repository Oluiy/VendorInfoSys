import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT o.OfficerID, o.OfficerName
        FROM AdminOfficer o
        LEFT JOIN VendorBusinessUnitRegistration r ON o.OfficerID = r.OfficerID
        WHERE r.RegistrationID IS NULL
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 