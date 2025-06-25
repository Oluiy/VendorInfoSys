import { NextResponse } from "next/server";
import { query } from "@/lib/db"

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT s.BUnitID, b.BUnitName, s.RentDueDate
        FROM Standalone s
        JOIN BusinessUnit b ON s.BUnitID = b.BUnitID
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { BUnitID, BUnitName, Location, VendorID } = await request.json();
    await query({
      query: `
        INSERT INTO BusinessUnit (BUnitID, BUnitName, Location, VendorID)
        VALUES (?, ?, ?, ?)
      `,
      values: [BUnitID, BUnitName, Location, VendorID],
    });
    return NextResponse.json({ message: "Business Unit registered successfully", BUnitID });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 