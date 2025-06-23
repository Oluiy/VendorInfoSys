import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const results = await query({
      query: `
        SELECT v.VendorID, v.VendorName, r.BUnitID, b.BUnitName, r.RegistrationDate
        FROM Vendor v
        JOIN VendorBusinessUnitRegistration r ON v.VendorID = r.VendorID
        JOIN BusinessUnit b ON r.BUnitID = b.BUnitID
        WHERE b.BUnitID = ?
      `,
      values: [id],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 