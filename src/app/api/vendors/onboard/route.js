import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

function generatePassword(name) {
  const base = name.replace(/\s+/g, "").slice(0, 6) || "Vendor";
  const rand = Math.floor(100 + Math.random() * 900);
  return `${base}${rand}!`;
}

export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const officerId = await getOfficerIdFromToken(token); 
    // const officerId = "ADM10";

    if (!officerId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { VendorName, VendorEmailAddress, VendorPhoneNo, password } = await request.json();
    const plainPassword = password || generatePassword(VendorName);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const insertResult = await query({
      query: `
        INSERT INTO Vendor (VendorName, Password, VendorEmailAddress, VendorPhoneNo, OfficerID)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [VendorName, hashedPassword, VendorEmailAddress, VendorPhoneNo, officerId],
    });

    let numericId = insertResult.insertId
    if (!numericId) {
      const getId = await query({
        query: "SELECT LAST_INSERT_ID() as id",
        values: [],
      });
      numericId = getId[0]?.id;
    }
    const VendorID = "VDN" + numericId;

    console.log("Updating OfficerID for id:", numericId, "to", VendorID);

    await query({
      query: "UPDATE Vendor SET VendorID = ? WHERE id = ?",
      values: [VendorID, numericId]
    });

    return NextResponse.json({
      message: "Vendor onboarded successfully",
      VendorID,
      password: plainPassword,
    });
  } catch (e) {
    console.log(e.message)
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 