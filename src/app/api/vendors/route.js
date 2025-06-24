import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const vendors = await query({
      query: "SELECT VendorID, VendorName FROM Vendor",
      values: [],
    });

    return NextResponse.json(vendors);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 