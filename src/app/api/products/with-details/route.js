import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT p.ProductID, p.ProductName, p.ProductType, p.ProductPrice, b.BUnitName, b.Location
        FROM Product p
        JOIN BusinessUnit b ON p.BUnitID = b.BUnitID
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 