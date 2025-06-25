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
    let numericId = Math.floor(11 + Math.random() * 10);
    let BUnitId = "BU0" + numericId;
    const result = await query({
      query: "INSERT INTO BusinessUnit (BUnitId, BUnitName, Location) VALUES (? , ?, ?)",
      values: [BUnitId, BUnitName, Location],
    });

    return NextResponse.json({
      message: "Business Unit created successfully",
      BUnitID: BUnitId,
      BUnitName,
      Location,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 


// // src/app/api/business-units/route.js
export async function GET(request) {
  try {
    const units = await query({
      query: "SELECT COUNT(*) AS count FROM BusinessUnit",
      values: [],
    });
    return NextResponse.json(units[0]["count"]);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}