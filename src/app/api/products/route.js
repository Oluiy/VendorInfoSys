import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const { ProductID, ProductName, ProductType, ProductPrice, BUnitID } = await request.json();
    await query({
      query: `
        INSERT INTO Product (ProductID, ProductName, ProductType, ProductPrice, BUnitID)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [ProductID, ProductName, ProductType, ProductPrice, BUnitID],
    });
    return NextResponse.json({ message: "Product added successfully", ProductID });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 

// src/app/api/products/route.js
export async function GET(request) {
    try {
      const products = await query({
        query: "SELECT COUNT(*) AS count FROM Product",
        values: [],
      });
      console.log("data: ", products);
      return NextResponse.json(products[0]["count"]);
    } catch (e) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  }