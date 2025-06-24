import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { OfficerName, OfficerEmailAddress, OfficerPhoneNo, OfficerPassword } = await request.json();
    const hashedPassword = await bcrypt.hash(OfficerPassword, 10);

    // Insert officer
    const insertResult = await query({
      query: `
        INSERT INTO AdminOfficer (OfficerName, OfficerEmailAddress, OfficerPhoneNo, OfficerPassword)
        VALUES (?, ?, ?, ?)
      `,
      values: [OfficerName, OfficerEmailAddress, OfficerPhoneNo, hashedPassword],
    });

    let numericId = insertResult.insertId
    if (!numericId) {
      const getId = await query({
        query: "SELECT LAST_INSERT_ID() as id",
        values: [],
      });
      numericId = getId[0]?.id;
    }
    const OfficerID = "ADM" + numericId;

    // Log for debugging
    console.log("Updating OfficerID for id:", numericId, "to", OfficerID);

    // Update OfficerID
    const updateResult = await query({
      query: "UPDATE AdminOfficer SET OfficerID = ? WHERE id = ?",
      values: [OfficerID, numericId],
    });

    if (updateResult.affectedRows === 0) {
      throw new Error("Failed to update OfficerID for new officer");
    }

    return NextResponse.json({ message: "Admin officer created successfully", OfficerID });
  } catch (e) {
    return NextResponse.json(
      { message: e.message },
      { status: 500 }
    );
  }
}