import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const results = await query({
      query: `
        SELECT e.EmployeeID, e.EmployeeName, e.EmployeeEmailAddress, o.OfficerName
        FROM Employee e
        LEFT JOIN AdminOfficer o ON e.OfficerID = o.OfficerID
      `,
      values: [],
    });

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 