import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

function generatePassword(name) {
  const base = name.replace(/\s+/g, "").slice(0, 6) || "User";
  const rand = Math.floor(100 + Math.random() * 900);
  return `${base}${rand}!`;
}

export async function POST(request) {
  try {
    // const token = request.headers.get("authorization")?.replace("Bearer ", "");
    // const officerId = await getOfficerIdFromToken(token); 
    const officerId = "ADM15";

    if (!officerId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { ManagerName, ManagerEmailAddress, ManagerPhoneNo } = await request.json();
    const plainPassword = generatePassword(ManagerName);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const insertResult = await query({
      query: `
        INSERT INTO Manager (ManagerName, Password, ManagerEmailAddress, ManagerPhoneNo, OfficerID)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [ManagerName, hashedPassword, ManagerEmailAddress, ManagerPhoneNo, officerId],
    });

    let numericId = insertResult.insertId
    if (!numericId) {
      const getId = await query({
        query: "SELECT LAST_INSERT_ID() as id",
        values: [],
      });
      numericId = getId[0]?.id;
    }
    const ManagerID = "MGR" + numericId;

    console.log("Updating OfficerID for id:", numericId, "to", ManagerID);

    await query({
      query: "UPDATE Manager SET ManagerID = ? WHERE id = ?",
      values: [ManagerID, numericId]
    });

    return NextResponse.json({
      message: "Manager onboarded successfully",
      ManagerID,
      password: plainPassword,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
} 

