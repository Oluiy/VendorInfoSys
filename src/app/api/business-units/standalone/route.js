import { NextResponse } from "next/server";
import { query } from "@/lib/db";

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