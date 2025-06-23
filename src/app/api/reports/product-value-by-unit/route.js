import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT b.BUnitID, b.BUnitName, SUM(p.ProductPrice) AS TotalValue
        FROM BusinessUnit b
        JOIN Product p ON b.BUnitID = p.BUnitID
        GROUP BY b.BUnitID, b.BUnitName
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}