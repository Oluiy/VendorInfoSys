import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT b.BUnitID, b.BUnitName
        FROM BusinessUnit b
        LEFT JOIN Product p ON b.BUnitID = p.BUnitID
        WHERE p.ProductID IS NULL
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 