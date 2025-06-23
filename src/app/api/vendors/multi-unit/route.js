import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT v.VendorID, v.VendorName, COUNT(r.BUnitID) AS RegisteredUnits
        FROM Vendor v
        JOIN VendorBusinessUnitRegistration r ON v.VendorID = r.VendorID
        GROUP BY v.VendorID, v.VendorName
        HAVING COUNT(r.BUnitID) > 1
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 