import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const price = searchParams.get("price");

  if (!type || !price) {
    return NextResponse.json(
      { message: "Both 'type' and 'price' query parameters are required" },
      { status: 400 }
    );
  }

  try {
    const results = await query({
      query: `
        SELECT *
        FROM Product
        WHERE ProductType = ? AND ProductPrice >= ?
      `,
      values: [type, parseFloat(price)],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const price = searchParams.get("price");
  
    if (!type || !price) {
      return NextResponse.json(
        { message: "Both 'type' and 'price' query parameters are required" },
        { status: 400 }
      );
    }
  
    try {
      const results = await query({
        query: `
          SELECT *
          FROM Product
          WHERE ProductType = ? OR ProductPrice >= ?
        `,
        values: [type, parseFloat(price)],
      });
  
      return NextResponse.json(results);
    } catch (e) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }