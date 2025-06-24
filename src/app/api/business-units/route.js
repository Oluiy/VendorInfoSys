import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const { BUnitName, Location } = await request.json();

    if (!BUnitName || !Location) {
      return NextResponse.json(
        { message: "Business unit name and location are required" },
        { status: 400 }
      );
    }

    const result = await query({
      query: "INSERT INTO BusinessUnit (BUnitName, Location) VALUES (?, ?)",
      values: [BUnitName, Location],
    });

    return NextResponse.json({
      message: "Business Unit created successfully",
      BUnitID: result.insertId,
      BUnitName,
      Location,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 