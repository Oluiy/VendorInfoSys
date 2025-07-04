import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// src/app/api/vendors/route.js
export async function GET(request) {
  try {
    const vendors = await query({
      query: "SELECT COUNT(*) AS count FROM Vendor",
      values: [],
    });
    return NextResponse.json(vendors[0]["count"]);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}